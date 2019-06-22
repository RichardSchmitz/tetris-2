import GameBoard from './gameboard.js';
import T from './tblock.js';
import './style.css';

const board = new GameBoard(500, 500, 'container');
const t = new T(100, 100, 50);

board.deployPiece(t);

document.addEventListener('keydown', e => board.handleKeypress(e));
