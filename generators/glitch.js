var fs = require('fs'),
    Canvas = require('canvas'),
    GIFEncoder = require('gifencoder'),
    glitch = require('../node_modules/glitch-canvas/dist/glitch-canvas-node.js'),
    path = require('path'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  glitch_image: function(img_url, width, height, cb){
    /* Apply a glitch effect to an image. */
    var img_path = path.join(__dirname, '..', helpers.get_filename_from_url(img_url));
       
    helpers.download_file(img_url, img_path , function(){
      console.log(`downloading to ${img_path}...`);

      fs.readFile(img_path, function ( err, buffer ) {
        if (err) {
          return false;
        }

        var canvas = Canvas.createCanvas(width, height),
          ctx = canvas.getContext("2d"),
          Image = Canvas.Image;

        var img = new Image;
            img.src = img_path;

        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

        var randomSeed = Math.round( Math.random() * 100 ),
            randomQuality = Math.round( Math.random() * 100 );

        glitch({ seed: randomSeed, quality: randomQuality })
          .fromBuffer( buffer )
          .toDataURL()
          .then ( function ( dataURL ) {
            console.log( 'fromBufferToDataURL complete. Length of dataURL:', dataURL.length );

            var glitchedImg = new Image();
              glitchedImg.src = dataURL;
              ctx.drawImage(glitchedImg, 0, 0, glitchedImg.width, glitchedImg.height, 0, 0, canvas.width, canvas.height);
              cb(null, canvas.toBuffer().toString('base64'));   

            }, function ( err ) {
              throw err;
        });
      });
    });
  },
  glitch_image_gif: function(img_url, width, height, frameCount, cb){
    /* Create a glitchy gif */
    
    function getRandomGlitchParams () {
      /*
        Note: some values can cause the script to crash ¯\_(ツ)_/¯
      */
      return {
        seed: helpers.get_random_int(0, 99), // orginally an integer between 0 and 99 - default 20
        quality: helpers.get_random_int(0, 99), // orginally an integer between 0 and 99 - default 30
        amount: helpers.get_random_int(0, 99), // orginally an integer between 0 and 99 - default 35
        iterations: 20 // orginally an integer - default 20
      };
    }
    
    function generateGlitchedImageData (frameCount, buffer) {
      var glitchPromses = [ ];

      for ( var i = 0; i < frameCount; ++i ) {
        glitchPromses[i] = glitch( getRandomGlitchParams() )
        .fromBuffer(buffer)
        .toDataURL();
      }

      return Promise.all(glitchPromses);
    }
    var img_path = path.join(__dirname, '..', helpers.get_filename_from_url(img_url));
       
    helpers.download_file(img_url, img_path , function(){
      console.log(`downloading to ${img_path}...`);

      fs.readFile(img_path, function ( err, buffer ) {
        if (err) {
          return false;
        }

        var canvas = Canvas.createCanvas(width, height),
          ctx = canvas.getContext("2d"),
          Image = Canvas.Image;

        var img = new Image;
            img.src = img_path;

        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

    
        generateGlitchedImageData(frameCount, buffer).then( function ( frames ) {

          console.log('creating gif...');

          var encoder = new GIFEncoder(width, height);
          var img_path = path.join(__dirname, '..', 'temp.gif');

          encoder.createReadStream().pipe(fs.createWriteStream(img_path));

          encoder.start();
          encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
          encoder.setDelay(100);  // frame delay in ms
          encoder.setQuality(10); // image quality. 10 is default.

          var canvas = Canvas.createCanvas(width, height);
          var ctx = canvas.getContext('2d');

          var color = helpers.get_random_hex();

          for (var i = 0, j = frames.length; i < j; i++){
            encoder.setDelay(helpers.get_random_int(10, 250));  // frame delay in ms

            var glitchedImg = new Image();
                glitchedImg.src = frames[i];
            
            ctx.drawImage(glitchedImg, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
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
        });   
      });
    });
  }
};
