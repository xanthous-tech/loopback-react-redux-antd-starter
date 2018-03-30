import axios from 'axios';

import { url } from '../utils/ajax';

import CONSTANT from '../constant';

export function reducer(previous_state = {
  logged_in: !!sessionStorage.getItem('access_token'),
  access_token: JSON.parse(sessionStorage.getItem('access_token') || 'null'),
  register_status: false,
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
    case CONSTANT.REGISTER_SUCCESS:
      return Object.assign({}, previous_state, {
        register_status: true
      });
    case CONSTANT.REGISTER_ERROR: 
      return Object.assign({}, previous_state, {
        register_status: false
      })
    default:
      return previous_state;
  }
}


export function login(credentials) {
  return function(dispatch) {
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
export function register(info) {
  return function(dispatch) {
    return axios.post(url('/okta-register'), info).then(response => {
      return dispatch({
        type: CONSTANT.REGISTER_SUCCESS,
      })
    }).catch(error => {
      return dispatch({
        type: CONSTANT.REGISTER_ERROR,
        error,
      })
    });
  }
}