import axios from 'axios';

import { url } from '../utils/ajax';

import CONSTANT from '../constant';

export function reducer(previous_state = {
    add_task: false,
    tasks: []
}, action) {
  switch (action.type) {
    case CONSTANT.TASK_ADD_SUCCESS:
      return Object.assign({}, previous_state, {
      });
    case CONSTANT.TASK_ADD_ERROR:
      return Object.assign({}, previous_state, {
      });
    case CONSTANT.TASK_COMPLETE_SUCCESS:
      return Object.assign({}, previous_state, {
      });
    case CONSTANT.TASK_COMPLETE_ERROR: 
      return Object.assign({}, previous_state, {
      });
    case CONSTANT.TASK_GET_LIST_SUCCESS:
      return Object.assign({}, previous_state, {
        tasks: action.list
      });
    case CONSTANT.TASK_GET_LIST_ERROR:
      return Object.assign({}, previous_state, {
      });
    default:
      return previous_state;
  }
}

export function addTask(info) {
  return function(dispatch) {
    return axios.post(url('/Tasks'), info).then(response => {
      return dispatch({
        type: CONSTANT.TASK_ADD_SUCCESS,
        tasks: response.data
      });
    }).catch(error => {
      console.error(error);
      return dispatch({
        type: CONSTANT.TASK_ADD_ERROR, 
        error
      });
    });
  };
}
export function completeTask(info) {
  return function(dispatch) {
    return axios.put(url('/Tasks'), info).then(response => {
      return dispatch({
        type: CONSTANT.TASK_COMPLETE_SUCCESS,
      })
    }).catch(error => {
      return dispatch({
        type: CONSTANT.TASK_COMPLETE_ERROR,
        error,
      })
    })
  }
}
export function getList() {
  return function(dispatch) {
    return axios.get(url('/Tasks')).then(response => {
      return dispatch({
        type: CONSTANT.TASK_GET_LIST_SUCCESS,
        list: response.data
      });
    }).catch(error => {
      return dispatch({
        type: CONSTANT.TASK_GET_LIST_ERROR,
        error,
      })
    })
  }
}