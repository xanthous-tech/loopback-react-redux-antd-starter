import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as authReducer } from './ducks/auth';
import { reducer as alertsReducer } from './ducks/alerts';
import { reducer as taskReducer } from './ducks/task';

export default combineReducers({
  router: routerReducer,
  auth: authReducer,
  alerts: alertsReducer,
  task: taskReducer,
});
