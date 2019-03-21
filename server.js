
var express = require('express'),
    fs = require('fs'),
    app = express(),
    helpers = require(__dirname + '/helpers.js'),
    commentary = require(__dirname + '/quilter/commentary.js'),

    ///// * Choose one of these * \\\\\\\
    // I commented out twitter before I got my API stuff set up 
    
    twitter = require(__dirname + '/twitter.js'),
    // twitter = false,

    // and here you're going to want to include whatever generators you're using!
    generators = {
      quilt: require(__dirname + '/quilter/main.js')
    };

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

function post_image_to_twitter(err, img_data, res) {
  // anddd this is only conditional so it doesn't flip out 
  // if you removed twitter temporarily like i did

  if (twitter) {
    twitter.post_image(commentary(), img_data, function(err){
        if (!err){
          console.log('tweet posted!');
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(200);
  }
}


function return_image_as_base64(err, img_data, res) {
    res.send({
      img: img_data.toString(),
      commentary: commentary()
    });
}

function return_image_as_base_64_with_response(res) {
  return function(err, img_data) {
    return_image_as_base64(err, img_data, res);
  }
}

function post_image_to_twitter_with_response(res) {
  return function(err, imgData) {
    return post_image_to_twitter(err, imgData, res);
  }
}

// THIS IS WHERE YOU ACTUALLY CALL THE GENERATOR! //
function make_image(callback, is_testing) {
  generators.quilt.generate({
    width: 500,
    height: 500,
    test: is_testing
  }, callback);
}

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {
  console.log("received a request...");
  make_image(post_image_to_twitter_with_response(res), false);
});

app.all('/show-quilt', function (req, res) {
  console.log("received a request...");
  make_image(return_image_as_base_64_with_response(res), false);
});

app.all('/show-test-quilt', function (req, res) {
  console.log("received a test request...");
  make_image(return_image_as_base_64_with_response(res), true);
});


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your app is listening on port ${listener.address().port}`);
});
