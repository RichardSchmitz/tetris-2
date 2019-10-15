import Konva from 'konva';

export default class GameBoard {
  constructor(gridSize, mountId) {
    this.gridSize = gridSize;
    this.mountId = mountId;
    this.stage = null;
    this.layerPieces = null;
    this.activePiece = null;
    this.shapes = [];
  }

  notify(state) {
    if (this.stage === null) {
      this.initStage(state.debris.length, state.debris[0].length); // todo: possibly a better way to get grid dimensions
    }

    // update active piece shape
    if (state.active !== null) {
      // todo: nuke and pave every tick is probably very inefficient. Should do a diff
      // or move shapes or something
      this.shapes.forEach(s => s.destroy());

      // Active piece
      this.shapes = [];
      const active = this.createPolys(state.active);
      this.shapes = this.shapes.concat(active);
      // Stack pieces
      for (let piece of state.stack) {
        const stack = this.createPolys(piece);
        this.shapes = this.shapes.concat(stack);
      }

      this.shapes.forEach(s => this.layerPieces.add(s));
      this.layerPieces.draw();
    }
  }

  createPolys(piece) {
    return piece.coords.map(c => {
      return new Konva.Rect({
      x: c.x * this.gridSize,
      y: c.y * this.gridSize,
      width: this.gridSize,
      height: this.gridSize,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    })});
  }

  initStage(width, height) {
    this.stage = new Konva.Stage({
      container: this.mountId,
      width: this.gridSize * width,
      height: this.gridSize * height
    });

    this.layerPieces = new Konva.Layer();
    this.stage.add(this.layerPieces);
    this.layerPieces.draw();
  }

  handleTick() {
    if (this.activePiece) {
      if (this._canMoveDown(this.activePiece)) {
        this.activePiece.move(0, this.gridSize);
        this.layerPieces.draw();
      }
    }
  }

  _gridCoord(c) {
    return c / this.gridSize;
  }

  deployPiece(piece) {
    piece.addToContainer(this.layerPieces);
    piece.moveTo(4 * this.gridSize, 0);
    this.activePiece = piece;
    this.layerPieces.draw();
  }
}
