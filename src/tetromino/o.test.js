import assert from 'assert';
import {createO} from './o';
import { Coord } from '../coord';

describe('O Tetromino', function() {
  it('Constructor', function() {
    let piece = createO('foo');

    assert.equal('foo', piece.id);
    assert.equal('O', piece.type);
    assert.equal(0, piece.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0), new Coord(0, 1), new Coord(1, 0), new Coord(1, 1)],
      piece.coords
    );
  });

  it('Translate right', function() {
    let piece = createO('foo');
    let translated = piece.translateRight();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('O', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(2, 0), new Coord(2, 1)],
      translated.coords);
  });

  it('Translate left', function() {
    let piece = createO('foo');
    let translated = piece.translateLeft();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('O', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(-1, 0), new Coord(-1, 1), new Coord(0, 0), new Coord(0, 1)],
      translated.coords);
  });

  it('Translate up', function() {
    let piece = createO('foo');
    let translated = piece.translateUp();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('O', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, -1), new Coord(0, 0), new Coord(1, -1), new Coord(1, 0)],
      translated.coords);
  });

  it('Translate down', function() {
    let piece = createO('foo');
    let translated = piece.translateDown();

    assert.notEqual(piece, translated);
    assert.equal('foo', translated.id);
    assert.equal('O', translated.type);
    assert.equal(0, translated.rotation);

    assert.deepEqual(
      [new Coord(0, 1), new Coord(0, 2), new Coord(1, 1), new Coord(1, 2)],
      translated.coords);
  });

  it('Rotate clockwise once', function() {
    let piece = createO('foo');
    let rotated = piece.rotateCw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('O', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(0, 1), new Coord(1, 0), new Coord(1, 1)],
      rotated.coords);
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createO('foo');
    let rotated = piece.rotateCcw();

    assert.notEqual(piece, rotated);
    assert.equal('foo', rotated.id);
    assert.equal('O', rotated.type);
    assert.equal(0, rotated.rotation);

    assert.deepEqual(
      [new Coord(0, 0), new Coord(0, 1), new Coord(1, 0), new Coord(1, 1)],
      rotated.coords);
  });
});