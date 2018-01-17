'use strict';

const Promise = require('bluebird');
const debug = require('debug')('server-main:boot:acl');

module.exports = function acl(app) {
  const Role = app.models.Role;
  const ACL = app.models.ACL;

  return Promise.all([
    Role.findOrCreate({
      where: {
        name: 'admin',
      },
    }, {
      name: 'admin',
    }),
  ]);
};
