'use strict';

const Promise = require('bluebird');
const debug = require('debug')('server-main:boot:create-admin');

module.exports = function createAdmin(app) {
  const User = app.models.User;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;

  User.findOrCreate({
    email: 'admin@amzn.com',
  }, {
    username: 'admin',
    email: 'admin@amzn.com',
    password: 'admin123',
  }).then(adminResult => {
    const [admin, adminCreated] = adminResult;

    if (adminCreated) {
      debug('default admin created');
    }

    return Promise.all([
      admin,
      Role.findOrCreate({
        where: {
          name: 'admin',
        },
      }, {
        name: 'admin',
      }),
    ]);
  }).spread((admin, roleResult) => {
    const [role, roleCreated] = roleResult;

    return Promise.all([
      admin,
      role,
      role.principals.findOne({
        principalType: RoleMapping.USER,
        principalId: admin.id,
      }),
    ]);
  }).spread((admin, role, principal) => {
    if (!principal) {
      debug('linking new admin account to admin role');
      return role.principals.create({
        principalType: RoleMapping.USER,
        principalId: admin.id,
      });
    }
  }).catch(err => {
    debug(err);
  });
};
