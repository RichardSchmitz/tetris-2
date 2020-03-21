import assert from 'assert';
import {createT} from './t';
import Coord from '../coord';

describe('TBlock', function() {
  it('Constructor', function() {
    let piece = createT('foo', new Coord(1, 1));

    assert.equal('foo', piece.id);
    assert.equal('T', piece.type);
    assert.equal(2, piece.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 0), new Coord(1, 1), new Coord(2, 1)],
      piece.coords);

  });

  it('Translate right', function() {
    let piece = createT('foo', new Coord(1, 1));
    let translated = piece.translateRight();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('T', translated.type);
    assert.equal(2, translated.rotation);

    assert.deepEqual(
      [new Coord(1, 1), new Coord(2, 0), new Coord(2, 1), new Coord(3, 1)],
      translated.coords);
  });

  it('Translate left', function() {
    let piece = createT('foo', new Coord(1, 1));
    let translated = piece.translateLeft();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('T', translated.type);
    assert.equal(2, translated.rotation);

    assert.deepEqual(
      [new Coord(-1, 1), new Coord(0, 0), new Coord(0, 1), new Coord(1, 1)],
      translated.coords);
  });

  it('Translate down', function() {
    let piece = createT('foo', new Coord(1, 1));
    let translated = piece.translateDown();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('T', translated.type);
    assert.equal(2, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 2), new Coord(1, 1), new Coord(1, 2), new Coord(2, 2)],
      translated.coords);
  });

  it('Rotate clockwise once', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(3, rotated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate clockwise twice', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1),  new Coord(1, 1), new Coord(1, 2), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate clockwise thrice', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCw().rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1),  new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      rotated.coords);
  });

  it('Rotate clockwise 4 times', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCw().rotateCw().rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(2, rotated.rotation);

    // It's important that 4 rotations puts the coordinates in the same order
    // as the starting point, otherwise subsequent rotations will be incorrect.
    // 4 rotations should be an identity, and order matters.
    assert.deepEqual(
//    [new Coord(1, 1), new Coord(0, 1), new Coord(2, 1), new Coord(1, 0)],
//      [new Coord(1, 1), new Coord(0, 1), new Coord(2, 1), new Coord(1, 0)],
      piece.coords,
      rotated.coords);
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1),  new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      rotated.coords);
  });

  it('Rotate counter-clockwise twice', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1),  new Coord(1, 1), new Coord(1, 2), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate counter-clockwise thrice', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCcw().rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(3, rotated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate counter-clockwise four times', function() {
    let piece = createT('foo', new Coord(1, 1));
    let rotated = piece.rotateCcw().rotateCcw().rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('T', rotated.type);
    assert.equal(2, rotated.rotation);

    assert.deepEqual(
      piece.coords,
      rotated.coords);
  });
});