'use strict';

var expressListRoutes = require('express-list-routes');
var express = require('express');
var router = express.Router();


module.exports = function (app) {

  app.use("", router);

  // Set Routes
  require('./auth')( router);
  require('./users')( router);
  require('./template')( router);
  require('./project')( router);

  expressListRoutes(router)
};
