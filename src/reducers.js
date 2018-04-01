import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as loginReducer } from './ducks/login';
import { reducer as alertsReducer } from './ducks/alerts';
import { reducer as taskReducer } from './ducks/task';

export default combineReducers({
  router: routerReducer,
  login: loginReducer,
  alerts: alertsReducer,
  task: taskReducer,
});
