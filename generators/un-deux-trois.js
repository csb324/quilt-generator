var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  generate: function(options, cb) {
    /* 
      Based on https://generativeartistry.com/tutorials/un-deux-trois/
    */
    
    var width = options.width || 1184,
        height = options.height || 506;

    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d"),
        size = width;

    ctx.lineWidth = helpers.get_random_int(1,4);

    // Set up the background 
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    

    var step = helpers.get_random_int(15,25);
    var aThirdOfHeight = height/3;

    function draw(x, y, width, height, positions) {
      ctx.save();
      ctx.translate(x + width/2, y + height/2)
      ctx.rotate(Math.random() * 5);
      ctx.translate(-width/2, -height/2)

      for(var i = 0; i <= positions.length; i++) {
        ctx.beginPath();
        ctx.moveTo(positions[i] * width, 0);
        ctx.lineTo(positions[i] * width, height);
        ctx.stroke();
      }

      ctx.restore();
    }

    for( var y = step; y < width - step; y += step) {
      for( var x = step; x < width - step; x+= step ) {
        if( y < aThirdOfHeight) {
          draw(x, y, step, step, [0.5]);   
        } else if ( y < aThirdOfHeight * 2) {
          draw(x, y, step, step, [0.2, 0.8]);      
        } else {
          draw(x, y, step, step, [0.1, 0.5, 0.9]);      
        }
      }
    }

    cb(null, canvas.toBuffer().toString('base64'));
  }
}