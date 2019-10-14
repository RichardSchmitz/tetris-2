import {TetrisEngine} from './engine';
import GameBoard from './display.js';
import './style.css';

const engine = new TetrisEngine(10, 10);
const gridSize = 50;
const display = new GameBoard(gridSize, 'container');
engine.addListener(display);
engine.init();
engine.start();

// board.deployPiece(t);

// document.addEventListener('keydown', e => board.handleKeypress(e));

// window.setInterval(() => board.handleTick(), 1000);
