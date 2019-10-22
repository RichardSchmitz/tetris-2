export {fillMatrix, createMatrix};

// Fills the given matrix with references to the pieces. No return value.
// Assumes all piece coordinates are within the dimensions of the matrix.
function fillMatrix(matrix, pieces) {
  for (const piece of pieces) {
    for (const coord of piece.coords) {
      matrix[coord.x][coord.y] = piece;
    }
  }
}

// Creates a matrix of the given dimensions. Every cell contains null.
function createMatrix(width, height) {
  const matrix = [];
  for (let i = 0; i < width; i++) {
    matrix.push([]);
    for (let j = 0; j < height; j++) {
      matrix[i].push(null);
    }
  }

  return matrix;
}
