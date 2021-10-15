import { Record, List } from 'immutable'

const makeAppInitialState = Record({
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
  searchBarConfig: { isVisible: false },
  currentViewTitle: '',
  appMessage: { content: '', type: '' }
})

const makeNotesInitialState = Record({
  selectedNote: null,
  notes: List([]),
  userNotes: List([]),
  noteFilters: { query: '' }
})

const initialAppState = makeAppInitialState()
const initialNotesState = makeNotesInitialState()

export { initialAppState, initialNotesState }
