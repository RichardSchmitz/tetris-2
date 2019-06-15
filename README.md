# Tetris 2

The plan here is to rewrite my original Avenge Tetris using modern JS standards. Tools to use:

* Webpack for building the distribution
* Gulp for task running (if necessary)
* Babel for ES6-transpiling
* [Konva](https://konvajs.org/docs/) for HTML5 Canvas API

## Development

```
$ npm install # after a fresh clone only
$ npm run build
$ open dist/index.html
```

## Next steps

1. Go through [Webpack guides](https://webpack.js.org/guides/getting-started/) to get familiar with the build system. Completed Getting Started.
2. Install Konva and figure out how to make a basic cavnas for the game and pieces
3. Design classes and logic structure for game (using ES6 classes and Babel transpiling)
