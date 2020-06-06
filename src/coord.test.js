import assert from 'assert';
import { Coord, groupCoordsByDimension } from './coord';

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

  it('Group by X', function() {
    let coords = [
      new Coord(1, 2),
      new Coord(1, 4),
      new Coord(1, 6),
      new Coord(2, 4),
      new Coord(2, 4),
      new Coord(4, 2)
    ];
    
    let grouped = groupCoordsByDimension(coords, c => c.x);

    assert.equal(grouped.length, 3);
    assert.ok(grouped[0].every(c => c.x === 1));
    assert.equal(grouped[0].length, 3);

    assert.ok(grouped[1].every(c => c.x === 2));
    assert.equal(grouped[1].length, 2);

    assert.ok(grouped[2].every(c => c.x === 4));
    assert.equal(grouped[2].length, 1);
  });

  it('Group by Y', function() {
    let coords = [
      new Coord(1, 2),
      new Coord(1, 4),
      new Coord(1, 6),
      new Coord(2, 4),
      new Coord(2, 4),
      new Coord(4, 2)
    ];
    
    let grouped = groupCoordsByDimension(coords, c => c.y);

    assert.equal(grouped.length, 3);
    assert.ok(grouped[0].every(c => c.y === 2));
    assert.equal(grouped[0].length, 2);

    assert.ok(grouped[1].every(c => c.y === 4));
    assert.equal(grouped[1].length, 3);

    assert.ok(grouped[2].every(c => c.y === 6));
    assert.equal(grouped[2].length, 1);
  });
});
