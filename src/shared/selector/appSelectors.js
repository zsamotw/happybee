export const selectCurrentUser = state => {
  return state.app.get('currentUser')
}

export const selectAppMessage = state => {
  return state.app.get('appMessage')
}

export const selectIsAsyncRequest = state => {
  return state.app.get('isAsyncRequest')
}

export const selectSearchBarConfig = state => {
  return state.app.get('searchBarConfig')
}

export const selectCurrentViewTitle = state => {
  return state.app.get('currentViewTitle')
}
