import React, { Component } from 'react';
import { Layout } from 'antd';
import { FormattedMessage } from 'react-intl';

import '../css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <Layout.Footer className="footer">
        <p className="foot-note"><FormattedMessage id="pageindex.copyright" defaultMessage="Copyright"></FormattedMessage></p>
      </Layout.Footer>
    );
  }
}

export default Footer;
