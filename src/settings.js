var jsonFile = require('json-file-plus'),
    path = require('path');

var filename = path.join(process.cwd(), 'config.json');

module.exports.load = function (done) {  
  jsonFile(filename, function (err, file) {
    if (err) {      
      process.env.PORT = 3000;
      process.env.IP = null;
      
      return done(); 
    }
  
    file.get().then(function(data){
      process.env.SONOSURL = data.sonosUrl;
      process.env.SONOSGROUP = data.sonosGroup;
      process.env.PORT = data.port;
      process.env.IP = data.ip;
      
      done();
    });
  });
};