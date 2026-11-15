# Testing and deployment

## Testing approach

We test Tree Hop at three levels, each matched to the kind of fault it is best at finding:

| Level | What it checks | How | When |
|---|---|---|---|
| Unit tests | The tree model in `app/js/tree.js`: traversal orders, random trees, mistake explanations and hint text; and loading saved progress in `app/js/main.js` | Node's built-in test runner (`node:test`), `npm test` | On every push and pull request to `main` (CI), and locally before a PR |
| Manual exploratory testing | The pages, drawing, animation, taps, hearts, stars, unlocks and saved progress | Playing every page in Chrome and Safari, on a laptop and a phone | Before each PR to `main` and after each deployment |
| Usability test | Whether students without COS212 can learn from the app and use it without help | 5 adult participants with a self-completed questionnaire (section 7) | Once, before the submission |

### Why only the model is unit-tested
The tree model is where a mistake would teach students something wrong: a wrong traversal sequence, a feedback message that blames the wrong node, or a hint that points to the wrong next step. It is also pure logic with no dependence on the page, so it can be tested quickly and exhaustively. The other files (`view.js`, `game.js`, `random.js`, `tutorial.js`, `main.js`) are mostly drawing, animation and page flow. Faults there are visible on screen, and whether the screens are clear is a question about people rather than code, so we cover them with manual testing and the usability test instead of a browser-automation framework, which would have cost more time than we had. The one exception is loading saved progress in `main.js`: damaged saved data used to leave the page blank on every visit, so the loader has its own tests.

`tree.js` is a plain browser script with no build step (decision 004). The tests load it into a Node `vm` context, so the file the browser runs is exactly the file that is tested, and no npm packages are needed.

### Unit tests
`tests/tree.test.js` has **43 tests** in five areas. Several tests run over hundreds of random trees, so one run checks thousands of cases.

| Area | Tests | What they cover |
|---|---|---|
| Traversal orders on known trees | 22 | The three orders on six hand-built trees (including single-node and one-sided chains), checked against sequences worked out by hand; the monkey's three passes give the three orders; the rule text of each mode |
| Building a tree from a nested list | 2 | Node numbering, parents, depths and layout positions |
| Random trees | 5 | For every size and depth the app uses, 200 trees each: exact node count, depth limit, unique values from 1 to 99, and every order visits every node once |
| Explanations for a wrong tap | 9 | The message for each kind of mistake in each order, and a check over 300 random trees that every explanation is specific and true of the tree |
| Hint text for the next node | 5 | The hint for each kind of next node in each order, and a check over 300 random trees that every hint names the right node and is true |

`tests/store.test.js` has **13 tests** for loading saved progress (`Store` in `main.js`): blocked storage and missing, invalid or out-of-range saved data must all still give a working home page, and valid data must load and save back unchanged.

On 15 Nov all **56 tests** pass (43 + 13). The tree tests found no bugs when they were written. The store tests were written for a bug found in the app review: damaged or unexpected saved data made `main.js` throw while loading, which left a blank page. They fail against the old `main.js` and pass after the fix in PR #39.

### Continuous integration
A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main` and on every pull request into `main`. It sets up Node.js 20, runs `node --check` on every file in `app/js/` (so a syntax error in any script fails the build, not only in `tree.js`), and then runs `npm test`. The result shows on each pull request, so the reviewer can see whether the tests pass before merging.

### Manual and usability testing
Manual testing follows the demo path: home page, all six tutorial steps, each game from level 1 to Endless, Random Order, and reloading the page to check that progress is kept. We repeat it on the deployed URL and on the offline copy.

The usability evaluation is in the SE document, section 7, and the full results in `usability-test-plan.md`, section 10.

## Deployment

| Aspect | Choice |
|---|---|
| Host | Vercel, serving the `app` folder with no build command |
| Trigger | Vercel's Git integration deploys `main` to production on every push or merge; pull requests get preview URLs |
| What is served | The static files in `app/` as they are in the repository: HTML, CSS and JavaScript, with no build step |
| Backend | None. There are no accounts and no server-side data |
| Saved progress | The browser's `localStorage`, on that device only |
| Live URL | https://cos212-tree-hop.vercel.app |

Decision 004 planned GitHub Pages. We moved to Vercel because the repository stays private until the presentation, and GitHub Pages does not serve private repositories on a free organisation. Because the app is static, the move needed no code changes, and the same files can be served by any static host or opened straight from disk.

## Demo risk plan

The live demo is worth part of the presentation mark and runs on venue Wi-Fi we don't control, so we have two fallbacks behind the live site, each independent of the one before it:

| Order | Fallback | Depends on | Prepared by |
|---|---|---|---|
| 1 | Live URL on Vercel (phone hotspot if the venue Wi-Fi fails) | Internet access | Deployed from `main` after the code freeze |
| 2 | Offline copy: the `app/` folder on the laptop and a USB stick, opened from `index.html` | Only a browser | Copied from the final `main` and tested with Wi-Fi turned off |
| 3 | Recorded backup video of the full demo (about 10 minutes) | Only a video player | Recorded on the final build, following the demo script |

Because the app has no backend, fallbacks 1 and 2 run exactly the same code, so switching between them during the demo takes seconds and changes nothing the panel sees.
