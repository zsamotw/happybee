import { call, fork, put, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  SET_NOTES,
  SET_APP_MESSAGE,
  SET_SELECTED_NOTE,
  SET_USER_NOTES,
  SET_IS_FETCHING_DATA
} from '../actions/sync-actions'
import {
  CREATE_NOTE_REQUEST,
  GET_NOTE_REQUEST,
  SYNC_NOTE_REQUEST,
  SYNC_NOTES_REQUEST,
  TOGGLE_PICK_NOTE_REQUEST,
  GET_USER_NOTES_REQUEST,
  DELETE_NOTE_REQUEST
} from '../actions/async-actions'
import Firebase from '../../firebase'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'

function* uploadFile(file, folder, messageOnFileUploadError) {
  try {
    const fileRef = Firebase.storageRef().child(`${folder}/${file.name}`)
    const task = Firebase.uploadFile(fileRef, file)
    const channel = eventChannel(emit => task.on('state_changed', emit))

    yield take(channel)
    yield task
  } catch {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnFileUploadError,
        status: 'error'
      })
    )
  }
}

function* deleteFile(filePath, messageOnFileDeleteError) {
  try {
    const fileRef = Firebase.storageRef().child(filePath)

    yield call(Firebase.deleteFile, fileRef)
  } catch {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnFileDeleteError,
        status: 'error'
      })
    )
  }
}

function* createFirebaseNote(action) {
  const {
    title,
    description,
    category,
    pickers,
    file,
    navigateHome,
    messageOnFileUploadError
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const author = Firebase.transformDbUserToSafeUser(currentUser)
  const createdAt = new Date()
  const folder = `images/${createdAt.getFullYear()}-${createdAt.getMonth()}/${createdAt.getTime()}`

  yield call(uploadFile, file, folder, messageOnFileUploadError)

  const imgStoragePath = `${folder}/${file.name}`
  const fileRef = Firebase.storageRef().child(imgStoragePath)
  const imgURL = yield call(Firebase.getDownloadURL, fileRef)

  yield call(Firebase.addDocument, 'notes', {
    title,
    description,
    category,
    author,
    pickers,
    imgStoragePath,
    imgURL,
    createdAt: createdAt.toString()
  })
  navigateHome()
}

function* deleteFirebaseNote(action) {
  const {
    note,
    navigateHome,
    messageOnFileDeleteError,
    messageOnUserAccessError
  } = action.payload
  const { id, author: noteAuthor } = note
  const currentUser = yield call(Firebase.getCurrentUser)
  const author = currentUser
  if (author.uid === noteAuthor.uid) {
    yield call(deleteFile, note.imgStoragePath, messageOnFileDeleteError)
    yield call(Firebase.deleteDocument, `notes/${id}`)
    if (navigateHome) {
      navigateHome()
    }
  } else {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnUserAccessError,
        status: 'warring'
      })
    )
  }
}

function* getFirebaseNote(action) {
  const { id } = action.payload
  const snapshot = yield call(Firebase.getDocument, `notes/${id}`)
  const note = { id: snapshot.id, ...snapshot.data() }
  yield put(SET_SELECTED_NOTE({ ...note }))
}

function* togglePickNote(action) {
  const {
    note: { id, pickers },
    shouldGetNote
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const picker = Firebase.transformDbUserToSafeUser(currentUser)
  const isPicked = pickers.some(p => p.uid === picker.uid)
  if (isPicked) {
    const updatedPickers = pickers.filter(p => p.uid !== picker.uid)
    yield call(
      Firebase.setDocument,
      `notes/${id}`,
      { pickers: updatedPickers },
      { merge: true }
    )
    if (shouldGetNote) {
      yield put(GET_NOTE_REQUEST({ id }))
    }
  } else {
    const pickAt = new Date().toString()
    const pickerWithTimeStamp = { ...picker, pickAt }
    const updatedPickers = [...pickers, pickerWithTimeStamp]
    yield call(
      Firebase.setDocument,
      `notes/${id}`,
      { pickers: updatedPickers },
      { merge: true }
    )
    if (shouldGetNote) {
      yield put(GET_NOTE_REQUEST({ id }))
    }
  }
}

function* createNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    createFirebaseNote,
    isAsyncRequest.isSendingData
  )
}

function* getFirebaseNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    getFirebaseNote,
    isAsyncRequest.isFetchingData
  )
}

function* deleteNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    deleteFirebaseNote,
    isAsyncRequest.isDeletingData
  )
}

function* togglePickNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    togglePickNote,
    isAsyncRequest.isUpdatingData
  )
}

function* syncFirebaseNoteRequest(action) {
  yield put(
    SET_IS_FETCHING_DATA({ type: isAsyncRequest.isFetchingData, value: true })
  )
  const noteTransformer = snapshot => {
    return { id: snapshot.id, ...snapshot.data() }
  }
  const { id, messageOnError } = action.payload

  try {
    yield fork(Firebase.syncDocument, `notes/${id}`, {
      successActionCreator: SET_SELECTED_NOTE,
      transform: noteTransformer
    })
  } catch {
    yield put(SET_APP_MESSAGE({ content: messageOnError, status: 'error' }))
  } finally {
    yield put(
      SET_IS_FETCHING_DATA({
        type: isAsyncRequest.isFetchingData,
        value: false
      })
    )
  }
}

function* syncFirebaseNotesRequest(action) {
  yield put(
    SET_IS_FETCHING_DATA({ type: isAsyncRequest.isFetchingData, value: true })
  )
  const { messageOnError } = action.payload
  const notesTransformer = snapshot => {
    const notes = []
    snapshot.forEach(doc => {
      notes.push({ id: doc.id, ...doc.data() })
    })
    return notes
  }

  try {
    yield fork(Firebase.syncCollectionRef(), 'notes', {
      successActionCreator: SET_NOTES,
      transform: notesTransformer
    })
  } catch {
    yield put(SET_APP_MESSAGE({ content: messageOnError, status: 'error' }))
  } finally {
    yield put(
      SET_IS_FETCHING_DATA({
        type: isAsyncRequest.isFetchingData,
        value: false
      })
    )
  }
}

function* syncUserNotesRequest(action) {
  yield put(
    SET_IS_FETCHING_DATA({ type: isAsyncRequest.isFetchingData, value: true })
  )
  const { messageOnError, userUid } = action.payload
  const notesTransformer = snapshot => {
    const userNotes = []
    snapshot.forEach(doc => {
      const isUserNote = doc.data().author.uid === userUid
      if (isUserNote) {
        userNotes.push({ id: doc.id, ...doc.data() })
      }
    })
    return userNotes
  }

  try {
    yield fork(Firebase.syncCollectionRef(), 'notes', {
      successActionCreator: SET_USER_NOTES,
      transform: notesTransformer
    })
  } catch {
    yield put(SET_APP_MESSAGE({ content: messageOnError, status: 'error' }))
  } finally {
    yield put(
      SET_IS_FETCHING_DATA({
        type: isAsyncRequest.isFetchingData,
        value: false
      })
    )
  }
}

export default function* notesSaga() {
  yield takeLatest(CREATE_NOTE_REQUEST.type, createNoteRequest)
  yield takeLatest(DELETE_NOTE_REQUEST.type, deleteNoteRequest)
  yield takeLatest(GET_NOTE_REQUEST.type, getFirebaseNoteRequest)
  yield takeLatest(SYNC_NOTE_REQUEST.type, syncFirebaseNoteRequest)
  yield takeLatest(SYNC_NOTES_REQUEST.type, syncFirebaseNotesRequest)
  yield takeLatest(TOGGLE_PICK_NOTE_REQUEST.type, togglePickNoteRequest)
  yield takeLatest(GET_USER_NOTES_REQUEST.type, syncUserNotesRequest)
}
