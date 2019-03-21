var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  make_lines: function(width, height, cb) {
    /* 
      Based on http://generativeartistry.com/tutorials/tiled-lines/
    */
    console.log('making lines...');
    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d");

    ctx.lineWidth = helpers.get_random_int(1,4);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var step = 20;

    function draw(x, y, width, height) {
      var leftToRight = Math.random() >= 0.5;

      if( leftToRight ) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y + height);    
      } else {
        ctx.moveTo(x + width, y);
        ctx.lineTo(x, y + height);
      }

      ctx.stroke();
    }

    for( var x = 0; x < width; x += step) {
      for( var y = 0; y < height; y+= step ) {
        draw(x, y, step, step);    
      }
    }


    cb(null, canvas.toBuffer().toString('base64'));
  }
}