var fs = require('fs'),
    Canvas = require('canvas'),
    GIFEncoder = require('gifencoder'),
    glitch = require('../node_modules/glitch-canvas/dist/glitch-canvas-node.js'),
    path = require('path'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  generate_gif: function(width, height, cb){
    console.log('generating gif...');

    var encoder = new GIFEncoder(320, 240);
    var img_path = path.join(__dirname, '..', 'temp.gif');

    encoder.createReadStream().pipe(fs.createWriteStream(img_path));

    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(100);  // frame delay in milliseconds
    encoder.setQuality(10); // image quality, 10 is default.

    var canvas = Canvas.createCanvas(320, 240);
    var ctx = canvas.getContext('2d');
    
    var color = helpers.get_random_hex();
    
    for (var i = 0; i < 20; i++){
      color = helpers.shade_color(color, i * 0.05);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 320, 240);
      encoder.addFrame(ctx);
    }

    encoder.finish();
    console.log('gif finished...');
    
    /* TODO: For some reason this doesn't work and we need to download the image again...  */
    // var b64content = fs.readFileSync(__dirname + '/temp.gif', { encoding: 'base64' });
    // cb(null, b64content);

    helpers.load_image(`https://${process.env.PROJECT_DOMAIN}.glitch.me/gif`, function(err, img_data){
      fs.unlink(img_path, function(err){
        if (!err){
          console.log(`image ${img_path} was deleted...`);
        }
      });      
      cb(null, img_data);
    });    
  }
}