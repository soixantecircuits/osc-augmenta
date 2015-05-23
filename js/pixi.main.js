var renderer = PIXI.autoDetectRenderer(800, 600, { transparent: true, antialias: true });

document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var circles = new PIXI.Graphics();
stage.addChild(circles);

requestAnimationFrame(animate);

function animate() {
    requestAnimationFrame(animate);
    if(circlesArray.length > 0){
      circles.clear();
    }

    // just for fun, let's rotate mr rabbit a little
    $.each(circlesArray, function(index, circle){
      drawCircle(circle.x, circle.y);
    });
    circlesArray = [];
    // render the stage
    renderer.render(stage);
}

$(window).on('resize', onResize);
$(window).resize();

function onResize() {
    screenW = $(window).width();
    screenH = $(window).height();
    renderer.resize(screenW,screenH);
}

function drawCircle(x, y){

  // draw a circle
  // circles.beginFill(0xFFFF0B, 0.5);
  circles.beginFill(0x0000FF, 1);
  // circles.beginFill(0x000000, 1);

  // circles.drawCircle(x*renderer.width, y*renderer.height, 4);

  var radius = 6;
  x *= renderer.width;
  y *= renderer.height;

  // var a = new PIXI.Point(x - radius, y + radius);
  // var b = new PIXI.Point(x, y - radius);
  // var c = new PIXI.Point(x + radius, y + radius);

  // console.log(a, b, c);
  // console.log(x, y);

  // circles.moveTo(a.x, a.y);
  // circles.lineTo(b.x, b.y);
  // circles.lineTo(c.x, c.y);

  circles.drawRect(x, y, radius, radius);

  circles.endFill();
}