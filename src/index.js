import GameBoard from './gameboard.js';
import T from './tblock.js';

function container() {
  const element = document.createElement('div');
  element.id = 'container';

  return element;
}

const cont = container()

document.body.appendChild(cont);

const board = new GameBoard(500, 500, 'container');
// const circle = new Circle(250, 250, 70);
const t = new T(100, 100, 50);

board.deployPiece(t);

document.addEventListener('keydown', e => board.handleKeypress(e));
