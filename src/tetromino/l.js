import {Tetromino, leftmostCoord, topmostCoord, deconstructMatrix, validateCoords} from './tetromino';
import { Coord, bottommost, topmost} from '../coord';

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
    // Group coords by x-value
    let xBuckets = new Map();
    coords.map(c => c.x).forEach(x => xBuckets.set(x, []));
    xBuckets = coords.reduce((buckets, coord) => {
      buckets.get(coord.x).push(coord);
      return buckets;
    }, xBuckets);
    // Find the x-value with 2 coords
    const coordsByXValue = Array.from(xBuckets.entries())
      .sort((e1, e2) => e1[0] - e2[0])
      .map(e => e[1]);
    if (coordsByXValue[0].length === 2) {
      return 1;
    } else {
      return 3;
    }
  } else {
    // Group coords by y-value
    let yBuckets = new Map();
    coords.map(c => c.y).forEach(y => yBuckets.set(y, []));
    yBuckets = coords.reduce((buckets, coord) => {
      buckets.get(coord.y).push(coord);
      return buckets;
    }, yBuckets);
    // Find the y-value with 2 coords
    const coordsByYValue = Array.from(yBuckets.entries())
      .sort((e1, e2) => e1[0] - e2[0])
      .map(e => e[1]);
    if (coordsByYValue[0].length === 2) {
      return 2;
    } else {
      return 0;
    }
  }
}