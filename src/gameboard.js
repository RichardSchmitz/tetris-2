import Konva from 'konva';

export default class GameBoard {
  constructor(width, height, mountId) {
    this.stage = new Konva.Stage({
      container: mountId,
      width: width,
      height: height
    });

    this.layerPieces = new Konva.Layer();

    this.stage.add(this.layerPieces);

    this.activePiece = null;

    this.layerPieces.draw();
  }

  handleKeypress(event) {
    const DELTA = 4;

    if (this.activePiece) {
      if (event.keyCode === 37) {
        this.activePiece.move(-DELTA, 0);
      } else if (event.keyCode === 38) {
        this.activePiece.move(0, -DELTA);
      } else if (event.keyCode === 39) {
        this.activePiece.move(DELTA, 0);
      } else if(event.keyCode === 40) {
        this.activePiece.move(0, DELTA);
      } else {
        return;
      }

      event.preventDefault();
      this.layerPieces.batchDraw();
    }
  }

  deployPiece(piece) {
    piece.addToContainer(this.layerPieces);
    this.activePiece = piece;
    this.layerPieces.draw();
  }
}
