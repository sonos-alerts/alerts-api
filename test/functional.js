var assert = require('assert'),
    url = require('url'),
    log = require('../src/logger'),
    api = require('../src/api'),
    request = require('request');

describe('Functional Tests', function () {
  var urlBase;
  var urlPath;
  var urlFull;
  var server;
  
  before(function (done) {
    var port = process.env.PORT || 3000;
    
    urlBase = 'http://127.0.0.1:' + port;
    urlPath = '/alert';
    urlFull = url.resolve(urlBase, urlPath);

    log.console.disable();

    server = api();
    server.listen(port, done);
  });

  after(function (done) {
    server.close(function () {
      done();
    });
  });
  
  describe('Get on root', function () {
    var response;

    before(function (done) {
      request.get({
        url: urlBase
      }, function (err, res, body) {
        if (err) throw err;
        response = res;
        done();
      });
    });

    it('should respond with 404 not found', function () {
      assert.strictEqual(response.statusCode, 404);
    });
  });
});