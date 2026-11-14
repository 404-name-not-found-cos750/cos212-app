# Requirements and user stories

This section lists what Tree Hop must do (functional requirements), how well it must do it (non-functional requirements), the constraints we work under and what is out of scope. It then gives the user stories, grouped by epic, with acceptance criteria, and a traceability table from each requirement to its user stories and the code that implements it.

Following our evolutionary prototyping approach ([decision 002](../decisions/002-se-methodology.md)), the requirements were written against the prototype as built (merged in PR #33) and checked against the exam specification. Every functional requirement below maps to a screen or feature that exists in `app/`.

## 1. Users

| Persona | Description | What they need |
|---|---|---|
| **COS212 student** (primary) | A second-year Data Structures and Algorithms student at the University of Pretoria who has **not yet** seen binary trees or traversal in class. Uses the app on their own, before the lecture, on a laptop or a phone. | A short, self-paced introduction that assumes nothing, lets them practise, tells them what they did wrong, and helps more when they struggle. |
| **COS212 lecturer** (secondary) | The client in the spec. Shares the app with the class before the traversal lecture and may show it in the lecture venue. | Students who arrive with the basic idea, and an app that is easy to share and runs without setup. |

## 2. Functional requirements

### Navigation and home
| ID | Requirement |
|---|---|
| **FR-1** | The home page shows the tutorial and the three games (pre-order, in-order, post-order). Each game card shows its rule, the stars earned (out of 15) and the number of levels cleared (out of 5). The tutorial card shows "Start here" until the tutorial is finished, then "✓ Completed". |
| **FR-2** | The app has one page per activity (home, tutorial, each game, Random Order), reached through links and the browser's back button (`#/`, `#/tutorial`, `#/play/pre`, `#/play/in`, `#/play/post`, `#/play/random`). Every page has a "← Home" link. |

### Learn: tutorial
| ID | Requirement |
|---|---|
| **FR-3** | The tutorial has six steps with a step counter ("Step n of 6") and a progress bar. **Next** is only enabled once the step's task is done; **Back** is always available, and steps already finished stay open. Once the tutorial has been finished, every step is open on later visits. |
| **FR-4** | Step 1, *Meet the tree*: the student taps the root, any leaf and the right child of a given node in a sample tree. Each tap gets feedback. The step ends by highlighting a left subtree and explaining what a subtree is. |
| **FR-5** | Step 2, *Walking around a tree*: an animation of the monkey walking around the tree, showing that it passes each node three times. The student picks an order and sees which pass (first, second or third) writes the node down for pre-, in- and post-order. |
| **FR-6** | Steps 3–5, one per order: the rule (e.g. Root → Left → Right), a step-by-step demonstration on a small tree, and then a practice tree where the student taps the nodes in order, with feedback on every tap and a **Hint** button. After two wrong taps the feedback suggests the hint. |
| **FR-7** | Step 6, *Quick check*: three multiple-choice questions on one fixed tree (the pre-, in- and post-order sequence). The options are the three orders plus the level-order sequence, shuffled. Each answer gets feedback that explains the correct sequence. At the end the student sees a score out of 3 and a **Review** button for each order they got wrong, which goes back to that tutorial step. Finishing the quiz marks the tutorial as done. |

### Practise: the games
| ID | Requirement |
|---|---|
| **FR-8** | There is one game per traversal order. Each game has five levels with 3, 5, 7, 9 and 12 nodes. Every attempt uses a new random binary tree with unique values from 1 to 99. |
| **FR-9** | The student plays by tapping (or clicking, or pressing Enter/Space on) the nodes in the right order. On a correct tap the monkey jumps to that node, the node is numbered and its value is added to the sequence bar under the tree. Tapping a node that was already visited shows a reminder and costs nothing. |
| **FR-10** | The game page always shows the rule of the order being played and a one-sentence description of it. |
| **FR-11** | A **New tree** button restarts the current level with a fresh tree. |

### Get help: feedback and scaffolding
| ID | Requirement |
|---|---|
| **FR-12** | Each level starts with 3 hearts. Every wrong tap costs a heart and shows a specific explanation of why that node is wrong, e.g. "In post-order children come before parents. 30 still has unvisited nodes below it." |
| **FR-13** | The **Hint** button highlights the next node and explains why it is next. Hints are available at any time in a level and count against the stars (asking again for the same node counts once). After 2 mistakes in a level the button is highlighted and the feedback suggests using it. |
| **FR-14** | When the hearts run out, the student is offered a **step-by-step walkthrough** of the same tree (each step visits the next node and explains why) or a fresh tree. |
| **FR-15** | When an Endless run or a Random Order game ends, the student is offered the same step-by-step walkthrough of the tree they failed on. |

### Track progress
| ID | Requirement |
|---|---|
| **FR-16** | Clearing a level awards stars: 3 for no mistakes and no hints, 2 for at most 2 mistakes and hints combined, 1 otherwise. Only the best result per level is kept. |
| **FR-17** | Level 1 of each game is open. Each further level unlocks once the previous level has at least one star. The level bar shows the stars per level and a lock on locked levels. A game opens at the first level without stars. |
| **FR-18** | When a level is cleared, a summary shows the stars, the number of mistakes and hints, and the full sequence, with buttons for the next level, playing again or going home. It also announces anything newly unlocked (Endless, Random Order). |
| **FR-19** | Progress (stars per level, Endless best per order, Random Order high score, tutorial done) is saved in the browser's `localStorage` on that device and restored on the next visit. If storage is blocked, the app still works for the current visit; saved data that is missing or damaged is reset or corrected when the app loads. |

### Challenge: Endless and Random Order
| ID | Requirement |
|---|---|
| **FR-20** | **Endless mode** (one per order) unlocks after level 5 of that order is cleared. Trees start at 5 nodes and grow by one node per tree up to 15. There are no hints and no new-tree button; the student has 3 hearts for the whole run and wins one back every 5 trees (up to 3). The number of trees cleared is the score, and the best score per order is saved and shown on the home page. |
| **FR-21** | **Random Order mode** unlocks when the student has earned a set number of stars across the three games (`RANDOM_UNLOCK`, 30 of the 45: all 15 levels cleared with an average of 2 stars). Until then the home page shows a locked card with a progress bar towards the unlock. |
| **FR-22** | In Random Order, each tree gets a random order, shown in a colour-coded banner; the same order never comes up three times in a row. Trees grow from 4 to 25 nodes and from 2 to 4 levels deep. The student has one life: the first wrong tap ends the game. The score is +1 per correct node plus a bonus equal to the tree's size when it is cleared. The high score is saved. |

## 3. Non-functional requirements

| ID | Category | Requirement | How we check it |
|---|---|---|---|
| **NFR-1** | Portability / offline | The app runs by opening `app/index.html` in a browser. No install, no build step, no network access and no third-party libraries are needed. | The app has no external URLs or dependencies; open it from a USB copy with Wi-Fi off. |
| **NFR-2** | Access | No accounts, no sign-up, no login. A student can start within one click of opening the link. | Inspection: there is no login screen. |
| **NFR-3** | Privacy | No personal data is collected. The only data stored is the student's progress, under the `localStorage` key `cos212-tree-hop-v1` on their own device. No cookies, analytics or server. | Code review of `main.js`; browser dev tools show no network requests after load. |
| **NFR-4** | Compatibility | Works in current versions of Chrome, Edge, Firefox and Safari on laptops and phones, with mouse, touch or keyboard. The layout adapts to phone width (one column below 620 px). | [TODO Galen: list the browsers and devices actually tested, e.g. in the usability test.] |
| **NFR-5** | Appearance | Light and dark themes follow the device setting (`prefers-color-scheme`). | Switch the OS theme. |
| **NFR-6** | Performance | The first page is usable within 2 seconds on a typical student phone or laptop. The whole app (HTML, CSS and JS) is about 90 KB with no images to download. | [TODO Galen: run Lighthouse on the Vercel URL and record the performance score and load time.] |
| **NFR-7** | Accessibility | Tree nodes can be reached with Tab and chosen with Enter or Space; nodes, hearts and progress bars have text labels for screen readers; feedback is announced through live regions; animations are reduced when the device asks for reduced motion. Target: WCAG 2.1 level AA colour contrast. | [TODO Galen: record the result of Hendré's contrast and phone-layout check.] |
| **NFR-8** | Usability | A student with no prior knowledge can finish the tutorial in about 10 minutes and play level 1 without help. Text is plain and short, and every mistake is explained. | Usability test with 3–5 students ([TODO Galen: link section 7 results]). |
| **NFR-9** | Reliability | The app must not fail during the live demo. No runtime dependency on the network; storage errors are caught; random trees always have exactly the requested number of nodes. Backups: the deployed site, an offline copy and a recorded video. | Unit tests in CI (see [testing-and-deployment.md](testing-and-deployment.md)); rehearsals. |
| **NFR-10** | Maintainability | Plain JavaScript split into small files by responsibility (model, drawing, pages, storage and routing), each under 450 lines, with comments explaining intent. Any team member can change the app and see the result with a browser refresh. | Code review; see the architecture section. |
| **NFR-11** | Deployability | The app is a static site. Every push to `main` deploys automatically to the live URL. | See [testing-and-deployment.md](testing-and-deployment.md). |

## 4. Constraints

From the exam specification:
- **C-1** One core data structure from the CS2023 *Foundational Data Structures and Algorithms* knowledge unit (not one-dimensional arrays or linked lists) and one core algorithm on it. We chose binary trees and depth-first traversal ([decision 001](../decisions/001-data-structure-and-algorithm.md)).
- **C-2** No prior knowledge of the topic may be assumed: the app is used **before** the lecture.
- **C-3** The app must include an assessment that gives extra scaffolding to students who struggle.
- **C-4** An SE approach and an ID approach must be used and documented in **separate** documents, available at the presentation.
- **C-5** GenAI use must be acknowledged, with the prompts and tools, in the ID document.
- **C-6** Deadlines: documents on ClickUP before 08:00 on Mon 16 Nov; presentation with a live demo of at most 10 minutes on 16 or 17 Nov; slides and a GitHub link to the code.
- **C-7** Group of five, all present at the presentation.

From the team and the situation:
- **C-8** About three and a half weeks in total, alongside other modules ([decision 002](../decisions/002-se-methodology.md)).
- **C-9** The repository stays private until the presentation, so hosting must work with a private repository ([decision 004](../decisions/004-tech-stack-and-hosting.md), [PLAN.md](../PLAN.md)).

## 5. Out of scope

These were left out on purpose to keep the scope small enough to build, test and explain well:
- **Binary search trees** (insert, search, delete). BSTs appear only as a "fun fact" in the in-order step.
- **Level-order (breadth-first) traversal** as a skill to learn. It appears only as a wrong option in the quiz, with an explanation.
- Graphs and other data structures.
- Writing or reading traversal **code** (recursive or iterative). The app teaches the visiting order, which the lecture then turns into code.
- **User accounts**, a server or a database. Progress is per device only.
- A **lecturer dashboard** or class results. The lecturer cannot see individual students' results.
- Building your own tree, sound, and languages other than English.

## 6. User stories

Format: *As a … I want … so that …*, with acceptance criteria in *Given / When / Then* form. "Student" means a COS212 student with no prior knowledge of trees.

### Epic A: Learn

**US-1: Start without setup** (FR-1, FR-2, NFR-1, NFR-2)
As a COS212 student with no prior knowledge, I want to open the app from a link and start straight away, so that I can prepare for the lecture without installing anything or making an account.
- *Given* I open the link or `index.html`, *when* the home page loads, *then* I see a "Start here" tutorial card and the three games, with no login.
- *Given* I am on any page, *when* I tap "← Home", *then* I return to the home page.

**US-2: Learn what a binary tree is** (FR-3, FR-4)
As a COS212 student with no prior knowledge, I want a hands-on introduction to the parts of a tree, so that I know what a root, leaf, child and subtree are before I learn traversal.
- *Given* I am on tutorial step 1, *when* I tap the node that is asked for, *then* I get a confirmation and the next task.
- *Given* I tap the wrong node, *then* I am told why it is not the one asked for, and I can try again.
- *Given* I finish the three tasks, *then* the left subtree is highlighted and explained and **Next** becomes available.

**US-3: Understand one idea behind all three orders** (FR-5)
As a COS212 student with no prior knowledge, I want to see how one walk around the tree gives all three orders, so that I learn one idea instead of three separate rules.
- *Given* I am on tutorial step 2, *when* I pick an order and start the animation, *then* the monkey walks around the tree and each node is written down on the first (pre), second (in) or third (post) pass.
- *Given* the animation finishes, *then* the full sequence for that order is shown and **Next** becomes available.

**US-4: Learn each order by watching then doing** (FR-6)
As a COS212 student with no prior knowledge, I want to watch an order demonstrated and then practise it on a tree straight away, so that I can check I really understood the rule.
- *Given* I am on the step for an order, *when* I step through the demo, *then* each node is visited with a reason.
- *Given* I practise and tap a wrong node, *then* I see why it is wrong; *and when* I have made 2 mistakes, *then* I am told to try the Hint button.
- *Given* I finish the practice tree, *then* I see the full sequence and **Next** becomes available.

**US-5: Check my understanding** (FR-7)
As a COS212 student with no prior knowledge, I want a short quiz at the end of the tutorial that sends me back to what I got wrong, so that I know whether I am ready for the games and the lecture.
- *Given* I answer a question, *then* my answer is marked and the correct sequence is explained, including why the level-order option is a different traversal.
- *Given* I have answered all 3, *when* I scored 3/3, *then* I am told I am ready; *when* I scored less, *then* I get a **Review** button for each order I missed that takes me back to that step.
- *Given* I finish the quiz, *when* I return home, *then* the tutorial card shows "✓ Completed".

### Epic B: Practise

**US-6: Practise each order on new trees** (FR-8, FR-9, FR-10, FR-11)
As a COS212 student, I want to practise each order on new random trees that get bigger level by level, so that I learn the rule and not one memorised answer.
- *Given* I open a game, *then* I see the rule card and a random tree of the size for that level (3, 5, 7, 9 or 12 nodes).
- *Given* I tap the correct next node, *then* the monkey jumps to it, it is numbered, and its value appears in the sequence bar.
- *Given* I tap **New tree**, *then* the level restarts with a different tree and full hearts.
- *Given* I use only the keyboard, *when* I Tab to a node and press Enter, *then* it counts as a tap.

### Epic C: Get help (scaffolding)

**US-7: Know why I was wrong** (FR-12)
As a COS212 student who is still unsure, I want every mistake explained in terms of the rule, so that I learn from the mistake instead of guessing.
- *Given* I tap a wrong node, *then* I lose one heart and see a sentence that names the rule I broke and the node involved.
- *Given* I tap a node I already visited, *then* I am reminded that each node is visited once and I do not lose a heart.

**US-8: Get a hint when I am stuck** (FR-13)
As a COS212 student who is struggling, I want a hint that shows and explains the next node, so that I can keep going without giving up.
- *Given* I have made 2 mistakes in a level, *then* the Hint button is highlighted and the feedback suggests it.
- *Given* I tap **Hint**, *then* the next node is highlighted with the reason it is next, and the hint counts towards my star rating.

**US-9: Be shown the whole answer after repeated mistakes** (FR-14, FR-15)
As a COS212 student who keeps getting it wrong, I want to be walked through the tree step by step, so that I see the correct order and the reasoning before I try again.
- *Given* I lose my last heart in a level, *then* I can choose "Show me step by step" or "Try a new tree".
- *Given* I choose the walkthrough, *when* I tap **Next step**, *then* the next node is visited and explained, and at the end I can try a new tree.
- *Given* an Endless run or Random Order game ends, *then* I am offered the same walkthrough of the tree I failed on.

### Epic D: Track progress

**US-10: See how well I did** (FR-16, FR-18)
As a COS212 student, I want a star rating and a summary for every level, so that I can tell how well I understood it and whether to replay it.
- *Given* I clear a level with no mistakes and no hints, *then* I get 3 stars; with at most 2 mistakes and hints combined, 2 stars; otherwise 1 star.
- *Given* I replay a level and do worse, *then* my best star rating is kept.
- *Given* I clear a level, *then* I see my mistakes, hints and the full sequence, and can go to the next level.

**US-11: Move up step by step** (FR-17)
As a COS212 student, I want levels to unlock in order, so that I meet bigger trees only when I am ready for them.
- *Given* I have not cleared level n, *then* level n+1 shows a lock and cannot be chosen.
- *Given* I clear level n with at least one star, *then* level n+1 unlocks.

**US-12: Keep my progress** (FR-1, FR-19, NFR-3)
As a COS212 student, I want my stars and scores remembered on my device without an account, so that I can continue later and nobody else sees my results.
- *Given* I earned stars and close the browser, *when* I open the app again on the same device and browser, *then* my stars, unlocked levels and best scores are still there.
- *Given* the browser blocks storage, *then* the app still works for this visit.

### Epic E: Challenge

**US-13: Test myself without help** (FR-20)
As a COS212 student who has finished the levels, I want an endless run of growing trees without hints, so that I can prove to myself that I know the order.
- *Given* I have not cleared level 5 of an order, *then* that order's Endless mode is locked and says how to unlock it.
- *Given* I play Endless, *then* trees grow from 5 to 15 nodes, there are no hints, I have 3 hearts for the whole run and win one back every 5 trees.
- *Given* my run ends with a new best, *then* it is saved and shown on the home page.

**US-14: Mix all three orders** (FR-21, FR-22)
As a COS212 student who knows all three orders, I want a mode that switches order on every tree, so that I can check I can tell the orders apart and not just repeat one.
- *Given* I have fewer stars than the unlock threshold, *then* Random Order shows a lock and my progress towards it.
- *Given* I play Random Order, *then* each tree shows its order in a banner, the same order never appears three times in a row, and the first wrong tap ends the game with my score and high score.

### Lecturer stories

**US-15: Share the app easily** (FR-2, NFR-1, NFR-2, NFR-11)
As the COS212 lecturer, I want to share one link (or a folder) that students open without setup, so that I can add it to ClickUP as pre-lecture work.
- *Given* the live URL, *when* a student opens it on any current browser, *then* the app works without login or install.
- *Given* the `app/` folder, *when* it is opened from disk with no internet, *then* it works the same.

**US-16: Students arrive with the basics** (FR-3 to FR-7, FR-12 to FR-14)
As the COS212 lecturer, I want the app to teach and check the three orders before my lecture, so that I can spend lecture time on recursion and code instead of the basic idea.
- *Given* a student finishes the tutorial, *then* they have produced each of the three sequences at least once and answered the 3-question quick check.
- *Given* a student struggles, *then* the app gives explanations, hints and walkthroughs without the lecturer's help.

**US-17: Demonstrate in the lecture venue** (NFR-1, NFR-4, NFR-5, NFR-9)
As the COS212 lecturer, I want to show the app on a projector in the venue, so that I can use it as a warm-up at the start of the lecture.
- *Given* the venue has no reliable Wi-Fi, *when* I open the offline copy, *then* everything works.
- *Given* a projector or a light room, *then* the light theme is readable, and the tree scales to the screen.

## 7. Traceability

| FR | User stories | Code |
|---|---|---|
| FR-1 Home page | US-1, US-12 | `js/main.js` (`mountHome`) |
| FR-2 Pages and routing | US-1, US-15 | `js/main.js` (router) |
| FR-3 Tutorial structure | US-2, US-16 | `js/tutorial.js` (`mountTutorial`) |
| FR-4 Meet the tree | US-2 | `js/tutorial.js` (`stepMeet`) |
| FR-5 Walk around the tree | US-3 | `js/tutorial.js` (`stepWalk`), `js/tree.js` (`euler`) |
| FR-6 One step per order | US-4 | `js/tutorial.js` (`makeOrderStep`), `js/view.js` (`Board`) |
| FR-7 Quick check | US-5, US-16 | `js/tutorial.js` (`stepQuiz`) |
| FR-8 Five levels, random trees | US-6 | `js/game.js` (`LEVELS`), `js/tree.js` (`random`) |
| FR-9 Tap in order, monkey, sequence bar | US-6 | `js/view.js` (`TreeView`, `SeqBar`, `Board`) |
| FR-10 Rule card | US-6 | `js/game.js`, `js/tree.js` (`MODES`) |
| FR-11 New tree | US-6 | `js/game.js` |
| FR-12 Hearts and explanations | US-7, US-16 | `js/game.js` (`onWrong`), `js/tree.js` (`explain`) |
| FR-13 Hints | US-8, US-16 | `js/game.js`, `js/view.js` (`Board.hint`), `js/tree.js` (`visitReason`) |
| FR-14 Walkthrough after losing all hearts | US-9, US-16 | `js/game.js` (`levelFailed`, `startWalkthrough`), `js/view.js` (`Board.demoStep`) |
| FR-15 Walkthrough after Endless / Random Order | US-9 | `js/game.js` (`endlessOver`), `js/random.js` (`walkthrough`) |
| FR-16 Stars | US-10 | `js/game.js` (`starsFor`, `onComplete`) |
| FR-17 Level unlocking | US-11 | `js/game.js` (`renderLevels`) |
| FR-18 Level summary | US-10 | `js/game.js` (`onComplete`) |
| FR-19 Saved progress | US-12 | `js/main.js` (`Store`) |
| FR-20 Endless mode | US-13 | `js/game.js` (`ENDLESS`, `endlessSize`, `onEndlessTree`) |
| FR-21 Random Order unlock | US-14 | `js/random.js` (`RANDOM_UNLOCK`, `randomUnlocked`), `js/main.js` (`randomCard`) |
| FR-22 Random Order play | US-14 | `js/random.js` (`pickKind`, `randomTreeCfg`, `treeCleared`, `gameOver`) |

All code paths are relative to `app/`. Non-functional requirements map to the whole app; NFR-1 to NFR-3 are covered by US-1, US-12 and US-15, and NFR-4, NFR-5 and NFR-9 by US-17.
