var express = require('express'),
    http = require('http'),
    url = require('url'),
    log = require('./logger');

module.exports = function () {
  var app = express();
  app.use(log.middleware());

  var server = http.Server(app);
  
  var sonosUrl = url.resolve(process.env.SONOSURL, process.env.SONOSGROUP + '/say/website%20down');
  
  app.use('/alert', function (req, res, next) {
    res.status(200).send();
    http.get(sonosUrl);
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