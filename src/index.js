import {TetrisEngine} from './engine';
import GameBoard from './display.js';
import Keyboard from './controls';
import './style.css';

const engine = new TetrisEngine(9, 10);
const controls = new Keyboard(engine);
const gridSize = 50;
const display = new GameBoard(gridSize, 'gameboard');
engine.addListener(display);
engine.init();
engine.start();

// board.deployPiece(t);

document.addEventListener('keydown', e => controls.handleEvent(e));

// window.setInterval(() => board.handleTick(), 1000);
