var assert = require('assert'),
    url = require('url'),
    request = require('request'),
    nock = require('nock'),
    path = require('path'),
    log = require('../src/logger'),
    api = require('../src/api'),
    settings = require('../src/settings'),
    file = require('./helpers/file');

describe('Functional Tests', function () {
  var urlBase;
  var urlFull;
  var server;
  var configDestination;
  
  before(function (done) {
    var port = '1234';    
    urlBase = 'http://127.0.0.1:' + port;
    urlFull = url.resolve(urlBase, '/alert');

    log.console.disable();
    
    configDestination = path.join(process.cwd(), 'config.json');
    
    file.copy('./test/samples/config.json', configDestination, startApi);
    
    function startApi() {
      settings.load(function() {
        server = api();
        server.listen(port, done)
      });
    }
  });

  after(function (done) {
    server.close(function () {
      file.delete(configDestination, done);
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
      sonos = nock('http://localhost:4567')
              .get('/testgroup/say/website%20down')
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