var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  make_cubes: function(width, height, cb) {
    /* 
      Based on http://generativeartistry.com/tutorials/cubic-disarray/
    */
    console.log('making cubes...');
    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d");

    ctx.lineWidth = helpers.get_random_int(1,4);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var size = height;
    var squareSize = 40;
    var randomDisplacement = 15;
    var rotateMultiplier = 20;

    function draw(width, height) {
      ctx.beginPath();
      ctx.rect(-width/2, -height/2, width, height);
      ctx.stroke(); 
    }

    for( var i = squareSize; i <= width - squareSize; i += squareSize) {
      for( var j = squareSize; j <= height - squareSize; j+= squareSize ) {
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        var rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        var translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;

        ctx.save();
        ctx.translate( i + translateAmt, j)
        ctx.rotate(rotateAmt);
        draw(squareSize, squareSize);
        ctx.restore();
      }
    }

    cb(null, canvas.toBuffer().toString('base64'));
  }
}