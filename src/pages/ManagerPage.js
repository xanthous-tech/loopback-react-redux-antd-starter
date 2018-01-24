import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table } from 'antd';

import '../css/ManagerPage.css';

import { getList } from '../ducks/task';

function mapStateToProps(state) {
  const { login, task } = state;
  return {
    logged_in: login.logged_in,
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
  render() {
    const { logged_in, tasks } = this.props;
    const columns = [{
      title: 'task name',
      dataIndex: 'name',
      key: +new Date() + 'name',
    }, {
      title: 'description',
      dataIndex: 'des',
      key: +new Date() + 'des'
    }, {
      title: 'status',
      dataIndex: 'status',
      key: +new Date() + 'status',
    }]
    return (!logged_in) ? (<Redirect to={{pathname: '/login', search: '?redirectUrl=/manager' }}/>) : (
      <div className="manager">
          <Helmet>
            <title>{this.props.intl.formatMessage({
              id: 'manager.title'
            })}</title>
          </Helmet>
        <div className="manager-page"> 
          <h3><FormattedMessage id="manager.main.h3" defaultMessage="hehe"></FormattedMessage></h3>
          <div className="task-list">
            <Table dataSource={tasks} columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ManagerPage)));
