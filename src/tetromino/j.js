import * as tetromino from './tetromino';
import * as coord from '../coord';

export { createJ, determineRotation, ROTATIONS };

const MATRIX_ROT_0 = [[0, 0, 1], [1, 1, 1], [0, 0, 0]];
const MATRIX_ROT_1 = [[1, 1, 0], [0, 1, 0], [0, 1, 0]];
const MATRIX_ROT_2 = [[0, 0, 0], [1, 1, 1], [1, 0, 0]];
const MATRIX_ROT_3 = [[0, 1, 0], [0, 1, 0], [0, 1, 1]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1, MATRIX_ROT_2, MATRIX_ROT_3];

function createJ(id) {
  const origin = new coord.Coord(0, 0);
  const matrix = MATRIX_ROT_0;
  const coords = tetromino.deconstructMatrix(matrix, origin);

  return new JBlock(id, coords, 0);
}

class JBlock extends tetromino.Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'J');
    this.rotation = rotation % 4;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 4;

    const xMin = tetromino.leftmostCoord(this).x;
    const yMin = tetromino.topmostCoord(this).y;

    if (this.rotation === 2) {
      return new coord.Coord(xMin - 1, yMin);
    } else if (this.rotation === 3) {
      return new coord.Coord(xMin, yMin - 1);
    } else {
      return new coord.Coord(xMin, yMin);
    }
  }

  getRotations() {
    return ROTATIONS;
  }

  createBlock(coords, rotation) {
    return new JBlock(this.id, coords, rotation);
  }
}

function determineRotation(coords) {
  tetromino.validateCoords(coords);

  if (coord.bottommost(coords).y - coord.topmost(coords).y === 1) {
    // Find the x-value with 2 coords
    const coordsByXValue = coord.groupCoordsByDimension(coords, c => c.x);
    if (coordsByXValue[0].length === 2) {
      return 1;
    } else {
      return 3;
    }
  } else {
    // Find the y-value with 2 coords
    const coordsByYValue = coord.groupCoordsByDimension(coords, c => c.y);
    if (coordsByYValue[0].length === 2) {
      return 2;
    } else {
      return 0;
    }
  }
}