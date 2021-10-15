import { createAction } from '@reduxjs/toolkit'

// account async action
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
