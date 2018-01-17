'use strict';

module.exports = {
  db: {
    url: process.env.MONGODB_URI,
    connector: 'mongodb',
  },
  memory: {
    name: 'memory',
    connector: 'memory',
  },
};
