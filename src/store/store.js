import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import appStore from './app-reducer'
import notesStore from './notes-reducer'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  app: appStore.reducer,
  notes: notesStore.reducer
})

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga)

export default { store }
