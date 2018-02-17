import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { injectIntl, FormattedMessage } from 'react-intl';

import '../css/ManagerPage.css';

function mapStateToProps(state) {
  const { login } = state;
  return {
    logged_in: login.logged_in
  };
}

class ManagerPage extends Component {
  constructor(props) {
    super(props);
    console.log('im in managerpage constructor')
  }
  render() {
    const { logged_in } = this.props;
    return (!logged_in) ? (<Redirect to={{pathname: '/login', search: '?redirectUrl=/manager' }}/>) : (
      <div className="manager">
          <Helmet>
            <title>{this.props.intl.formatMessage({
              id: 'manager.title'
            })}</title>
          </Helmet>
          <div className="manager-page"> 
            <h3><FormattedMessage id="manager.main.h3" defaultMessage="hehe"></FormattedMessage></h3>
          </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(injectIntl(ManagerPage)));
