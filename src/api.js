var express = require('express'),
    http = require('http'),
    log = require('./logger');

module.exports = function (sonosGroup) {
  var app = express();
  app.use(log.middleware());

  var server = http.Server(app);
  
  app.use('/alert', function (req, res, next) {
    res.status(200).send();
    http.get('http://localhost:5010/' + sonosGroup + '/say/website%20down');
  });

  app.use(function (req, res, next) {
    res.status(404).send('Not Found');
  });

  app.use(function (error, req, res, next) {
    log.error(error);
    res.status(500).send('Internal Server Error');
  });

  return server;
};