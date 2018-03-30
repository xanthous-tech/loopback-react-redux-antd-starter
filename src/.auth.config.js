export default {
  oidc: {
    clientId: '0oaei5a0i314xQSJw0h7',
    issuer: 'https://dev-859469.oktapreview.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
