import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createI, determineRotation, ROTATIONS };

const MATRIX_ROT_0 = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
const MATRIX_ROT_1 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1];

function createI(id) {
  const origin = new coord.Coord(0, 0);
  const coords = tetromino.deconstructMatrix(MATRIX_ROT_0, origin);

  return new IBlock(id, coords, 0);
}

class IBlock extends tetromino.Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'I');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 2;

    const xMin = tetromino.leftmostCoord(this).x;
    const yMin = tetromino.topmostCoord(this).y;

    if (this.rotation === 0) {
      return new coord.Coord(xMin - 1, yMin);
    } else {
      return new coord.Coord(xMin, yMin - 1);
    }
  }

 getRotations() {
    return ROTATIONS;
  }

  createBlock(coords, rotation) {
    return new IBlock(this.id, coords, rotation);
  }
}

function determineRotation(coords) {
  tetromino.validateCoords(coords);

  if (coord.bottommost(coords).x - coord.topmost(coords).x === 0) {
    return 1;
  }

  return 0;
}