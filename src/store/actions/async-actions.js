import { createAction } from '@reduxjs/toolkit'

// account async actions
export const loginRequest = createAction(
  'Account/Login request',
  loginData => ({
    payload: { ...loginData }
  })
)

export const logoutRequest = createAction(
  'Account/Logout request',
  logOutData => ({
    payload: { ...logOutData }
  })
)

export const signUpRequest = createAction(
  'Account/Signup request',
  signUpData => ({
    payload: { ...signUpData }
  })
)

export const updateUserAccountDetailsRequest = createAction(
  'Account/Update user account details request',
  userData => ({ payload: { ...userData } })
)

export const changeUserPasswordRequest = createAction(
  'Account/Change user password request',
  passwordData => ({ payload: { ...passwordData } })
)

export const deleteUserRequest = createAction(
  'Account/delete user request',
  deleteUserData => ({ payload: { ...deleteUserData } })
)

// user notes async actions
export const createNoteRequest = createAction(
  'Notes/Create note request',
  noteData => ({
    payload: { ...noteData }
  })
)

export const getNoteRequest = createAction(
  'Notes/Get selected note request',
  noteData => ({ payload: { ...noteData } })
)

export const syncNoteRequest = createAction(
  'Notes/Sync note request',
  noteData => ({
    payload: { ...noteData }
  })
)

export const syncNotesRequest = createAction(
  'Notes/Sync notes request',
  messageOnError => ({ payload: { messageOnError } })
)

export const deleteNoteRequest = createAction(
  'Notes/Delete note request',
  deleteNoteData => ({ payload: { ...deleteNoteData } })
)

export const togglePickNoteRequest = createAction(
  'Notes/Toggle pick note request',
  noteData => ({ payload: { ...noteData } })
)

export const syncUserNotesRequest = createAction(
  'Notes/Get user notes request',
  notesData => ({ payload: { ...notesData } })
)

export const setNoteQueryFilterRequest = createAction(
  'Notes/Set note query filter request',
  query => ({ payload: query })
)
