export class LevelDashboard {
  constructor(mountId, context) {
    this.mountId = mountId;
    this.context = context;
  }

  notify(state) {
    this.context.getElementById(this.mountId).textContent = `Level: ${state.level}`;
  }
}

export class ScoreDashboard {
  constructor(mountId, context) {
    this.mountId = mountId;
    this.context = context;
  }

  notify(state) {
    this.context.getElementById(this.mountId).textContent = `Score: ${state.score}`;
  }
}