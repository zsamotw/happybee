import { createSlice } from '@reduxjs/toolkit'
import { initialAppState } from '../../store/initialState'

const appStore = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    resetState: () => initialAppState,
    authUserSuccess: (state, action) => {
      return state.set('currentUser', action.payload)
    },
    appMessageChange: (state, action) => {
      const message = action.payload
      if (
        !message ||
        typeof message.content !== 'string' ||
        typeof message.type !== 'string'
      ) {
        return state
      }

      return state.set('appMessage', message)
    },
    asyncRequestChange: (state, action) => {
      const { type, value } = action.payload
      if (typeof type !== 'string' || typeof value !== 'boolean') {
        return state
      }

      const fetchingData = { ...state.get('isAsyncRequest'), [type]: value }
      return state.set('isAsyncRequest', fetchingData)
    },
    searchBarConfigChange: (state, action) => {
      const config = action.payload
      if (!config || typeof config.isVisible !== 'boolean') {
        return state
      }

      return state.set('searchBarConfig', config)
    },
    currentViewTitleChange: (state, action) => {
      return state.set('currentViewTitle', action.payload)
    }
  }
})

export default appStore
