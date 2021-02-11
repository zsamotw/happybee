function getFilteredNotes(notes, state, collectionName) {
  const { query } = state.get('noteFilters')
  const { collectionName: collectionNameToSearch } = state.get(
    'searchBarConfig'
  )
  const lowerCaseQuery = query.toLowerCase()

  return notes.filter(note =>
    lowerCaseQuery && collectionNameToSearch === collectionName
      ? (note.name && note.name.toLowerCase().includes(lowerCaseQuery)) ||
        (note.author &&
          note.author.displayName &&
          note.author.displayName.toLowerCase().includes(lowerCaseQuery)) ||
        (note.category &&
          note.category.label &&
          note.category.label.toLowerCase().includes(lowerCaseQuery))
      : true
  )
}

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

export const getNotes = state => {
  const notes = state.get('notes')
  return getFilteredNotes(notes, state, 'notes')
}

export const getNoteFilters = state => {
  const filters = state.get('noteFilters')
  return filters
}

export const getSearchBarConfig = state => {
  const searchBarConfig = state.get('searchBarConfig')
  return searchBarConfig
}
