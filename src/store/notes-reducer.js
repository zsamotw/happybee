import { createSlice } from '@reduxjs/toolkit'
import {
  onSelectedNoteSuccess,
  onUnsetSelectedNoteSuccess,
  onNotesSuccess,
  onUserNotesSuccess,
  onQueryFilterChange
} from './action-handlers'
import { initialNotesState } from './initial-state'

const notesStore = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  reducers: {
    resetState: () => initialNotesState,
    selectNoteSuccess: (state, action) => {
      return onSelectedNoteSuccess(state, action.payload)
    },
    unselectNoteSuccess: state => {
      return onUnsetSelectedNoteSuccess(state)
    },
    notesSuccess: (state, action) => {
      return onNotesSuccess(state, action.payload)
    },
    userNotesSuccess: (state, action) => {
      return onUserNotesSuccess(state, action.payload)
    },
    queryFilterChange: (state, action) => {
      return onQueryFilterChange(state, action.payload)
    }
  }
})

export default notesStore
