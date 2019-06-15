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
```

## Next steps

1. Go through [Webpack guides](https://webpack.js.org/guides/getting-started/) to get familiar with the build system. Completed:
  * Getting Started
  * Asset Management (skipped through it)
  * Output Management
  * Development
  * **Next up: Hot Module Replacement**
2. Install Konva and figure out how to make a basic cavnas for the game and pieces
3. Design classes and logic structure for game (using ES6 classes and Babel transpiling)
