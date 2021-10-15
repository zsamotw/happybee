import { all } from 'redux-saga/effects'
import accountSagas from '../features/AccountProfile/saga/accountSagas'
import notesSagas from '../features/Notes/saga/notesSagas'
import createNoteSaga from '../features/CreateNote/saga/createNoteSaga'

export default function* rootSaga() {
  yield all([accountSagas(), notesSagas(), createNoteSaga()])
}
