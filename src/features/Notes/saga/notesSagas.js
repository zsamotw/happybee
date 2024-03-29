import { call, fork, put, takeLatest, throttle } from 'redux-saga/effects'
import Firebase from '../../../firebase'
import requestWithFetchingData from '../../../store/hepler'
import isAsyncRequest from '../../../constant/asyncRequests'
import notesStore from '../reducer/notesReducer'
import appStore from '../../../shared/reducer/appReducer'
import {
  deleteNoteRequest,
  getNoteRequest,
  setNoteQueryFilterRequest,
  syncNoteRequest,
  syncNotesRequest,
  syncUserNotesRequest,
  togglePickNoteRequest
} from '../action/notesActions'

function* deleteFile(filePath, messageOnFileDeleteError) {
  try {
    const fileRef = Firebase.storageRef().child(filePath)

    yield call(Firebase.deleteFile, fileRef)
  } catch {
    yield put(
      appStore.actions.appMessageChange({
        content: messageOnFileDeleteError,
        status: 'error'
      })
    )
  }
}

function* deleteFirebaseNote(action) {
  const {
    note,
    navigateHome,
    messageOnFileDeleteError,
    messageOnUserAccessError
  } = action.payload
  const { id, author: noteAuthor, imgURL, imgStoragePath } = note
  const author = yield call(Firebase.getCurrentUser)
  if (author.uid === noteAuthor.uid) {
    if (imgURL && imgStoragePath) {
      yield call(deleteFile, imgStoragePath, messageOnFileDeleteError)
    }
    yield call(Firebase.deleteDocument, `notes/${id}`)
    if (navigateHome) {
      navigateHome()
    }
  } else {
    yield put(
      appStore.actions.appMessageChange({
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
  yield put(notesStore.actions.selectNoteSuccess({ ...note }))
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
      yield put(getNoteRequest({ id }))
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
      yield put(getNoteRequest({ id }))
    }
  }
}

function* onGetNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    getFirebaseNote,
    isAsyncRequest.isFetchingData
  )
}

function* onDeleteNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    deleteFirebaseNote,
    isAsyncRequest.isDeletingData
  )
}

function* onTogglePickNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    togglePickNote,
    isAsyncRequest.isUpdatingData
  )
}

function* onSetNoteQueryRequest(action) {
  yield put(notesStore.actions.queryFilterChange(action.payload))
}

function* syncFirebaseNote(action) {
  yield put(
    appStore.actions.asyncRequestChange({
      type: isAsyncRequest.isFetchingData,
      value: true
    })
  )
  const noteTransformer = snapshot => {
    return { id: snapshot.id, ...snapshot.data() }
  }
  const { id, messageOnError } = action.payload

  try {
    yield fork(Firebase.syncDocument, `notes/${id}`, {
      successActionCreator: notesStore.actions.selectNoteSuccess,
      transform: noteTransformer
    })
  } catch {
    yield put(
      appStore.actions.appMessageChange({
        content: messageOnError,
        status: 'error'
      })
    )
  } finally {
    yield put(
      appStore.actions.asyncRequestChange({
        type: isAsyncRequest.isFetchingData,
        value: false
      })
    )
  }
}

function* syncFirebaseNotes(action) {
  yield put(
    appStore.actions.asyncRequestChange({
      type: isAsyncRequest.isFetchingData,
      value: true
    })
  )
  const { messageOnError } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const notesTransformer = snapshot => {
    const notes = []
    snapshot.forEach(doc => {
      const note = doc.data()
      if (!note.isPrivate || note?.author?.uid === currentUser.uid) {
        notes.push({ id: doc.id, ...note })
      }
    })
    return notes
  }

  try {
    yield fork(Firebase.syncCollectionRef(), 'notes', {
      successActionCreator: notesStore.actions.notesSuccess,
      transform: notesTransformer
    })
  } catch {
    yield put(
      appStore.actions.appMessageChange({
        content: messageOnError,
        status: 'error'
      })
    )
  } finally {
    yield put(
      appStore.actions.asyncRequestChange({
        type: isAsyncRequest.isFetchingData,
        value: false
      })
    )
  }
}

function* syncUserNotes(action) {
  yield put(
    appStore.actions.asyncRequestChange({
      type: isAsyncRequest.isFetchingData,
      value: true
    })
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
      successActionCreator: notesStore.actions.userNotesSuccess,
      transform: notesTransformer
    })
  } catch {
    yield put(
      appStore.actions.appMessageChange({
        content: messageOnError,
        status: 'error'
      })
    )
  } finally {
    yield put(
      appStore.actions.asyncRequestChange({
        type: isAsyncRequest.isFetchingData,
        value: false
      })
    )
  }
}

export default function* notesSaga() {
  yield takeLatest(deleteNoteRequest.type, onDeleteNoteRequest)
  yield takeLatest(getNoteRequest.type, onGetNoteRequest)
  yield takeLatest(syncNoteRequest.type, syncFirebaseNote)
  yield takeLatest(syncNotesRequest.type, syncFirebaseNotes)
  yield takeLatest(syncUserNotesRequest.type, syncUserNotes)
  yield takeLatest(togglePickNoteRequest.type, onTogglePickNoteRequest)
  yield throttle(500, setNoteQueryFilterRequest.type, onSetNoteQueryRequest)
}
