import Konva from 'konva';

export default class GameBoard {
  constructor(gridSize, mountId) {
    this.gridSize = gridSize;
    this.mountId = mountId;
    this.stage = null;
    this.layerPieces = null;
    this.activePiece = null;
    this.shapes = null;
  }

  notify(state) {
    if (this.stage === null) {
      this.initStage(state.debris.length, state.debris[0].length); // todo: possibly a better way to get grid dimensions
    }

    // update active piece shape
    // todo: shouldn't be only when null
    if (this.shapes === null && state.active !== null) {
      this.shapes = state.active.coords.map(c => {
        return new Konva.Rect({
        x: c.x * this.gridSize,
        y: c.y * this.gridSize,
        width: this.gridSize,
        height: this.gridSize,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
      })});

      this.shapes.forEach(s => this.layerPieces.add(s));
      this.layerPieces.draw();
    }
  }

  initStage(width, height) {
    this.stage = new Konva.Stage({
      container: this.mountId,
      width: this.gridSize * width,
      height: this.gridSize * height
    });

    this.layerPieces = new Konva.Layer();
    this.stage.add(this.layerPieces);
    this.layerPieces.draw();
  }

  handleTick() {
    if (this.activePiece) {
      if (this._canMoveDown(this.activePiece)) {
        this.activePiece.move(0, this.gridSize);
        this.layerPieces.draw();
      }
    }
  }

  _gridCoord(c) {
    return c / this.gridSize;
  }

  _canMoveDown(piece) {
    const bottomCoord = this._gridCoord(piece.maxY());
    return !this._pastBottomBoundary(bottomCoord);
  }

  _canMoveRight(piece) {
    const rightCoord = this._gridCoord(piece.maxX());
    return !this._pastRightBoundary(rightCoord)
  }

  _canMoveLeft(piece) {
    const leftCoord = this._gridCoord(piece.minX());
    return !this._pastLeftBoundary(leftCoord - 1);
  }

  _canRotateCw(piece) {
    piece.rotateCw();
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
    return coord >= this.gridHeight;
  }

  _pastRightBoundary(coord) {
    return coord >= this.gridWidth;
  }

  _pastLeftBoundary(coord) {
    return coord < 0;
  }

  handleKeypress(event) {
    const DELTA = this.gridSize;

    if (this.activePiece) {
      if (event.keyCode === 37) {
        if (this._canMoveLeft(this.activePiece)) {
          this.activePiece.move(-DELTA, 0);
        }
      } else if (event.keyCode === 39) {
        if (this._canMoveRight(this.activePiece)) {
          this.activePiece.move(DELTA, 0);
        }
      } else if(event.keyCode === 40) {
        if (this._canMoveDown(this.activePiece)) {
          this.activePiece.move(0, DELTA);
        }
      } else if(event.keyCode === 190) {
        if (this._canRotateCw(this.activePiece)) {
          this.activePiece.rotateCw();
        }
      } else if(event.keyCode === 188) {
        if (this._canRotateCcw(this.activePiece)) {
          this.activePiece.rotateCcw();
        }
      } else {
        return;
      }

      event.preventDefault();
      this.layerPieces.batchDraw();
    }
  }

  deployPiece(piece) {
    piece.addToContainer(this.layerPieces);
    piece.moveTo(4 * this.gridSize, 0);
    this.activePiece = piece;
    this.layerPieces.draw();
  }
}
