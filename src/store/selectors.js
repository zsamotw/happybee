import { createSelector } from '@reduxjs/toolkit'

export const getCurrentUser = state => {
  const currentUser = state.get('currentUser')
  return currentUser
}

export const getAppMessage = state => {
  const message = state.get('appMessage')
  return message
}

export const getIsAsyncRequest = state => {
  const isAsyncRequest = state.get('isAsyncRequest')
  return isAsyncRequest
}

export const getSelectedNote = state => {
  const notes = state.get('selectedNote')
  return notes
}

export const getNotes = createSelector(
  state => state.notes,
  state => state.noteFilters,
  (notes, noteFilters) => {
    const { query } = noteFilters
    const lowerCaseQuery = query.toLowerCase()

    return notes.filter(item =>
      lowerCaseQuery
        ? (item.title && item.title.toLowerCase().includes(lowerCaseQuery)) ||
          (item.author &&
            item.author.displayName &&
            item.author.displayName.toLowerCase().includes(lowerCaseQuery)) ||
          (item.category &&
            item.category.label &&
            item.category.label.toLowerCase().includes(lowerCaseQuery))
        : true
    )
  }
)

export const getNoteFilters = state => {
  const filters = state.get('noteFilters')
  return filters
}

export const getSearchBarConfig = state => {
  const searchBarConfig = state.get('searchBarConfig')
  return searchBarConfig
}
