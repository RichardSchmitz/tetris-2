import {createT} from './tetromino';
import {TetrisState} from './state';

export {TetrisEngine};

class TetrisEngine {
  constructor() {
    this._state = new TetrisState();
    this._listeners = [];
  }

  init() {
    this._state.active = createT('foo001', new Coord(5, 0));
    // put at y=-100 to keep it off the current gameboard. Maybe there's a more elegant solution.
    this._state.next = createT('foo002', new Coord(5, -100));
    // Assuming dimensions are 10x10 for now
    this._state.debris = createDebrisMatrix(10, 10);

    this._notifyListeners();
  }

  start() {
    const paused = this._state.paused;
    const started = this._state.started;
    const gameOver = this._state.gameOver;
    if (!(paused || started || gameOver)) {
      this._state.started = true;
      this._notifyListeners();
      // todo: set timeout/scheduled function to move the game forward
    }
  }

  handleMoveDown() {
    // Step 1: check if the active piece is stuck. Stuck means it has no room underneath it to move down.
    //         If so, do not handle the move, and instead handle transition to a new piece.
    //         That means 1. check for a completed row. If necessary, remove the row, move everything down,
    //         and update the score. Then activate the new active piece. Could also check for
    //         game-ending conditions.

    // todo...

    // Step 2: Active piece is not stuck, so it can move down. Translate the piece down.
    this._state.active.translateDown();
    this._notifyListeners();
  }

  _notifyListeners() {
    for (const listeners of this._listeners) {
      // todo: possible concurrency issue (what happens if state is modified
      // while we're still notifying?). Maybe it doesn't matter because only
      // latest state is important. Also possibly notifying multiple times with
      // same state.
      listener.notify(this._state);
    }
  }
}

// Creates a matrix of the given dimensions. Every cell contains null.
function createDebrisMatrix(width, height) {
  const matrix = [];
  for (let i = 0; i < width; i++) {
    matrix.push([]);
    for (let j = 0; j < height; j++) {
      matrix[i].push(null);
    }
  }

  return matrix;
}
