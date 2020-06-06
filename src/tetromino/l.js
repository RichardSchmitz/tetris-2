import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix, validateCoords} from './tetromino';
import { Coord, bottommost, topmost, groupCoordsByDimension } from '../coord';

export { createL, determineRotation, ROTATIONS };

const MATRIX_ROT_0 = [[0, 0, 0], [1, 1, 1], [0, 0, 1]];
const MATRIX_ROT_1 = [[0, 1, 1], [0, 1, 0], [0, 1, 0]];
const MATRIX_ROT_2 = [[1, 0, 0], [1, 1, 1], [0, 0, 0]];
const MATRIX_ROT_3 = [[0, 1, 0], [0, 1, 0], [1, 1, 0]];

const ROTATIONS = [MATRIX_ROT_0, MATRIX_ROT_1, MATRIX_ROT_2, MATRIX_ROT_3];

function createL(id) {
  const origin = new Coord(0, 0);
  const matrix = MATRIX_ROT_2;
  const coords = deconstructMatrix(matrix, origin);

  return new LBlock(id, coords, 2);
}

class LBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'L');
    this.rotation = rotation % 4;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 4;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (this.rotation === 0) {
      return new Coord(xMin - 1, yMin);
    } else if (this.rotation === 1) {
      return new Coord(xMin, yMin - 1);
    } else {
      return new Coord(xMin, yMin);
    }
  }

  getRotations() {
    return ROTATIONS;
  }

  createBlock(coords, rotation) {
    return new LBlock(this.id, coords, rotation);
  }
}

function determineRotation(coords) {
  validateCoords(coords);

  if (bottommost(coords).y - topmost(coords).y === 1) {
    // Find the x-value with 2 coords
    const coordsByXValue = groupCoordsByDimension(coords, c => c.x);
    if (coordsByXValue[0].length === 2) {
      return 1;
    } else {
      return 3;
    }
  } else {
    // Find the y-value with 2 coords
    const coordsByYValue = groupCoordsByDimension(coords, c => c.y);
    if (coordsByYValue[0].length === 2) {
      return 2;
    } else {
      return 0;
    }
  }
}