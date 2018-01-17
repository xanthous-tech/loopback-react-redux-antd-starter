import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import '../css/NavigationBar.css';

import logoImg from '../images/logo.png';

const { Header } = Layout;

class NavigationBar extends Component {

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
          <Button href="mailto:"><FormattedMessage id="pageindex.navigator.contact" defaultMessage="Contact Us"></FormattedMessage></Button>
        </div>
      </Header>
    );
  }
}

export default (NavigationBar);
