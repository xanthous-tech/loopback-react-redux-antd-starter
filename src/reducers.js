import { combineReducers } from 'redux';

import { reducer as loginReducer } from './ducks/login';
import { reducer as alertsReducer } from './ducks/alerts';

export default combineReducers({
  login: loginReducer,
  alerts: alertsReducer,
});
