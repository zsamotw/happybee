import { call, put, takeLatest } from 'redux-saga/effects'
import {
  SET_AUTH_USER,
  SET_IS_FETCHING_DATA,
  RESET_STATE
} from '../actions/sync-actions'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  UPDATE_USER_ACCOUNT_DETAILS_REQUEST,
  CHANGE_USER_PASSWORD_REQUEST,
  DELETE_USER_REQUEST
} from '../actions/async-actions'
import Firebase from '../../firebase'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'

function* signInWithFirebase(action) {
  const { email, password } = action.payload
  const { user } = yield call(
    Firebase.signInWithEmailAndPassword,
    email,
    password
  )
  const currentUser = Firebase.transformDbUserToSafeUser(user)
  yield put(SET_AUTH_USER(currentUser))
}

function* signOutWithFirebase() {
  yield call(Firebase.signOut)
  yield put(RESET_STATE())
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
    yield put(SET_AUTH_USER(currentUser))
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
    yield put(SET_AUTH_USER(currentUser))
  }
}

function* changeFirebasePassword(action) {
  const { email, passwordOld, passwordNew } = action.payload
  yield put(
    SET_IS_FETCHING_DATA({
      type: isAsyncRequest.isFetchingChangePasswordData,
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
    yield put(SET_AUTH_USER(null))
  }
}

function* singInRequest(action) {
  yield requestWithFetchingData(
    action,
    signInWithFirebase,
    isAsyncRequest.isFetchingLoginData
  )
}

function* logoutRequest(action) {
  yield requestWithFetchingData(
    action,
    signOutWithFirebase,
    isAsyncRequest.isFetchingLoginData
  )
}

function* signUpRequest(action) {
  yield requestWithFetchingData(
    action,
    signUpWithFirebase,
    isAsyncRequest.isFetchingSignUpData
  )
}

function* updateUserAccountDetailsRequest(action) {
  yield requestWithFetchingData(
    action,
    updateFirebaseUserAccount,
    isAsyncRequest.isUpdatingProfile
  )
}

function* changePasswordRequest(action) {
  yield requestWithFetchingData(
    action,
    changeFirebasePassword,
    isAsyncRequest.isUpdatingPassword
  )
}

function* deleteUserRequest(action) {
  yield requestWithFetchingData(
    action,
    deleteFirebaseUser,
    isAsyncRequest.isFetchingLoginData
  )
}

export default function* accountSaga() {
  yield takeLatest(LOGIN_REQUEST.type, singInRequest)
  yield takeLatest(LOGOUT_REQUEST.type, logoutRequest)
  yield takeLatest(SIGNUP_REQUEST.type, signUpRequest)
  yield takeLatest(
    UPDATE_USER_ACCOUNT_DETAILS_REQUEST.type,
    updateUserAccountDetailsRequest
  )
  yield takeLatest(CHANGE_USER_PASSWORD_REQUEST, changePasswordRequest)
  yield takeLatest(DELETE_USER_REQUEST.type, deleteUserRequest)
}
