import { List } from 'immutable'

export const handleSetAuthUser = (state, user) => {
  const nextState = state.set('currentUser', user)
  return nextState
}

export const handleSetAppMessage = (state, message) => {
  const nextState = state.set('appMessage', message)
  return nextState
}

export const handleSetIsFetchingData = (state, data) => {
  const { type, value } = data
  const fetchingData = { ...state.get('isAsyncRequest'), [type]: value }
  const nextState = state.set('isAsyncRequest', fetchingData)
  return nextState
}

export const handleSetNotes = (state, notes) => {
  const nextNotes = List(notes)
    .sortBy(note => new Date(note.createdAt))
    .reverse()
  const nextState = state.set('notes', nextNotes)
  return nextState
}

export const handleSetNotesQueryFilter = (state, query) => {
  const nextFilters = { ...state.get('noteFilters'), query }
  const nextState = state.set('noteFilters', nextFilters)
  return nextState
}

export const handleSetSearchBarConfig = (state, config) => {
  const nextState = state.set('searchBarConfig', config)
  return nextState
}
