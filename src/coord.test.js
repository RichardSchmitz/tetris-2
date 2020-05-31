import assert from 'assert';
import { Coord } from './coord';

describe('Coord', function() {
  it('Constructed with literal coordinates', function() {
    let coord = new Coord(1, 4);
    assert.equal(coord.x, 1);
    assert.equal(coord.y, 4);
  });

  it('Can have unusual values', function() {
    let coord = new Coord(0, -4);
    assert.equal(coord.x, 0);
    assert.equal(coord.y, -4);
  });

  it('Translates immutably', function() {
    let original = new Coord(1, 1);
    assert.equal(original.x, 1);
    assert.equal(original.y, 1);

    let up = original.up();
    assert.equal(up.x, 1);
    assert.equal(up.y, 0);
    assert.equal(original.x, 1);
    assert.equal(original.y, 1);
    assert.notEqual(original, up);

    let down = original.down();
    assert.equal(down.x, 1);
    assert.equal(down.y, 2);
    assert.equal(original.x, 1);
    assert.equal(original.y, 1);
    assert.notEqual(original, down);

    let left = original.left();
    assert.equal(left.x, 0);
    assert.equal(left.y, 1);
    assert.equal(original.x, 1);
    assert.equal(original.y, 1);
    assert.notEqual(original, left);

    let right = original.right();
    assert.equal(right.x, 2);
    assert.equal(right.y, 1);
    assert.equal(original.x, 1);
    assert.equal(original.y, 1);
    assert.notEqual(original, right);
  });

  it('Equality', function() {
    let c1 = new Coord(1, 4);
    let equal = new Coord(1, 4);
    assert.notEqual(c1, equal);
    assert.deepEqual(c1, equal);

    let notEqual = new Coord(2, 4);
    assert.notDeepEqual(c1, notEqual);
  });
});
