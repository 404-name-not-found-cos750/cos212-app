# GenAI usage log

The exam spec requires us to acknowledge GenAI use and include **the prompt and the tool** in the ID document.
Log every use here as it happens; it is much harder to reconstruct afterwards.

| Date | Who | Tool (and model) | Used for | Prompt (or link to full prompt below) |
|---|---|---|---|---|
| 2026-11-07, 2026-11-12 to 2026-11-13, 2026-11-15 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Topic check against the spec and the first version of the app (`app/`), including stars, Endless and Random Order; avatars and achievements, the vine animation and Random Order hearts; code comments | See [2026-11-07 – Francois – app prototype](#2026-11-07--francois--app-prototype) |
| 2026-11-07, 2026-11-12 to 2026-11-13, 2026-11-15 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Topic check against the spec and the first version of the app (`app/`), including stars, Endless and Random Order; avatars and achievements, the vine animation and Random Order hearts; code comments | See [2026-11-07 – Francois – app prototype](#2026-11-07--francois--app-prototype) |
| 2026-11-11 to 2026-11-15 | Hendré Beyer | Claude Code (Claude Opus 5.5) | Review of the app against the issues; first drafts of ID sections 6 (storyboard), 7 (learning styles, Mayer) and 8 (ARCS) and SE section 5 (UI design); contrast measurements; screenshots; speaker notes for slides 12–13; presentation preparation | See [2026-11-11 – Hendré – review, UI fixes and sections](#2026-11-11--hendré--review-ui-fixes-and-sections) |
| Not recorded | Shekinah Maja | Claude (model not recorded) | Understanding the code; comparing her ID sections against the repository; aligning and structuring her sections | See ID document, Appendix A12 |
| 2026-11-08 to 2026-11-15 | Mthobisi Khoza | Claude (Claude Sonnet 5.5) | Structuring ID section 9, then reviewing it for gaps, repetition and clarity | See ID document, Appendix A13 |
| 2026-11-12 to 2026-11-15 | Galen Myburgh | Claude Code (Claude Sonnet 5.5) | App review; unit tests and CI; SE document drafts; ID outline, slides and usability kit; document review after integration | See ID document, Appendix A14–A18 |

## Full prompts

<!-- Paste long prompts here under a heading per entry, e.g. ### 2026-10-23 – Galen – registration document -->

### 2026-11-07 – Francois – app prototype

Tool: Claude Code (Claude Opus 5.5). The prompts below are summarised, with spelling corrected.

1. **Topic check (7 Nov).** With the exam specification PDF attached: "Would it work to make an app with a game about how decision trees work, where the player either picks the order correctly or a character jumps from one tree to another?"
   - Outcome: decision trees aren't in the CS2023 Foundational Data Structures list, so we moved to binary trees, using the same game mechanics (decision 001, `docs/decisions/001-data-structure-and-algorithm.md`).
2. **CS2023 data structures and algorithms (7 Nov).** "Give me a list of the CS2023 Foundational data structures and the algorithms that go with them."
   - Outcome: a list to choose the topic from. Decision 001 records the options weighed (decision trees, binary search tree insert and search, and binary tree traversal) and the choice of binary trees with pre-, in- and post-order traversal.
3. **App skeleton (7 Nov).** "Create a skeleton for a JavaScript game called Tree Hop, with a tutorial, on binary trees and binary search trees."
   - Outcome: the file structure the app still uses: plain HTML, CSS and JavaScript with no build step, with the tree logic (`tree.js`) kept separate from the SVG drawing (`view.js`), the game (`game.js`), the tutorial (`tutorial.js`) and saved progress with a hash router (`main.js`). The committed app covers binary trees and traversal only; there is no binary search tree mode.
4. **Look, tutorial animations and a logic check (7 Nov).** "Make the app look better, add animations to the tutorial, and confirm that the traversal logic is correct and has no bugs."
   - Outcome: a light and a dark theme, and animated tutorial steps in which the monkey walks around the tree, passing each node three times (1st = pre-order, 2nd = in-order, 3rd = post-order) while the visit order fills in, followed by a three-question quiz that links back to the steps the student got wrong. No tests were committed with this version; the team's unit tests for the tree logic were added later (`9eadd10`, 12 Nov).
5. **Stars, levels and Endless mode (7 Nov).** "Add stars to the levels of all three games: 3 for no mistakes and no hints, fewer for more mistakes and hints. When level 5 is completed, unlock a harder Endless mode that keeps getting harder."
   - Outcome: 5 levels per game (3 to 12 nodes), each unlocking the next, with the best stars shown per level. Stars: 3 for no mistakes or hints, 2 for up to 2 mistakes and hints combined, and 1 for finishing. Endless unlocks after level 5: back-to-back random trees that grow from 5 to 15 nodes, no hints, 3 hearts for the whole run with one won back every 5 trees, and the best score saved per game.
6. **Random Order mode (7 Nov).** "Add a Random Order mode that unlocks at 40 stars."
   - Outcome: Random Order unlocks at 40 of the 45 stars. Each tree asks for a random order (never the same one 3 times in a row), and trees grow from 4 to 25 nodes. The first wrong tap ends the run, and the high score is saved. The team later lowered the unlock to 30 stars (`cc20791`, 14 Nov).
7. **Avatars and achievements (12 Nov).** "Add achievements that unlock playable characters: one every 10 stars, one for all the stars, one for 10+ trees in Endless, one for 15 trees in Random Order, and one for unlocking all the others."
   - Outcome: `app/js/achievements.js` with nine avatars that replace the monkey once unlocked: 10, 20, 30 and 40 stars, all 45 stars, 10 trees in one Endless run, 10 trees in Endless in all three orders, 15 trees in one Random Order run, and a legendary Dragon for unlocking all the others. New unlocks are announced and tagged "New!", and the chosen avatar is saved. The same commit reworded the wrong-tap explanations. Committed in `f44f699` (12 Nov).
8. **Vine animation (12 Nov).** "Give the character a vine animation that hooks onto the node and pulls the character closer, in the colour of the selected avatar."
   - Outcome: the jump was replaced by a vine that shoots out from the character's hand, hooks just below the top of the target node, and pulls the character across in an arc while getting shorter and straighter. Each avatar has its own vine colour. A timer puts the character at its destination if animation frames pause (for example in background tabs), and the animation is skipped when the user prefers reduced motion. Committed in `4ab5817` (12 Nov).
9. **Random Order hearts and test updates (13 Nov).** "Give Random Order hearts instead of one life, and update the tests."
    - Outcome: Random Order starts with 1 heart and wins one back every 5 trees, and the expected wrong-tap explanations in `tests/tree.test.js` were updated to match the new wording. Committed in `d6d30f5` (13 Nov).
10. **Code comments (15 Nov).** "Read the app code and add comments."
    - Outcome: comments only: a header for each file explaining its role, a comment on each function, and notes on the non-obvious parts (the node `slot` used for the tree layout, the three passes behind the tutorial walk, wrong-tap explanations and hints, the vine animation and its background-tab safety net, the hash router, how progress is saved and checked on load, how avatar unlocks are worked out, and why the scripts load in a fixed order). The CSS got section headings and notes on the per-traversal colours. A check of the diff confirmed that no code changed, and all 56 tests still passed.

### 2026-11-11 – Hendré – review, UI fixes and sections

The prompts below are summarised, with spelling corrected; they are not verbatim.

1. **Understand and review the app (11–12 Nov).** "Read the repository and explain what has been built. Analyse the app in detail against our GitHub issues (#1–#32, pasted in) without changing anything, and tell me what still needs to be done and what my tasks are."
   - Outcome: a summary of the app, a review (the logic was tested and no correctness bugs were found) with suggested improvements, the status of each issue, and Hendré's task list from `docs/PLAN.md`.
2. **Update after the team's changes (15 Nov).** "What do I still have left?

2. **Update after the team's changes (15 Nov).** "What do I still have left?

