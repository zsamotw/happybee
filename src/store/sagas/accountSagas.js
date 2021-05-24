import { call, put, takeLatest } from 'redux-saga/effects'
import {
  loginRequest,
  logoutRequest,
  signUpRequest,
  updateUserAccountDetailsRequest,
  changeUserPasswordRequest,
  deleteUserRequest
} from '../actions/async-actions'
import Firebase from '../../firebase'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'
import appStore from '../app-reducer'
import notesStore from '../notes-reducer'

function* signInWithFirebase(action) {
  const { email, password } = action.payload
  const { user } = yield call(
    Firebase.signInWithEmailAndPassword,
    email,
    password
  )
  const currentUser = Firebase.transformDbUserToSafeUser(user)
  yield put(appStore.actions.authUserSuccess(currentUser))
}

function* signOutWithFirebase() {
  yield call(Firebase.signOut)
  yield put(appStore.actions.resetState())
  yield put(notesStore.actions.resetState())
}

function* signUpWithFirebase(action) {
  const { displayName, email, password } = action.payload
  const user = yield call(
    Firebase.createUserWithEmailAndPassword,
    email,
    password
  )
  if (user) {
    const loggedUser = yield call(Firebase.getCurrentUser)
    yield call(loggedUser.updateProfile.bind(loggedUser), { displayName })
    const currentUser = Firebase.transformDbUserToSafeUser(loggedUser)
    yield put(appStore.actions.authUserSuccess(currentUser))
  }
}

function* updateFirebaseUserAccount(action) {
  const { displayName } = action.payload
  const loggedUser = yield call(Firebase.getCurrentUser)

  if (loggedUser) {
    yield call(loggedUser.updateProfile.bind(loggedUser), { displayName })
    yield call(
      Firebase.updateNotesOnUpdateUserProfile,
      'notes',
      loggedUser,
      displayName
    )
    const currentUser = Firebase.transformDbUserToSafeUser(loggedUser)
    yield put(appStore.actions.authUserSuccess(currentUser))
  }
}

function* changeFirebasePassword(action) {
  const { email, passwordOld, passwordNew } = action.payload
  yield put(
    appStore.actions.asyncRequestChange({
      type: isAsyncRequest.isUpdatingPassword,
      value: true
    })
  )
  const { user } = yield call(
    Firebase.signInWithEmailAndPassword,
    email,
    passwordOld
  )
  if (user) {
    yield call(Firebase.passwordUpdate, passwordNew)
  }
}

function* deleteFirebaseUser() {
  const loggedUser = yield call(Firebase.getCurrentUser)
  if (loggedUser) {
    yield call(loggedUser.delete.bind(loggedUser))
    yield call(Firebase.deleteNotesForUser, loggedUser, 'notes')
    yield put(appStore.actions.authUserSuccess(null))
  }
}

function* onSingIn(action) {
  yield requestWithFetchingData(
    action,
    signInWithFirebase,
    isAsyncRequest.isFetchingLoginData
  )
}

function* onLogout(action) {
  yield requestWithFetchingData(
    action,
    signOutWithFirebase,
    isAsyncRequest.isFetchingLoginData
  )
}

function* onSignUp(action) {
  yield requestWithFetchingData(
    action,
    signUpWithFirebase,
    isAsyncRequest.isFetchingSignUpData
  )
}

function* onUpdateUserAccountDetails(action) {
  yield requestWithFetchingData(
    action,
    updateFirebaseUserAccount,
    isAsyncRequest.isUpdatingProfile
  )
}

function* onChangePassword(action) {
  yield requestWithFetchingData(
    action,
    changeFirebasePassword,
    isAsyncRequest.isUpdatingPassword
  )
}

function* onDeleteUser(action) {
  yield requestWithFetchingData(
    action,
    deleteFirebaseUser,
    isAsyncRequest.isFetchingLoginData
  )
}

export default function* accountSaga() {
  yield takeLatest(loginRequest.type, onSingIn)
  yield takeLatest(logoutRequest.type, onLogout)
  yield takeLatest(signUpRequest.type, onSignUp)
  yield takeLatest(
    updateUserAccountDetailsRequest.type,
    onUpdateUserAccountDetails
  )
  yield takeLatest(changeUserPasswordRequest, onChangePassword)
  yield takeLatest(deleteUserRequest.type, onDeleteUser)
}
