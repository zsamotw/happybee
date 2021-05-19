import { createSlice } from '@reduxjs/toolkit'
import { initialAppState } from './initial-state'
import {
  onAppMessageChange,
  onAuthUserSuccess,
  onCurrentViewTitleChange,
  onAsyncRequestChange,
  onSearchBarConfigChange
} from './action-handlers'

const appStore = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    resetState: () => initialAppState,
    authUserSuccess: (state, action) => {
      return onAuthUserSuccess(state, action.payload)
    },
    appMessageChange: (state, action) => {
      return onAppMessageChange(state, action.payload)
    },
    asyncRequestChange: (state, action) => {
      return onAsyncRequestChange(state, action.payload)
    },
    searchBarConfigChange: (state, action) => {
      return onSearchBarConfigChange(state, action.payload)
    },
    currentViewTitleChange: (state, action) => {
      return onCurrentViewTitleChange(state, action.payload)
    }
  }
})

export default appStore
