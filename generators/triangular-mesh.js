var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  make_triangles: function(width, height, colors, cb) {
    /* 
      Based on https://generativeartistry.com/tutorials/triangular-mesh/
    */
    console.log('making triangles...');
    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    var line, dot,
        odd = false, 
        lines = [],
        gap = width / helpers.get_random_int(5,12);

    for (var y = -2 * gap / 2; y <= 2 * height; y+= gap) {
      odd = !odd
      line = []
      for (var x = -2 * gap / 4; x <= 2 * width; x+= gap) {
        line.push({
          x: x + (Math.random()*.8 - .4) * gap  + (odd ? gap/2 : 0),
          y: y + (Math.random()*.8 - .4) * gap,
        })
      }
      lines.push(line)
    }

    function drawTriangle(pointA, pointB, pointC) {
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.lineTo(pointC.x, pointC.y);
      ctx.lineTo(pointA.x, pointA.y);
      ctx.closePath();
      var gray = Math.floor(Math.random()*16).toString(16);
      ctx.fillStyle = '#' + helpers.random_from_array(colors); 
      ctx.fill();
      ctx.stroke();
    }

    var dotLine;
    odd = true;

    for (var y = 0; y < lines.length - 1; y++) {
      odd = !odd
      dotLine = []
      for (var i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i]   : lines[y+1][i])
        dotLine.push(odd ? lines[y+1][i] : lines[y][i])
      }
      for (var i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2])
      }
    }


    cb(null, canvas.toBuffer().toString('base64'));
  }
}