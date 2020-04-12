import {TetrisEngine} from './engine';
import {ModernScoringSystem} from './scoring';
import {GameBoard, Preview} from './display.js';
import {LevelDashboard, ScoreDashboard} from "./dashboard";
import Keyboard from './controls';
import './style.css';

const engine = new TetrisEngine(9, 10);
const controls = new Keyboard(engine);
const scoring = new ModernScoringSystem();
engine.setScoring(scoring);
const gridSize = 50;
const display = new GameBoard(gridSize, 'gameboard');
engine.addListener(display);
const preview = new Preview(gridSize, 'preview');
engine.addListener(preview);
const level = new LevelDashboard('level', document);
engine.addListener(level);
const score = new ScoreDashboard('score', document);
engine.addListener(score);

engine.init();
engine.start();

document.addEventListener('keydown', e => controls.handleEvent(e));

// window.setInterval(() => board.handleTick(), 1000);
