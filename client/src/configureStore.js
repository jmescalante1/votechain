import { applyMiddleware, createStore } from 'redux' 
import thunk  from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './reducers'

export const history = createBrowserHistory()

export default function configureStore() {
  const rootReducer = createRootReducer(history)

  const store = createStore(
    rootReducer, // root reducer with router state
    // composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        promise,
        logger
      )
    // )
  )
  return store
}