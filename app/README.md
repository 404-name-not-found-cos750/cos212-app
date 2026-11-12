# Tree Hop: the COS212 app

A pre-lecture game that teaches **binary tree traversal**: pre-order, in-order and post-order.

## Running it

No install or build step. It's plain HTML, CSS and JavaScript.

- **Quickest:** open `app/index.html` in a browser (double-click it).
- **Local server (optional):** from the repo root, run `npx serve app` or `python -m http.server -d app 8000`, then open the printed address.
- **Online:** https://cos212-tree-hop.vercel.app (Vercel serves this `app/` folder as a static site; any other static host works too).

It works offline, so the demo doesn't depend on the venue's Wi-Fi.

## What's in it

| Page | What the student does |
|---|---|
| **Home** | Picks the tutorial or one of the three games. Shows stars earned per game. |
| **Tutorial** (6 steps) | 1. Meet the tree: tap the root, a leaf, a child. 2. Watch the monkey walk around the tree; each node is passed 3 times (1st = pre, 2nd = in, 3rd = post). 3–5. One step per order: watch a step-by-step demo, then practise with hints. 6. Quick check: 3 questions, with links back to the steps the student got wrong. |
| **Games** (pre / in / post) | Tap the nodes in the right order and the monkey jumps to each one. 5 levels from 3 to 12 nodes, with random trees each time. |
| **Endless ∞** (level 6) | Unlocks after clearing level 5. Back-to-back random trees that grow from 5 to 15 nodes. No hints, and 3 hearts for the whole run, with a heart won back every 5 trees. Best score is saved per game. When the run ends, the student can step through the tree they failed on. |
| **🎲 Random Order** | Unlocks at 40 of the 45 stars. Every tree gets a random order (never the same order 3 times in a row), shown in a big colour-coded banner. Trees grow from 4 to 25 nodes and from 2 to 4 levels deep. One life: the first wrong tap ends the run. Score: +1 per correct node, plus a bonus equal to the tree's size when you clear it. The high score is saved. |

### Assessment and scaffolding in the game

- Every wrong tap costs a heart (3 per level) and explains *why* it was wrong, e.g. "In post-order children come before parents. 30 still has unvisited nodes below it."
- After 2 mistakes the **Hint** button lights up. A hint highlights the next node and says why it's next.
- With no hearts left, the student is offered a **step-by-step walkthrough** of that tree, then a fresh tree.
- Stars: 3 = no mistakes or hints, 2 = up to 2 mistakes and hints combined, 1 = finished. A level unlocks the next one.
- Progress is saved in the browser's local storage on that device only.

## Code layout

```
index.html        Page shell; loads the scripts in order
css/style.css     All styling (light and dark mode)
js/tree.js        Tree model: random trees, traversal orders, mistake explanations, hint text
js/view.js        SVG tree drawing, monkey animation, visit-order bar, Board (tap-in-order puzzle)
js/game.js        Game page: levels, hearts, hints, walkthrough, stars
js/random.js      Random Order mode (unlock check, mixed orders, high score)
js/tutorial.js    Tutorial steps and quiz
js/main.js        Saved progress, home page, hash router (#/, #/tutorial, #/play/pre|in|post)
```
