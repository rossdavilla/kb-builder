# KB Builder

A simple kettlebell workout builder: pick your equipment, level, and categories, generate a workout, then track your rounds. Every exercise links to a demo video, and the Movement Library has setup, steps, and common mistakes for all 82 moves.

Live site: https://rossdavilla.github.io/kb-builder/

- `index.html` builds the workout and tracks rounds
- `library.html` is the movement library (link to one move with `library.html#<move-slug>`)
- `js/exercises.js` holds the exercise data, the curated demo videos, and the workout generator
- `js/app.js`, `js/library.js` run each page; `css/styles.css` is shared

The exercise data and generator logic come from [Kettlebell Flow](https://gustlv1.github.io/kettlebell-flow/).
