import assert from 'assert';
import { Scorable, ModernScoringSystem } from './scoring';

describe('Modern Scoring System', function () {
  it('No rows cleared', function () {
    const scorable = new Scorable();
    const state = {
      score: 100,
      level: 3
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 3);
    assert.equal(state.score, 100);
  });

  it('1 row cleared - level 1', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1];

    const state = {
      score: 100,
      level: 1,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 1);
    assert.equal(state.score, 200);
    assert.equal(state.totalRowsCleared, 2);
  });

  it('2 rows cleared - level 1', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1, 2];

    const state = {
      score: 100,
      level: 1,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 2);
    assert.equal(state.score, 400);
    assert.equal(state.totalRowsCleared, 3);
  });

  it('3 rows cleared - level 1', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1, 2, 3];

    const state = {
      score: 100,
      level: 1,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 2);
    assert.equal(state.score, 600);
    assert.equal(state.totalRowsCleared, 4);
  });

  it('4 rows cleared - level 1', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1, 2, 3, 4];

    const state = {
      score: 100,
      level: 1,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 2);
    assert.equal(state.score, 900);
    assert.equal(state.totalRowsCleared, 5);
  });

  it('1 row cleared - level 3', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1];

    const state = {
      score: 100,
      level: 3,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 3);
    assert.equal(state.score, 400);
    assert.equal(state.totalRowsCleared, 2);
  });

  it('2 rows cleared - level 3', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1, 2];

    const state = {
      score: 100,
      level: 3,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 3);
    assert.equal(state.score, 1000);
    assert.equal(state.totalRowsCleared, 3);
  });

  it('3 rows cleared - level 3', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1, 2, 3];

    const state = {
      score: 100,
      level: 3,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 3);
    assert.equal(state.score, 1600);
    assert.equal(state.totalRowsCleared, 4);
  });

  it('4 rows cleared - level 3', function () {
    const scorable = new Scorable();
    scorable.rowsCleared = [1, 2, 3, 4];

    const state = {
      score: 100,
      level: 3,
      totalRowsCleared: 1
    };

    const scoring = new ModernScoringSystem();
    scoring.update(state, scorable);
    assert.equal(state.level, 3);
    assert.equal(state.score, 2500);
    assert.equal(state.totalRowsCleared, 5);
  });
});
