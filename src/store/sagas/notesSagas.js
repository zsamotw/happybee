import { call, fork, put, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  SET_APP_MESSAGE,
  SET_SELECTED_NOTE,
  SYNC_NOTES_CREATION
} from '../actions/sync-actions'
import {
  CREATE_NOTE_REQUEST,
  GET_NOTE_REQUEST,
  GET_NOTES_REQUEST,
  PICK_NOTE_REQUEST,
  DELETE_NOTE_REQUEST
} from '../actions/async-actions'
import Firebase from '../../firebase'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'
import * as ROUTES from '../../constants/routes'

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
    name,
    description,
    category,
    pickers,
    file,
    history,
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
    name,
    description,
    category,
    author,
    pickers,
    imgStoragePath,
    imgURL,
    createdAt: createdAt.toString()
  })
  history.push(ROUTES.HOME)
}

function* deleteFirebaseNote(action) {
  const {
    note,
    messageOnFileDeleteError,
    messageOnUserAccessError
  } = action.payload
  const { id, author: noteAuthor } = note
  const currentUser = yield call(Firebase.getCurrentUser)
  const author = currentUser
  if (author.uid === noteAuthor.uid) {
    yield call(deleteFile, note.imgStoragePath, messageOnFileDeleteError)
    yield call(Firebase.deleteDocument, `notes/${id}`)
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
  const note = snapshot.data()
  yield put(SET_SELECTED_NOTE({ ...note }))
}

function* pickNote(action) {
  const {
    note: { id, author: noteAuthor, pickers },
    messageOnUserPickAccessError
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const picker = Firebase.transformDbUserToSafeUser(currentUser)
  const pickAt = new Date().toString()
  const pickerWithTimeStamp = { ...picker, pickAt }
  const newPickers = [...pickers, pickerWithTimeStamp]

  if (picker.uid !== noteAuthor.uid) {
    yield call(
      Firebase.setDocument,
      `notes/${id}`,
      { pickers: newPickers },
      { merge: true }
    )
  } else {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnUserPickAccessError,
        status: 'warring'
      })
    )
  }
}

function* createNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    createFirebaseNote,
    isAsyncRequest.isProcessingNote
  )
}

function* getFirebaseNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    getFirebaseNote,
    isAsyncRequest.isFetchingNote
  )
}

function* deleteNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    deleteFirebaseNote,
    isAsyncRequest.isProcessingNote
  )
}

function* getFirebaseSyncNotes(action) {
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
      successActionCreator: SYNC_NOTES_CREATION,
      transform: notesTransformer
    })
  } catch {
    yield put(SET_APP_MESSAGE({ content: messageOnError, status: 'error' }))
  }
}

function* pickNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    pickNote,
    isAsyncRequest.isProcessingNote
  )
}

export default function* notesSaga() {
  yield takeLatest(CREATE_NOTE_REQUEST.type, createNoteRequest)
  yield takeLatest(DELETE_NOTE_REQUEST.type, deleteNoteRequest)
  yield takeLatest(GET_NOTE_REQUEST.type, getFirebaseNoteRequest)
  yield takeLatest(GET_NOTES_REQUEST.type, getFirebaseSyncNotes)
  yield takeLatest(PICK_NOTE_REQUEST.type, pickNoteRequest)
}
