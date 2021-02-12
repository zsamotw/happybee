import { createReducer } from '@reduxjs/toolkit'
import {
  handleSetAuthUser,
  handleSetAppMessage,
  handleSetIsFetchingData,
  handleSetSelectedNote,
  handleUnsetSelectedNote,
  handleSetNotes,
  handleSetNotesQueryFilter,
  handleSetSearchBarConfig
} from './action-handlers'
import {
  RESET_STATE,
  SET_AUTH_USER,
  SET_APP_MESSAGE,
  SET_IS_FETCHING_DATA,
  SET_SELECTED_NOTE,
  UNSET_SELECTED_NOTE,
  SET_NOTES,
  SYNC_NOTES,
  SET_NOTE_QUERY_FILTER,
  SET_SEARCHBAR_CONFIG
} from './actions/sync-actions'
import initialState from './initial-state'

const appReducers = createReducer(initialState, {
  [RESET_STATE.type]: () => initialState,
  [SET_AUTH_USER.type]: (state, action) => {
    return handleSetAuthUser(state, action.payload)
  },
  [SET_APP_MESSAGE.type]: (state, action) => {
    return handleSetAppMessage(state, action.payload)
  },
  [SET_IS_FETCHING_DATA.type]: (state, action) => {
    return handleSetIsFetchingData(state, action.payload)
  },
  [SET_SELECTED_NOTE.type]: (state, action) => {
    return handleSetSelectedNote(state, action.payload)
  },
  [UNSET_SELECTED_NOTE.type]: state => {
    return handleUnsetSelectedNote(state)
  },
  [SET_NOTES.type]: (state, action) => {
    return handleSetNotes(state, action.payload)
  },
  [SYNC_NOTES.type]: (state, action) => {
    return handleSetNotes(state, action.payload)
  },
  [SET_SEARCHBAR_CONFIG.type]: (state, action) => {
    return handleSetSearchBarConfig(state, action.payload)
  },
  [SET_NOTE_QUERY_FILTER.type]: (state, action) => {
    return handleSetNotesQueryFilter(state, action.payload)
  }
})

export default appReducers
