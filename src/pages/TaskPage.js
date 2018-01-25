import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString  from 'query-string';
import { Form, Input, Icon, Row, Col, Checkbox, Button, Switch } from 'antd';

import { getTask, addTask, editTask, initTaskState } from '../ducks/task';

import '../css/TaskPage.css';

function mapStateToProps(state) {
  return {
    logged_in: state.login.logged_in,
    task: state.task.current_task,
    modify_task: state.task.modify_task,
    add_task: state.task.add_task,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTask: (id) => dispatch(getTask(id)),
    addTask: (info) => dispatch(addTask(info)),
    editTask: (info) => dispatch(editTask(info)),
    initTaskState: () => dispatch(initTaskState())
  };
}

class TaskPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit.bind(this)
    this.state = {
      taskId: props.match.params.id 
    }
  }
  componentDidMount() {
    const id = this.state.taskId
    if (!!id) {
      this.props.getTask(id)
    }
    this.props.initTaskState()
  }
  handleSubmit = (e) => {
    const id = this.state.taskId
    e.preventDefault()
    this.props.form.validateFields((err, { name, des, status }) => {
      if (!err) {
        const info = {
          name,
          des,
          id,
          status: status ? 1 : 0
        }
        return !!id ? this.props.editTask(info) : this.props.addTask(info);
      }
    });
  }
  render() {
    const id = this.state.taskId
    const { task, modify_task, add_task } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const redirectTo = queryString.parse(this.props.location.search).redirectUrl || '/'
    if (modify_task || add_task) {
      return <Redirect to={{
        pathname: '/manager'
      }}></Redirect>
    }
    return (
      <Form onSubmit={this.handleSubmit} className="task-form">
        <Form.Item
          {...formItemLayout}
          label="name"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your task name!' }],
            initialValue: task.name
          })(
            <Input prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="name"  />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="describe"
        >
          {getFieldDecorator('des', {
            rules: [{ required: true, message: 'Please input task\'s describe!' }],
            initialValue: task.des
          })(
            <Input prefix={<Icon type="file-word" style={{ fontSize: 13 }} />} placeholder="description"  />
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="status"
        >
          {getFieldDecorator('status', { 
            valuePropName: 'checked',
            initialValue: !!task.status
          })(
            <Switch />
          )}
        </Form.Item>
        <Form.Item
        labelCol={{ span: 4 }}
        >
          <Button type="primary" htmlType="submit" className="task-form-button">
            {!!id ? 'edit' : 'add'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(TaskPage)));
