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

1. Engine tests
2. Automatic falling pieces (see also: https://www.quora.com/How-do-Tetris-levels-work)
``