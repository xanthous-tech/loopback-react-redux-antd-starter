'use strict';

const path = require('path');

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/ping', server.loopback.status());
  server.use(router);
};
