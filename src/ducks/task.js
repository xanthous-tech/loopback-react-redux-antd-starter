import axios from 'axios';

import { url } from '../utils/ajax';

import CONSTANT from '../constant';

export function reducer(previous_state = {
    add_task: false,
    modify_task: false,
    tasks: [],
    current_task: {}
}, action) {
  switch (action.type) {
    case CONSTANT.TASK_INIT_STATE:
      return Object.assign({}, previous_state, {
        add_task: false,
        modify_task: false,
      });
    case CONSTANT.TASK_ADD_SUCCESS:
      return Object.assign({}, previous_state, {
        add_task: true,
      });
    case CONSTANT.TASK_ADD_ERROR:
      return Object.assign({}, previous_state, {
        add_task: false,
      });
    case CONSTANT.TASK_MODIFY_SUCCESS:
      return Object.assign({}, previous_state, {
        modify_task: true,
      });
    case CONSTANT.TASK_MODIFY_ERROR: 
      return Object.assign({}, previous_state, {
        modify_task: false,
      });
    case CONSTANT.TASK_GET_LIST_SUCCESS:
      return Object.assign({}, previous_state, {
        tasks: action.list,
        add_task: false,
        modify_task: false,
      });
    case CONSTANT.TASK_GET_LIST_ERROR:
      return Object.assign({}, previous_state, {
        tasks: [],   
        add_task: false,
        modify_task: false,     
      });
    case CONSTANT.TASK_GET_DETAIL_SUCCESS:
      return Object.assign({}, previous_state, {
        current_task: action.detail,
      });
    case CONSTANT.TASK_GET_DETAIL_ERROR:
      return Object.assign({}, previous_state, {
        current_task: {},
      });
    default:
      return previous_state;
  }
}
export function initTaskState() {
  return function (dispatch) {
    dispatch({
      type: CONSTANT.TASK_INIT_STATE
    })
  }
}
export function addTask(info) {
  return function(dispatch) {
    dispatch({
      type: CONSTANT.TASK_INIT_STATE
    })
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
export function editTask(info) {
  return function(dispatch) {
    dispatch({
      type: CONSTANT.TASK_INIT_STATE
    })
    return axios.put(url('/Tasks'), info).then(response => {
      return dispatch({
        type: CONSTANT.TASK_MODIFY_SUCCESS,
      })
    }).catch(error => {
      return dispatch({
        type: CONSTANT.TASK_MODIFY_ERROR,
        error,
      })
    })
  }
}
export function getTask(id) {
  return function(dispatch) {
    dispatch({
      type: CONSTANT.TASK_INIT_STATE
    })
    return axios.get(url(`/Tasks/${id}`)).then(response => {
      return dispatch({
        type: CONSTANT.TASK_GET_DETAIL_SUCCESS,
        detail: response.data
      });
    }).catch(error => {
      return dispatch({
        type: CONSTANT.TASK_GET_DETAIL_ERROR,
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