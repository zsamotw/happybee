import { call, put, take, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import Firebase from '../../../firebase'
import requestWithFetchingData from '../../../store/hepler'
import isAsyncRequest from '../../../constant/asyncRequests'
import appStore from '../../../shared/reducer/appReducer'
import {
  createNoteRequest,
  updateNoteRequest
} from '../action/createNoteActions'

function* uploadFile(file, folder, messageOnFileUploadError) {
  try {
    const fileRef = Firebase.storageRef().child(`${folder}/${file.name}`)
    const task = Firebase.uploadFile(fileRef, file)
    const channel = eventChannel(emit => task.on('state_changed', emit))

    yield take(channel)
    yield task
  } catch {
    yield put(
      appStore.actions.appMessageChange({
        content: messageOnFileUploadError,
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
    createdAt,
    pickers,
    file,
    isPrivate,
    navigateHome,
    messageOnFileUploadError
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const author = Firebase.transformDbUserToSafeUser(currentUser)
  const folder = `images/${createdAt.getFullYear()}-${createdAt.getMonth()}/${createdAt.getTime()}`
  const note = {
    title,
    description,
    category,
    author,
    pickers,
    createdAt: createdAt.toString(),
    isPrivate
  }
  if (file) {
    yield call(uploadFile, file, folder, messageOnFileUploadError)

    const imgStoragePath = `${folder}/${file.name}`
    const fileRef = Firebase.storageRef().child(imgStoragePath)
    const imgURL = yield call(Firebase.getDownloadURL, fileRef)

    yield call(Firebase.addDocument, 'notes', {
      ...note,
      imgStoragePath,
      imgURL
    })
  } else {
    yield call(Firebase.addDocument, 'notes', note)
  }

  navigateHome()
}

function* updateFirebaseNote(action) {
  console.log('>>> update firabase note', action)
  const {
    id,
    title,
    description,
    category,
    createdAt,
    pickers,
    file,
    isPrivate,
    navigateHome,
    messageOnFileUploadError
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const author = Firebase.transformDbUserToSafeUser(currentUser)
  const folder = `images/${createdAt.getFullYear()}-${createdAt.getMonth()}/${createdAt.getTime()}`
  const note = {
    title,
    description,
    category,
    author,
    pickers,
    createdAt: createdAt.toString(),
    isPrivate
  }
  if (file) {
    yield call(uploadFile, file, folder, messageOnFileUploadError)

    const imgStoragePath = `${folder}/${file.name}`
    const fileRef = Firebase.storageRef().child(imgStoragePath)
    const imgURL = yield call(Firebase.getDownloadURL, fileRef)

    yield call(
      Firebase.setDocument,
      `notes/${id}`,
      {
        ...note,
        imgStoragePath,
        imgURL
      },
      { merge: true }
    )
  } else {
    yield call(Firebase.setDocument, `notes/${id}`, note, { merge: true })
  }

  navigateHome()
}

function* onCreateNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    createFirebaseNote,
    isAsyncRequest.isSendingData
  )
}

function* onUpdateNoteRequest(action) {
  yield requestWithFetchingData(
    action,
    updateFirebaseNote,
    isAsyncRequest.isSendingData
  )
}

export default function* createNoteSaga() {
  yield takeLatest(createNoteRequest.type, onCreateNoteRequest)
  yield takeLatest(updateNoteRequest.type, onUpdateNoteRequest)
}
