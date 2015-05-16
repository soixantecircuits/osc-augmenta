var renderer = PIXI.autoDetectRenderer(800, 600, { transparent: true });

document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var circles = new PIXI.Graphics();
stage.addChild(circles);

requestAnimationFrame(animate);

function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    
    drawCircle();
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

function drawCircle(){
  circles.clear();
  // draw a circle
  circles.beginFill(0xFFFF0B, 0.5);
  circles.drawCircle(renderer.width/2, renderer.height/2, 50);
  circles.endFill();
}


