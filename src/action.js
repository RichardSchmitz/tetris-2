function moveDown() {
  return build(e => e.handleMoveDown());
}

function moveLeft() {
  return build(e => e.handleMoveLeft());
}

function moveRight() {
  return build(e => e.handleMoveRight());
}

function rotateCw() {
  return build(e => e.handleRotateCw());
}

function rotateCcw() {
  return build(e => e.handleRotateCcw());
}

function pause() {
  return build(e => e.handleTogglePause());
}

function tick() {
  return build(e => e.handleTick());
}

function build(f) {
  return {
    execute: f
  };
}

export {
  moveDown, moveLeft, moveRight, rotateCw, rotateCcw, pause, tick, build
};