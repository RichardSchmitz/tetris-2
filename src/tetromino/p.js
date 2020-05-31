import { Tetromino } from './tetromino';
import { Coord } from '../coord';

export { createP, PixelTetromino, ROTATIONS };

const MATRIX_ROT_0 = [[1]];

const ROTATIONS = [MATRIX_ROT_0];

function createP(id) {
  return new PixelTetromino(id, new Coord(0, 0))
}

// A test tetromino that represents a single pixel (for simplicity)
class PixelTetromino extends Tetromino {
  constructor(id, coord) {
    super(id, [coord], 'P');
    this.rotation = 0;
  }

  getOriginForRotation(rotation) {
    return new Coord(
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