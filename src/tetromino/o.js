import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix} from './tetromino';
import { Coord } from '../coord';

export { createO, ROTATIONS };

const MATRIX_ROT_0 = [[1, 1], [1, 1]];

const ROTATIONS = [MATRIX_ROT_0];

function createO(id) {
  const origin = new Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = deconstructMatrix(matrix, origin);

  return new OBlock(id, coords);
}

class OBlock extends Tetromino {
  constructor(id, coords) {
    super(id, coords, 'O');
    this.rotation = 0;
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
    return new OBlock(this.id, coords);
  }
}