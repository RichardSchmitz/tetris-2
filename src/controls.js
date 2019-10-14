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
    if (event.keyCode === 13) {
      // Temporary, for dev mode. Tick only when enter pressed.
      event.preventDefault();
      this.engine.handleMoveDown();
    }
  }
}
