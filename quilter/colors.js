var helpers = require(__dirname + '/../helpers.js'),
  ColorScheme = require('color-scheme');

function arrayFromCoolorUrl(url) {
  let colors = url.split("-").map((c) => '#' + c);
  return colors;
}

function populateSchemes() {
  var colorSchemes = [];

  colorSchemes = colorSchemes.concat(_getSchemesFromTool());
  colorSchemes = colorSchemes.concat(_getSchemesFromTool()); // hell yeah i'm hitting it twice
    // in an API sense
    // don't make it weird guys

  colorSchemes.push([randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]);
  colorSchemes.push([randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]);
  colorSchemes.push([randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]);


  colorSchemes.push([
    '#061928',
    '#2c3e50',
    '#2980b9',
    '#34495e',
    '#5D8CAE',
    '#1B4F72',
    '#21618C',
    '#013243',
    '#2C3E50',
    '#044F67'
  ]); // storm colors

  colorSchemes.push(arrayFromCoolorUrl('ffae03-e67f0d-fe4e00-e9190f-ff0f80')); // sunset
  colorSchemes.push(arrayFromCoolorUrl('120309-2e0f15-70163c-95b2b8-307351')); // dark christmas
  colorSchemes.push(arrayFromCoolorUrl('000000-291528-3a3e3b-f0eff4-9e829c')); // high contrast
  // colorSchemes.push(arrayFromCoolorUrl('071e22-1d7874-679289-f4c095-ee2e31')); // watermelonish

  return colorSchemes;
}

function randomColor() {
  return helpers.get_random_hex();
}

function _getSchemesFromTool() {
  var colorSchemes = []

  var schemes = ['mono', 'mono', 'contrast', 'triade'];
  var styles = ['default', 'pale', 'pastel', 'light', 'soft', 'hard', 'soft', 'soft', 'pastel', 'pastel'];

  for (var i = 0; i < schemes.length; i++) {
    for (var j = 0; j < styles.length; j++) {

      var scheme = schemeColorGenerator(schemes[i], styles[j]);

      colorSchemes.push(scheme);
    }
  }
  return colorSchemes;
}

function schemeColorGenerator(schemeName, variation) {
  var scheme = new ColorScheme;
  var hex = helpers.get_random_hex();

  scheme.from_hex(hex.replace('#',''))
    .scheme(schemeName)
    .variation(variation);
  var colors = scheme.colors().map((c) => "#" + c);
  return colors;
}


module.exports = populateSchemes;
