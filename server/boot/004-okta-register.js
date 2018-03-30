'use strict';

const Promise = require('bluebird');
const debug = require('debug')('server-main:boot:okta-register');
const axios = require('axios');

module.exports = function oktaRegister(app) {
  app.post('/api/okta-register', function(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    return axios.post('https://dev-859469.oktapreview.com/api/v1/users?activate=true', {
      profile: {
        firstName,
        lastName,
        email,
        login: email
      },
      credentials: {
        password
      }
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "SSWS 001yIYNv2vqDfEViRiI0vfVoCtReuGzEKl3fe2zAHS"
      }
    }).then(function(response) {
      debug(response.data);
      res.send(response.data);
    }).catch(function(error) {
      next(error);
    });
  });
};
