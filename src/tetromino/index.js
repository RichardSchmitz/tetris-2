export {createI} from './i';
export {createT} from './t';
export {createZ} from './z';
export {createS} from './s';
export {createL} from './l';
export {leftmostCoord, rightmostCoord, topmostCoord, bottommostCoord} from './tetromino';

import {createI} from './i';
import {createT} from './t';
import {createZ} from './z';
import {createS} from './s';
import {createL} from './l';

export function randomTetromino() {
  const id = Math.random().toString().substring(2, 7);

  const choice = Math.floor(Math.random() * 7);
  if (choice === 0) {
    return createT(id);
  } else if (choice === 1) {
    return createZ(id);
  } else if (choice === 2) {
    return createS(id);
  } else if (choice === 3) {
    return createL(id);
  } else {
    return createI(id);
  }
}