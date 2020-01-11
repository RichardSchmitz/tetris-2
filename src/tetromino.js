import Coord from './coord';

export {createT, _constructMatrix, leftmostCoord, rightmostCoord, topmostCoord, bottommostCoord};

class Tetromino {
  constructor(id, coords, type) {
    this.id = id;
    this.coords = coords;
    this.type = type;
  }

  translateDown() {
    return this.translate(c => c.down());
  }

  translateRight() {
    return this.translate(c => c.right());
  }

  translateLeft() {
    return this.translate(c => c.left());
  }

  translate(transform) {
    let coords = this.coords.map(transform);
    return createBlock(this.id, coords, this.type, this.rotation);
  }
}

function createT(id, center) {
  center = center.down();
  let coords = [center, center.left(), center.right(), center.up()];

  return createBlock(id, coords, 'T', 0);
}

function createBlock(id, coords, type, rotation) {
  if (type === 'T') {
    return new TBlock(id, coords, rotation);
  }

  throw Exception(`No such type: ${type}`);
}

// 4 possible positions: 0 (regular T), 1 (cw rotation), 2 (upside-down), 3 (ccw rotation)
class TBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'T');
    this.rotation = rotation % 4;
  }

  rotateCw() {
    const xMin = this.coords.map(c => c.x).sort()[0];
    const yMin = this.coords.map(c => c.y).sort()[0];

    let origin = null;
    let matrix = null;
    if (this.rotation === 2) {
      origin = new Coord(xMin, yMin - 1);
      matrix = [[0, 1, 0], [1, 1, 1], [0, 0, 0]]; // matrix for position == 3
    } else if (this.rotation === 3) {
      origin = new Coord(xMin, yMin);
      matrix = [[0, 1, 0], [1, 1, 0], [0, 1, 0]]; // matrix for position == 0
    } else if (this.rotation === 0) {
      origin = new Coord(xMin, yMin);
      matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]]; // matrix for position == 1
    } else {
      origin = new Coord(xMin - 1, yMin);
      matrix = [[0, 1, 0], [0, 1, 1], [0, 1, 0]]; // matrix for position == 2
    }

    const coords = _deconstructMatrix(matrix, origin);

    return createBlock(this.id, coords, this.type, this.rotation + 1);
  }

  rotateCcw() {
    return this.rotateCw().rotateCw().rotateCw();
  }
}

// Matrices are indexed by x, then y, so the matrix is a list of columns
// todo: is this function still required?
function _constructMatrix(dimension, coords, origin) {
  const matrix = [];
  for (let i = 0; i < dimension; i++) {
    matrix.push([]);
    for (let j = 0; j < dimension; j++) {
      matrix[i].push(0);
    }
  }

  for (const coord of coords) {
    const x = coord.x - origin.x;
    const y = coord.y - origin.y;
    matrix[x][y] = 1;
  }

  return matrix;
}

// Given a matrix of 0's (representing nothing) and 1's (representing a coordinate),
// and an origin point for the top left of the matrix, converts the matrix into
// an array of Coords
function _deconstructMatrix(matrix, origin) {
  const coords = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        coords.push(new Coord(i + origin.x, j + origin.y));
      }
    }
  }

  return coords;
}

function leftmostCoord(piece) {
  // Sort by descending x value
  return _getLastCoord(piece.coords, (c1, c2) => c2.x - c1.x);
}

function rightmostCoord(piece) {
  // Sort by ascending x value
  return _getLastCoord(piece.coords, (c1, c2) => c1.x - c2.x);
}

function topmostCoord(piece) {
  // Sort by ascending y value
  return _getLastCoord(piece.coords, (c1, c2) => c2.y - c1.y);
}

function bottommostCoord(piece) {
  // Sort by ascending y value
  return _getLastCoord(piece.coords, (c1, c2) => c1.y - c2.y);
}

function _getLastCoord(coords, arrangement) {
  return coords.slice() // Create a shallow copy of the array
               .sort(arrangement)
               .pop(); // Get the last one (this modifies the array, which is why we created a copy)
}
