if ( !process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET || !process.env.ACCESS_TOKEN || !process.env.ACCESS_TOKEN_SECRET ){
  console.log('update your .env file');
  process.exit();
}

var helpers = require(__dirname + '/helpers.js'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    Twit = require('twit'),
    T = new Twit(config.twitter);

module.exports = {
  post_image: function(text, image_base64, cb) {
   T.post('media/upload', { media_data: image_base64 }, function (err, data, response) {
      if (err){
        console.log('ERROR:\n', err);
        if (cb){
          cb(err);
        }
      }
      else{
        console.log('tweeting the image...');
        T.post('statuses/update', {
          status: text,
          media_ids: new Array(data.media_id_string)
        },
        function(err, data, response) {
          if (err){
            console.log('ERROR:\n', err);
            if (cb){
              cb(err);
            }
          }
          else{
            if (cb){
              cb(null);
            }
          }
        });
      }
    });
  }
};
