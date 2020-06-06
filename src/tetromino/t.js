import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createT, determineRotation, TBlock, ROTATIONS };

const MATRIX_ROT_0 = [[0, 1, 0], [0, 1, 1], [0, 1, 0]];
const MATRIX_ROT_1 = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
const MATRIX_ROT_2 = [[0, 1, 0], [1, 1, 0], [0, 1, 0]];
const MATRIX_ROT_3 = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1, MATRIX_ROT_2, MATRIX_ROT_3];

function createT(id) {
  const origin = new coord.Coord(0, 0);
  const matrix = MATRIX_ROT_2;
  const coords = tetromino.deconstructMatrix(matrix, origin);

  return new TBlock(id, coords, 2);
}

class TBlock extends tetromino.Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'T');
    this.rotation = rotation % 4;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 4;

    const xMin = tetromino.leftmostCoord(this).x;
    const yMin = tetromino.topmostCoord(this).y;

    if (this.rotation === 3) {
      return new coord.Coord(xMin - 1, yMin);
    } else if (this.rotation === 0) {
      return new coord.Coord(xMin, yMin - 1);
    } else {
      return new coord.Coord(xMin, yMin);
    }
  }

   getRotations() {
      return ROTATIONS;
    }

  createBlock(coords, rotation) {
    return new TBlock(this.id, coords, rotation);
  }
}

function determineRotation(coords) {
  tetromino.validateCoords(coords);

  if (coord.bottommost(coords).y - coord.topmost(coords).y === 1) {
    if (coord.rightmost(coords).y - coord.topmost(coords).y === 1) {
      return 2;
    } else {
      return 0;
    }
  } else {
    if (coord.rightmost(coords).x - coord.topmost(coords).x === 1) {
      return 3;
    } else {
      return 1;
    }
  }
}