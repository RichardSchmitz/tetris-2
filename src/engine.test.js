import assert from 'assert';
import { TetrisEngine } from './engine';
import { Coord } from './coord';
import { TBlock } from './tetromino/t';
import * as testUtils from '../test/testUtils';

describe('Tetris Engine', function () {
  it('Move down with clear path', function () {
    const engine = new TetrisEngine(9, 10);
    engine._state.started = true;
    engine._state.active = new TBlock('foo',
     [new Coord(3, 0), new Coord(4, 0), new Coord(5, 0), new Coord(4, 1)], 0);
     engine.handleMoveDown();

     assert.deepEqual(
      [new Coord(3, 1), new Coord(4, 1), new Coord(5, 1), new Coord(4, 2)],
      engine._state.active.coords);
  });

  it('Move down with clear path 2', function () {
    const scenario = testUtils.loadTestScenario('move_down_with_clear_path');
    scenario.execute();
    scenario.validate();
  });
});