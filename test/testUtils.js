const fs = require('fs');

export class TestScenarioValidator {
  loadTestScenario(state, scenario) {
    const contents = fs.readFileSync(`resources/${scenario}`);
    
  }
}