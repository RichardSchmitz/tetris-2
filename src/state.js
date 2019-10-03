export {TetrisState};

class TetrisState {
  constructor() {
    this.next = null;
    this.active = null;
    this.debris = null;
    this.paused = false;
    this.started = false;
    this.gameOver = false;
    this.level = 1;
    this.bonus = 0;
    this.score = 0;
  }
}
