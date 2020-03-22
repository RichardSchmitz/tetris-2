import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix} from './tetromino';
import Coord from '../coord';

export {createL};

const MATRIX_ROT_0 = [[0, 0, 0], [1, 1, 1], [0, 0, 1]];
const MATRIX_ROT_1 = [[0, 1, 1], [0, 1, 0], [0, 1, 0]];
const MATRIX_ROT_2 = [[1, 0, 0], [1, 1, 1], [0, 0, 0]];
const MATRIX_ROT_3 = [[0, 1, 0], [0, 1, 0], [1, 1, 0]];

function createL(id) {
  const origin = new Coord(0, 0);
  const matrix = MATRIX_ROT_2;
  const coords = deconstructMatrix(matrix, origin);

  return new LBlock(id, coords, 2);
}

class LBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'L');
    this.rotation = rotation % 4;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 4;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (this.rotation === 0) {
      return new Coord(xMin - 1, yMin);
    } else if (this.rotation === 1) {
      return new Coord(xMin, yMin - 1);
    } else {
      return new Coord(xMin, yMin);
    }
  }

  getMatrixForRotation(rotation) {
    rotation = rotation % 4;

    if (rotation === 0) {
      return MATRIX_ROT_0;
    } else if (rotation === 1) {
      return MATRIX_ROT_1;
    } else if (rotation === 2) {
      return MATRIX_ROT_2;
    } else {
      return MATRIX_ROT_3;
    }
  }

  createBlock(coords, rotation) {
    return new LBlock(this.id, coords, rotation);
  }
}