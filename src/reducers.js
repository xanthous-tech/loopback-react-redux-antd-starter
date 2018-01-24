import { combineReducers } from 'redux';

import { reducer as loginReducer } from './ducks/login';
import { reducer as alertsReducer } from './ducks/alerts';
import { reducer as taskReducer } from './ducks/task';

export default combineReducers({
  login: loginReducer,
  alerts: alertsReducer,
  task: taskReducer,
});
