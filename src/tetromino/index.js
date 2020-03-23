export {createI} from './i';
export {createT} from './t';
export {createZ} from './z';
export {createS} from './s';
export {createL} from './l';
export {createJ} from './j';
export {createO} from './o';
export {leftmostCoord, rightmostCoord, topmostCoord, bottommostCoord} from './tetromino';

import {createI} from './i';
import {createT} from './t';
import {createZ} from './z';
import {createS} from './s';
import {createL} from './l';
import {createJ} from './j';
import {createO} from './o';

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
  } else if (choice === 4) {
    return createJ(id);
  } else if (choice === 5) {
    return createO(id);
  } else {
    return createI(id);
  }
}