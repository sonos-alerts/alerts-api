var fs = require('fs');
    
module.exports.copy = function (source, target, callback) {
  var finished = false;

  var readStream = fs.createReadStream(source);
  readStream.on("error", function(error) {
    done(error);
  });
  
  var writeStream = fs.createWriteStream(target);
  writeStream.on("error", function(error) {
    done(error);
  });
  writeStream.on("close", function(ex) {
    done();
  });
  
  readStream.pipe(writeStream);

  function done(error) {
    if (!finished) {
      if (error) { 
        console.log('unable to copy file'); 
      }
      
      finished = true;
      callback();
    }
  }
};

module.exports.delete = function (path, callback) {
  fs.unlink(path, function (error) {
    if(error) { 
      console.log('unable to delete file'); 
    }
    
    callback();
  });
};