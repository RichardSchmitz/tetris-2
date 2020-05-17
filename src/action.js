const MOVE_DOWN = 'move_down';
const MOVE_LEFT = 'move_left';
const MOVE_RIGHT = 'move_right';
const ROTATE_CW = 'rotate_cw';
const ROTATE_CCW = 'rotate_ccw';
const PAUSE = 'pause';

function moveDown() {
  return build(e => e.handleMoveDown());
}

function moveLeft() {
  return build(e => e.handleMoveLeft());
}

// function isMoveLeft

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

function build(f) {
  return {
    execute: f
  };
}

export {
  moveDown, moveLeft, moveRight, rotateCw, rotateCcw, pause, build
};