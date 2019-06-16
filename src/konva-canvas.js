import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: 500,
  height: 500
});

const layer = new Konva.Layer();

const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(circle);
stage.add(layer);
layer.draw();

const container = stage.container();

// Konva doesn't have shape support for keyboard events.
// Instead, listen for events on the container
// https://konvajs.org/docs/events/Keyboard_Events.html
container.tabIndex = 1; // makes it focusable
container.focus();

const DELTA = 4;

container.addEventListener('keydown', function(e) {
  if (e.keyCode === 37) {
    circle.x(circle.x() - DELTA);
  } else if (e.keyCode === 38) {
    circle.y(circle.y() - DELTA);
  } else if (e.keyCode === 39) {
    circle.x(circle.x() + DELTA);
  } else if(e.keyCode === 40) {
    circle.y(circle.y() + DELTA);
  } else {
    return;
  }

  e.preventDefault();
  layer.batchDraw();
});
