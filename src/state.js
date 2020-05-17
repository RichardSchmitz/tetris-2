export {TetrisState};

class TetrisState {
  constructor(gridWidth, gridHeight) {
    this.next = null;
    this.active = null;
    // Matrix of pieces. Not sure if this is needed but
    // currently used for determining the gameboard dimensions
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    // Array of dead pieces
    this.stack = [];
    this.paused = false;
    this.started = false;
    this.gameOver = false;
    this.level = 1;
    this.bonus = 0;
    this.score = 0;
    this.totalRowsCleared = 0;
  }

  // todo: possibly a better way to get grid dimensions
  width() {
    return this.gridWidth;
  }

  height() {
    return this.gridHeight;
  }
}