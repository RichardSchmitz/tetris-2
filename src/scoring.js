export {Scorable, ModernScoringSystem};

class Scorable {
  constructor() {
    this.rowsCleared = [];
  }
}

// https://strategywiki.org/wiki/Tetris/Scoring
class ModernScoringSystem {
  constructor() {

  }

  update(state, scorable) {
    if (!scorable.rowsCleared) {
      // Nothing to do
      return;
    }

    if (scorable.rowsCleared.length > 0 && scorable.rowsCleared.length < 4) {
      // Normal clears
      const delta = (200 * scorable.rowsCleared.length - 100) * state.level;
      state.score += delta;
    } else {
      // Tetris
      const delta = 200 * scorable.rowsCleared.length * state.level;
      state.score += delta;
    }
  }
}