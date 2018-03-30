import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString  from 'query-string';

import RegisterForm from '../components/RegisterForm';

import '../css/RegisterForm.css';

function mapStateToProps(state) {
  return {
    register_status: state.auth.register_status
  }
}

class LoginPage extends Component {
  render() {
    return (
      <div className="register-form">
        <h3>Register Here.</h3>
        <RegisterForm className="register-form" />
        <p> Or <Link to="/">to Login! </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));
