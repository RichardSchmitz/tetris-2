export class MonitorListener {
  constructor(globalScope, tick) {
    this.paused = false;
    this.started = false;
    this.gameOver = false;
    this.globalScope = globalScope;
    this.tick = tick;
    this.tickInterval = null;
  }

  notify(state) {
    if (!this.started && state.started) {
      // Just started the game, so set up the tick
      this.globalScope.setInterval(this.tick, 1000);
    }

    // capture current state
    this.paused = state.paused;
    this.started = state.started;
    this.gameOver = state.gameOver;
  }
}