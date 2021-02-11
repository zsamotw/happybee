import { all } from 'redux-saga/effects'
import accountSagas from './sagas/accountSagas'
import notesSagas from './sagas/notesSagas'

export default function* rootSaga() {
  yield all([accountSagas(), notesSagas()])
}
