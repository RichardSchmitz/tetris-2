import GameBoard from './gameboard.js';
import T from './tblock.js';
import './style.css';

const gridSize = 50;
const board = new GameBoard(gridSize, 10, 10, 'container');
const t = new T(gridSize);

board.deployPiece(t);

document.addEventListener('keydown', e => board.handleKeypress(e));

window.setInterval(() => board.handleTick(), 1000);
