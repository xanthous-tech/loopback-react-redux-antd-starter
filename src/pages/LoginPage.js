import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import queryString  from 'query-string';

import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

import '../css/LoginForm.css';
import config from '../.auth.config'
import logoImg from '../images/logo.png';

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: config.oidc.issuer.split('/oauth2')[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      logo: logoImg,
      i18n: {
        en: {
          'primary.auth.title': 'Sign in to React & Company',
        },
      },
      authParams: {
        responseType: ['id_token', 'token'],
        issuer: config.oidc.issuer,
        display: 'page',
        scopes: config.oidc.scope.split(' '),
      },
    });
  }
  componentDidMount() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err;
      },
    );
  }
  componentWillUnmount() {
    this.signIn.remove()
  }
  render() {
    const redirectTo = queryString.parse(this.props.location.search).redirectUrl || '/'
    return this.props.authenticated ? (<Redirect to={redirectTo} />) : (
      <div className="login-form">
        <div id="sign-in-widget" />
        <p>Or <Link to={{
          pathname: 'register',
          search: `?redirectUrl=${redirectTo}`
        }}>register now!</Link></p>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));
