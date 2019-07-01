import Konva from 'konva';

// Orientations:
//   0:
//     a b c
//       d
//   1:
//       a
//     d b
//       c
//   2:
//      d
//    c b a
//   3:
//      c
//      b d
//      a
export default class T {
  constructor(sideLength) {
    const x = 0;
    const y = 0;

    this.a = new Konva.Rect({
      x: x,
      y: y,
      width: sideLength,
      height: sideLength,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    });

    this.b = new Konva.Rect({
      x: x + sideLength,
      y: y,
      width: sideLength,
      height: sideLength,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    });

    this.c = new Konva.Rect({
      x: x + 2 * sideLength,
      y: y,
      width: sideLength,
      height: sideLength,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    });

    this.d = new Konva.Rect({
      x: x + sideLength,
      y: y + sideLength,
      width: sideLength,
      height: sideLength,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    });

    this.sideLength = sideLength;
    this.orientation = 0;
  }

  allShapes() {
    return [this.a, this.b, this.c, this.d];
  }

  addToContainer(container) {
    this.allShapes().forEach(s => container.add(s));
  }

  move(dx, dy) {
    this.allShapes().forEach(s => {
      s.x(s.x() + dx);
      s.y(s.y() + dy);
    });
  }

  moveTo(x, y) {
    this.a.x(x);
    this.a.y(y);
    this.b.x(x + this.sideLength);
    this.b.y(y);
    this.c.x(x + 2 * this.sideLength);
    this.c.y(y);
    this.d.x(x + this.sideLength);
    this.d.y(y + this.sideLength);
  }

  minX() {
    if (this.orientation == 0) {
      return this.a.x();
    } else if (this.orientation == 1) {
      return this.d.x();
    } else if (this.orientation == 2) {
      return this.c.x();
    } else {
      return this.b.x();
    }
  }

  maxX() {
    if (this.orientation == 0) {
      return this.c.x() + this.sideLength;
    } else if (this.orientation == 1) {
      return this.b.x() + this.sideLength;
    } else if (this.orientation == 2) {
      return this.a.x() + this.sideLength;
    } else {
      return this.d.x() + this.sideLength;
    }
  }

  minY() {
    if (this.orientation == 0) {
      return this.b.y();
    } else if (this.orientation == 1) {
      return this.a.y();
    } else if (this.orientation == 2) {
      return this.d.y();
    } else {
      return this.c.y();
    }
  }

  maxY() {
    if (this.orientation == 0) {
      return this.d.y() + this.sideLength;
    } else if (this.orientation == 1) {
      return this.c.y() + this.sideLength;
    } else if (this.orientation == 2) {
      return this.b.y() + this.sideLength;
    } else {
      return this.a.y() + this.sideLength;
    }
  }

  rotateCw() {
    let xRotator = -1;
    let yRotator = -1;
    if (this.orientation === 1) {
      xRotator = 1;
    } else if (this.orientation === 2) {
      xRotator = 1;
      yRotator = 1;
    } else if (this.orientation === 3) {
      yRotator = 1;
    }

    this.c.x(this.c.x() + xRotator * this.sideLength);
    this.c.y(this.c.y() + yRotator * this.sideLength);

    let temp = this.c;
    this.c = this.d;
    this.d = this.a;
    this.a = temp;

    this.orientation = (this.orientation + 1) % 4;
  }

  rotateCcw() {
    let xRotator = 1;
    let yRotator = -1;
    if (this.orientation === 1) {
      yRotator = 1;
    } else if (this.orientation === 2) {
      xRotator = -1;
      yRotator = 1;
    } else if (this.orientation === 3) {
      xRotator = -1;
    }

    this.a.x(this.a.x() + xRotator * this.sideLength);
    this.a.y(this.a.y() + yRotator * this.sideLength);

    let temp = this.a;
    this.a = this.d;
    this.d = this.c;
    this.c = temp;

    this.orientation = (this.orientation + 3) % 4;
  }
}
