import assert from 'assert';
import {createI} from './i';
import { Coord } from '../coord';

describe('I Tetromino', function() {
  it('Constructor', function() {
    let piece = createI('foo');

    assert.equal('foo', piece.id);
    assert.equal('I', piece.type);
    assert.equal(0, piece.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(1, 3)],
      piece.coords
    );
  });

  it('Translate right', function() {
    let piece = createI('foo');
    let translated = piece.translateRight();

    assert.equal('foo', translated.id);
    assert.equal('I', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(2, 0), new Coord(2, 1), new Coord(2, 2), new Coord(2, 3)],
      translated.coords
    );
  });

  it('Translate left', function() {
    let piece = createI('foo');
    let translated = piece.translateLeft();

    assert.equal('foo', translated.id);
    assert.equal('I', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 0), new Coord(0, 1), new Coord(0, 2), new Coord(0, 3)],
      translated.coords
    );
  });

  it('Translate up', function() {
    let piece = createI('foo');
    let translated = piece.translateUp();

    assert.equal('foo', translated.id);
    assert.equal('I', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(1, -1), new Coord(1, 0), new Coord(1, 1), new Coord(1, 2)],
      translated.coords
    );
  });

  it('Translate down', function() {
    let piece = createI('foo');
    let translated = piece.translateDown();

    assert.equal('foo', translated.id);
    assert.equal('I', translated.type);
    assert.equal(0, translated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 1), new Coord(1, 2), new Coord(1, 3), new Coord(1, 4)],
      translated.coords
    );
  });

  it('Rotate clockwise once', function() {
    let piece = createI('foo');
    let rotated = piece.rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('I', rotated.type);
    assert.equal(1, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(2, 1), new Coord(3, 1)],
      rotated.coords
    );
  });

  it('Rotate clockwise twice', function() {
    let piece = createI('foo');
    let rotated = piece.rotateCw().rotateCw();

    assert.equal('foo', rotated.id);
    assert.equal('I', rotated.type);
    assert.equal(0, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(1, 3)],
      rotated.coords
    );
  });

  it('Rotate counter-clockwise once', function() {
    let piece = createI('foo');
    let rotated = piece.rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('I', rotated.type);
    assert.equal(1, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(0, 1), new Coord(1, 1), new Coord(2, 1), new Coord(3, 1)],
      rotated.coords
    );
  });

  it('Rotate counter-clockwise twice', function() {
    let piece = createI('foo');
    let rotated = piece.rotateCcw().rotateCcw();

    assert.equal('foo', rotated.id);
    assert.equal('I', rotated.type);
    assert.equal(0, rotated.rotation);
    
    assert.deepEqual(
      [new Coord(1, 0), new Coord(1, 1), new Coord(1, 2), new Coord(1, 3)],
      rotated.coords
    );
  });
});