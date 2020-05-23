import assert from 'assert';
import {createP} from './p';
import Coord from '../coord';

describe('Pixel Tetromino', function () {
  it('Constructor', function() {
    let piece = createP('foo');

    assert.equal('foo', piece.id);
    assert.equal('P', piece.type);
    assert.equal(0, piece.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0)],
      piece.coords
    );
  });

  it('Translate right', function() {
    let piece = createP('foo');
    let translated = piece.translateRight();

    assert.equal('foo', translated.id);
    assert.equal('P', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0)],
      translated.coords
    );
  });

  it('Translate left', function() {
    let piece = createP('foo');
    let translated = piece.translateLeft();

    assert.equal('foo', translated.id);
    assert.equal('P', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(-1, 0)],
      translated.coords
    );
  });

  it('Translate up', function() {
    let piece = createP('foo');
    let translated = piece.translateUp();

    assert.equal('foo', translated.id);
    assert.equal('P', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(0, -1)],
      translated.coords
    );
  });

  it('Translate down', function() {
    let piece = createP('foo');
    let translated = piece.translateDown();

    assert.equal('foo', translated.id);
    assert.equal('P', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1)],
      translated.coords
    );
  });

  it('Rotate clockwise once', function() {
    let piece = createP('foo');
    let rotated = piece.rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('P', rotated.type);
    assert.equal(0, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0)],
      rotated.coords
    );
  });

  it('Rotate counterclockwise once', function() {
    let piece = createP('foo');
    let rotated = piece.rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('P', rotated.type);
    assert.equal(0, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0)],
      rotated.coords
    );
  });
});
