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
    if (!scorable.rowsCleared.length) {
      // Nothing to do
      return;
    }

    // Update score
    if (scorable.rowsCleared.length > 0 && scorable.rowsCleared.length < 4) {
      // Normal clears
      const delta = (200 * scorable.rowsCleared.length - 100) * state.level;
      state.score += delta;
    } else {
      // Tetris
      const delta = 200 * scorable.rowsCleared.length * state.level;
      state.score += delta;
    }

    // Update level
    state.totalRowsCleared += scorable.rowsCleared.length;
    const nextLevel = Math.floor(state.totalRowsCleared / 3) + 1;
    if (state.level < nextLevel) {
      // Only go up my one level at a time, regardless of how many rows have been cleared
      state.level += 1;
    }
  }
}