export { Coord, leftmost, rightmost, topmost, bottommost };

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
