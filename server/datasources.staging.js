'use strict';

module.exports = {
  db: {
    port: 29549,
    user: "db",
    password: 'sohardpassword',
    database: "toko-test",
    connector: 'mongodb',
    host: "ds229549.mlab.com",
    name: "db",
  },
  memory: {
    name: 'memory',
    connector: 'memory',
  },
};
