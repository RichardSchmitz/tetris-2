import assert from 'assert';
import {topmostCoord, bottommostCoord, leftmostCoord, rightmostCoord} from './tetromino';
import Coord from '../coord';

describe('Tetromino Utils', function() {
  it('Topmost coord', function() {
    const piece = {coords: [new Coord(1, 2), new Coord(2, 3), new Coord(0, 1), new Coord(-1, 4)]}
    const result = topmostCoord(piece);
    assert.deepEqual(new Coord(0, 1), result);
  });

  it('Bottommost coord', function() {
    const piece = {coords: [new Coord(1, 2), new Coord(2, 3), new Coord(0, 1), new Coord(-1, 4)]}
    const result = bottommostCoord(piece);
    assert.deepEqual(new Coord(-1, 4), result);
  });

  it('Leftmost coord', function() {
    const piece = {coords: [new Coord(1, 2), new Coord(2, 3), new Coord(0, 1), new Coord(-1, 4)]}
    const result = leftmostCoord(piece);
    assert.deepEqual(new Coord(-1, 4), result);
  });

  it('Rightmost coord', function() {
    const piece = {coords: [new Coord(1, 2), new Coord(2, 3), new Coord(0, 1), new Coord(-1, 4)]}
    const result = rightmostCoord(piece);
    assert.deepEqual(new Coord(2, 3), result);
  });
});
