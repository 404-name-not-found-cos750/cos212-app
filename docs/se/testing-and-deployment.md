# Testing and deployment

## Testing approach

We test Tree Hop at three levels, each matched to the kind of fault it is best at finding:

| Level | What it checks | How | When |
|---|---|---|---|
| Unit tests | The tree model in `app/js/tree.js`: traversal orders, random trees, mistake explanations and hint text; and loading saved progress in `app/js/main.js` | Node's built-in test runner (`node:test`), `npm test` | On every push and pull request to `main` (CI), and locally before a PR |
| Manual exploratory testing | The pages, drawing, animation, taps, hearts, stars, unlocks and saved progress | Playing every page in Chrome and Safari, on a laptop and a phone | Before each PR to `main` and after each deployment |
| Usability test | Whether students without COS212 can learn from the app and use it without help | 3–5 students, observed while they work through the tutorial and a game | Once, on Fri 13 Nov |

### Why only the model is unit-tested
The tree model is where a mistake would teach students something wrong: a wrong traversal sequence, a feedback message that blames the wrong node, or a hint that points to the wrong next step. It is also pure logic with no dependence on the page, so it can be tested quickly and exhaustively. The other files (`view.js`, `game.js`, `random.js`, `tutorial.js`, `main.js`) are mostly drawing, animation and page flow. Faults there are visible on screen, and whether the screens are clear is a question about people rather than code, so we cover them with manual testing and the usability test instead of a browser-automation framework, which would have cost more time than we had. The one exception is loading saved progress in `main.js`: damaged saved data used to leave the page blank on every visit, so the loader has its own tests.

`tree.js` is a plain browser script with no build step (decision 004). To test it without changing it, the test file loads it into a Node `vm` context and reads the `Tree` object back out, so the file the browser runs is exactly the file that is tested. The tests need no npm packages.

### Unit tests
`tests/tree.test.js` has **43 tests** in five areas. Several tests run over hundreds of random trees, so one run checks thousands of cases.

| Area | Tests | What they cover |
|---|---|---|
| Traversal orders on known trees | 22 | Pre-, in- and post-order sequences on six hand-built trees (the tutorial tree, an unbalanced tree, a single node, a left-only chain, a right-only chain and a zig-zag chain), checked against sequences worked out by hand; an empty tree; in-order of a binary search tree comes out sorted; the monkey's walk around the tree passes every node three times and its first, second and third passes give the three orders; each mode's rule text (e.g. "Left → Root → Right") |
| Building a tree from a nested list | 2 | Nodes are numbered level by level; each node's parent, depth and layout position are correct |
| Random trees | 5 | For every tree size and depth limit the app uses (game levels, Endless and Random Order), 200 trees each: the exact node count, no node deeper than the limit, unique values from 1 to 99, consistent parent and child links, and every order visits every node once. Also 2 000 trees with random sizes and limits, a one-node tree, a tree filled to its depth limit is perfect, and the trees really do vary in shape and values |
| Explanations for a wrong tap | 9 | The exact message for each kind of mistake in each order (e.g. tapping a parent before its children in post-order, or going right before the parent in in-order); the same wrong tap gets a different, order-specific message in each order; the general reminder of the rule when no specific reason applies; and a check that plays 300 random trees to the end and, at every step, taps every wrong node: every explanation must be a specific one and what it says must be true of the tree (for example, the node it says "hasn't been visited yet" really is unvisited) |
| Hint text for the next node | 5 | The exact hint for each kind of next node in each order (the root, a left or right child, a node with or without a left child, the first leaf, a leaf reached after a left subtree, a parent), and for a one-node tree; and a check that plays 300 random trees to the end and, at every step, asks for the hint: it must name the node to tap, be one of the known sentences, and what it says must be true (for example, if it says "3's left subtree is done", 3 really is that node's parent and every node on its left has been visited) |

`tests/store.test.js` has **13 tests** for loading saved progress (`Store` in `main.js`). It loads `main.js` with the scripts it needs into a `vm` context with a fake `localStorage`, and checks that nothing saved, blocked storage, invalid JSON, JSON that isn't an object, star values out of range or of the wrong type, star lists of the wrong length, bad best scores and a `tutorialDone` that isn't exactly `true` all give a working home page with sensible values, and that valid saved data (including the demo seed) loads and saves back unchanged.

On 15 Nov all **56 tests** pass (43 + 13). The tree tests found no bugs when they were written. The store tests were written for a bug found in the app review: damaged or unexpected saved data made `main.js` throw while loading, which left a blank page. They fail against the old `main.js` and pass after the fix in PR #39.

### Continuous integration
A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main` and on every pull request into `main`. It sets up Node.js 20, runs `node --check` on every file in `app/js/` (so a syntax error in any script fails the build, not only in `tree.js`), and then runs `npm test`. The result shows on each pull request, so the reviewer can see whether the tests pass before merging.

### Manual and usability testing
Manual testing follows the demo path: home page, all six tutorial steps, each game from level 1 to Endless, Random Order, and reloading the page to check that progress is kept. We repeat it on the deployed URL and on the offline copy. [TODO Galen: confirm which browsers and devices were actually used, and list any bugs found this way.]

[TODO Galen: results from usability test on Fri 13 Nov — participants (number, background, no names), tasks, what they found hard, the bug list and what we changed as a result.]

## Deployment

| Aspect | Choice |
|---|---|
| Host | Vercel (Galen's Pro account), project root directory `app`, framework preset "Other", no build command |
| Trigger | Vercel's Git integration deploys `main` to production on every push or merge; pull requests get preview URLs |
| What is served | The static files in `app/` as they are in the repository: HTML, CSS and JavaScript, with no build step |
| Backend | None. There are no accounts and no server-side data |
| Saved progress | The browser's `localStorage`, on that device only |
| Live URL | https://cos212-tree-hop.vercel.app |

Decision 004 planned GitHub Pages. We moved to Vercel because the repository stays private until the presentation, and GitHub Pages does not serve private repositories on a free organisation. Because the app is static, the move needed no code changes, and the same files can be served by any static host or opened straight from disk.

## Demo risk plan

The live demo is worth part of the presentation mark and runs on venue Wi-Fi we don't control, so we have two fallbacks, each independent of the one before it:

| Order | Fallback | Depends on | Prepared by |
|---|---|---|---|
| 1 | Live URL on Vercel (phone hotspot if the venue Wi-Fi fails) | Internet access | Deployed from `main` after the code freeze |
| 2 | Offline copy: the `app/` folder on the laptop and a USB stick, opened from `index.html` | Only a browser | Copied from the final `main` and tested with Wi-Fi turned off |
| 3 | Recorded backup video of the full demo (about 10 minutes) | Only a video player | Recorded on the final build, following the demo script |

Because the app has no backend, fallbacks 1 and 2 run exactly the same code, so switching between them during the demo takes seconds and changes nothing the panel sees.
