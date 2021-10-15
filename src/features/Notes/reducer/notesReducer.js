import { createSlice } from '@reduxjs/toolkit'
import { List } from 'immutable'
import { initialNotesState } from '../../../store/initialState'

const notesStore = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  reducers: {
    resetState: () => initialNotesState,
    selectNoteSuccess: (state, action) => {
      return state.set('selectedNote', action.payload)
    },
    unselectNoteSuccess: state => {
      return state.set('selectedNote', null)
    },
    notesSuccess: (state, action) => {
      const notes = action.payload
      if (!notes) {
        return state
      }

      const nextNotes = List(notes)
        .sortBy(note => new Date(note.createdAt))
        .reverse()
      return state.set('notes', nextNotes)
    },
    userNotesSuccess: (state, action) => {
      const notes = action.payload
      if (!notes) {
        return state
      }

      const nextNotes = List(notes)
        .sortBy(note => new Date(note.createdAt))
        .reverse()
      return state.set('userNotes', nextNotes)
    },
    queryFilterChange: (state, action) => {
      const query = action.payload
      if (query === null || typeof query !== 'string') {
        return state
      }

      const nextFilters = { ...state.get('noteFilters'), query }
      return state.set('noteFilters', nextFilters)
    }
  }
})

export default notesStore
