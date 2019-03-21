var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  generate: function(width, height, cb) {
    /* 
      Based on http://generativeartistry.com/tutorials/joy-division/
    */
    console.log('making waves...');
    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d");

    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 2;

    var step = 10;
    var lines = [];

    // Create the lines
    for( var i = step; i <= height - step; i += step) {

      var line = [];
      for( var j = step; j <= height - step; j+= step ) {
        var distanceToCenter = Math.abs(j - height / 2);
        var variance = Math.max(height / 2 - 50 - distanceToCenter, 0);
        var random = Math.random() * variance / 2 * -1;
        var point = {x: j+width/2-height/2, y: i + random};
        line.push(point)
      } 
      lines.push(line);
    }

    // Do the drawing
    for(var i = 0; i < lines.length; i++) {

      ctx.beginPath();
      ctx.moveTo(lines[i][0].x, lines[i][0].y)
      for( var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
      }

      ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
      ctx.fill();

      ctx.stroke();
    }


    cb(null, canvas.toBuffer().toString('base64'));
  }
}