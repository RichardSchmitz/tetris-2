import Coord from './coord';

export {createT, createI, _constructMatrix, leftmostCoord, rightmostCoord, topmostCoord, bottommostCoord};

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

  rotateCw() {
      let origin = this.getOriginForRotation(this.rotation);
      let matrix = this.getMatrixForRotation(this.rotation + 1);

      const coords = _deconstructMatrix(matrix, origin);

      return createBlock(this.id, coords, this.type, this.rotation + 1);
  }

   rotateCcw() {
      return this.rotateCw().rotateCw().rotateCw();
   }
}

function createT(id) {
  const origin = new Coord(0, 0);
  const matrix = [[0, 1, 0], [1, 1, 0], [0, 1, 0]];
  const coords = _deconstructMatrix(matrix, origin);

  return createBlock(id, coords, 'T', 2);
}

function createI(id) {
  const origin = new Coord(0, 0);
  const matrix = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
  const coords = _deconstructMatrix(matrix, origin);

  return createBlock(id, coords, 'I', 0);
}

function createBlock(id, coords, type, rotation) {
  if (type === 'T') {
    return new TBlock(id, coords, rotation);
  } else if (type === 'I') {
    return new IBlock(id, coords, rotation);
  }

  throw Exception(`No such type: ${type}`);
}

class TBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'T');
    this.rotation = rotation % 4;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 4;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (this.rotation === 3) {
      return new Coord(xMin - 1, yMin);
    } else if (this.rotation === 0) {
      return new Coord(xMin, yMin - 1);
    } else {
      return new Coord(xMin, yMin);
    }
  }

  getMatrixForRotation(rotation) {
    rotation = rotation % 4;

    if (rotation === 0) {
      return [[0, 1, 0], [0, 1, 1], [0, 1, 0]];
    } else if (rotation === 1) {
      return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
    } else if (rotation === 2) {
      return [[0, 1, 0], [1, 1, 0], [0, 1, 0]];
    } else {
      return [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
    }
  }
}

class IBlock extends Tetromino {
  constructor(id, coords, rotation) {
    super(id, coords, 'I');
    this.rotation = rotation % 2;
  }

  getOriginForRotation(rotation) {
    rotation = rotation % 2;

    const xMin = leftmostCoord(this).x;
    const yMin = topmostCoord(this).y;

    if (this.rotation === 0) {
      return new Coord(xMin - 1, yMin);
    } else {
      return new Coord(xMin, yMin - 1);
    }
  }

  getMatrixForRotation(rotation) {
    rotation = rotation % 2;

    if (rotation === 0) {
      return [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
    } else {
      return [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
    }
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

// ie. least x-value
function leftmostCoord(piece) {
  // Sort by descending x value
  return _getLastCoord(piece.coords, (c1, c2) => c2.x - c1.x);
}

// ie. greatest x-value
function rightmostCoord(piece) {
  // Sort by ascending x value
  return _getLastCoord(piece.coords, (c1, c2) => c1.x - c2.x);
}

// ie. least y-value
function topmostCoord(piece) {
  // Sort by ascending y value
  return _getLastCoord(piece.coords, (c1, c2) => c2.y - c1.y);
}

// ie. greatest y-value
function bottommostCoord(piece) {
  // Sort by ascending y value
  return _getLastCoord(piece.coords, (c1, c2) => c1.y - c2.y);
}

function _getLastCoord(coords, arrangement) {
  return coords.slice() // Create a shallow copy of the array
               .sort(arrangement)
               .pop(); // Get the last one (this modifies the array, which is why we created a copy)
}
