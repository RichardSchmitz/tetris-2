export class MonitorListener {
  constructor(globalScope, tick) {
    this.paused = false;
    this.started = false;
    this.gameOver = false;
    this.level = 1;
    this.globalScope = globalScope;
    this.tick = tick;
    this.tickInterval = null;
  }

  notify(state) {
    if (this.level !== state.level) {
      this.level = state.level;
      this.startTick();
    }

    if (state.gameOver) {
      // Game is over, so stop the tick
      this.stopTick();
    } else if (!this.started && state.started) {
      // Just started the game, so set up the tick
      this.startTick();
    } else if (!this.paused && state.paused) {
      // Just paused the game, so stop ticking
      this.stopTick();
    } else if (this.paused && !state.paused) {
      // Just unpaused the game, so start ticking
      this.startTick();
    }

    // capture current state
    this.paused = state.paused;
    this.started = state.started;
    this.gameOver = state.gameOver;
  }

  stopTick() {
    if (this.tickInterval !== null) {
      this.globalScope.clearInterval(this.tickInterval);
    }
  }

  startTick() {
    this.stopTick();
    this.tickInterval = this.globalScope.setInterval(this.tick, 2000 / (this.level + 1));
  }
}