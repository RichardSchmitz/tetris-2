export {TetrisState};

class TetrisState {
  constructor() {
    this.next = null;
    this.active = null;
    // Matrix of pieces. Not sure if this is needed but
    // currently used for determining the gameboard dimensions
    this.debris = null;
    // Array of dead pieces
    this.stack = [];
    this.paused = false;
    this.started = false;
    this.gameOver = false;
    this.level = 1;
    this.bonus = 0;
    this.score = 0;
  }
}
