import { List } from 'immutable'

export const onAuthUserSuccess = (state, user) => {
  return state.set('currentUser', user)
}

export const onAppMessageChange = (state, message) => {
  if (
    !message ||
    typeof message.content !== 'string' ||
    typeof message.type !== 'string'
  ) {
    return state
  }

  return state.set('appMessage', message)
}

export const onAsyncRequestChange = (state, data) => {
  const { type, value } = data
  if (typeof type !== 'string' || typeof value !== 'boolean') {
    return state
  }

  const fetchingData = { ...state.get('isAsyncRequest'), [type]: value }
  return state.set('isAsyncRequest', fetchingData)
}

export const onSelectedNoteSuccess = (state, note) => {
  return state.set('selectedNote', note)
}

export const onUnsetSelectedNoteSuccess = state => {
  return state.set('selectedNote', null)
}

export const onNotesSuccess = (state, notes) => {
  if (!notes) {
    return state
  }

  const nextNotes = List(notes)
    .sortBy(note => new Date(note.createdAt))
    .reverse()
  return state.set('notes', nextNotes)
}

export const onUserNotesSuccess = (state, notes) => {
  if (!notes) {
    return state
  }

  const nextNotes = List(notes)
    .sortBy(note => new Date(note.createdAt))
    .reverse()
  return state.set('userNotes', nextNotes)
}

export const onQueryFilterChange = (state, query) => {
  if (query === null || typeof query !== 'string') {
    return state
  }

  const nextFilters = { ...state.get('noteFilters'), query }
  return state.set('noteFilters', nextFilters)
}

export const onSearchBarConfigChange = (state, config) => {
  if (!config || typeof config.isVisible !== 'boolean') {
    return state
  }

  return state.set('searchBarConfig', config)
}

export const onCurrentViewTitleChange = (state, title) => {
  return state.set('currentViewTitle', title)
}
