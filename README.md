# Tetris 2

This is a complete rewrite of my original [Avenge Tetris](https://github.com/RichardSchmitz/AvengeTetris) using modern JS standards. The original was hacked together with duct tape and glue since I knew nothing about modern JS development. This version uses:

* Webpack for building the distribution
* Babel for ES6-transpiling
* [Konva](https://konvajs.org/docs/) for HTML5 Canvas API
* NPM for dependency management and task running
* Mocha for tests
* Istanbul for test coverage reports
* Object-oriented design with clean separation of concerns

I used VSCode for development and in-IDE debugging. This is my first time using a JS IDE but I have to say that VSCode was quite good.

It's certainly not perfect, and I would like to make some improvements, but it feels good to come back to this 6 years later, after some professional experience, and rewrite it using what I've learned. Although to be fair, I've been doing mostly Java work, so my JavaScript may still be a little out-of-date or non-idiomatic.

## Development

```
$ npm install # after a fresh clone only
$ npm start # starts the dev server on localhost:8080 for automatic compilation and reloading
$ npm run build # build production artifacts (optimized and without dev niceties)
```

# Gameplay

A, S, D move left, down and right, respectively.

Left/right arrow keys rotate pieces.

P to pause.

## Things to improve

1. Fully fleshed-out engine tests
  * I was antsy to start a new project, so I skimped on this. I wrote an integration test runner with the idea of recording a full game's worth of play and turning this into a test, but to date, it's only got one simple proof-of-concept test.
2. On-screen instructions for controls
3. Clean up bad/unused code
  * I think there's some stuff in Matrix utils at least that can be deleted.
  * I think also there's some stuff in TetrisState which ended up being unnecessary
4. Bug: every so often, one of the rows will clear but the pieces above won't move down. Not sure what happened there but the code for clearing pieces is somewhat complex so it's likely I made a mistake there. Should fix this bug and add a test to cover it better.
  * After 3rd row (y = 7) cleared, pieces don't seem to move down into it
5. Implement soft and hard drops. If you hold S for a second, it should move down quickly. Similarly, quick left-right movement.
6. Implement piece kick-off from other blocks (currently only works for walls)
7. Implement hold box (to save a piece for later)
8. Resize playfield. Currently 9x10, but https://tetris.wiki lists the playfield as 10x20.
  * This should be as simple as modifying the initial dimensions passed to the engine, but I'm not 100% convinced I didn't hard-code some dimensions in there with the intention of coming back and fixing it later.
9. Convert to TypeScript
10. Visual/UI improvements (eg. better contrast on GAME OVER screen)
