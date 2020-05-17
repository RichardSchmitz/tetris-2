import * as actions from './action';

// https://keycode.info/
const ENTER = 13;
const LEFT = 65; // a
const RIGHT = 68; // d
const DOWN = 83; // s
const ROTATE_CW = 39; // right arrow
const ROTATE_CCW = 37; // left arrow
const PAUSE = 80;

export default class Keyboard {
  constructor(engine) {
    this.engine = engine;
  }

  handleEvent(event) {
    event.preventDefault();

    if (event.keyCode === ENTER) {
      // Temporary, for dev mode. Tick only when enter pressed.
      this.engine.handleTick();
    } else if (event.keyCode === DOWN) {
      this.engine.submit(actions.moveDown());
    } else if (event.keyCode === LEFT) {
      this.engine.submit(actions.moveLeft());
    } else if (event.keyCode === RIGHT) {
      this.engine.submit(actions.moveRight());
    } else if (event.keyCode === ROTATE_CW) {
      this.engine.submit(actions.rotateCw());
    } else if (event.keyCode === ROTATE_CCW) {
      this.engine.submit(actions.rotateCcw());
    } else if (event.keyCode === PAUSE) {
      this.engine.submit(actions.pause());
    }
  }
}
