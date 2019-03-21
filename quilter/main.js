var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js'),
    colors = require(__dirname + '/colors.js'),
    patterns = require(__dirname + '/patterns.js'),
    Square = require(__dirname + '/squares.js'),
    Quilt = require(__dirname + '/quilt.js');

  
module.exports = {
  generate: function(options, cb) {
    /* 
      Based on https://generativeartistry.com/tutorials/un-deux-trois/
    */
    
    var width = options.width || 1184,
        height = options.height || 506;
    var is_testing = options.test || false;
    
    var quilt = new Quilt(width, height, options.test);
    var canvas = quilt.run();
    
    cb(null, canvas.toBuffer().toString('base64'));
  }
}


