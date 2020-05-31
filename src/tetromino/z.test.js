import assert from 'assert';
import {createZ} from './z';
import { Coord } from '../coord';

describe('Z Tetromino', function() {
  it('Constructor', function() {
    let piece = createZ('foo');

    assert.equal('foo', piece.id);
    assert.equal('Z', piece.type);
    assert.equal(0, piece.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, 0), new Coord(1, 1), new Coord(2, 1)],
      piece.coords
    );
  });


  it('Translate right', function() {
    let piece = createZ('foo');
    let translated = piece.translateRight();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('Z', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(2, 0), new Coord(2, 1), new Coord(3, 1)],
      translated.coords);
  });

  it('Translate left', function() {
    let piece = createZ('foo');
    let translated = piece.translateLeft();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('Z', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(-1, 0), new Coord(0, 0), new Coord(0, 1), new Coord(1, 1)],
      translated.coords);
  });

  it('Translate up', function() {
    let piece = createZ('foo');
    let translated = piece.translateUp();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('Z', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, -1), new Coord(1, -1), new Coord(1, 0), new Coord(2, 0)],
      translated.coords);
  });

  it('Translate down', function() {
    let piece = createZ('foo');
    let translated = piece.translateDown();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('Z', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(1, 2), new Coord(2, 2)],
      translated.coords);
  });

  it('Rotate clockwise once', function() {
    let piece = createZ('foo');
    let rotated = piece.rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('Z', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(0, 2), new Coord(1, 0), new Coord(1, 1)],
      rotated.coords);
  });

  it('Rotate clockwise twice', function() {
    let piece = createZ('foo');
    let rotated = piece.rotateCw().rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('Z', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, 0), new Coord(1, 1), new Coord(2, 1)],
      rotated.coords);
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createZ('foo');
    let rotated = piece.rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('Z', rotated.type);
    assert.equal(1, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(0, 2), new Coord(1, 0), new Coord(1, 1)],
      rotated.coords);
  });

  it('Rotate counter-clockwise twice', function() {
    let piece = createZ('foo');
    let rotated = piece.rotateCcw().rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('Z', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, 0), new Coord(1, 1), new Coord(2, 1)],
      rotated.coords);
  });
});