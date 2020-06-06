import * as coord from '../coord';

export {Tetromino, leftmostCoord, rightmostCoord, topmostCoord, bottommostCoord, deconstructMatrix, validateCoords};

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
        coords.push(new coord.Coord(i + origin.x, j + origin.y));
      }
    }
  }

  return coords;
}

function leftmostCoord(piece) {
  return coord.leftmost(piece.coords);
}

function rightmostCoord(piece) {
  return coord.rightmost(piece.coords);
}

function topmostCoord(piece) {
  return coord.topmost(piece.coords);
}

function bottommostCoord(piece) {
  return coord.bottommost(piece.coords);
}

function validateCoords(coords) {
  // A valid tetromino has exactly 4 unique coords
  if (coords.length != 4) {
    throw new Error(`Expected 4 coordinates but found ${coords.length}`);
  }

  const coordSet = new Set();
  coords.forEach(c => coordSet.add(`x${c.x}y${c.y}`));

  if (coords.length != coordSet.size) {
    throw new Error(`${coords.length - coordSet.size} coords are` +
      ` not unique: ${JSON.stringify(coords)}`)
  }
}