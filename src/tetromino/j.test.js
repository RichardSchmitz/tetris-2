import assert from 'assert';
import { createJ, determineRotation } from './j';
import { Coord } from '../coord';

describe('J Tetromino', function() {
  it('Constructor', function() {
    let piece = createJ('foo');

    assert.equal('foo', piece.id);
    assert.equal('J', piece.type);
    assert.equal(0, piece.rotation);
    
    assert.deepEqual(
      [new Coord(0, 2), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      piece.coords
    );
  });

  it('Translate right', function() {
    let piece = createJ('foo');
    let translated = piece.translateRight();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('J', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(1, 2), new Coord(2, 0), new Coord(2, 1), new Coord(2, 2)],
      translated.coords);
  });

  it('Translate left', function() {
    let piece = createJ('foo');
    let translated = piece.translateLeft();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('J', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(-1, 2), new Coord(0, 0), new Coord(0, 1), new Coord(0, 2)],
      translated.coords);
  });

  it('Translate up', function() {
    let piece = createJ('foo');
    let translated = piece.translateUp();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('J', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, -1), new Coord(1, 0), new Coord(1, 1)],
      translated.coords);
  });

  it('Translate down', function() {
    let piece = createJ('foo');
    let translated = piece.translateDown();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('J', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 3), new Coord(1, 1), new Coord(1, 2), new Coord(1, 3)],
      translated.coords);
  });

  it('Rotate clockwise once', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(0, 1), new Coord(1, 1), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate clockwise twice', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(2, rotated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(2, 0)],
      rotated.coords);
  });

  it('Rotate clockwise thrice', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCw().rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(3, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(2, 1), new Coord(2, 2)],
      rotated.coords);
  });

  it('Rotate clockwise four times', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCw().rotateCw().rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 2), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      rotated.coords);
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(3, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(2, 1), new Coord(2, 2)],
      rotated.coords);
  });

  it('Rotate counter-clockwise twice', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(2, rotated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(2, 0)],
      rotated.coords);
  });

  it('Rotate counter-clockwise thrice', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCcw().rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(0, 1), new Coord(1, 1), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate counter-clockwise four times', function() {
    let piece = createJ('foo');
    let rotated = piece.rotateCcw().rotateCcw().rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('J', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 2), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      rotated.coords);
  });

  it('Determine rotation for position 0', function() {
    const coords = [
      new Coord(1, 0),
      new Coord(1, 1),
      new Coord(1, 2),
      new Coord(0, 2)
    ];

    const rotation = determineRotation(coords);
    assert.equal(rotation, 0);
  });

  it('Determine rotation for position 1', function() {
    const coords = [
      new Coord(0, 0),
      new Coord(0, 1),
      new Coord(1, 1),
      new Coord(2, 1)
    ];

    assert.equal(determineRotation(coords), 1);
  });

  it('Determine rotation for position 2', function() {
    const coords = [
      new Coord(2, 0),
      new Coord(1, 0),
      new Coord(1, 1),
      new Coord(1, 2)
    ];

    assert.equal(determineRotation(coords), 2);
  });

  it('Determine rotation for position 3', function() {
    const coords = [
      new Coord(0, 1),
      new Coord(1, 1),
      new Coord(2, 1),
      new Coord(2, 2)
    ];

    assert.equal(determineRotation(coords), 3);
  });
});