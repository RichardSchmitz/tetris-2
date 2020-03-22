import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix} from './tetromino';
import Coord from '../coord';

export {createS};

const MATRIX_ROT_0 = [[0, 1, 0], [1, 1, 0], [1, 0, 0]];
const MATRIX_ROT_1 = [[0, 0, 0], [1, 1, 0], [0, 1, 1]];

function createS(id) {
  const origin = new Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = deconstructMatrix(matrix, origin);

  return new SBlock(id, coords, 0);
}

class SBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'S');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 2;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (rotation === 0) {
      return new Coord(xMin, yMin);
    } else {
      return new Coord(xMin - 1, yMin);
    }
  }

   getRotations() {
      return [MATRIX_ROT_0, MATRIX_ROT_1];
    }

  createBlock(coords, rotation) {
    return new SBlock(this.id, coords, rotation);
  }
}