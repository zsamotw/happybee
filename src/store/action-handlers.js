import { List } from 'immutable'

export const handleSetAuthUser = (state, user) => {
  const nextState = state.set('currentUser', user)
  return nextState
}

export const handleSetAppMessage = (state, message) => {
  if (
    !message ||
    typeof message.content !== 'string' ||
    typeof message.type !== 'string'
  ) {
    return state
  }

  const nextState = state.set('appMessage', message)
  return nextState
}

export const handleSetIsFetchingData = (state, data) => {
  const { type, value } = data
  if (typeof type !== 'string' || typeof value !== 'boolean') {
    return state
  }

  const fetchingData = { ...state.get('isAsyncRequest'), [type]: value }
  const nextState = state.set('isAsyncRequest', fetchingData)
  return nextState
}

export const handleSetSelectedNote = (state, note) => {
  const nextState = state.set('selectedNote', note)
  return nextState
}

export const handleUnsetSelectedNote = state => {
  const nextState = state.set('selectedNote', null)
  return nextState
}

export const handleSetNotes = (state, notes) => {
  if (!notes) {
    return state
  }

  const nextNotes = List(notes)
    .sortBy(note => new Date(note.createdAt))
    .reverse()
  const nextState = state.set('notes', nextNotes)
  return nextState
}

export const handleSetUserNotes = (state, notes) => {
  if (!notes) {
    return state
  }

  const nextNotes = List(notes)
    .sortBy(note => new Date(note.createdAt))
    .reverse()
  const nextState = state.set('userNotes', nextNotes)
  return nextState
}

export const handleSetNotesQueryFilter = (state, query) => {
  if (query === null || typeof query !== 'string') {
    return state
  }

  const nextFilters = { ...state.get('noteFilters'), query }
  const nextState = state.set('noteFilters', nextFilters)
  return nextState
}

export const handleSetSearchBarConfig = (state, config) => {
  if (!config || typeof config.isVisible !== 'boolean') {
    return state
  }

  const nextState = state.set('searchBarConfig', config)
  return nextState
}

export const handleSetCurrentViewTitle = (state, title) => {
  const nextState = state.set('currentViewTitle', title)
  return nextState
}
