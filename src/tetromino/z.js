import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createZ, determineRotation, ROTATIONS };

const MATRIX_ROT_0 = [[1, 0, 0], [1, 1, 0], [0, 1, 0]];
const MATRIX_ROT_1 = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1];

function createZ(id) {
  const origin = new coord.Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = tetromino.deconstructMatrix(matrix, origin);

  return new ZBlock(id, coords, 0);
}

class ZBlock extends tetromino.Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'Z');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    const xMin = tetromino.leftmostCoord(this).x;
    const yMin = tetromino.topmostCoord(this).y;

    return new coord.Coord(xMin, yMin);
  }

   getRotations() {
      return ROTATIONS;
    }

  createBlock(coords, rotation) {
    return new ZBlock(this.id, coords, rotation);
  }
}

function determineRotation(coords) {
  validateCoords(coords);

  if (coord.bottommost(coords).y - coord.topmost(coords).y === 1) {
    return 0;
  }

  return 1;
}