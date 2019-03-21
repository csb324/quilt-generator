var helpers = require(__dirname + '/../helpers.js');
var constants = require(__dirname + '/constants.js');

function getColorFromRatio(current, largest, colors) {
  var ratio = Math.abs(current / largest);
  var ratio_to_scheme = Math.floor(colors.length * ratio);
  return elementFromPoint(ratio_to_scheme, colors);
}

function getColorOnCurve(current, largest, colors) {
  var ratio = (current * current) / (largest * largest);
  var ratio_to_scheme = Math.floor(colors.length * ratio);
  return elementFromPoint(ratio_to_scheme, colors);
}

function getColorOnReverseCurve(current, largest, colors) {
  var c = (largest - current);

  var ratio = (c * c) / (largest * largest);

  var ratio_to_scheme = Math.round(colors.length * ratio);

  return elementFromPoint(ratio_to_scheme, colors);
}

function elementFromPoint(index, array) {
  index = Math.max(Math.min(index, array.length - 1), 0);
  return array[index]
}




function randomFromScheme(options) {
  return helpers.random_from_array(options.colorScheme);
}

function random_but_only_first_two(options) {
  return helpers.random_from_array([options.colorScheme[0], options.colorScheme[1]]);
}

function cornerCircle(options) {
  var x = options.x;
  var y = options.y;
  var scheme = options.colorScheme;

  var maxSteps = options.quilt.maxSteps;

  var total = maxSteps * maxSteps;
  var current = x * y;
  return getColorFromRatio(current, total, scheme);
}

function diamond(options) {
  var x = options.x;
  var y = options.y;

  var center = options.quiltHeight / (options.step * 2);

  var dx = Math.abs(center - x);
  var dy = Math.abs(center - y);

  var scheme = options.colorScheme;

  var biggest = center * 2;
  var current = dx + dy;

  return getColorFromRatio(current, biggest, scheme);
}



function cross(options) {
  var x = options.x;
  var y = options.y;
  var center = Math.floor(options.quiltHeight / (options.step * 2));

  var dx = Math.abs(x - center);
  var dy = Math.abs(y - center);
  var scheme = options.colorScheme;

  var biggest = (center * center);
  var current = dx * dy * 3;
  return getColorFromRatio(current, biggest, scheme);
}

function majorX(options) {
  var x = options.x;
  var y = options.y;

  var center = options.quilt.maxSteps / 2;

  var dx = Math.abs(x - center);
  var dy = Math.abs(y - center);

  var scheme = options.colorScheme;

  var biggest = center;
  var current = Math.abs(dx - dy);
  return getColorFromRatio(current, biggest, scheme);
}

function circle(options) {
  var x = options.x * options.step;
  var y = options.y * options.step;
  var scheme = options.colorScheme;

  var centerX = options.quiltWidth / 2;
  var centerY = options.quiltHeight / 2;

  var dx = Math.abs(x - centerX);
  var dy = Math.abs(y - centerY);

  var biggest = (centerX * centerX) + (centerY * centerY);
  var current = (dx * dx) + (dy * dy);
  return getColorOnReverseCurve(current, biggest, scheme);
}

function sunset(options) {
  var dy = options.y;
  var scheme = options.colorScheme;

  return getColorOnReverseCurve(dy, options.quilt.maxSteps, scheme);
}


function hardCorner(options) {
  var x = options.x;
  var y = options.y;

  var scheme = options.colorScheme;

  var howManySteps = options.quilt.maxSteps;

  var offset = Math.floor((howManySteps - scheme.length) / 2);

  var greaterStep = Math.max(x, y);

  return elementFromPoint(greaterStep - offset, scheme);
}


function tinyCorner(options) {
  var x = options.x;
  var y = options.y;
  var scheme = options.colorScheme;

  var greaterStep = Math.max(x, y);
  return elementFromPoint(greaterStep, scheme);
}



function scatterBoxes(options) {
  var x = options.x * options.step;
  var y = options.y * options.step;

  var centerX = options.quiltWidth / 2;
  var centerY = options.quiltHeight / 2;

  var dx = Math.abs(x - centerX);
  var dy = Math.abs(y - centerY);

  var scheme = options.colorScheme;

  var stepX = Math.round(dx / options.step);
  var stepY = Math.round(dy / options.step);

  var greaterStep = Math.max(stepX, stepY);

  return elementFromPoint(greaterStep - helpers.get_random_int(1, 3), scheme);
}



function boxes(options) {
  var x = options.x;
  var y = options.y;

  var center = Math.floor(options.quiltHeight / (options.step * 2));

  var dx = Math.abs(x - center);
  var dy = Math.abs(y - center);

  var scheme = options.colorScheme;

  return elementFromPoint(Math.max(dx, dy), scheme);
}




function infiniteFromCorner(options) {
  var x = options.x;
  var y = options.y;

  var scheme = options.colorScheme;

  var index = Math.max(x, y);
  var colorIndex = index %  scheme.length;
  return scheme[colorIndex];
}

function infiniteFromCenter(options) {

  var x = options.x;
  var y = options.y;

  var center = Math.floor(options.quiltHeight / (options.step * 2));

  var dx = Math.abs(x - center);
  var dy = Math.abs(y - center);

  var scheme = options.colorScheme;
  var index = Math.max(dx, dy);
  var colorIndex = index %  scheme.length;
  return scheme[colorIndex];
}


function diagonalStripe(options) {
  var x = options.x;
  var y = options.y;

  var scheme = options.colorScheme;

  var index = Math.floor((x + y) * 0.2);

  return elementFromPoint(index, scheme);
}


function okeefe(options) {
  var x = options.x * options.step;
  var y = options.y * options.step;

  var scheme = options.colorScheme;
  var centerX = options.quiltWidth / 2;
  var centerY = options.quiltHeight / 2;

  var dx = Math.abs((x * 2) - centerX);
  var dy = Math.abs(y - centerY);


  var total = options.quiltWidth + options.quiltHeight;
  var current = dx + dy;

  return getColorFromRatio(current, total, scheme);

}


function border(options, distance) {
  var x = options.x;
  var y = options.y;
  // var width = options.quiltWidth;
  // var height = options.quiltHeight;
  // var step = options.step;
  var scheme = options.colorScheme;


  var stepX = options.x;
  var stepY = options.y;

  var maxSteps = options.quilt.maxSteps;

  var targetClose = distance;
  var targetFar = maxSteps - targetClose;

  if (stepX == targetClose || stepY == targetClose || stepX == targetFar || stepY == targetFar) {
    var colorIndex = helpers.get_random_int(1, scheme.length - 1)

  } else {
    var colorIndex = 0;
  }

  return scheme[colorIndex];
}

function borderByDistance(distance) {
  return function(opts) {
    return border(opts, distance);
  };
}

function lines(options) {
  var x = options.x;
  var y = options.y;

  var scheme = options.colorScheme;
  var stepsTotal = options.quilt.maxSteps;

  var current = x * stepsTotal + y;
  return getColorOnCurve(current, stepsTotal * stepsTotal, scheme);
}

function orderedColors(options) {
  var x = options.x;
  var y = options.y;

  var scheme = options.colorScheme;

  var stepsTotal = options.quilt.maxSteps;

  var current = x * stepsTotal + y;
  var index = current % scheme.length;
  return scheme[index];
}

function looseLines(variance) {
  return function(options) {
    var x = options.x;
    var y = options.y;

    var scheme = options.colorScheme;

    var stepsTotal = options.quilt.maxSteps;

    var current = x * stepsTotal + y + helpers.get_random_int(-1 * variance, variance);
    return getColorFromRatio(current, stepsTotal * stepsTotal, scheme);
  }
}

function dummy(options) {
  return options.colorScheme[0];
}

function borderedPattern(pattern) {
  return function(options) {

    // Border on something else
    var stepX = options.x;
    var stepY = options.y;

    var maxSteps = options.quilt.maxSteps;

    if (stepX < 1 || stepY < 1) {
      return options.colorScheme[0];
    } else if (stepX >= maxSteps || stepY >= maxSteps){
      return options.colorScheme[0];
    } else {
      var newScheme = options.colorScheme.slice(1)
      return pattern({
        x: options.x,
        y: options.y,
        quilt: options.quilt,
        step: options.step,
        colorScheme: newScheme,
        quiltWidth: options.quiltWidth,
        quiltHeight: options.quiltHeight
      });
    }
  }
}

function dinerFloor(options) {
  if((options.x + options.y) % 2 == 0) {
    return options.colorScheme[0]
  } else {
    return helpers.random_from_array(options.colorScheme.slice(1))
  }
}

function dinerFloorDecided(options) {
  if((options.x + options.y) % 2 == 0) {
    return options.colorScheme[0]
  } else {
    return options.colorScheme[1]
  }
}

function waffle(options) {
  if((options.x * options.y) % 2 == 0) {
    return options.colorScheme[0]
  } else {
    return helpers.random_from_array(options.colorScheme.slice(1))
  }
}

function thinStripes(options) {
  if((options.x + options.y) % 3 == 0) {
    return helpers.random_from_array(options.colorScheme.slice(1))
  } else {
    return options.colorScheme[0]
  }
}

function biggerSquares(options) {
  return dinerFloorDecided({
    x: Math.floor(options.x / 2),
    y: Math.floor(options.y / 2),
    colorScheme: options.colorScheme
  })
}

function blendOrSomething(options) {
  var ratio = (options.x) / (options.quilt.maxSteps);
  var colorScheme = options.colorScheme;
  if(colorScheme.length > 3) {
    colorScheme = options.colorScheme.slice(0, 3);
  }

  ratio = ratio * options.colorScheme.length;

  var ratioBetweenColors = ratio % 1;
  var color1 = Math.floor(ratio);
  var color2 = Math.ceil(ratio);

  return helpers.blend_color(
    elementFromPoint(color1, options.colorScheme),
    elementFromPoint(color2, options.colorScheme),
    ratioBetweenColors
  );
}


module.exports = [

  randomFromScheme,
  random_but_only_first_two,

  cornerCircle,
  diamond,
  cross,
  hardCorner,
  tinyCorner,
  boxes,
  scatterBoxes,
  infiniteFromCorner,
  infiniteFromCenter,
  majorX,
  diagonalStripe,
  circle,
  sunset,
  orderedColors,
  okeefe,
  borderByDistance(0),
  borderByDistance(1), borderByDistance(2), borderByDistance(3), borderByDistance(4),
  lines,
  looseLines(20),
  looseLines(100),
  looseLines(5),

  borderedPattern(sunset),
  borderedPattern(circle),
  borderedPattern(okeefe),
  dinerFloor,
  dinerFloorDecided,
  waffle,
  borderedPattern(waffle),
  thinStripes,
  biggerSquares,
  blendOrSomething,
  dummy

];

// module.exports = [infiniteFromCenter];