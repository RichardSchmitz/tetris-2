import assert from 'assert';
import {createT} from './tetromino';
import Coord from './coord';

describe('TBlock', function() {
  it('Constructor', function() {
    let piece = createT('foo', new Coord(1, 1));
    assert.equal('foo', piece.id);
    assert.equal(4, piece.coords.length);
    assert.equal('T', piece.type);

    // center
    assert.equal(1, piece.coords[0].x);
    assert.equal(1, piece.coords[0].y);

    // left
    assert.equal(0, piece.coords[1].x);
    assert.equal(1, piece.coords[1].y);

    // right
    assert.equal(2, piece.coords[2].x);
    assert.equal(1, piece.coords[2].y);

    // bottom
    assert.equal(1, piece.coords[3].x);
    assert.equal(2, piece.coords[3].y);
  });

  it('Translate right', function() {
    let piece = createT('foo', new Coord(1, 1));
    let translated = piece.translateRight();

    assert.notEqual(piece, translated);

    // center
    assert.equal(2, translated.coords[0].x);
    assert.equal(1, translated.coords[0].y);

    // left
    assert.equal(1, translated.coords[1].x);
    assert.equal(1, translated.coords[1].y);

    // right
    assert.equal(3, translated.coords[2].x);
    assert.equal(1, translated.coords[2].y);

    // bottom
    assert.equal(2, translated.coords[3].x);
    assert.equal(2, translated.coords[3].y);

    assert.equal('foo', translated.id);
    assert.equal('T', translated.type);
  });

  it('Translate left', function() {
    let piece = createT('foo', new Coord(1, 1));
    let translated = piece.translateLeft();

    assert.notEqual(piece, translated);

    // center
    assert.equal(0, translated.coords[0].x);
    assert.equal(1, translated.coords[0].y);

    // left
    assert.equal(-1, translated.coords[1].x);
    assert.equal(1, translated.coords[1].y);

    // right
    assert.equal(1, translated.coords[2].x);
    assert.equal(1, translated.coords[2].y);

    // bottom
    assert.equal(0, translated.coords[3].x);
    assert.equal(2, translated.coords[3].y);

    assert.equal('foo', translated.id);
    assert.equal('T', translated.type);
  });

  it('Translate down', function() {
    let piece = createT('foo', new Coord(1, 1));
    let translated = piece.translateDown();

    assert.notEqual(piece, translated);

    // center
    assert.equal(1, translated.coords[0].x);
    assert.equal(2, translated.coords[0].y);

    // left
    assert.equal(0, translated.coords[1].x);
    assert.equal(2, translated.coords[1].y);

    // right
    assert.equal(2, translated.coords[2].x);
    assert.equal(2, translated.coords[2].y);

    // bottom
    assert.equal(1, translated.coords[3].x);
    assert.equal(3, translated.coords[3].y);

    assert.equal('foo', translated.id);
    assert.equal('T', translated.type);
  });
});
