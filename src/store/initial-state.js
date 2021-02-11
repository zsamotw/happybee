import { Record, List } from 'immutable'

const makeInitialState = Record({
  currentUser: null,
  isAsyncRequest: {
    isFetchingLoginData: false,
    isFetchingSignUpdData: false,
    isFetchingSignOutData: false,
    isFetchingUpdateUserAccountData: false,
    isFetchingChangePasswordData: false,
    isFetchingNote: false,
    isProcessingNote: false
  },
  searchBarConfig: { isVisible: false, collectionName: '' },
  appMessage: { content: '', type: null },
  selectedNote: null,
  notes: List([]),
  noteFilters: { query: '' }
})

const initialState = makeInitialState()

export default initialState
