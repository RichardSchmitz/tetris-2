import {createT, topmostCoord, bottommostCoord, leftmostCoord, rightmostCoord} from './tetromino';
import {TetrisState} from './state';
import Coord from './coord';


export {TetrisEngine};

class TetrisEngine {
  constructor(gridWidth, gridHeight) {
    this._state = new TetrisState();
    this._state.debris = createDebrisMatrix(gridWidth, gridHeight);
    this._listeners = [];
  }

  addListener(listener) {
    listener.notify(this._state);
    this._listeners.push(listener);
  }

  init() {
    // put at y=-100 to keep it off the current gameboard. Maybe there's a more elegant solution.
    this._state.next = createT('foo001', new Coord(5, -100));
    this._notifyListeners();
  }

  start() {
    const paused = this._state.paused;
    const started = this._state.started;
    const gameOver = this._state.gameOver;
    if (!(paused || started || gameOver)) {
      this._state.active = this._state.next;
      this._state.next = createT('foo002', new Coord(5, -100));
      this._moveActiveOntoBoard();

      this._state.started = true;
      this._notifyListeners();
      // todo: set timeout/scheduled function to move the game forward
    }
  }

  _moveActiveOntoBoard() {
    for (let i = 0; i < 100; i++) {
      // Not very elegant, but this moves the piece down to the top of the gameboard.
      // It would be better if we could set the position directly, but what does that
      // mean for different types of tetrominoes? todo
      this._state.active = this._state.active.translateDown();
    }
  }

  handleTick() {
    // Step 1: check if the active piece is stuck. Stuck means it has no room underneath it to move down.
    //         If so, do not handle the move, and instead handle transition to a new piece.
    //         That means 1. check for a completed row. If necessary, remove the row, move everything down,
    //         and update the score. Then activate the new active piece. Could also check for
    //         game-ending conditions.

    // todo...

    // Step 2: Active piece is not stuck, so it can move down. Translate the piece down.
    if (this._canMoveDown(this._state.active)) {
      this.handleMoveDown();
    } else {
      // todo: check if we're at the bottom and set up next piece
      // Need to keep active behind in debris or something...
      this._state.stack.push(this._state.active);

      this._state.active = this._state.next;
      this._moveActiveOntoBoard();

      const id = Math.random().toString().substring(2, 7);
      this._state.next = createT(id, new Coord(5, -100));
      // todo: game over
      this._notifyListeners();
    }
  }

  handleMoveDown() {
    if (this._canMoveDown(this._state.active)) {
      this._state.active = this._state.active.translateDown();
      this._notifyListeners();
    }
  }

  _canMoveDown(piece) {
    const translated = piece.translateDown();
    return !(this._pastBottomBoundary(bottommostCoord(translated))
              || this._collidesWithStack(translated));
  }

  handleMoveRight() {
    if (this._canMoveRight(this._state.active)) {
      this._state.active = this._state.active.translateRight();
      this._notifyListeners();
    }
  }

  _canMoveRight(piece) {
    const translated = piece.translateRight();
    return !(this._pastRightBoundary(rightmostCoord(translated))
              || this._collidesWithStack(translated));
  }

  handleMoveLeft() {
    if (this._canMoveLeft(this._state.active)) {
      this._state.active = this._state.active.translateLeft();
      this._notifyListeners();
    }
  }

  _canMoveLeft(piece) {
    const translated = piece.translateLeft();
    return !(this._pastLeftBoundary(leftmostCoord(translated))
              || this._collidesWithStack(translated));
  }

  handleRotateCw() {
    if (this._canRotateCw(this._state.active)) {
      this._state.active = this._state.active.rotateCw();
    }
  }

  _canRotateCw(piece) {
      // a piece should be able to rotate even when its path would pass through existing debris
      // eg. this transition for S is legal:
      //
      //                       S
      //                       S
      // S S S S S             S
      // X X O X X         X X S X X
      // X X O X X    =>   X X S X X
      //
      // I tried this on https://tetris.com/play-tetris and rotating through
      // other pieces appears to work

      // todo: implement wall-kicks as described here: https://strategywiki.org/wiki/Tetris/Rotation_systems#Wall_kicks
    const rotated = piece.rotateCw();
    const bottomCoord = this._gridCoord(piece.maxY()) - 1; // maxY() corresponds to the maximum pixel coordinate Y value, which is actually 1 grid space farther than the maximum grid coordinate, so we subtract 1
    const rightCoord = this._gridCoord(piece.maxX()) - 1; // similarly with maxX()
    const leftCoord = this._gridCoord(piece.minX());
    piece.rotateCcw();

    return !(this._pastBottomBoundary(bottomCoord) || this._pastRightBoundary(rightCoord) || this._pastLeftBoundary(leftCoord));
  }

  _canRotateCcw(piece) {
    piece.rotateCcw();
    const bottomCoord = this._gridCoord(piece.maxY()) - 1;
    const rightCoord = this._gridCoord(piece.maxX()) - 1;
    const leftCoord = this._gridCoord(piece.minX());
    piece.rotateCw();

    return !(this._pastBottomBoundary(bottomCoord) || this._pastRightBoundary(rightCoord) || this._pastLeftBoundary(leftCoord));
  }

  _pastBottomBoundary(coord) {
    return coord.y >= this._state.debris[0].length;
  }

  _pastRightBoundary(coord) {
    return coord.x >= this._state.debris.length;
  }

  _pastLeftBoundary(coord) {
    return coord.x < 0;
  }

  _collidesWithStack(piece) {
    for (const coord of piece.coords) {
      for (const stackPiece of this._state.stack) {
        for (const stackCoord of stackPiece.coords) {
          if (coord.x === stackCoord.x && coord.y === stackCoord.y) {
            return true;
          }
        }
      }
    }

    return false;
  }

  _notifyListeners() {
    for (const listener of this._listeners) {
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
