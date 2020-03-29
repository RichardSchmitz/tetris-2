import Coord from '../coord';

export {Tetromino, leftmostCoord, rightmostCoord, topmostCoord, bottommostCoord, deconstructMatrix};

class Tetromino {
  constructor(id, coords, type) {
    this.id = id;
    this.coords = coords;
    this.type = type;
  }

  translateUp() {
    return this.translate(c => c.up());
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
    const coords = this.coords.map(transform);
    return this.createBlock(coords, this.rotation);
  }

  rotateCw() {
      const origin = this.getOriginForRotation(this.rotation);
      const matrix = this.getMatrixForRotation(this.rotation + 1);
      const coords = deconstructMatrix(matrix, origin);

      return this.createBlock(coords, this.rotation + 1);
  }

   rotateCcw() {
      return this.rotateCw().rotateCw().rotateCw();
   }


  getMatrixForRotation(rotation) {
    const rotations = this.getRotations();
    rotation = rotation % rotations.length;

    return rotations[rotation];
  }
}

// Matrices are indexed by x, then y, so the matrix is a list of columns
// Given a matrix of 0's (representing nothing) and 1's (representing a coordinate),
// and an origin point for the top left of the matrix, converts the matrix into
// an array of Coords
function deconstructMatrix(matrix, origin) {
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
