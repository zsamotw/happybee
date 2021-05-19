import { put } from 'redux-saga/effects'
import appStore from '../../app-reducer'

export default function* requestWithFetchingData(action, func, fetchingType) {
  const { messageOnSuccess, messageOnError } = action.payload || {}
  yield put(
    appStore.actions.asyncRequestChange({ type: fetchingType, value: true })
  )
  try {
    yield func(action)
    if (messageOnSuccess) {
      yield put(
        appStore.actions.appMessageChange({
          content: messageOnSuccess,
          status: 'success'
        })
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
      yield put(
        appStore.actions.appMessageChange({
          content: messageOnError,
          status: 'error'
        })
      )
    }
  } finally {
    yield put(
      appStore.actions.asyncRequestChange({ type: fetchingType, value: false })
    )
  }
}
