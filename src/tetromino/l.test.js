import assert from 'assert';
import {createL} from './l';
import Coord from '../coord';

describe('L Tetromino', function() {
  it('Constructor', function() {
    let piece = createL('foo');

    assert.equal('foo', piece.id);
    assert.equal('L', piece.type);
    assert.equal(2, piece.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      piece.coords
    );
  });

  it('Translate right', function() {
    let piece = createL('foo');
    let translated = piece.translateRight();

    assert.equal('foo', translated.id);
    assert.equal('L', translated.type);
    assert.equal(2, translated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0), new Coord(2, 0), new Coord(2, 1), new Coord(2, 2)],
      translated.coords
    );
  });

  it('Translate left', function() {
    let piece = createL('foo');
    let translated = piece.translateLeft();

    assert.equal('foo', translated.id);
    assert.equal('L', translated.type);
    assert.equal(2, translated.rotation);
    
    assert.deepEqual(
      [new Coord(-1, 0), new Coord(0, 0), new Coord(0, 1), new Coord(0, 2)],
      translated.coords
    );
  });

  it('Translate up', function() {
    let piece = createL('foo');
    let translated = piece.translateUp();

    assert.equal('foo', translated.id);
    assert.equal('L', translated.type);
    assert.equal(2, translated.rotation);
    
    assert.deepEqual(
      [new Coord(0, -1), new Coord(1, -1), new Coord(1, 0), new Coord(1, 1)],
      translated.coords
    );
  });

  it('Translate down', function() {
    let piece = createL('foo');
    let translated = piece.translateDown();

    assert.equal('foo', translated.id);
    assert.equal('L', translated.type);
    assert.equal(2, translated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(1, 2), new Coord(1, 3)],
      translated.coords
    );
  });

  it('Rotate clockwise once', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(3, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(2, 0), new Coord(2, 1)],
      rotated.coords
    );
  });

  it('Rotate clockwise twice', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCw().rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(0, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(2, 2)],
      rotated.coords
    );
  });

  it('Rotate clockwise thrice', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCw().rotateCw().rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(1, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(0, 2), new Coord(1, 1), new Coord(2, 1)],
      rotated.coords
    );
  });

  it('Rotate clockwise four times', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCw().rotateCw().rotateCw().rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(2, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      rotated.coords
    );
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(1, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(0, 2), new Coord(1, 1), new Coord(2, 1)],
      rotated.coords
    );
  });

  it('Rotate counter-clockwise twice', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCcw().rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(0, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(2, 2)],
      rotated.coords
    );
  });

  it('Rotate counter-clockwise thrice', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCcw().rotateCcw().rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(3, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(2, 0), new Coord(2, 1)],
      rotated.coords
    );
  });

  it('Rotate counter-clockwise four times', function() {
    let piece = createL('foo');
    let rotated = piece.rotateCcw().rotateCcw().rotateCcw().rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('L', rotated.type);
    assert.equal(2, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      rotated.coords
    );
  });
});