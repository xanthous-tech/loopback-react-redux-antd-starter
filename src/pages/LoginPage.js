import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString  from 'query-string';

import LoginForm from '../components/LoginForm';

import '../css/LoginForm.css';

function mapStateToProps(state) {
  return {
    logged_in: state.login.logged_in
  }
}

class LoginPage extends Component {
  render() {
    const redirectTo = queryString.parse(this.props.location.search).redirectUrl || '/'
    return this.props.logged_in ? (<Redirect to={redirectTo} />) : (
      <div className="login-form">
        <h3>Please Log in</h3>
        <LoginForm className="login-form" />
        <p>Or <Link to={{
          pathname: 'register',
          search: `?redirectUrl=${redirectTo}`
        }}>register now!</Link></p>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));
