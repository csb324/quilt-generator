var Canvas = require('canvas'),
    helpers = require(__dirname + '/../helpers.js'),
    colors = require(__dirname + '/colors.js'),
    patterns = require(__dirname + '/patterns.js'),
    Square = require(__dirname + '/squares.js'),
    constants = require(__dirname + '/constants.js');


var lineColors = [
  function(color, colorScheme) {
    return helpers.shade_color(color, 0.2);
  },

  function(color, colorScheme) {
    return helpers.random_from_array(colorScheme);
  },

  function(color, colorScheme) {
    if (Math.random() > 0.5) {
      return helpers.random_from_array(colorScheme);
    } else {
      return helpers.shade_color(color, 0.2);
    }
  },
  function(color, colorScheme) {
    if (color == colorScheme[0]) {
      return helpers.random_from_array(colorScheme);
    } else {
      return colorScheme[0];
    }
  },
  function(color, colorScheme) {
    if (color == colorScheme[0]) {
      return helpers.shade_color(color, 0.4);
    } else {
      return colorScheme[0];
    }
  }
];


var all_padding = constants.allPadding;

class Quilt {
  constructor(width, height, test) {
    this.width = width;
    this.height = height;

    this.test = test;

    var stepsMin = Math.round(width / 20);
    var stepsMax = Math.round(width / 12);
    this.step = helpers.get_random_int(stepsMin, stepsMax);

    this.maxSteps = Math.floor(this.width / this.step) - 1;

    this.createCanvas();

    this.colors = helpers.random_from_array(colors());

    if(test) {
      this.pattern = patterns[patterns.length - 1];
    } else {
      this.pattern = helpers.random_from_array(patterns.slice(0, -1));
    }

    this.lineColors = helpers.random_from_array(lineColors);
  }

  createCanvas() {

    var canvasHeight = this.width + (all_padding * 2);
    var canvasWidth = this.height + (all_padding * 2);
    this.canvas = Canvas.createCanvas(canvasHeight, canvasWidth);
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, canvasHeight, canvasWidth);
    this.ctx.lineCap = 'round';
  }

  draw() {
    var starting = all_padding + (this.step / 2);
    var canvasRealCenterX = (this.width + all_padding)/2;
    var canvasRealCenterY = (this.height + all_padding)/2;

    if (!this.test) {
      this.ctx.translate(canvasRealCenterX, canvasRealCenterY);
      this.ctx.rotate(1.57 * helpers.get_random_int(1, 4));
      this.ctx.translate(-canvasRealCenterX, -canvasRealCenterY);
    }

    for (var y = 0; y <= this.maxSteps; y += 1) {
      for (var x = 0; x <= this.maxSteps; x += 1) {
        var square = new Square(x, y, this);
        square.draw();
      }
    }
  }

  run() {
    this.createCanvas();
    this.draw();
    return this.canvas;
  }
}

module.exports = Quilt;