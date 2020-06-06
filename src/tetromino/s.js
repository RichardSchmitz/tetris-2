import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createS, determineRotation, ROTATIONS };

const MATRIX_ROT_0 = [[0, 1, 0], [1, 1, 0], [1, 0, 0]];
const MATRIX_ROT_1 = [[0, 0, 0], [1, 1, 0], [0, 1, 1]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1];

function createS(id) {
  const origin = new coord.Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = tetromino.deconstructMatrix(matrix, origin);

  return new SBlock(id, coords, 0);
}

class SBlock extends tetromino.Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'S');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 2;

    const xMin = tetromino.leftmostCoord(this).x;
    const yMin = tetromino.topmostCoord(this).y;

    if (rotation === 0) {
      return new coord.Coord(xMin, yMin);
    } else {
      return new coord.Coord(xMin - 1, yMin);
    }
  }

   getRotations() {
      return ROTATIONS;
    }

  createBlock(coords, rotation) {
    return new SBlock(this.id, coords, rotation);
  }
}

function determineRotation(coords) {
  tetromino.validateCoords(coords);

  if (coord.bottommost(coords).y - coord.topmost(coords).y === 1) {
    return 0;
  }

  return 1;
}