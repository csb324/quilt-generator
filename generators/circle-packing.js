var Canvas = require('canvas'),
    GIFEncoder = require('gifencoder'),
    path = require('path'),
    fs = require('fs'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  pack_circles: function(options, cb) {
    /* 
      Based on https://generativeartistry.com/tutorials/circle-packing/
    */

    var width = options.width || 1184,
        height = options.height || 506;
    
    if (options.animated === true){
      var encoder = new GIFEncoder(width, height),
          img_path = path.join(__dirname, '..', 'temp.gif'),
          remove_file = true;
      
      if (options.remove_file === false){
        remove_file = false;
      }
            
      encoder.createReadStream().pipe(fs.createWriteStream(img_path));
      
      encoder.start();
      encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
      encoder.setDelay(30);   // frame delay in milliseconds
      encoder.setQuality(10); // image quality, 10 is default.
      
    }

    console.log('packing circles...');

    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext("2d"),
        size = width;

    ctx.lineWidth = helpers.get_random_int(1,4);
    ctx.fillStyle = options.background || '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    var circles = [];
    var minRadius = 2;
    var maxRadius = 100;
    var totalCircles = 500;
    
    if (options.animated === true){
      // totalCircles = 250;
      totalCircles = 230;
    }    
    var createCircleAttempts = 500;

    function doesCircleHaveACollision(circle) {
      for(var i = 0; i < circles.length; i++) {
        var otherCircle = circles[i];
        var a = circle.radius + otherCircle.radius;
        var x = circle.x - otherCircle.x;
        var y = circle.y - otherCircle.y;

        if (a >= Math.sqrt((x*x) + (y*y))) {
          return true;
        }
      }

      if ( circle.x + circle.radius >= size ||
         circle.x - circle.radius <= 0 ) {
        return true;
      }

      if (circle.y + circle.radius >= size ||
          circle.y-circle.radius <= 0 ) {
        return true;
      }

      return false;
    }

    function createAndDrawCircle() {

      var newCircle;
      var circleSafeToDraw = false;
      for( var tries = 0; tries < createCircleAttempts; tries++) {
        newCircle = {
          x: Math.floor(Math.random() * size),
          y: Math.floor(Math.random() * size),
          radius: minRadius
        }

        if(doesCircleHaveACollision(newCircle)) {
          continue;
        } else {
          circleSafeToDraw = true;
          break;
        }
      }

      if(!circleSafeToDraw) {
        return;
      }

      for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
        newCircle.radius = radiusSize;
        if(doesCircleHaveACollision(newCircle)){
          newCircle.radius--
          break;
        } 
      }

      circles.push(newCircle);
      ctx.beginPath();
      ctx.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
      ctx.stroke(); 
    }



    for( var i = 0; i < totalCircles; i++ ) {  
      createAndDrawCircle();
      if (options.animated === true){
        encoder.addFrame(ctx);
      }
    }    

    if (options.animated === true){
      encoder.finish();
      console.log('gif finished...');

      helpers.load_image(`https://${process.env.PROJECT_DOMAIN}.glitch.me/gif`, function(err, img_data){
        if (remove_file){
          fs.unlink(img_path, function(err){
            if (!err){
              console.log(`image ${img_path} was deleted...`);
            }
          });
        }
        cb(null, img_data);
      });      

    }
    else{
      cb(null, canvas.toBuffer().toString('base64'));
    }
  }
}