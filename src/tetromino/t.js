import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix} from './tetromino';
import Coord from '../coord';

export {createT};

const MATRIX_ROT_0 = [[0, 1, 0], [0, 1, 1], [0, 1, 0]];
const MATRIX_ROT_1 = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
const MATRIX_ROT_2 = [[0, 1, 0], [1, 1, 0], [0, 1, 0]];
const MATRIX_ROT_3 = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

function createT(id) {
  const origin = new Coord(0, 0);
  const matrix = MATRIX_ROT_2;
  const coords = deconstructMatrix(matrix, origin);

  return new TBlock(id, coords, 2);
}

class TBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'T');
    this.rotation = rotation % 4;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 4;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (this.rotation === 3) {
      return new Coord(xMin - 1, yMin);
    } else if (this.rotation === 0) {
      return new Coord(xMin, yMin - 1);
    } else {
      return new Coord(xMin, yMin);
    }
  }

   getRotations() {
      return [MATRIX_ROT_0, MATRIX_ROT_1, MATRIX_ROT_2, MATRIX_ROT_3];
    }

  createBlock(coords, rotation) {
    return new TBlock(this.id, coords, rotation);
  }
}