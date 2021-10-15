import { all } from 'redux-saga/effects'
import accountSagas from '../component/AccountProfile/saga/accountSagas'
import notesSagas from '../component/Notes/saga/notesSagas'
import createNoteSaga from '../component/CreateNote/saga/createNoteSaga'

export default function* rootSaga() {
  yield all([accountSagas(), notesSagas(), createNoteSaga()])
}
