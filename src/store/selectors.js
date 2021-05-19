import { createSelector } from '@reduxjs/toolkit'

export const selectCurrentUser = state => {
  return state.app.get('currentUser')
}

export const selectAppMessage = state => {
  return state.app.get('appMessage')
}

export const selectIsAsyncRequest = state => {
  return state.app.get('isAsyncRequest')
}

export const selectSelectedNote = state => {
  return state.notes.get('selectedNote')
}

export const selectUserNotes = createSelector(
  state => state.notes.userNotes,
  state => state.notes.noteFilters,
  (userNotes, noteFilters) => {
    const { query } = noteFilters
    const lowerCaseQuery = query.toLowerCase()

    return userNotes.filter(note =>
      lowerCaseQuery
        ? (note.title && note.title.toLowerCase().includes(lowerCaseQuery)) ||
          (note.author &&
            note.author.displayName &&
            note.author.displayName.toLowerCase().includes(lowerCaseQuery)) ||
          (note.category &&
            note.category.label &&
            note.category.label.toLowerCase().includes(lowerCaseQuery))
        : true
    )
  }
)

export const selectNotes = createSelector(
  state => state.notes.notes,
  state => state.notes.noteFilters,
  (notes, noteFilters) => {
    const { query } = noteFilters
    const lowerCaseQuery = query.toLowerCase()

    return notes.filter(note =>
      lowerCaseQuery
        ? (note.title && note.title.toLowerCase().includes(lowerCaseQuery)) ||
          (note.author &&
            note.author.displayName &&
            note.author.displayName.toLowerCase().includes(lowerCaseQuery)) ||
          (note.category &&
            note.category.label &&
            note.category.label.toLowerCase().includes(lowerCaseQuery))
        : true
    )
  }
)

export const selectNoteFilters = state => {
  return state.notes.get('noteFilters')
}

export const selectSearchBarConfig = state => {
  return state.app.get('searchBarConfig')
}

export const selectCurrentViewTitle = state => {
  return state.app.get('currentViewTitle')
}
