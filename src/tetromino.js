import Coord from './coord';

export {createT};

class Tetromino {
  constructor(id, coords, type) {
    this.id = id;
    this.coords = coords;
    this.type = type;
    const topLeft = findTopLeft(coords);
    this.origin = new Coord(topLeft.x - 1, topLeft.y - 1);
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
    return createBlock(this.id, coords, this.type);
  }
}

function findTopLeft(coords) {
  let left = null;
  let top = null;
  for (let i = 0; i < coords.length; i++) {
    const c = coords[i];
    if (left === null || c.x < left) {
      left = c.x;
    }

    if (top === null || c.y < top) {
      top = c.y;
    }
  }

  return new Coord(left, top);
}

function createT(id, center) {
  let coords = [center, center.left(), center.right(), center.down()];

  return createBlock(id, coords, 'T');
}

function createBlock(id, coords, type) {
  if (type === 'T') {
    return new TBlock(id, coords);
  }

  throw Exception(`No such type: ${type}`);
}

class TBlock extends Tetromino {
  constructor(id, coords) {
    super(id, coords, 'T');
  }
}

function _getClassForType(type) {
  if (type === 'T') {
    return TBlock;
  }

  throw Exception(`No such type: ${type}`);
}
