import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { NavLink, withRouter } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

import { setAuth, setUser } from '../ducks/auth';

import '../css/NavigationBar.css';

import logoImg from '../images/logo.png';

const { Header } = Layout;

function mapStateToProps(state) {
  const { auth } = state;
  return {
    authenticated: auth.authenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuth: (authenticated) => dispatch(setAuth(authenticated)),
    setUser: (user) => dispatch(setUser(user))
  };
}

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.props.setAuth(authenticated)
      this.setState({
        authenticated: authenticated
      })
      if (authenticated) {
        this.props.auth.getUser().then(user => this.props.setUser(user))
      }
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    const toRedirect = (this.props.location.pathname !== '/') ? this.props.location.pathname : false;
    this.props.history.push(`/login${(toRedirect) ? `?redirectUrl=${toRedirect}` : ''}`)
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  render () {
    return (
      <Header className="page-header">
        <div className="header-content">
          <div>
            <Link to="/" className="logo">
              <img src={logoImg} alt="brand logo" />
            </Link>
          </div>
          <div className="brands">
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesome
                name='facebook'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesome
                name='twitter'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
            </a>
          </div>
          <Button href="mailto:">
            <FormattedMessage id="pageindex.navigator.contact" defaultMessage="Contact Us"></FormattedMessage>
          </Button>
          {
            (this.props.authenticated)
              ? <Button onClick={this.logout}>Logout</Button>
              : <Button onClick={this.login}>Login</Button>
          }
        </div>
      </Header>
    );
  }
}

export default withRouter(withAuth(connect(mapStateToProps, mapDispatchToProps)(NavigationBar)));
