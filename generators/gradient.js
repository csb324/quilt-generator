var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  make_gradient: function(width, height, cb) {
    /* 
      Random gradient generator. See more examples at https://github.com/Automattic/node-canvas/tree/master/examples.
    */
    console.log('making art...');
    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d");

    var lingrad = ctx.createLinearGradient(helpers.get_random_int(0, height), helpers.get_random_int(0, height), helpers.get_random_int(0, width), helpers.get_random_int(0, width))
    
    lingrad.addColorStop(0, helpers.get_random_hex());
    lingrad.addColorStop(0.5, helpers.get_random_hex());
    lingrad.addColorStop(1, helpers.get_random_hex());
    ctx.fillStyle = lingrad
    ctx.fillRect(0, 0, width, height)
    cb(null, canvas.toBuffer().toString('base64'));
  }
}