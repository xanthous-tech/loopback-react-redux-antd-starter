import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString  from 'query-string';

import RegisterForm from '../components/RegisterForm';

import '../css/RegisterForm.css';

function mapStateToProps(state) {
  return {
    register_status: state.login.register_status
  }
}

class LoginPage extends Component {
  render() {
    const redirectTo = queryString.parse(this.props.location.search).redirectUrl || '/'
    return this.props.register_status ? (<Redirect to={redirectTo} />) : (
      <div className="register-form">
        <h3>Register Here.</h3>
        <RegisterForm className="register-form" />
        <p> Or <Link to={{
          pathname: 'login',
          search: `?redirectUrl=${redirectTo}`
        }}>to Login! </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));
