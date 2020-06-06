import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createO, determineRotation, ROTATIONS };

const MATRIX_ROT_0 = [[1, 1], [1, 1]];

const ROTATIONS = [MATRIX_ROT_0];

function createO(id) {
  const origin = new coord.Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = tetromino.deconstructMatrix(matrix, origin);

  return new OBlock(id, coords);
}

class OBlock extends tetromino.Tetromino {
  constructor(id, coords) {
    super(id, coords, 'O');
    this.rotation = 0;
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
    return new OBlock(this.id, coords);
  }
}

function determineRotation(coords) {
  tetromino.validateCoords(coords);

  return 0; // only rotation for OBlock
}