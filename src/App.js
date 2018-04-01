import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import enUS from 'antd/lib/locale-provider/en_US';

// 国际化
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

import appLocale from './locales/en-US.js';
// import appLocale from './locales/zh-cn.js';

import configureStore, { history } from './store';

import NavigationBar from './pages/NavigationBar';
import Footer from './pages/Footer';
import ManagerPage from './pages/ManagerPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';

import './css/App.css';

addLocaleData([...en, ...zh])

const store = configureStore({});

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <ConnectedRouter history={history} basename={process.env.PUBLIC_URL || '/'}>
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
                  </Switch>
                </Layout.Content>
                <Footer />
              </Layout>
            </ConnectedRouter>
          </IntlProvider>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
