import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';

export const history = createHistory();

// hooking up with redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history),
  loggerMiddleware
))(createStore);

export default function configureStore(initial_state) {
  return createStoreWithMiddleware(rootReducer, initial_state);
}
