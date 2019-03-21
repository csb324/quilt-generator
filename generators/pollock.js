var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js');

module.exports = {
  paint: function(width, height, cb) {
    console.log('making art...');

    var palette = [
      '#D89CA9',
      '#1962A0',
      '#F1ECD7',
      '#E8C051',
      '#1A1C23'
    ];

    var color = helpers.random_from_array(palette);

    var canvas = Canvas.createCanvas(width, height),
        ctx = canvas.getContext('2d');


    ctx.strokeStyle = color;
    // ctx.fillStyle = '#fff';
    ctx.fillStyle = helpers.shade_color(color, 0.95);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var start_position = {
        x: helpers.get_random_int(0, width),
        y: helpers.get_random_int(0, height)
    },
    end_position = {
        x: helpers.get_random_int(0, width),
        y: helpers.get_random_int(0, height)
    };

    ctx.lineCap='round';
    ctx.lineJoin='round';

    function make_splat(start, end, size){
      var center = {
        x: helpers.get_random_int(start.x, end.x),
        y: helpers.get_random_int(start.y, end.y)
      },
      splat_count = helpers.get_random_int(1, 10);

      for (var i = 0; i <= splat_count; i++){
        ctx.beginPath();
        ctx.arc(
          center.x + helpers.get_random_int(0, 4),
          center.y + helpers.get_random_int(0, 4),
          helpers.get_random_int(0, 4),
          0,
          2*Math.PI);
        ctx.fill();        
      }
    }

    function make_line(start, end, size){
        if (!size){
            var speed = helpers.get_random_int(0, 100);

            if (speed < 2 ){
                size = helpers.get_random_int(8,12);
            }
            else if (speed < 4 ){
                size = helpers.get_random_int(6,7);
            }
            else if (speed < 7){
                size = helpers.get_random_int(4,5);
            }
            else if (speed < 10){
                size = helpers.get_random_int(1,3);
            }
            else{
                size = 1;
            }
        };

        ctx.strokeStyle = helpers.shade_color(color, helpers.get_random_int(99, 100));
        ctx.lineWidth = size;

        ctx.moveTo(start_position.x, start_position.y);

        if (helpers.get_random_int(0, 10) === 1){
            ctx.lineTo(end_position.x, end_position.y);
        }
        else{
            ctx.bezierCurveTo(start_position.x, start_position.y,
                              helpers.get_random_int(start_position.x, end_position.x),
                              helpers.get_random_int(start_position.y, end_position.y),
                              end_position.x, end_position.y);

        }
        ctx.stroke();
        make_splat(start_position, end_position);

    }

    var number_of_lines = helpers.get_random_int(20, 40);

    for (var i = 0; i <= number_of_lines; i++){
        make_line(start_position.x, start_position.y);

        start_position.x = end_position.x;
        start_position.y = end_position.y;
        end_position = {
            x: helpers.get_random_int(0, width),
            y: helpers.get_random_int(0, height)
        };        
    }

    cb(null, canvas.toBuffer().toString('base64'));
  }
}