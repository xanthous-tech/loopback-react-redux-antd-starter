import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import enUS from 'antd/lib/locale-provider/en_US';

// 国际化
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

import appLocale from './locales/en-US.js';
// import appLocale from './locales/zh-cn.js';

import configureStore from './store';

import NavigationBar from './pages/NavigationBar';
import Footer from './pages/Footer';
import ManagerPage from './pages/ManagerPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import './css/App.css';

addLocaleData([...en, ...zh])

const store = configureStore({});

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL || '/'}>
          <LocaleProvider locale={enUS}>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
              <Layout className="app-container">
                <NavigationBar />
                <Layout.Content>
                  <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/manager" exact component={ManagerPage} />
                    <Route path="/login" exact component={LoginPage} />
                  </Switch>
                </Layout.Content>
                <Footer />
              </Layout>
            </IntlProvider>
          </LocaleProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
