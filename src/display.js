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

    this.layerPieces.destroyChildren();

    if (state.paused) {
      this.layerPieces.add(pauseMessage(this.stage));
    }

    // update active piece shape
    if (state.active !== null) {
      // todo: nuke and pave every tick is probably very inefficient. Should do a diff
      // or move shapes or something
      // todo: don't actually need this with destroyChildren() above
      this.shapes.forEach(s => s.destroy());

      // Active piece
      this.shapes = [];

      if (!state.paused) {
        const active = createPolys(this.gridSize, state.active);
        this.shapes = this.shapes.concat(active);
        // Stack pieces
        for (let piece of state.stack) {
          const stack = createPolys(this.gridSize, piece);
          this.shapes = this.shapes.concat(stack);
        }
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
      if (!state.paused) {
        this.shapes = createPolys(this.gridSize, state.next);
        this.shapes.forEach(s => this.layerPieces.add(s));
      }
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

function pauseMessage(stage) {
  console.log("Pause is on");

  const text = new Konva.Text({
    x: stage.width() / 2,
    y: stage.height() / 2,
    text: 'GAME PAUSED',
    fontSize: 50,
    stroke: '#424242',
    strokeWidth: 1,
    fontFamily: 'Arial',
    fill: '#ffbb00',
  });

  text.offsetX(text.width() / 2);
  text.offsetY(text.height() / 2);

  return text;
}

function createStage(gridSize, width, height, mountId) {
  return new Konva.Stage({
    container: mountId,
    // +4 (stroke width) so that we have enough room to draw the full stroke
    // even when the piece is up against the right or bottom sides
    width: gridSize * width + 4,
    height: gridSize * height + 4
  });
}

function createPolys(gridSize, piece) {
  const color = chooseColor(piece);

  return piece.coords.map(c => {
    return new Konva.Rect({
      // +2 (half the stroke-width) because otherwise the stroke is centered
      // on the edge, meaning half of it is cut off when the piece is up
      // against the top or left side
      x: c.x * gridSize + 2,
      y: c.y * gridSize + 2,
      width: gridSize,
      height: gridSize,
      fill: color,
      stroke: 'black',
      strokeWidth: 4
    })});
}

function chooseColor(piece) {
  if (piece.type === 'I') {
    return '#1ee2e6'
  } else if (piece.type === 'J') {
    return '#1b1be3'
  } else if (piece.type === 'L') {
    return '#dbb418'
  } else if (piece.type === 'O') {
    return '#d2d918'
  } else if (piece.type === 'S') {
    return '#1cd415'
  } else if (piece.type === 'T') {
    return '#8715d4'
  }  else if (piece.type === 'Z') {
    return '#d4152b'
  }
}