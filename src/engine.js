import {randomTetromino, topmostCoord, bottommostCoord, leftmostCoord, rightmostCoord} from './tetromino';
import {TetrisState} from './state';
import {Scorable} from './scoring';
import { Coord } from './coord';
import * as matrixUtil from './matrix';

export class TetrisEngine {
  constructor(gridWidth, gridHeight) {
    this._state = new TetrisState(gridWidth, gridHeight);
    this._listeners = [];
    this.scoring = null;
    this._nextTetromino = randomTetromino;
  }

  setScoring(scoring) {
    this.scoring = scoring;
  }

  setTetrominoGenerator(generator) {
    this._nextTetromino = generator;
  }

  addListener(listener) {
    listener.notify(this._state);
    this._listeners.push(listener);
  }

  init() {
    // put at y=0 to keep it off the current gameboard. Maybe there's a more elegant solution.
    this._state.next = this._nextTetromino();
    this._notifyListeners();
  }

  start() {
    const paused = this._state.paused;
    const started = this._state.started;
    const gameOver = this._state.gameOver;
    if (!(paused || started || gameOver)) {
      this._state.active = this._state.next;
      this._state.next = this._nextTetromino();
      this._positionActiveOnBoard();

      this._state.started = true;
      this._notifyListeners();
      // todo: set timeout/scheduled function to move the game forward
    }
  }

  submit(action) {
    action.execute(this);
  }

  _positionActiveOnBoard() {
    this._state.active = moveToCenter(this._state.active, this._state);
    this._state.active = this._moveUpUntilNoOverlap(this._state.active);
  }

  handleTick() {
    if (this._state.paused || this._state.gameOver) {
      return;
    }

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
      this._state.stack.push(this._state.active);

      // handle row completion
      this._handleRowCompletion();

      // set up next piece
      this._state.active = this._state.next;
      this._positionActiveOnBoard();

      // Choose next piece
      this._state.next = this._nextTetromino();

      // handle game over
      if (this._illegalPosition(this._state.active)) {
        this._state.gameOver = true;
      }

      // notify listeners
      this._notifyListeners();
    }
  }

  // todo: there is a bug in here that sometimes clears a row but doesn't move rows above it
  // down. Seems to happen at row 3 (counting from bottom=1)
  _handleRowCompletion() {
    const scorable = new Scorable();
    // First construct matrix where each cell contains either null or a reference
    // to a piece in the stack
    const matrix = matrixUtil.createMatrix(this._state.width(), this._state.height());
    matrixUtil.fillMatrix(matrix, this._state.stack);
    // Determine which rows (if any) are complete.
    // Rows are numbered from top (0) to bottom (height - 1).
    const completeRows = [];
    for (let j = 0; j < this._state.height(); j++) {
      if (rowIsFilled(matrix, j)) {
        completeRows.push(j);
      }
    }
    scorable.rowsCleared = completeRows;
    if (completeRows.length === 0) {
      return;
    }
    // Clear those rows
    for (const j of completeRows) {
      for (let i = 0; i < this._state.width(); i++) {
        const piece = matrix[i][j];
        matrix[i][j] = null;
        piece.coords = piece.coords.filter(c => !(c.x === i && c.y === j));
      }
    }
    // Move higher rows down by the cumulative number of rows cleared.
    // Go through each row (bottom to top). Move each piece down. The number
    // of spaces to move down is equal to the number of completed rows greater
    // than the current row. eg. completedRows = [5, 7, 8]. Then row 4 will
    // move down 3 spaces, row 6 will move down 2 spaces, and row 9 will move
    // down 0 spaces. Skip completed rows since they don't need to move down.
    const rowSet = new Set(completeRows);
    for (let j = this._state.height() - 2; j >= 0 ; j--) {
      // j goes to from this._state.height() - 2 since row this._state.height() - 1
      // (the bottom row) can never move down
      if (rowSet.has(j)) {
        // This row is cleared, so nothing needs to be moved down
        continue;
      }
      const spaces = completeRows.filter(r => r > j).length;
      if (spaces === 0) {
        // There are no more rows to move down
        break;
      }
      for (let i = 0; i < this._state.width(); i++) {
        const piece = matrix[i][j];
        if (piece !== null) {
          // Remove the coordinate at (i, j)
          piece.coords = piece.coords.filter(c => !(c.x === i && c.y === j));
          // Add a coord `spaces` row lower
          piece.coords.push(new Coord(i, j + spaces));
        }
      }
    }

    if (this.scoring) {
      this.scoring.update(this._state, scorable);
    }
  }

  handleMoveDown() {
    if (this._state.paused || this._state.gameOver) {
      return;
    }

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
    if (this._state.paused || this._state.gameOver) {
      return;
    }

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
    if (this._state.paused || this._state.gameOver) {
      return;
    }

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
    if (this._state.paused || this._state.gameOver) {
      return;
    }

    if (this._canRotateCw(this._state.active)) {
      this._state.active = this._state.active.rotateCw();
      this._notifyListeners();
    } else if (this._canRotateCw(this._state.active.translateRight())) {
      this._state.active = this._state.active.translateRight().rotateCw();
      this._notifyListeners();
    } else if (this._canRotateCcw(this._state.active.translateLeft())) {
      this._state.active = this._state.active.translateLeft().rotateCw();
      this._notifyListeners();
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

    const rotated = piece.rotateCw();

    return !this._illegalPosition(rotated);
  }

  handleRotateCcw() {
    if (this._state.paused) {
      return;
    }

    if (this._canRotateCcw(this._state.active)) {
      this._state.active = this._state.active.rotateCcw();
      this._notifyListeners();
    } else if (this._canRotateCcw(this._state.active.translateRight())) {
      this._state.active = this._state.active.translateRight().rotateCcw();
      this._notifyListeners();
    } else if (this._canRotateCcw(this._state.active.translateLeft())) {
      this._state.active = this._state.active.translateLeft().rotateCcw();
      this._notifyListeners();
    }
  }

  handleTogglePause() {
    if (this._state.gameOver) {
      return;
    }

    this._state.paused = !this._state.paused;
    this._notifyListeners();
  }

  _illegalPosition(piece) {
    return (this._pastTopBoundary(topmostCoord(piece)) ||
      this._pastBottomBoundary(bottommostCoord(piece)) ||
      this._pastRightBoundary(rightmostCoord(piece)) ||
      this._pastLeftBoundary(leftmostCoord(piece)) ||
      this._collidesWithStack(piece));
  }

  _canRotateCcw(piece) {
    const rotated = piece.rotateCcw();

    return !this._illegalPosition(rotated);
  }

  _pastTopBoundary(coord) {
    return coord.y < 0;
  }

  _pastBottomBoundary(coord) {
    return coord.y >= this._state.height();
  }

  _pastRightBoundary(coord) {
    return coord.x >= this._state.width();
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

  _moveUpUntilNoOverlap(piece) {
    let translated = piece;

    while (this._collidesWithStack(translated)) {
      translated = translated.translateUp();
    }

    return translated;
  }
}

// Returns true iff row y of the matrix consists of all non-null values
function rowIsFilled(matrix, y) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][y] === null) {
      return false;
    }
  }

  return true;
}

function moveToCenter(piece, state) {
  const boardWidth = state.width();
  const pieceMatrixWidth = piece.getRotations()[0].length;
  // Origin is the top left coordinate in the piece matrix (may or
  // may not be empty).
  const originCoord = piece.getOriginForRotation(piece.rotation);

  // Strategy: Make the number of columns on either side of the matrix
  // equal. eg. board is 9 columns wide and the piece matrix is 3. Since
  // there are 9 - 3 = 6 unused columns total, we want 6 / 2 = 3 columns
  // on either side. If there is an odd number of unused columns, make
  // the larger number on the left (due to I block being left-of-centre
  // already)
  const unusedColumns = boardWidth - pieceMatrixWidth; // This must always be positive
  const leftSideColumns = Math.ceil(unusedColumns / 2);

  // How much do we have to translate this piece (positive or negative).
  // eg. if we want 3 columns on the left and the origin is currently
  // at (1, 0), we need to translate it 3 - 1 = 2 spaces right.
  const horizontalTranslation = leftSideColumns - originCoord.x;

  let translated = piece;
  if (horizontalTranslation > 0) {
    for (let i = 0; i < horizontalTranslation; i++) {
      translated = translated.translateRight();
    }
  } else if (horizontalTranslation < 0) {
    for (let i = horizontalTranslation; i < 0; i++) {
      translated = translated.translateLeft();
    }
  }

  return translated;
}

