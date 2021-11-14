import { all } from 'redux-saga/effects'
import accountSagas from '../features/AccountProfile/saga/accountSagas'
import notesSagas from '../features/Notes/saga/notesSagas'
import creationNoteSaga from '../features/Notes/saga/creationNoteSaga'

export default function* rootSaga() {
  yield all([accountSagas(), notesSagas(), creationNoteSaga()])
}
