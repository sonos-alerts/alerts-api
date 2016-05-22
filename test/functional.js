var assert = require('assert'),
    url = require('url'),
    log = require('../src/logger'),
    api = require('../src/api'),
    request = require('request'),
    nock = require('nock');

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

    server = api('Dev');
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
  
  describe('Datadog Alert Push Event', function () {
    var response;
    var sonos;

    before(function (done) {   
      sonos = nock('http://localhost:5010')
              .get('/Dev/say/website%20down')
              .reply(200);
      
      request.post({
        url: urlFull,
        body: "",
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (err, res, body) {
        if (err) throw err;
        response = res;
        done();
      });
    });

    it('should respond with 200 OK', function () {
      assert.strictEqual(response.statusCode, 200);
    });
    
    it('should say website down on sonos', function () {
      assert.strictEqual(sonos.isDone(), true);
    });
  });
});