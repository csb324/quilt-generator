var helpers = require(__dirname + '/../helpers.js'),
    constants = require(__dirname + '/constants.js');

function jitterRotation() {
  const degree_of_jitter = 4;
  return (Math.random() - 0.5) / degree_of_jitter;
}

class Square {
  constructor(xStep, yStep, quilt) {
    this.x = xStep;
    this.y = yStep;

    this.ctx = quilt.ctx;
    this.step = quilt.step;

    this.pattern = quilt.pattern;
    this.quiltWidth = quilt.width;
    this.quiltHeight = quilt.height;

    this.colorScheme = quilt.colors;

    var patternOptions = {
      x: this.x,
      y: this.y,
      colorScheme: this.colorScheme,
      quiltWidth: this.quiltWidth,
      quiltHeight: this.quiltHeight,
      step: this.step,
      quilt: quilt
    };


    this.color = this.pattern(patternOptions);
    this.lineColor = quilt.lineColors(this.color, this.colorScheme);

    var squares = [this.drawX, this.drawStripes, this.drawBox];
    this.squarePattern = helpers.random_from_array(squares);


    this.quilt = quilt;
  }

  draw() {

    // this.ctx.strokeStyle = this.color;
    this.ctx.save();

    this.rotateSlightly();

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.step, this.step);
    this.ctx.strokeStyle = this.lineColor;

    this.ctx.lineWidth = helpers.get_random_int(1, 3);

    this.squarePattern();

    this.ctx.restore();
  }

  rotateSlightly() {
    var x = (this.x + 0.5) * this.step;
    var y = (this.y + 0.5) * this.step;
    var step = this.step;

    this.ctx.translate(x + step/2, y + step/2);

    if (Math.random() > 0.5) {
      this.ctx.rotate(jitterRotation());
    } else {
      this.ctx.rotate(1.57 + jitterRotation());
    }

    this.ctx.translate(-step/2, -step/2);
  }

  drawX() {
    var ctx = this.ctx;
    var padding = helpers.get_random_int(1, 5);
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(this.step - padding, this.step - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.step - padding, padding);
    ctx.lineTo(padding, this.step - padding);
    ctx.stroke();

  }

  drawStripes() {
    var ctx = this.ctx;

    var strokes = helpers.get_random_int(1, 5);

    for(var i = 0; i <= strokes; i++) {
      ctx.beginPath();
      ctx.moveTo( 1 / (strokes + 1) * (i + 0.5) * this.step, ctx.lineWidth);
      ctx.lineTo( 1 / (strokes + 1) * (i + 0.5) * this.step, this.step - ctx.lineWidth);
      ctx.stroke();
    }
  }

  drawBox() {
    var padding = helpers.get_random_int(1, 5);
    var extraPadding = padding + helpers.get_random_int(2, 6);

    var stepMinusPadding = this.step - padding;
    var stepMinusExtraPadding = this.step - extraPadding;

    var ctx = this.ctx;
    this.ctx.lineWidth = helpers.get_random_int(1, 2);

    ctx.beginPath();
    ctx.moveTo(extraPadding, padding);
    ctx.lineTo(extraPadding, stepMinusPadding);

    ctx.moveTo(stepMinusExtraPadding, padding);
    ctx.lineTo(stepMinusExtraPadding, stepMinusPadding);

    ctx.moveTo(padding, extraPadding);
    ctx.lineTo(stepMinusPadding, extraPadding);

    ctx.moveTo(stepMinusPadding, stepMinusExtraPadding);
    ctx.lineTo(padding, stepMinusExtraPadding);
    ctx.stroke();
  }

}


module.exports = Square;