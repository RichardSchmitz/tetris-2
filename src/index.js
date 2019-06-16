import _ from 'lodash';
import printMe from './print.js';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

function container() {
  const element = document.createElement('div');
  element.id = 'container';

  return element;
}

document.body.appendChild(component());
document.body.appendChild(container());
