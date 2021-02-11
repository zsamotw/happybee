import { put } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  SET_IS_FETCHING_DATA
} from '../../actions/sync-actions'

export default function* requestWithFetchingData(action, func, fetchingType) {
  const { messageOnSuccess, messageOnError } = action.payload || {}
  yield put(SET_IS_FETCHING_DATA({ type: fetchingType, value: true }))
  try {
    yield func(action)
    if (messageOnSuccess) {
      yield put(
        SET_APP_MESSAGE({ content: messageOnSuccess, status: 'success' })
      )
    }
  } catch (err) {
    console.log(err)
    const payload = action && action.payload
    const setError = payload && payload.setError
    if (setError) {
      setError(err)
    }
    if (messageOnError) {
      yield put(SET_APP_MESSAGE({ content: messageOnError, status: 'error' }))
    }
  } finally {
    yield put(SET_IS_FETCHING_DATA({ type: fetchingType, value: false }))
  }
}
