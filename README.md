# Tetris 2

The plan here is to rewrite my original Avenge Tetris using modern JS standards. Tools to use:

* Webpack for building the distribution
* Gulp for task running (if necessary)
* Babel for ES6-transpiling
* [Konva](https://konvajs.org/docs/) for HTML5 Canvas API

## Development

```
$ npm install # after a fresh clone only
$ npm start # starts the dev server on localhost:8080 for automatic compilation and reloading
$ npm run build # build production artifacts (optimized and without dev niceties)
```

## Next steps

1. Scoring/leveling algorithm ✅
2. Other pieces
  * I ✅
  * Z ✅
  * S ✅
  * L ✅
  * J ✅
  * O ✅
3. Pause screen ✅
4. Automatic falling pieces (see also: https://www.quora.com/How-do-Tetris-levels-work)
5. Loss condition & game over screen ✅
``