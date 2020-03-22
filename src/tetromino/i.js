import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix} from './tetromino';
import Coord from '../coord';

export {createI};

const MATRIX_ROT_0 = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
const MATRIX_ROT_1 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];

function createI(id) {
  const origin = new Coord(0, 0);
  const coords = deconstructMatrix(MATRIX_ROT_0, origin);

  return new IBlock(id, coords, 0);
}

class IBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'I');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 2;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (this.rotation === 0) {
      return new Coord(xMin - 1, yMin);
    } else {
      return new Coord(xMin, yMin - 1);
    }
  }

 getRotations() {
    return [MATRIX_ROT_0, MATRIX_ROT_1];
  }

  createBlock(coords, rotation) {
    return new IBlock(this.id, coords, rotation);
  }
}