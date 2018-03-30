import axios from 'axios';
import {
  push
} from 'react-router-redux'
import { url } from '../utils/ajax';

import CONSTANT from '../constant';

export function reducer(previous_state = {
  authenticated: !!sessionStorage.getItem('okta-token-storage'),
  user: {},
  access_token: JSON.parse(sessionStorage.getItem('access_token') || 'null'),
  register_status: false,
}, action) {
  switch (action.type) {
    case OKTA_SET_AUTH:
      return Object.assign({}, previous_state, {
        authenticated: action.authenticated,
        access_token: action.access_token
      });
    case OKTA_SET_USER:
      return Object.assign({}, previous_state, {
        user: action.user
      });
    // case CONSTANT.LOGIN_SUCCESS:
    //   sessionStorage.setItem('access_token', JSON.stringify(action.access_token));
    //   return Object.assign({}, previous_state, {
    //     logged_in: true,
    //     access_token: action.access_token
    //   });
    // case CONSTANT.LOGIN_FAILED:
    //   return Object.assign({}, previous_state, {
    //     logged_in: false,
    //     access_token: undefined
    //   });
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

const OKTA_SET_AUTH = 'OKTA_SET_AUTH'
export function setAuth(authenticated) {
  return function(dispatch){
    return dispatch({
      type: OKTA_SET_AUTH,
      authenticated
    })
  }
}
const OKTA_SET_USER = 'OKTA_SET_USER'
export function setUser(user){
  return function(dispatch) {
    return dispatch({
      type: OKTA_SET_USER,
      user
    })
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
      dispatch(push('/login'))
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
