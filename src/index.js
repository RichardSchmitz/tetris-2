import GameBoard from './gameboard.js';
import Circle from './circle.js';

function container() {
  const element = document.createElement('div');
  element.id = 'container';

  return element;
}

const cont = container()

document.body.appendChild(cont);

const board = new GameBoard(500, 500, 'container');
const circle = new Circle(250, 250, 70);

board.deployPiece(circle);

document.addEventListener('keydown', e => board.handleKeypress(e));
