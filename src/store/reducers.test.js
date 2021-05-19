import { List } from 'immutable'
import { appStore } from './notes-reducer'
import initialState from './initial-state'
import {
  RESET_STATE,
  SET_AUTH_USER,
  SET_APP_MESSAGE,
  SET_IS_FETCHING_DATA,
  SET_SELECTED_NOTE,
  UNSET_SELECTED_NOTE,
  SET_NOTES,
  SET_USER_NOTES,
  SET_NOTE_QUERY_FILTER,
  SET_SEARCHBAR_CONFIG
} from './actions/sync-actions'

describe('Test app reducers', () => {
  test('should handle RESET STATE action', () => {
    expect(appStore.reducer(initialState, RESET_STATE())).toBe(initialState)
  })

  test('should handle SET AUTH USER action', () => {
    const authUser = {
      uid: '0123',
      displayName: 'testUser',
      email: 'test@email.com'
    }
    const nextState = appReducers(initialState, SET_AUTH_USER(authUser))
    expect(nextState.get('currentUser')).toBe(authUser)
  })

  test('should handle SET APP MESSAGE action', () => {
    const appMessage = {
      content: 'hello',
      type: 'success'
    }
    const nextState = appReducers(initialState, SET_APP_MESSAGE(appMessage))
    expect(nextState.get('appMessage')).toEqual(appMessage)
  })

  test('should handle SET APP MESSAGE action when message is null', () => {
    const nextState = appReducers(initialState, SET_APP_MESSAGE(null))
    expect(nextState.get('appMessage')).toEqual(initialState.get('appMessage'))
  })

  test('should handle SET APP MESSAGE action when message has not proper type', () => {
    const appMessage = {
      content: 123,
      type: 'success'
    }
    const nextState = appReducers(initialState, SET_APP_MESSAGE(appMessage))
    expect(nextState.get('appMessage')).toEqual(initialState.get('appMessage'))
  })

  test('should handle SET IS FETCHING DATA action', () => {
    const isFetchingData = {
      type: 'isFetchingData',
      value: true
    }
    const nextState = appReducers(
      initialState,
      SET_IS_FETCHING_DATA(isFetchingData)
    )
    expect(nextState.get('isAsyncRequest').isFetchingData).toEqual(true)
  })

  test('should handle SET IS FETCHING DATA action when data is null', () => {
    const nextState = appReducers(initialState, SET_IS_FETCHING_DATA(null))
    expect(nextState.get('isAsyncRequest').isFetchingData).toEqual(
      initialState.get('isAsyncRequest').isFetchingData
    )
  })

  test('should handle SET IS FETCHING DATA action when data has not proper type', () => {
    const isFetchingData1 = {
      type: 'isFetchingData',
      value: 123
    }
    const nextState1 = appReducers(
      initialState,
      SET_IS_FETCHING_DATA(isFetchingData1)
    )
    const isFetchingData2 = {
      type: { foo: 'bar' },
      value: true
    }
    const nextState2 = appReducers(
      initialState,
      SET_IS_FETCHING_DATA(isFetchingData2)
    )

    expect(nextState1.get('isAsyncRequest').isFetchingData).toEqual(
      initialState.get('isAsyncRequest').isFetchingData
    )
    expect(nextState2.get('isAsyncRequest').isFetchingData).toEqual(
      initialState.get('isAsyncRequest').isFetchingData
    )
  })

  test('should handle SET AND UNSET SELECTED NOTE action', () => {
    const note = {
      title: 'test',
      description: 'test'
    }
    const nextState = appReducers(initialState, SET_SELECTED_NOTE(note))
    expect(nextState.get('selectedNote')).toEqual(note)
    const nextState2 = appReducers(nextState, UNSET_SELECTED_NOTE())
    expect(nextState2.get('selectedNote')).toEqual(null)
  })

  test('should handle SET NOTES action', () => {
    const notes = [
      { createdAt: '1999-01-01T10:10' },
      { createdAt: '2000-01-01T11:10' },
      { createdAt: '2000-01-01T10:10' }
    ]

    const sortedNotes = List([
      { createdAt: '2000-01-01T11:10' },
      { createdAt: '2000-01-01T10:10' },
      { createdAt: '1999-01-01T10:10' }
    ])

    const nextState = appReducers(initialState, SET_NOTES(notes))
    expect(nextState.get('notes')).toEqual(sortedNotes)
  })

  test('should handle SET NOTES action when notes is null', () => {
    const nextState = appReducers(initialState, SET_NOTES(null))
    expect(nextState.get('notes')).toEqual(initialState.get('notes'))
  })

  test('should handle SET USER NOTES action', () => {
    const notes = [
      { createdAt: '1999-01-01T10:10' },
      { createdAt: '2000-01-01T11:10' },
      { createdAt: '2000-01-01T10:10' }
    ]

    const sortedNotes = List([
      { createdAt: '2000-01-01T11:10' },
      { createdAt: '2000-01-01T10:10' },
      { createdAt: '1999-01-01T10:10' }
    ])

    const nextState = appReducers(initialState, SET_USER_NOTES(notes))
    expect(nextState.get('userNotes')).toEqual(sortedNotes)
  })

  test('should handle SET NOTES USER action when notes is null', () => {
    const nextState = appReducers(initialState, SET_USER_NOTES(null))
    expect(nextState.get('userNotes')).toEqual(initialState.get('userNotes'))
  })

  test('should handle SET NOTE QUERY FILTERS action', () => {
    const query = 'test'
    const nextState = appReducers(initialState, SET_NOTE_QUERY_FILTER(query))
    expect(nextState.get('noteFilters')).toEqual({ query })
  })

  test('should handle SET NOTE QUERY FILTERS action when query is null or type different to string', () => {
    const query = 1
    const nextState = appReducers(initialState, SET_NOTE_QUERY_FILTER(query))
    const nextState2 = appReducers(initialState, SET_NOTE_QUERY_FILTER(null))
    expect(nextState.get('noteFilters')).toEqual(
      initialState.get('noteFilters')
    )
    expect(nextState2.get('noteFilters')).toEqual(
      initialState.get('noteFilters')
    )
  })

  test('should handle SET SEARCH BAR CONFIG action', () => {
    const config = {
      isVisible: true
    }
    const nextState = appReducers(initialState, SET_SEARCHBAR_CONFIG(config))
    expect(nextState.get('searchBarConfig')).toEqual(config)
  })

  test('SET SEARCH BAR CONFIG action when data is null', () => {
    const nextState = appReducers(initialState, SET_SEARCHBAR_CONFIG(null))
    expect(nextState.get('searchBarConfig')).toEqual(
      initialState.get('searchBarConfig')
    )
  })

  test('should handle SET SEARCH BAR CONFIG action when config has not proper type', () => {
    const config = {
      isVisible: ''
    }
    const nextState = appReducers(initialState, SET_SEARCHBAR_CONFIG(config))

    expect(nextState.get('searchBarConfig')).toEqual(
      initialState.get('searchBarConfig')
    )
  })
})
