import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Security, ImplicitCallback } from '@okta/okta-react';
import enUS from 'antd/lib/locale-provider/en_US';

// 国际化
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

import appLocale from './locales/en-US.js';
// import appLocale from './locales/zh-cn.js';

import configureStore, { history } from './store';

import NavigationBar from './components/NavigationBar';
import Footer from './pages/Footer';
import ManagerPage from './pages/ManagerPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';

import './css/App.css';

addLocaleData([...en, ...zh])

const store = configureStore({});

const config = {
  issuer: 'https://dev-859469.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaei5a0i314xQSJw0h7'
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <ConnectedRouter history={history} basename={process.env.PUBLIC_URL || '/'}>
              <Security issuer={config.issuer}
                client_id={config.client_id}
                redirect_uri={config.redirect_uri}>
                <Layout className="app-container">
                  <NavigationBar />
                  <Layout.Content>
                      <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/manager" exact component={ManagerPage} />
                        <Route path="/login" exact component={LoginPage} />
                        <Route path="/register" exact component={RegisterPage} />
                        <Route path="/manager/task/add" exact component={TaskPage} />
                        <Route path="/manager/task/:id/edit" exact component={TaskPage} />
                        <Route path='/implicit/callback' component={ImplicitCallback}/>
                      </Switch>
                  </Layout.Content>
                  <Footer />
                </Layout>
              </Security>
            </ConnectedRouter>
          </IntlProvider>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
