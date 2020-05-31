import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix} from './tetromino';
import { Coord } from '../coord';

export { createZ, ROTATIONS };

const MATRIX_ROT_0 = [[1, 0, 0], [1, 1, 0], [0, 1, 0]];
const MATRIX_ROT_1 = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1];

function createZ(id) {
  const origin = new Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = deconstructMatrix(matrix, origin);

  return new ZBlock(id, coords, 0);
}

class ZBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'Z');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    return new Coord(xMin, yMin);
  }

   getRotations() {
      return ROTATIONS;
    }

  createBlock(coords, rotation) {
    return new ZBlock(this.id, coords, rotation);
  }
}