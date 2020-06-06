import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createP, PixelTetromino, ROTATIONS };

const MATRIX_ROT_0 = [[1]];

const ROTATIONS = [MATRIX_ROT_0];

function createP(id) {
  return new PixelTetromino(id, new coord.Coord(0, 0))
}

// A test tetromino that represents a single pixel (for simplicity)
class PixelTetromino extends tetromino.Tetromino {
  constructor(id, coord) {
    super(id, [coord], 'X');
    this.rotation = 0;
  }

  getOriginForRotation(rotation) {
    return new coord.Coord(
      this.coords[0].x,
      this.coords[0].y
    );
  }

  getRotations() {
    return ROTATIONS;
  }

  createBlock(coords, rotation) {
    return new PixelTetromino(this.id, coords[0]);
  }
}