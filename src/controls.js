// https://keycode.info/
const ENTER = 13;
const LEFT = 65; // a
const RIGHT = 68; // d
const DOWN = 83; // s
//const LEFT = 37; // left arrow
//const RIGHT = 39; // right arrow
//const DOWN = 40; // down arrow
const ROTATE_CW = 39; // right arrow
const ROTATE_CCW = 37; // left arrow
const PAUSE = 80;

export default class Keyboard {
  constructor(engine) {
    this.engine = engine;
  }

  handleEvent(event) {
    // if (this.activePiece) {
      // if (event.keyCode === 37) {
      //   if (this._canMoveLeft(this.activePiece)) {
      //     this.activePiece.move(-DELTA, 0);
      //   }
      // } else if (event.keyCode === 39) {
      //   if (this._canMoveRight(this.activePiece)) {
      //     this.activePiece.move(DELTA, 0);
      //   }
      // } else if(event.keyCode === 40) {
      //   if (this._canMoveDown(this.activePiece)) {
      //     this.activePiece.move(0, DELTA);
      //   }
      // } else if(event.keyCode === 190) {
      //   if (this._canRotateCw(this.activePiece)) {
      //     this.activePiece.rotateCw();
      //   }
      // } else if(event.keyCode === 188) {
      //   if (this._canRotateCcw(this.activePiece)) {
      //     this.activePiece.rotateCcw();
      //   }
      // } else {
      //   return;
      // }

      // this.layerPieces.batchDraw();
    // }
    if (event.keyCode === ENTER) {
      // Temporary, for dev mode. Tick only when enter pressed.
      event.preventDefault();
      this.engine.handleTick();
    } else if (event.keyCode === DOWN) {
      event.preventDefault();
      this.engine.handleMoveDown();
    } else if (event.keyCode === LEFT) {
      event.preventDefault();
      this.engine.handleMoveLeft();
    } else if (event.keyCode === RIGHT) {
      event.preventDefault();
      this.engine.handleMoveRight();
    } else if (event.keyCode === ROTATE_CW) {
      this.engine.handleRotateCw();
    } else if (event.keyCode === ROTATE_CCW) {
      this.engine.handleRotateCcw();
    } else if (event.keyCode === PAUSE) {
      this.engine.handleTogglePause();
    }
  }
}
