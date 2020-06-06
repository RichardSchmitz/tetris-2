import assert from 'assert';
import { createS, determineRotation } from './s';
import { Coord } from '../coord';

describe('S Tetromino', function() {
  it('Constructor', function() {
    let piece = createS('foo');

    assert.equal('foo', piece.id);
    assert.equal('S', piece.type);
    assert.equal(0, piece.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 0), new Coord(1, 1), new Coord(2, 0)],
      piece.coords
    );
  });

  it('Translate right', function() {
    let piece = createS('foo');
    let translated = piece.translateRight();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('S', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(1, 1), new Coord(2, 0), new Coord(2, 1), new Coord(3, 0)],
      translated.coords);
  });

  it('Translate left', function() {
    let piece = createS('foo');
    let translated = piece.translateLeft();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('S', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(-1, 1), new Coord(0, 0), new Coord(0, 1), new Coord(1, 0)],
      translated.coords);
  });

  it('Translate up', function() {
    let piece = createS('foo');
    let translated = piece.translateUp();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('S', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, -1), new Coord(1, 0), new Coord(2, -1)],
      translated.coords);
  });

  it('Translate down', function() {
    let piece = createS('foo');
    let translated = piece.translateDown();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('S', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 2), new Coord(1, 1), new Coord(1, 2), new Coord(2, 1)],
      translated.coords);
  });

  it('Rotate clockwise once', function() {
    let piece = createS('foo');
    let rotated = piece.rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('S', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(2, 1), new Coord(2, 2)],
      rotated.coords);
  });

  it('Rotate clockwise twice', function() {
    let piece = createS('foo');
    let rotated = piece.rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('S', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 0), new Coord(1, 1), new Coord(2, 0)],
      rotated.coords);
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createS('foo');
    let rotated = piece.rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('S', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(2, 1), new Coord(2, 2)],
      rotated.coords);
  });

  it('Rotate counter-clockwise twice', function() {
    let piece = createS('foo');
    let rotated = piece.rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('S', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 0), new Coord(1, 1), new Coord(2, 0)],
      rotated.coords);
  });

  it('Determine rotation for position 0', function() {
    const coords = [
      new Coord(1, 0),
      new Coord(1, 1),
      new Coord(0, 1),
      new Coord(2, 0)
    ];

    const rotation = determineRotation(coords);
    assert.equal(rotation, 0);
  });

  it('Determine rotation for position 1', function() {
    const coords = [
      new Coord(2, 0),
      new Coord(2, 1),
      new Coord(3, 1),
      new Coord(3, 2)
    ];

    assert.equal(determineRotation(coords), 1);
  });
});