import { createAction } from '@reduxjs/toolkit'

export const RESET_STATE = createAction('RESET STATE')

export const SET_AUTH_USER = createAction('SET AUTH USER', currentUser => ({
  payload: currentUser
}))

export const SET_APP_MESSAGE = createAction('SET APP MESSAGE', message => ({
  payload: { ...message }
}))

export const SET_IS_FETCHING_DATA = createAction('IS FETCHING DATA', data => ({
  payload: { ...data }
}))

export const SET_SELECTED_NOTE = createAction('SET SELECTED NOTE', note => ({
  payload: { ...note }
}))

export const UNSET_SELECTED_NOTE = createAction('UNSET SELECTED NOTE')

export const SET_NOTES = createAction('SET NOTES', notes => ({
  payload: { ...notes }
}))

export const SYNC_NOTES = createAction('SYNC NOTES')

export const SYNC_NOTES_CREATION = notes => SYNC_NOTES(notes)

export const SET_NOTE_QUERY_FILTER = createAction(
  'SET NOTE QUERY FILTER',
  query => ({ payload: query })
)

export const SET_SEARCHBAR_CONFIG = createAction(
  'SET SEARCH BAR CONFIG',
  config => ({ payload: { ...config } })
)
