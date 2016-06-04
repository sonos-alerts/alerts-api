var assert = require('assert'),
    url = require('url'),
    log = require('../src/logger'),
    api = require('../src/api'),
    request = require('request'),
    nock = require('nock'),
    randomString = require('random-string'),
    randomInteger = require('random-integer');

describe('Functional Tests', function () {
  var urlBase;
  var urlPath;
  var urlFull;
  var server;
  var sonosGroup;
  var sonosUrl;
  
  before(function (done) {
    sonosUrl = process.env.SONOSURL = 'http://localhost:' + randomInteger(3000,10000);
    sonosGroup = process.env.SONOSGROUP = randomString();
    
    var port = process.env.PORT = randomInteger(3000,10000);    
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
  
  describe('Datadog Alert Push Event', function () {
    var response;
    var sonos;

    before(function (done) {   
      sonos = nock(sonosUrl)
              .get('/' + sonosGroup + '/say/website%20down')
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