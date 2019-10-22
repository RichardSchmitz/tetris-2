import assert from 'assert';
import * as matrixUtil from './matrix';

describe('Matrix', function() {
  it('Create matrix', function() {
    let matrix = matrixUtil.createMatrix(5, 6);

    assert.equal(5, matrix.length);
    for (let i = 0; i < 5; i++) {
      assert.equal(6, matrix[i].length);
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 6; j++) {
        assert.strictEqual(null, matrix[i][j]);
      }
    }
  });

  it('Fill matrix', function() {
    // 4x4 matrix
    const matrix = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const piece1 = {coords: [{x: 0, y: 0}, {x: 1, y:0}, {x: 1, y: 1}]};
    const piece2 = {coords: [{x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}]};

    matrixUtil.fillMatrix(matrix, [piece1, piece2]);

    for (let c of piece1.coords) {
      assert.strictEqual(piece1, matrix[c.x][c.y]);
    }

    for (let c of piece2.coords) {
      assert.strictEqual(piece2, matrix[c.x][c.y]);
    }

    const nullCoords = [{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 1, y: 2}, {x: 1, y: 3},
                        {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 0}];
    for (let c of nullCoords) {
      assert.strictEqual(null, matrix[c.x][c.y]);
    }
  });
});
