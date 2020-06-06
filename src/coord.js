export { Coord, leftmost, rightmost, topmost, bottommost , groupCoordsByDimension };

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  up() {
    return new Coord(this.x, this.y - 1);
  }

  down() {
    return new Coord(this.x, this.y + 1);
  }

  right() {
    return new Coord(this.x + 1, this.y);
  }

  left() {
    return new Coord(this.x - 1, this.y);
  }
}

// ie. least x-value
function leftmost(coords) {
  // Sort by descending x value
  return _getLastCoord(coords, (c1, c2) => c2.x - c1.x);
}

// ie. greatest x-value
function rightmost(coords) {
  // Sort by ascending x value
  return _getLastCoord(coords, (c1, c2) => c1.x - c2.x);
}

// ie. least y-value
function topmost(coords) {
  // Sort by ascending y value
  return _getLastCoord(coords, (c1, c2) => c2.y - c1.y);
}

// ie. greatest y-value
function bottommost(coords) {
  // Sort by ascending y value
  return _getLastCoord(coords, (c1, c2) => c1.y - c2.y);
}

function _getLastCoord(coords, arrangement) {
  return coords.slice() // Create a shallow copy of the array
               .sort(arrangement)
               .pop(); // Get the last one (this modifies the array, which is why we created a copy)
}

// Takes an array of coords and a function `dimension`, which maps
// a coord to a given dimension (x or y value).
// Returns an array of arrays of coords, where each inner array
// contains all the coords with the same dimension value.
// The outer array is sorted by ascending dimension value
// 
// eg. groupCoordsByDimension([{0, 0}, {0, 1}, {1, 1}], c => c.x)
// would return [[{0, 0}, {0, 1}], [{1, 1}]], coords groupe by x value
function groupCoordsByDimension(coords, dimension) {
  let dBuckets = new Map();
    coords.map(dimension).forEach(d => dBuckets.set(d, []));
    dBuckets = coords.reduce((buckets, coord) => {
      buckets.get(dimension(coord)).push(coord);
      return buckets;
    }, dBuckets);
    
    return Array.from(dBuckets.entries())
      .sort((e1, e2) => e1[0] - e2[0])
      .map(e => e[1]);
}