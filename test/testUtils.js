import assert from 'assert';
import { TetrisEngine } from '../src/engine';
import { createT, randomId, createZ, createS, createL, createJ, createO, createI } from '../src/tetromino';
import { moveDown, moveLeft, moveRight, rotateCw, rotateCcw, pause, tick } from '../src/action';
import { createMatrix, fillMatrix } from '../src/matrix';
import { TetrisState } from '../src/state';
import { PixelTetromino } from '../src/tetromino/p';
import { Coord, leftmost, bottommost, topmost, rightmost } from '../src/coord';
import { TBlock } from '../src/tetromino/t';

const fs = require('fs');
const path = require('path');

const BLANK = '_';

export class TestScenarioValidator {
  constructor(engine, actions, expectedState) {
    this.engine = engine;
    this.actions = actions;
    this.expectedState = expectedState;
  }

  execute() {
    this.actions.forEach(a => a.execute(this.engine));
  }

  validate() {
    const expectedStr = serializeState(this.expectedState);
    const actualStr = serializeState(this.engine._state);

    assert.equal(actualStr, expectedStr);
  }
}

export function loadTestScenario(filename) {
  const testPath = path.join(__dirname, 'resources', filename);
  const contents = fs.readFileSync(testPath, 'utf8');
  
  const scenario = parseTestScenario(contents);
  const engine = buildEngine(scenario);
  const actions = buildActions(scenario);
  const finalState = buildState(scenario.final);

  return new TestScenarioValidator(engine, actions, finalState);
}

function buildEngine(scenario) {
  const engine = new TetrisEngine(scenario.grid.width, scenario.grid.height);
  engine.setTetrominoGenerator(() => {
    const letter = scenario.pieces.shift();
    return createPieceFromLetter(letter);
  });
  engine._state = buildState(scenario.initial);
  engine._state.next = engine._nextTetromino();

  engine.addListener({notify: state => console.log(serializeState(state))});

  return engine;
}

function buildActions(scenario) {
  return scenario.actions.map(createActionFromLetter);
}

function buildState(grid) {
  const state = new TetrisState(grid.length, grid[0].length);

  const activeMap = new Map();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const letter = grid[i][j];

      if (letter === BLANK) {
        continue;
      } 

      const coord = new Coord(i, j);

      if (letter === 'X') {
        state.stack.push(new PixelTetromino(randomId(), coord));
      } else {
        // add coord to active piece map
        if (!activeMap.has(letter)) {
          activeMap.set(letter, []);
        }
        activeMap.get(letter).push(coord);
      }
    }
  }

  // construct active piece
  if (activeMap.size != 1) {
    throw new Error(`Expected to find exactly 1 active piece,` +
    ` but found ${activeMap.size} of types ${Array.from(activeMap.keys())}`)
  }

  const type = activeMap.keys().next().value;
  const coords = activeMap.get(type);
  state.active = createPieceFromLetterAndCoords(type, coords);

  state.started = true;

  return state;
}

function parseTestScenario(contents) {
  // This only works for newline-style breaks (notably, not \r)
  let grid = {width: null, height: null}
  let pieces = [];
  let actions = [];
  let initial = null;
  let final = null;

  const lines = contents.split(/\n/);
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith('//') || line.length == 0) {
      // Skip comments and empty lines
      continue;
    }
    const propVal = line.split('=', 2);
    const property = propVal[0].trim();
    const value = propVal[1] === undefined ? '' : propVal[1].trim();

    if (property === 'grid') {
      grid =  parseGridDimensions(value);
      continue;
    }

    if (property === 'pieces') {
      pieces = value.split('');
      continue;
    }

    if (property === 'actions') {
      actions = value.split('');
      continue;
    }

    if (property === 'initial') {
      const nextProp = findGridEnd(i + 1, lines);
      initial = parseGrid(lines.slice(i + 1, nextProp));
      i = nextProp - 1;
    }

    if (property === 'final') {
      const nextProp = findGridEnd(i + 1, lines);
      final = parseGrid(lines.slice(i + 1, nextProp));
      i = nextProp - 1;
    }
  }

  return {
    grid: grid,
    pieces: pieces,
    actions: actions,
    initial: initial,
    final: final
  };
}

function parseGridDimensions(dimStr) {
  const dimensions = dimStr.split(/x/, 2);
  const width = parseInt(dimensions[0].trim());
  const height = parseInt(dimensions[1].trim());

  return {width: width, height: height};
}

function findGridEnd(gridStart, lines) {
  // Iterate through lines, starting at `gridStart`
  // Return the line number of the next blank line,
  // comment or property. This signifies the end of
  // the grid representation.
  let i = gridStart;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('//') || line.length == 0 || line.includes('=')) {
      break;
    }
    i++;
  }

  return i;
}

// Returns a representation of the grid as a 2d matrix M[x][y]
function parseGrid(gridLines) {
  // Since we're operating on lines (ie. y-values),
  // the first coordinate of reverseGrid is the y-value
  // and the second coordinate is the x-value. In order
  // to return a sane grid, we reverse these coordinates
  const reverseGrid = gridLines.map(s => s.split(''));
  const grid = createMatrix(reverseGrid[0].length, reverseGrid.length);

  for (let j = 0; j < reverseGrid.length; j++) {
    for (let i = 0; i < reverseGrid[j].length; i++) {
      grid[i][j] = reverseGrid[j][i];
    }
  }

  return grid;
}

function createPieceFromLetter(letter) {
  const id = randomId();

  if (letter === 'T') {
    return createT(id);
  } else if (letter === 'Z') {
    return createZ(id);
  } else if (letter === 'S') {
    return createS(id);
  } else if (letter === 'L') {
    return createL(id);
  } else if (letter === 'J') {
    return createJ(id);
  } else if (letter === 'O') {
    return createO(id);
  } else if (letter === 'I') {
    return createI(id);
  }

  throw new Error(`Unknown piece letter: ${letter}`);
}

// This also validates that there are 4 unique coords,
// but it does not check that they are contiguous.
// It is assumed that the person writing test cases
// has some semblance of competence!
function createPieceFromLetterAndCoords(letter, coords) {
  const id = randomId();

  if (letter === 'T') {
    const rotation = determineRotationT(coords);
    return new TBlock(id, coords, rotation);
  } else if (letter === 'Z') {
    const rotation = determineRotationZ(coords);
    return new ZBlock(id, coords, rotation);
  } else if (letter === 'S') {
    const rotation = determineRotationS(coords);
    return new SBlock(id, coords, rotation);
  } else if (letter === 'L') {
    const rotation = determineRotationL(coords);
    return new LBlock(id, coords, rotation);
  } else if (letter === 'J') {
    const rotation = determineRotationJ(coords);
    return new JBlock(id, coords, rotation);
  } else if (letter === 'O') {
    const rotation = determineRotationO(coords);
    return new OBlock(id, coords, rotation);
  } else if (letter === 'I') {
    const rotation = determineRotationI(coords);
    return new IBlock(id, coords, rotation);
  }

  throw new Error(`Unknown piece letter: ${letter}`);
}

function determineRotationT(coords) {
  assertSize(coords);
  assertUniqueCoords(coords);

  if (bottommost(coords).y - topmost(coords).y === 1) {
    if (rightmost(coords).y - topmost(coords).y === 1) {
      return 2;
    } else {
      return 0;
    }
  } else {
    if (rightmost(coords).x - topmost(coords).x === 1) {
      return 3;
    } else {
      return 1;
    }
  }
}

function determineRotationZ(coords) {
  assertSize(coords);
  assertUniqueCoords(coords);

  if (bottommost(coords).y - topmost(coords).y === 1) {
    return 0;
  }

  return 1;
}

function determineRotationS(coords) {
  assertSize(coords);
  assertUniqueCoords(coords);

  if (bottommost(coords).y - topmost(coords).y === 1) {
    return 0;
  }

  return 1;
}

function determineRotationL(coords) {
  assertSize(coords);
  assertUniqueCoords(coords);
  // todo: how to determine this?
  if (bottommost(coords).y - topmost(coords).y === 1) {
    if (bottommost(coords).y - rightmost(coords).y === 1) { // this isn't right
      return 1;
    } else {
      return 3;
    }
  } else {
    if (bottommost(coords).x - rightmost(coords).x === 1) {
      return 0;
    } else {
      return 2;
    }
  }
}

function determineRotationJ(coords) {
    // todo: how to determine this?
}

function determineRotationO(coords) {
  assertSize(coords);
  assertUniqueCoords(coords);

  return 0; // only rotation for OBlock
}

function determineRotationI(coords) {
  assertSize(coords);
  assertUniqueCoords(coords);

  if (bottommost(coords).x - topmost(coords).x === 0) {
    return 1;
  }

  return 0;
}

function assertSize(coords) {
  if (coords.length != 4) {
    throw new Error(`Expected 4 coordinates but found ${coords.length}`);
  }
}

function assertUniqueCoords(coords) {
  const coordSet = new Set();
  coords.forEach(c => coordSet.add(`x${c.x}y${c.y}`));

  if (coords.length != coordSet.size) {
    throw new Error(`${coords.length - coordSet.size} coords are` +
      ` not unique: ${JSON.stringify(coords)}`)
  }
}

function createActionFromLetter(letter) {
  if (letter === 'D') {
    return moveDown();
  } else if (letter === 'L') {
    return moveLeft();
  } else if (letter === 'R') {
    return moveRight();
  } else if (letter === 'C') {
    return rotateCw();
  } else if (letter === 'K') {
    return rotateCcw();
  } else if (letter === 'P') {
    return pause();
  } else if (letter === 'T') {
    return tick();
  }
}

function serializeState(state) {
  const m = createMatrix(state.width(), state.height());
  fillMatrix(m, state.stack.concat([state.active]));

    const rows = [];
    for (let j = 0; j < state.height(); j++) {
      const row = [];
      for (let i = 0; i < state.width(); i++) {
        const piece = m[i][j];

        if (piece === null) {
          row.push(BLANK);
        } else {
          row.push(m[i][j].type);
        }
      }
      rows.push(row.join(''));
    }

    return '\n' + rows.join('\n');
}