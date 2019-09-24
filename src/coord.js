export default class Coord {
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
