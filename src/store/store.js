import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import mainStore from '../shared/reducer/appReducer'
import notesStore from '../component/Notes/reducer/notesReducer'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  app: mainStore.reducer,
  notes: notesStore.reducer
})

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga)

export default { store }
