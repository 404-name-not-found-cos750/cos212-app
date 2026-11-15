# Presentation outline: Tree Hop

- **Slot:** Mon 16 Nov 2026, [TODO Galen: time and venue]. 30 min in total: 10 min talk, 10 min demo, 5 min Q&A, 5 min setup and handover.
- **Slides:** 14, about 40 seconds each. Each speaker sends their slides to Galen by **Sat 14 Nov 12:00**; Galen assembles them. Upload to ClickUP with the GitHub link on **Sun 15 Nov**.
- **Speaker order** follows the story: problem → SE approach → architecture → ID approach → assessment and scaffolding → learning styles and UI → demo. This puts Francois before Hendré (a change from the order in `PLAN.md`) so that Hendré ends the talk and goes straight into the demo he drives.
- Slides marked **[owner to confirm]** are suggestions; the owner rewrites them in their own words.
- Rule of thumb: no more than four bullets a slide, a screenshot wherever possible, and nothing on a slide that the speaker doesn't say.

## Talk (10 min)

| # | Slide | Speaker | Time | Clock |
|---|---|---|---|---|
| 1 | Tree Hop | Galen | 0:20 | 0:00 |
| 2 | The brief | Galen | 0:40 | 0:20 |
| 3 | Why binary tree traversal | Galen | 0:40 | 1:00 |
| 4 | SE approach: Scrum + prototyping | Galen | 0:50 | 1:40 |
| 5 | Process evidence and testing | Galen | 0:30 | 2:30 |
| 6 | Architecture | Mthobisi | 0:50 | 3:00 |
| 7 | Tech choices and deployment | Mthobisi | 0:40 | 3:50 |
| 8 | ID approach: ADDIE and the learner | Shekinah | 0:50 | 4:30 |
| 9 | Learning objectives and theories | Shekinah | 0:50 | 5:20 |
| 10 | Assessment and feedback | Francois | 0:50 | 6:10 |
| 11 | Scaffolding: support when it's needed | Francois | 0:50 | 7:00 |
| 12 | Learning styles and multimedia | Hendré | 0:50 | 7:50 |
| 13 | Motivation (ARCS) and UI → demo | Hendré | 0:50 | 8:40 |
| 14 | Links (shown during Q&A) | Galen | 0:10 | 9:30 |
| | Buffer | | 0:20 | 9:40 → 10:00 |

---

### Slide 1. Tree Hop

**Speaker:** Galen · 0:20

- **Tree Hop**: a pre-lecture tutor for binary trees and tree traversal
- COS750 final examination, the COS212 app
- 404: Name Not Found: Galen Myburgh, Hendré Beyer, Mthobisi Khoza, Francois Scholtz, Shekinah Maja
- Visual: the monkey on a small tree (screenshot from the home page)

**Speaker notes:** "Good morning. We're 404: Name Not Found, and this is Tree Hop, our COS212 app. It teaches binary trees and how to traverse them, before the student has seen either in a lecture. I'll cover the problem and how we ran the project, and then each of us will take you through the part we were responsible for."

---

### Slide 2. The brief

**Speaker:** Galen · 0:40

- A tutor-style app for COS212 students to use **before** the lecture
- One data structure + one algorithm from the CS2023 Foundational core
- **No prior knowledge** assumed
- An assessment that gives **extra scaffolding** to students who struggle

**Speaker notes:** "The COS212 lecturer asked for an app students can use before the lecture on a topic. Four things shaped every decision we made. It had to cover one data structure and one algorithm from the CS2023 Algorithmic Foundations core. It could not assume the student knows anything about the topic. It had to assess the student. And when a student struggles, the app itself should step in with more support, so they arrive at the lecture ready."

---

### Slide 3. Why binary tree traversal

**Speaker:** Galen · 0:40

- **Binary trees** + depth-first **traversal**: pre-order, in-order, post-order (CS2023 AL Foundational)
- First idea was decision trees: not on the Foundational list, so we kept the game and changed the topic
- A traversal is a **sequence of visits**: every tap can be checked and explained
- Three orders, **one mental model**: the walk around the tree

**Speaker notes:** "Our first idea was a game about decision trees, but decision trees aren't on the CS2023 Foundational list, so we kept the game idea and moved it to binary trees. Traversal turned out to suit an app very well. A traversal is just the order you visit nodes in, so each tap the student makes is either right or wrong, and we can say exactly why. And the three orders share one idea, which the tutorial teaches once. We wrote this up as decision 001, together with the alternatives we rejected: binary search trees, which mostly test one rule, and graphs, which are harder to draw clearly."

---

### Slide 4. SE approach: Scrum with short sprints + prototyping

**Speaker:** Galen · 0:50

- **Scrum** (Schwaber and Sutherland, 2020) with short sprints: Decisions → Design → Build → Polish
- **Prototyping**: a working prototype early, then improved against the objectives and user feedback
- GitHub Issues as the backlog, a branch and PR per change, decision records for every major choice
- Re-planned when the first sprints slipped: scope frozen, work rebalanced

**Speaker notes:** "For the software side we used Scrum with short sprints, combined with prototyping. Four sprints: decisions, design, build, and polish and documents. [TODO Galen: align with decision 002 once written.] We tracked work as GitHub issues, made every change on a branch with a pull request, and wrote a short decision record for each major choice, so we can always say why we did something. Prototyping mattered because we had a working prototype early and could then check it against the learning objectives and real students. To be honest about the process: our first two sprint deadlines slipped. We re-planned, froze features on 11 November, and rebalanced the work so that each person owned a few clear sections. That re-plan is in the repository too."

---

### Slide 5. Process evidence and testing

**Speaker:** Galen · 0:30

- [TODO Galen: final counts] issues, [N] pull requests, [N] decision records, daily stand-up notes
- Unit tests on the tree logic, run in CI on every push [TODO Galen: confirm tests and CI are merged]
- Usability test with [N] students who haven't done COS212: [TODO Galen: one headline result, e.g. mean SUS and the main fix]
- Deployed on Vercel; offline copy and backup video for the demo

**Speaker notes:** "Briefly, the evidence: [N] issues, [N] pull requests and [N] decision records, all on GitHub. The tree logic, which decides what's right and wrong, has unit tests that run automatically on every push. [TODO Galen: confirm.] We tested the app with [N] students who haven't done COS212, using think-aloud tasks, a short before-and-after knowledge check and the System Usability Scale. [TODO Galen: headline result.] Mthobisi will now show how the app is built."

---

### Slide 6. Architecture [owner to confirm]

**Speaker:** Mthobisi · 0:50

- Module diagram: `tree.js` (model: trees, orders, explanations, hints) · `view.js` (SVG tree, monkey, board) · `game.js` / `random.js` / `tutorial.js` (pages) · `main.js` (progress, routing)
- The model knows *why* each node is next: the same code drives the feedback, the hints and the walkthrough
- Data: progress (stars per level, best scores, tutorial done) in the browser's `localStorage`
- Visual: the architecture diagram from the SE document

**Speaker notes:** [TODO Mthobisi]

---

### Slide 7. Tech choices and deployment [owner to confirm]

**Speaker:** Mthobisi · 0:40

- Plain HTML, CSS and JavaScript, no framework and no build step (decision 004)
- Why: demo safety (opens offline from a file), anyone in the team can read and change it
- No accounts, no server: progress stays on the student's device
- Hosted on Vercel, deployed automatically from `main`

**Speaker notes:** [TODO Mthobisi]

---

### Slide 8. ID approach: ADDIE and the learner [owner to confirm]

**Speaker:** Shekinah · 0:50

- ADDIE (Branch, 2009): Analysis → Design → Development → Implementation → Evaluation, run iteratively inside our sprints
- Learner: COS212 student, has programmed before, **has never seen trees or traversal**
- Uses it alone, before the lecture, on a laptop or phone
- Likely misconceptions we designed for: reading level by level, "in-order means left to right on the page"

**Speaker notes:** [TODO Shekinah]

---

### Slide 9. Learning objectives and theories [owner to confirm]

**Speaker:** Shekinah · 0:50

- Objectives on the revised Bloom's taxonomy: *remember* the parts of a tree → *understand* the walk → *apply* each order → *analyse* why a node can't be visited yet
- Cognitive load: one mental model (each node passed three times), trees that grow from 3 to 12 nodes
- Scaffolding and the zone of proximal development: support given when needed, then withdrawn
- Active learning: every step is something the student does

**Speaker notes:** [TODO Shekinah]

---

### Slide 10. Assessment and feedback [owner to confirm]

**Speaker:** Francois · 0:50

- Every tap is assessed immediately: right, or wrong **with a reason** ("In post-order children come before parents...")
- Tutorial quick check: 3 questions, distractors include the level-by-level reading
- Wrong quiz answers link back to the tutorial step that was missed
- Stars measure progress: 3 = no mistakes or hints, 2 = up to 2, 1 = finished

**Speaker notes:** [TODO Francois]

---

### Slide 11. Scaffolding: support when it's needed [owner to confirm]

**Speaker:** Francois · 0:50

- Diagram: wrong tap → heart lost + explanation → **hint after 2 mistakes** → out of hearts → **step-by-step walkthrough** → fresh tree
- Faded support: tutorial (no hearts, hints) → levels (hearts, hints) → Endless (no hints) → Random Order (one heart, plus one every 5 trees)
- The struggling student gets more help; the confident student never sees it
- Question bank documented against the objectives (ID document, section 9)

**Speaker notes:** [TODO Francois]

---

### Slide 12. Learning styles and multimedia [owner to confirm]

**Speaker:** Hendré · 0:50

- Several ways in: the visual tree and monkey, short text, tapping, step-by-step demos
- Mayer's principles (Mayer, 2009): signalling (colour per order, highlighted node), contiguity (feedback right under the tree), segmenting (six short steps)
- Coherence: nothing on the play screen that isn't needed
- Accessible: text for every result, screen-reader labels, light and dark mode, phone layout

**Speaker notes:** "We didn't build for one 'learning style'. That idea is contested, so instead every student gets the same idea in several forms at once: a tree they can see, a short rule in words, and something to do with their hands, tapping the nodes. We used Mayer's multimedia principles to keep that from becoming overload. Signalling: each order has its own colour everywhere, and the node that matters is highlighted. Contiguity: the rule sits right above the tree and the explanation right below it, at the same moment as the tap. Segmenting: six short tutorial steps, and the demos move one node at a time when the student presses Next. And it has to work for everyone: every result is also a sentence, nodes work with the keyboard and screen readers, and it follows light and dark mode on a phone or a laptop."

---

### Slide 13. Motivation (ARCS) → demo [owner to confirm]

**Speaker:** Hendré · 0:50

- **Attention:** the monkey, random trees every round
- **Relevance:** real uses of each order (copying, sorting a BST, deleting a tree)
- **Confidence:** small first levels, hints, a walkthrough instead of "game over"
- **Satisfaction:** stars, unlocks (Endless, Random Order at 30 stars), avatars, best scores

**Speaker notes:** "Nobody checks whether students use a pre-lecture app, so motivation had to be designed, not hoped for. We used Keller's ARCS model. Attention: a monkey that swings to every node, and a new random tree every round. Relevance: each order is tied to a real job: copying a tree, getting a sorted list out of a search tree, deleting a tree. Confidence: the first level has three nodes, the tutorial has no hearts to lose, and when you run out of hearts you get a walkthrough, not 'game over'. Satisfaction: stars, unlocks and avatars to collect. We lowered the Random Order unlock from 40 to 30 stars, because a goal that feels out of reach hurts confidence. Let me show you how this works for a student who opens it for the first time."

---

### Slide 14. Links

**Speaker:** Galen · 0:10 (leave this up during Q&A)

- **Try it:** https://cos212-tree-hop.vercel.app (also as a QR code)
- **Code:** https://github.com/404-name-not-found-cos750/cos212-app
- SE and ID documents: on ClickUP and in the repository (`docs/`)
- Thank you. Questions?

**Speaker notes:** "Everything is public: the app, the code, the decision records and both documents. We're happy to take questions."

---

## Demo running order (10 min)

**Hendré drives the laptop throughout.** Narration as below. Steps 1–3 of the tutorial run in a **fresh profile** (no progress, levels locked). Everything after that runs in a **second, seeded profile**, already open in another window: with the tutorial marked as done every step is open, so you can go straight to the quick check, and all games, Endless and Random Order are unlocked.

**Demo prep (before the session):**
- **Fresh profile:** a private window is simplest. Or, in the DevTools console on the app page: `localStorage.removeItem('cos212-tree-hop-v1'); location.reload();`
- **Seeded profile:** in the DevTools console on the app page, paste this exact line (don't type the JSON by hand):
  ```js
  localStorage.setItem('cos212-tree-hop-v1', JSON.stringify({stars:{pre:[3,3,3,3,3],in:[3,3,3,3,3],post:[3,3,3,3,2]},best:{random:0,pre:0,in:0,post:0},tutorialDone:true})); location.reload();
  ```
  That is 44 stars (Random Order needs 30), the tutorial is marked done, and post-order level 5 has 2 stars so the level bar shows an unearned star. Saved progress belongs to one address, so seed the live URL and the offline copy (`app/index.html`) separately.
- In the seeded profile, opening a game whose five levels all have stars goes **straight to Endless**. For the game segment, tap **Level 1** in the level bar.
- **Projector:** full screen (Cmd+Ctrl+F on macOS, F11 on Windows), browser zoom 90%.

| Clock | What is shown | Driver | Narrator | Points to make |
|---|---|---|---|---|
| 0:00–0:30 | Home page: tutorial, three games, levels locked, Random Order locked | Hendré | Hendré | Nothing to install; no login; progress saved on the device |
| 0:30–1:30 | Tutorial step 1, Meet the tree: tap the root, a leaf (deliberately tap a wrong node once), the right child of 3 | Hendré | Hendré | Vocabulary taught by doing; feedback on the wrong tap |
| 1:30–3:00 | Step 2, the monkey's walk: run in-order and watch the three dots fill (the walk takes about 17 s, so talk over it) | Hendré | Hendré (Shekinah may add one line on cognitive load) | The core idea: each node is passed three times; the orders differ only in which pass writes it down |
| 3:00–4:00 | Step 3, Pre-order: two demo steps, then the practice tree with one wrong tap and the hint | Hendré | Hendré | Watch → try with help; no hearts in the tutorial |
| 4:00–5:00 | Switch to the seeded profile. Tutorial → **Next** to step 6, quick check: answer one question wrong on purpose, show the explanation and the "Review" button | Hendré | **Francois** | Diagnostic check; the level-order distractor; link back to the missed step |
| 5:00–7:30 | Post-order game (seeded profile, tap **Level 1**): level 1 cleared (show the stars), level 2: two wrong taps → the Hint lights up → use it; then run out of hearts → walkthrough | Hendré | **Francois** | Explanation on every mistake; hint after 2; walkthrough instead of game over; stars rule |
| 7:30–8:45 | Same profile: Endless mode (trees grow, no hints), then Random Order (order banner changes each tree; one heart to start, plus one more every 5 trees); end on the home page's avatars | Hendré | Hendré | Faded support; challenge for confident students; ARCS satisfaction (unlocks, avatars) |
| 8:45–9:30 | Phone (or narrow window) and dark mode | Hendré | Hendré | Works on a phone; accessibility |
| 9:30–10:00 | Back to the home page with stars showing; hand over to Q&A | Hendré | Galen | One-sentence wrap-up; slide 14 back on screen |

**Rehearsal notes:** time it twice (Sat 14, Sun 15). If running late at 5:00, skip the phone section. If the live URL fails, switch to `app/index.html` from the laptop or USB within 30 seconds; if the laptop fails, play the backup video. The table above is the demo script (#30). [TODO Hendré: adjust the timings after rehearsal 1.]

## Likely panel questions

Answerer in bold. Each person prepares two or three sentences for their own questions; Galen's pointers are below.

| # | Question | Answers | Pointers |
|---|---|---|---|
| 1 | Why binary trees and traversal, and is it really CS2023 core? | **Galen** | Decision 001. AL Foundational data structures and algorithms, Kumar et al. (2024). Decision trees rejected because they aren't on the list; BST insert/search tests mostly one rule; graphs harder to lay out. Traversal = sequence of visits, so each tap is assessable and explainable. |
| 2 | Why Scrum for a two-week project with five people? | **Galen** | Short sprints gave fixed checkpoints; the backlog in GitHub Issues made the split visible; the re-plan after the slipped sprints is exactly what Scrum's review/re-planning is for. Prototyping because we needed something to test with students early. [TODO Galen: align with decision 002.] |
| 3 | How did you test the app? / Does it actually work for learners? | **Galen** | Unit tests on `tree.js` in CI [TODO confirm]. Usability test: [N] students who haven't done COS212, 6 tasks, think-aloud, pre/post check (0–3), SUS. [TODO Galen: headline numbers and one fix it led to.] Be clear it's a small formative test, not proof of learning gains. |
| 4 | How did you use GenAI, and how do you know the content is correct? | **Galen** (Francois for the code) | Acknowledged in Appendix A of the ID document with prompts and tools. Used for the first prototype and drafting; the tutorial text was reviewed against the objectives (ID section 6); tree logic covered by unit tests. |
| 5 | How does the lecturer see how students are doing? | **Galen** | They don't, in this prototype: progress stays in the student's browser. Deliberate: no accounts, no personal data, no server to fail during the demo. Next step: an export or a lecturer dashboard. |
| 6 | What would you do with more time? | **Galen** | Lecturer view of progress; larger question bank tagged by objective; BST and level-order units on the same engine; a longer study with more students. |
| 7 | How did the team split the work, and what went wrong? | **Galen** | Roles in `PLAN.md`; each person owns sections of both documents and part of the talk. Sprints slipped early; we re-planned, froze features, and moved build work into tests, docs and the demo. |
| 8 | Why plain JavaScript and not React? | **Mthobisi** | Decision 004: demo safety, no build, works offline, everyone can read it. |
| 9 | How is the code structured / how is the feedback generated? | **Mthobisi**, **Francois** | `tree.js` computes the order and the reason for each node (`explain`, `visitReason`); views and pages use it. |
| 10 | Why ADDIE and not a rapid model such as SAM? | **Shekinah** | ADDIE section of the ID document. |
| 11 | Why do the objectives stop at Analyse? | **Shekinah** | Pre-lecture app: prepares for the lecture; writing traversal code is for the lecture and practicals. |
| 12 | Don't hearts punish weak students? | **Francois**, **Hendré** | No hearts in the tutorial; hint after 2 mistakes; walkthrough instead of game over; a fresh tree after. |
| 13 | Learning styles are contested: why cater for them? | **Hendré** | Multiple representations for everyone (Mayer), not matching a single style. |
| 14 | Is it accessible? | **Hendré** | Text for every result, screen-reader labels, contrast, light/dark, phone layout. |
| 15 | How did you decide the star thresholds and the Random Order unlock? | **Francois**, **Hendré** | Stars: 3/2/1 by mistakes + hints. Unlock lowered from 40 to 30 (all 15 levels cleared with an average of 2 stars) because 40/45 needed a near-perfect run, which hurts confidence (ARCS). |
