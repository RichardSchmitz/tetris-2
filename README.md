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

## To Do

1. Add more/better engine tests
  i. record a full game by printing out the state after each step, then turn this into a test
2. Add soft and hard drop
3. Visual/UI improvements (eg. better contrast on GAME OVER screen)

## Issues

1. After 3rd row (y = 7) cleared, pieces don't seem to move down into it