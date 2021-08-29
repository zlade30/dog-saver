import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root.saga'
import rootReducer from './reducers/root.reducer'

const saga = createSagaMiddleware()

const middlewares = [saga]

let devToolsExtension = (f) => f

if (
  process.env.APP_ENV === 'development' ||
  process.env.APP_ENV === 'staging'
) {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger')

  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)

  if (window.devToolsExtension) {
    devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__()
  }
}

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devToolsExtension)
)

saga.run(rootSaga)

export default store
