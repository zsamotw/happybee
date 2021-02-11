import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import appReducers from './app-reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: appReducers,
  middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga)

export default { store }
