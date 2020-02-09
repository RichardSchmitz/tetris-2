import Konva from 'konva';

export class GameBoard {
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
      this.initStage(state);
    }

    // update active piece shape
    if (state.active !== null) {
      // todo: nuke and pave every tick is probably very inefficient. Should do a diff
      // or move shapes or something
      this.shapes.forEach(s => s.destroy());

      // Active piece
      this.shapes = [];
      const active = createPolys(this.gridSize, state.active);
      this.shapes = this.shapes.concat(active);
      // Stack pieces
      for (let piece of state.stack) {
        const stack = createPolys(this.gridSize, piece);
        this.shapes = this.shapes.concat(stack);
      }

      this.shapes.forEach(s => this.layerPieces.add(s));
      this.layerPieces.draw();
    }
  }

  initStage(state) {
    this.stage = createStage(this.gridSize, state.width(), state.height(), this.mountId);

    this.layerPieces = new Konva.Layer();
    this.stage.add(this.layerPieces);
    this.layerPieces.draw();
  }
}

export class Preview {
  constructor(gridSize, mountId) {
    this.gridSize = gridSize;
    this.mountId = mountId;
    this.stage = null;
    this.layerPieces = null;
    this.shapes = [];
  }

  notify(state) {
    if (this.stage === null) {
      this.initStage();
    }

    // update active piece shape
    if (state.next !== null) {
      // todo: nuke and pave every tick is probably very inefficient. Should do a diff
      // or move shapes or something
      this.shapes.forEach(s => s.destroy());

      // Next piece
      this.shapes = createPolys(this.gridSize, state.next);

      this.shapes.forEach(s => this.layerPieces.add(s));
      this.layerPieces.draw();
    }
  }

  initStage() {
    // Based on the size of the largest piece (I)
    this.stage = createStage(this.gridSize, 4, 4, this.mountId);

    this.layerPieces = new Konva.Layer();
    this.stage.add(this.layerPieces);
    this.layerPieces.draw();
  }
}

function createStage(gridSize, width, height, mountId) {
  return new Konva.Stage({
    container: mountId,
    width: gridSize * width,
    height: gridSize * height
  });
}

function createPolys(gridSize, piece) {
  return piece.coords.map(c => {
    return new Konva.Rect({
      x: c.x * gridSize,
      y: c.y * gridSize,
      width: gridSize,
      height: gridSize,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    })});
}