import Konva from 'konva';

export default class Circle {
  constructor(x, y, radius) {
    this.circle = new Konva.Circle({
      x: x,
      y: y,
      radius: radius,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });
  }

  addToContainer(container) {
    container.add(this.circle);
  }

  move(dx, dy) {
    this.circle.x(this.circle.x() + dx);
    this.circle.y(this.circle.y() + dy);
  }
}
