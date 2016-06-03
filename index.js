var log = require('./src/logger'),
    api = require('./src/api'),
    settings = require('./src/settings');
    
setting.load(start);

function start() {
  var server = api();

  server.listen(process.env.PORT, process.env.IP, function () {
    log.info('Server ready at %s:%d', process.env.IP || '0.0.0.0', process.env.PORT);
  });
}