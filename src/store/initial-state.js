import { Record, List } from 'immutable'

const makeInitialState = Record({
  currentUser: null,
  isAsyncRequest: {
    isFetchingLoginData: false,
    isFetchingSignUpdData: false,
    isFetchingSignOutData: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isSendingData: false,
    isFetchingData: false,
    isUpdatingData: false,
    isDeletingData: false
  },
  searchBarConfig: { isVisible: false, collectionName: '' },
  appMessage: { content: '', type: null },
  selectedNote: null,
  notes: List([]),
  pickedNotes: List([]),
  noteFilters: { query: '' }
})

const initialState = makeInitialState()

export default initialState
