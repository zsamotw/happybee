import { createAction } from '@reduxjs/toolkit'

// account async actions
export const LOGIN_REQUEST = createAction('LOGIN REQUEST', loginData => ({
  payload: { ...loginData }
}))

export const LOGOUT_REQUEST = createAction('LOGOUT REQUEST', logOutData => ({
  payload: { ...logOutData }
}))

export const SIGNUP_REQUEST = createAction('SIGNUP REQUEST', signUpData => ({
  payload: { ...signUpData }
}))

export const UPDATE_USER_ACCOUNT_DETAILS_REQUEST = createAction(
  'UPDATE_USER_ACCOUNT_DETAILS_REQUEST',
  userData => ({ payload: { ...userData } })
)

export const CHANGE_USER_PASSWORD_REQUEST = createAction(
  'CHANGE_USER_PASSWORD_REQUEST',
  passwordData => ({ payload: { ...passwordData } })
)

export const DELETE_USER_REQUEST = createAction(
  'DELETE USER REQUEST',
  deleteUserData => ({ payload: { ...deleteUserData } })
)

// user notes async actions
export const CREATE_NOTE_REQUEST = createAction(
  'CREATE NOTE REQUEST',
  noteData => ({
    payload: { ...noteData }
  })
)

export const GET_NOTE_REQUEST = createAction(
  'GET SELECTED NOTE REQUEST',
  noteData => ({ payload: { ...noteData } })
)

export const SYNC_NOTE_REQUEST = createAction(
  'SYNC NOTE REQUEST',
  noteData => ({ payload: { ...noteData } })
)

export const SYNC_NOTES_REQUEST = createAction(
  'SYNC NOTES REQUEST',
  messageOnError => ({ payload: { messageOnError } })
)

export const DELETE_NOTE_REQUEST = createAction(
  'DELETE NOTE REQUEST',
  deleteNoteData => ({ payload: { ...deleteNoteData } })
)

export const PICK_NOTE_REQUEST = createAction(
  'PICK NOTE REQUEST',
  noteData => ({ payload: { ...noteData } })
)
