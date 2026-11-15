# 5. UI design and wireframes

> **Owner: Hendré.** Section 5 of the SE document (issues #14, #17). Draft for Galen to paste in place of the brief.

Tree Hop was built as an evolutionary prototype ([decision 002](../decisions/002-se-methodology.md)). The UI was therefore designed in code and refined on the working app, not drawn as wireframes first. The figures in this section are **annotated screenshots of the finished app**, used as wireframes and as the storyboard for the ID document (section 6).

## 5.1 Screen flow

![Figure 5.1: Screen flow.](img/screen-flow.png)

*Every screen also has a "← Home" link, and the browser's back button works because each page has its own address (`#/`, `#/tutorial`, `#/play/pre|in|post`, `#/play/random`).*


## 5.2 Screens

The screenshots were taken from the app at laptop width (1200 px) and phone width (390 px), in light and dark mode. They are in `docs/se/img/`.

| # | Screen | File | What the student does | Feedback they get | User stories |
|---|---|---|---|---|---|
| 1 | Home | `home.png` | Starts the tutorial or picks a game; sees stars per game, the Random Order card (locked, with a progress bar) and the avatars | "Start here" / "✓ Completed" tag, star totals, unlock progress | US-1, US-12, US-14 |
| 2 | Tutorial 1: Meet the tree | `tut-1.png` | Taps the root, a leaf and the right child of 3 | A sentence per tap; the left subtree is highlighted at the end | US-2 |
| 3 | Tutorial 2: Walking around a tree | `tut-2.png` | Picks an order and watches the monkey walk round the tree | Three dots per node fill in; the "Now running" banner names the order and which pass writes the node down; the sequence bar fills | US-3 |
| 4 | Tutorial 3–5: One order each | `tut-3.png` | Steps through a demo, then taps a practice tree in order | Reason for each demo step; feedback per tap; hint suggested after 2 wrong taps; no hearts | US-4 |
| 5 | Tutorial 6: Quick check | `tut-6.png` | Answers 3 multiple-choice questions | Right/wrong with an explanation; score out of 3; "Review …" buttons | US-5 |
| 6 | Game level (playing) | `game.png` | Taps nodes in order | Numbered badge, monkey swings to the node, sequence bar fills, "✓ 30. Which node is next?" | US-6 |
| 7 | Game level (wrong tap and hint) | `game-wrong.png` | Taps a wrong node, then Hint | Node flashes red, a heart is lost, the explanation appears below the tree; after 2 mistakes the Hint button pulses; the hint highlights the next node and says why | US-7, US-8 |
| 8 | Out of hearts → walkthrough | `walkthrough.png` | Chooses "Show me step by step" and presses Next step | Each node is visited with its reason, then a fresh tree | US-9 |
| 9 | Level complete | `level-complete.png` | Chooses next level, play again or home | Stars, mistakes, hints, the full sequence, any new unlocks and avatars | US-10, US-11 |
| 10 | Endless | `endless.png` | Clears as many growing trees as possible | Trees cleared, best score, a heart back every 5 trees | US-13 |
| 11 | Random Order | `random.png` | Clears trees whose order changes each time | Large coloured banner per tree, score, high score | US-14 |

![Figure 5.2: Home page for a new student. The tutorial is marked "Start here", every game is at level 1, and Random Order is locked.](img/home.png)

![Figure 5.3: Tutorial step 1. The student tapped 3 when asked for a leaf, and the feedback explains why it is not one.](img/tut-1.png)

![Figure 5.4: Tutorial step 2, in-order. The dots under each node count the monkey's passes, and in-order writes the node down on the 2nd pass.](img/tut-2.png)

![Figure 5.5: Tutorial step 3, pre-order practice after a wrong tap. No hearts are lost in the tutorial.](img/tut-3.png)

![Figure 5.6: Tutorial step 6, quick check. In-order was answered wrongly on purpose, and a "Review In-order" button leads back to that step.](img/tut-6.png)

![Figure 5.7: Post-order level 2 after two correct taps. The nodes are numbered in visit order and the sequence bar fills.](img/game.png)

![Figure 5.8: The same level after two wrong taps (two hearts lost) and a hint. The next node is outlined and the hint explains why it is next.](img/game-wrong.png)

![Figure 5.9: Out of hearts. The student is offered a step-by-step walkthrough instead of a "game over".](img/out-of-hearts.png)

![Figure 5.10: The walkthrough. Each press of "Next step" visits one node and explains why.](img/walkthrough.png)

![Figure 5.11: Level complete with 3 stars, the mistakes and hints, and the full sequence.](img/level-complete.png)

![Figure 5.12: Endless mode (in-order) after two trees.](img/endless.png)

![Figure 5.13: Home page with 30 stars. Random Order is unlocked and the first avatars are available.](img/home-progress.png)

![Figure 5.14: Random Order. The coloured banner announces the order for each new tree.](img/random.png)

## 5.3 Design decisions

| Decision | Why |
|---|---|
| **One character as a guide** (the monkey, or an avatar the student unlocks) that swings on a vine to every visited node | Makes the traversal a *path* the student can watch, not just a list of numbers. Gives the app a friendly identity (ID section 8, Attention). |
| **One colour per order**: pre-order blue, in-order green, post-order orange, used for the game card, rule card, buttons, banner and sequence bar | The student always knows which order they are in, which matters most in Random Order, where it changes every tree (Mayer's signalling principle, ID section 7). |
| **Rule card above the tree, feedback line directly below it** | The rule, the tree and the explanation are read together, with no hunting around the screen (spatial contiguity). |
| **Numbered badges and a sequence bar** | Shows what has been written down so far, so the student doesn't have to hold the sequence in their head (cognitive load, ID section 5). |
| **Hearts and stars** | Familiar game signals for "how many mistakes I have left" and "how well I did". The stars rule is shown with the mistakes and hints in the level summary. |
| **Explanations instead of "Wrong!"** | Every wrong tap names the rule and the node involved, because the purpose is learning, not scoring (ID section 9). |
| **Large tap targets** | Each node has an invisible tap area 10 px wider than the circle, and every button is at least 44 px high, so the app works with a finger on a phone. |
| **Plain HTML, CSS and SVG, no images** | The trees are drawn in SVG, so they stay sharp at any size, and the whole app is about 90 KB and works offline (NFR-1, NFR-6). |

## 5.4 Responsive layout, light and dark mode

- **Width.**
  - The content is at most 760 px wide and centred on a laptop.
  - Below 620 px the three game cards stack in one column (NFR-4).
  - The tree is an SVG that scales with the screen. Deep trees (the largest Random Order trees, up to 4 levels below the root) get a wider drawing, and the board scrolls sideways on a phone instead of shrinking the nodes further.
  - On a 390 px phone, a node in a game tree is about 26 px across, with a tap area of about 36 px. That is above the WCAG 2.2 minimum target size (24 px) but below the 44 px that the buttons use, so small trees are comfortable and the largest trees are tighter.
- **Light and dark mode.**
  - Both themes follow the device setting (`prefers-color-scheme`, NFR-5).
  - Every colour is a CSS variable, so the dark theme redefines the palette in one place. The order colours are lighter in dark mode so they stay readable.

![Figure 5.15: Home page on a 390 px phone. The game cards stack in one column.](img/phone-home.png)

![Figure 5.16: A pre-order level on a phone, light mode.](img/phone-game.png)

![Figure 5.17: The same level in dark mode.](img/phone-dark.png)

## 5.5 Accessibility and the UI check after the feature freeze

Built in from the start (NFR-7):
- Every node is a button for assistive technology: it can be reached with Tab and chosen with Enter or Space, and it is labelled with its value.
- Feedback, scores and the Random Order banner are `aria-live` regions, so explanations are read out as they appear.
- Hearts, stars, levels and progress bars have text labels.
- With "reduce motion" switched on, the swinging, pulsing, shaking and pop animations are switched off.
- Colour is never the only cue: every result is also a sentence.

**Contrast check (WCAG 2.1 AA).** After the feature freeze we measured the contrast of each text and button colour pair in both themes. Text needs 4.5:1; icons, outlines and focus rings need 3:1.

| Pair | Before | After the fix | Result |
|---|---|---|---|
| White on the pre / in / post buttons (light) | 4.87 / 4.81 / 4.54 | unchanged | Pass |
| Muted text on the page background (light / dark) | 5.25 / 7.90 | unchanged | Pass |
| Dark text on the pre / post buttons (dark) | 6.78 / 7.81 | unchanged | Pass |
| "Endless best" text, light mode | 2.20 (amber `--hint` on white) | 5.76 (new `--hint-text`) | **Fixed** |
| Star icons, light mode (level bar, result dialog) | 2.20 | 3.93 (new `--star`) | **Fixed** (icon, 3:1) |
| Keyboard focus ring, light / dark | 2.20 (amber) | 14.98 / 15.22 (text colour, dashed) | **Fixed** |
| Green text on the pale green feedback box and "Start here" tag (light) | 4.21 (feedback) / 4.41 (tag) | 5.00 (new `--good`) | **Fixed** |
| Dark mode: amber text and stars on the card | 7.32 | unchanged | Pass |

The amber outline on the hinted node (2.20 on white) was kept on purpose. It is never the only cue: the hint text names the node ("Tap 30."), and the node pulses unless reduced motion is on.

**Fixes made in PR #39 ("UI and accessibility polish")** after the check:

- New colours for small gold text and stars in light mode, so they pass (table above).
- The keyboard focus ring on nodes is now a **dashed ring in the text colour**, so a focused node never looks like a hinted one.
- Tree nodes tell screen readers whether they have been visited and in which position ("Node 30, visited, number 2"), not just their value. The tree itself is labelled with its shape ("Binary tree with root 50. 50: left child 30, right child 70; …"), so it can be followed without seeing it.
- While a result or out-of-hearts dialog is open, the rest of the page is made inert, so keyboard and screen-reader focus stays in the dialog. Screen readers announce the dialog by its heading (e.g. "Level 2 complete!"). After the student's choice, focus moves to the new tree. The dialogs deliberately do **not** close with Escape: each needs a choice (next level, walkthrough, play again), and closing it without one would leave the game locked behind it.
- Phone: the level bar wraps so the Endless button is never hidden off the side, and node numbers are larger.
- Laptop and projector: the tree is capped in height so the feedback line and Hint button stay on screen at 1280×720.
- Reduced motion also switches off the Hint-button nudge and the progress-bar animation.
- The Random Order unlock was lowered from 40 to 30 stars, because 40 of 45 needed a near-perfect run of every level (ID section 8).

Each fix was checked in the browser (Edge, with an automated script) at laptop and phone width in both themes, with no JavaScript errors.

**Known limitations:**
- There is no sound or narration.
- Very deep trees need sideways scrolling on narrow phones, and nodes are tighter to tap than buttons (see 5.4).
- The avatar characters are emoji, so they look slightly different on each operating system.
