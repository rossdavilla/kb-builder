# KB Builder

A simple kettlebell workout builder: pick your equipment, level, and categories, generate a workout, then track your rounds. Every exercise links to a demo video, and the Movement Library has setup, steps, and common mistakes for all 82 moves.

Live site: https://rossdavilla.github.io/kettlebell/

- `index.html` builds the workout and tracks rounds
- `library.html` is the movement library (link to one move with `library.html#<move-slug>`)
- `js/exercises.js` holds the exercise data, the curated demo videos, and the workout generator
- `js/app.js`, `js/library.js` run each page; `css/styles.css` is shared
- `images/moves/<move-slug>.png` is an optional start/end diagram for a move (3:2, e.g. `kettlebell-deadlift.png`). When one exists, cards show it instead of the video thumbnail; moves without one keep the video thumbnail.

The exercise data and generator logic come from [Kettlebell Flow](https://gustlv1.github.io/kettlebell-flow/).
