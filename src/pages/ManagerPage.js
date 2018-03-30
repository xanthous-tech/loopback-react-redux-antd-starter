import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Button } from 'antd';
import { withAuth } from '@okta/okta-react';

import '../css/ManagerPage.css';

import { getList } from '../ducks/task';

function mapStateToProps(state) {
  const { auth, task } = state;
  return {
    authenticated: auth.authenticated,
    user: auth.user,
    tasks: task.tasks || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTasks: () => dispatch(getList())
  };
}

class ManagerPage extends Component {
  constructor(props) {
    super(props);
    console.log('im in managerpage constructor')
  }
  componentDidMount() {
    const { getTasks } = this.props
    getTasks()
  }
  addTask() {
    window.location.href = '#/manager/task/add'
  }
  editTask(id) {
    return () => {
      window.location.href = `#/manager/task/${id}/edit`
    }
  }
  render() {
    const { logged_in, tasks } = this.props;
    const columns = [{
      title: 'task name',
      dataIndex: 'name',
      width: '25%',
      key: +new Date() + 'name',
    }, {
      title: 'description',
      dataIndex: 'des',
      width: '25%',
      key: +new Date() + 'des'
    }, {
      title: 'status',
      dataIndex: 'status',
      width: '25%',
      key: +new Date() + 'status',
      render: (text, data) => {
        const state = data.status
        if (state === 1) {
          return <div style={{color: 'blue'}}>done</div>
        } else if (state === 0) {
          return <div style={{color: 'green'}}>undo</div>
        } else {
          return 'unknown'
        }
      }
    }, {
      title: 'action',
      width: '25%',
      key: 'action',
      render: (text, data) => {
        return (<div>
          <Link to={{
            pathname: `/manager/task/${data.id}/edit`
          }}>edit</Link>
        </div>)
      }
    }]
    if (!this.props.authenticated) {
      return (<Redirect to="/login?redirectUrl=/manager" />)
    } else {
      return (
        <div className="manager">
          <Helmet>
            <title>{this.props.intl.formatMessage({
              id: 'manager.title'
            })}</title>
          </Helmet>
          <div className="manager-page">
            <h3>
              <FormattedMessage id="manager.main.greatings" defaultMessage="Hello"></FormattedMessage> {this.props.user.given_name} ,
            </h3>
            <Button
              type="primary"
              onClick={() => this.addTask()}>add Task</Button>
            <div className="task-list">
              <Table dataSource={tasks} columns={columns} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ManagerPage))));
