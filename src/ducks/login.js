import axios from 'axios';

import { url } from '../utils/ajax';

import CONSTANT from '../constant';

export function reducer(previous_state = {
  logged_in: !!sessionStorage.getItem('access_token'),
  access_token: JSON.parse(sessionStorage.getItem('access_token') || 'null')
}, action) {
  switch (action.type) {
    case CONSTANT.LOGIN_SUCCESS:
      sessionStorage.setItem('access_token', JSON.stringify(action.access_token));
      return Object.assign({}, previous_state, {
        logged_in: true,
        access_token: action.access_token
      });
    case CONSTANT.LOGIN_FAILED:
      return Object.assign({}, previous_state, {
        logged_in: false,
        access_token: undefined
      });
    default:
      return previous_state;
  }
}


export function login(credentials) {
  return function(dispatch) {
    // return dispatch({
    //   type: CONSTANT.LOGIN_SUCCESS,
    //   access_token: 'test1'
    // })
    return axios.post(url('/Users/login'), credentials).then(response => {
      return dispatch({
        type: CONSTANT.LOGIN_SUCCESS,
        access_token: response.data
      });
    }).catch(error => {
      console.error(error);
      return dispatch({
        type: CONSTANT.LOGIN_FAILED, 
        error
      });
    });
  };
}
