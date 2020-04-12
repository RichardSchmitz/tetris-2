import assert from 'assert';
import { LevelDashboard, ScoreDashboard } from './dashboard';

describe('Dashboard', function () {
  it('Level dashboard notify', function () {
    const element = {
      textContent: 'nothing'
    };
    const context = {
      getElementById: function (id) {
        assert.equal(id, 'foo');
        return element;
      }
    };

    const dashboard = new LevelDashboard('foo', context);

    assert.equal(element.textContent, 'nothing');
    dashboard.notify({ level: 1 });
    assert.equal(element.textContent, 'Level: 1');
    dashboard.notify({ level: '123' });
    assert.equal(element.textContent, 'Level: 123');
  });

  it('Score dashboard notify', function () {
    const element = {
      textContent: 'nothing'
    };
    const context = {
      getElementById: function (id) {
        assert.equal(id, 'foo');
        return element;
      }
    };

    const dashboard = new ScoreDashboard('foo', context);

    assert.equal(element.textContent, 'nothing');
    dashboard.notify({ score: 1 });
    assert.equal(element.textContent, 'Score: 1');
    dashboard.notify({ score: '123' });
    assert.equal(element.textContent, 'Score: 123');
  });
});
