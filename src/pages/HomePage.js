import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { FormattedMessage } from 'react-intl';

import '../css/HomePage.css';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
          <Helmet>
            <title>Home page...</title>
          </Helmet>
          <div className="home-page"> 
            <h3><FormattedMessage id="home.main.h3" defaultMessage="hehe"></FormattedMessage></h3>
            <h4><FormattedMessage id="home.main.h5" defaultMessage="hehe h5"></FormattedMessage></h4>
            <NavLink to={{
              pathname: '/manager'
            }} >
            <FormattedMessage id="home.main.tomanager"></FormattedMessage>
            </NavLink>
          </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
