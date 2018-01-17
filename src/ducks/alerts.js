import { notification } from 'antd';
import CONSTANT from '../constant';

export function reducer(previous_state = [], action) {
  switch(action.type) {
    case CONSTANT.LOGIN_FAILED:
      // trying to match what loopback returns
      let description = '';
      const error_response = action.error.response;

      if (error_response && error_response.data.error) {
        description = error_response.data.error.message;
      } else {
        description = action.error.message;
      }

      notification.error({
        message: action.error.name,
        description
      });
      return previous_state.concat([{
        type: action.type,
        error: action.error,
        timestamp: Date.now()
      }]);
    // case actions.REGISTERED:
    case CONSTANT.LOGIN_SUCCESS:
      notification.success({
        message: "Welcome!",
        description: "Login successful"
      });
      return previous_state;
    default:
      return previous_state;
  }
}
