---
title: "Tree Hop: Software Engineering document"
subtitle: "COS750 Educational Software Development, final examination: the COS212 app"
author: "Team: 404: Name Not Found"
date: "16 November 2026"
---

**Group:** 404: Name Not Found

**Members:**

| Name | Student number | Sections written |
|---|---|---|
| Galen Myburgh | u21504645 | 1, 2, 3, 6, 7, 8, editing |
| Mthobisi Khoza | u26838852 | 4 |
| Hendré Beyer | u26846188 | 5 |
| Francois Scholtz | u19024232 | App build |
| Shekinah Maja | u26825882 | ID document (sections 2–6) |

**Repository:** <https://github.com/404-name-not-found-cos750/cos212-app>

**Live app:** <https://cos212-tree-hop.vercel.app>

---

# Introduction


## Purpose of this document
The COS212 (Data Structures and Algorithms) lecturer asked for an app that gives students a tutor-style introduction to a topic **before** the lecture. This document describes the software engineering side of our prototype, **Tree Hop**: the development method we followed and how the process actually went, the requirements and user stories, the architecture and technology choices, the user interface, and how we tested, deployed and evaluated the app. The instructional design (learning objectives, learner analysis, learning theories, assessment design and the GenAI acknowledgement) is in the separate ID document, as the spec requires.

## The app
Tree Hop teaches **binary trees** and **depth-first tree traversal** (pre-order, in-order and post-order) to students who have never seen them. A six-step tutorial introduces the parts of a tree and then one idea, a monkey walking around the tree and passing every node three times, from which all three orders follow. The student watches each order demonstrated, practises it straight away and finishes with a three-question quick check that sends them back to what they got wrong. Three games, one per order, then ask the student to tap the nodes of random trees in the right order over five levels of growing size. Every wrong tap costs a heart and is explained; after two mistakes the app suggests a hint; and when the hearts run out it walks the student through the tree step by step. Stars, unlockable levels, an Endless mode and a mixed Random Order mode keep stronger students busy. The app is plain HTML, CSS and JavaScript, runs offline from `index.html`, needs no account and keeps progress only in the browser.

## Choice of topic
The spec allows one core data structure from the CS2023 Foundational Data Structures and Algorithms knowledge unit (excluding one-dimensional arrays and linked lists) with one core algorithm on it (Kumar et al., 2024). In CS2023 both are CS Core topics of the AL-Foundational knowledge unit: topic 9a, "Trees: Binary, n-ary, and search trees", and topic 11c, "uninformed depth/breadth-first tree search" (Kumar et al., 2024). The app also targets that unit's illustrative learning outcome for every algorithm in it: "Explain step-by-step how the algorithm operates." We chose binary trees with pre-, in- and post-order traversal because a traversal is a sequence of node visits: every tap can be assessed on its own, so the app can give immediate, specific feedback and add scaffolding only where a student struggles. The three orders share one mental model, and the scope was small enough to build, test and demonstrate in the time we had. Binary search trees, level-order traversal and graphs were considered and left out. The full reasoning is in decision 001 (Appendix A).

## How this document is organised
Section 2 explains our method (a Scrum-based iterative approach with evolutionary prototyping) and gives an honest account of how the sprints went, including three re-plans. Section 3 lists the requirements and user stories and traces them to the code. Sections 4 and 5 describe the architecture and the user interface. Section 6 covers testing and deployment, section 7 the usability evaluation with five adult participants, and section 8 concludes. The decision records that justify our main choices are in Appendix A.

---

# SE methodology and process

## Approach

We used a **Scrum-based iterative approach with short sprints, combined with evolutionary prototyping**. We took the backlog, sprints, milestones and re-planning checkpoints from Scrum (Schwaber and Sutherland, 2020), but did not run the full framework; for example, sprint lengths changed at each re-plan. The reasons, and the alternatives we considered (waterfall, pure Scrum, Kanban and prototyping on its own), are in decision 002 (Appendix A). In short:

- The requirements were uncertain at the start, and the spec asks for a prototype, so we built a working version early and improved it rather than specifying everything first.
- The deadline was fixed and close, so we worked in short sprints and re-planned at the end of each one.
- The team is five part-time students, so we kept the practices light: GitHub issues and milestones, one branch and PR per piece of work, decision records, and a single plan document (`docs/PLAN.md`) that is updated at each re-plan.

The ID process (ADDIE, decision 003) ran alongside: Analysis and Design map onto Sprints 0–1, Development onto Sprint 2, and Implementation and Evaluation onto Sprint 3.

## Roles

Roles were proposed in `docs/PLAN.md` so that each member owns about the same load: one build stream, a share of the documents and a share of the presentation.

| Role | Member | Main responsibilities (original plan) |
|---|---|---|
| R1 Project lead / Scrum Master | Galen Myburgh | Methodology, requirements and user stories, process evidence, SE document editor, slides, submission |
| R2 Tech lead | Mthobisi Khoza | Tech stack, architecture, app skeleton and CI, quiz engine, deployment |
| R3 UI and visualisation | Hendré Beyer | Wireframes and UI, visualisation and animation, learning styles, demo |
| R4 ID lead and content | Shekinah Maja | ID model, learner analysis, objectives, learning theories, content, ID document editor |
| R5 Assessment and motivation | Francois Scholtz | Assessment and scaffolding design, question bank, motivation, progress tracking, usability test |

Review and back-up pairs: R1 ↔ R4 (document editors), R2 ↔ R3 (code), R5 ↔ R4 (content and questions).

The roles changed twice as the work moved:

- **9 Nov:** Francois's prototype already covered most of the planned build work of R2, R3 and R5, so their build streams moved to quality, evidence and the demo (tests, CI and deployment for R2; wireframes, UI polish and the demo for R3; question bank and usability test for R5). Everyone kept their document sections.
- **12 Nov:** Galen took over all the infrastructure (deployment, tests, CI, backups), the usability test and the editing of both documents, so that the others could each focus on a short list of sections. Francois, who built the app, moved to a light load: a code walkthrough for the team, answering code questions and narrating the quiz in the demo. The assessment and motivation sections were moved to Mthobisi and Hendré.

The current split is in `docs/PLAN.md` ("Current plan (Thu 12 Nov)").

## Sprints: planned and as they happened

The project ran from the spec's release on 22 Oct to the presentation on 16 Nov. On 23 Oct we set up the repository, a backlog of **32 issues**, seven custom labels and six milestones, one per sprint.

### Original plan (23 Oct)

| Milestone | Due | Goal | Issues |
|---|---|---|---|
| Sprint 0 – Decisions | 26 Oct | Topic, SE method, ID model, stack, roles, onboarding | #1–#7 |
| Sprint 1 – Design | 1 Nov | Learner analysis, objectives, theories, styles, motivation, assessment design, storyboard, requirements, architecture, wireframes, skeleton + CI | #8–#18 |
| Sprint 2 – Build & content | 8 Nov | Learning content, question bank, visualisation, animation, quiz engine, progress tracking | #19–#24 |
| Sprint 3 – Polish & documents | 13 Nov | Testing, deployment, SE and ID documents, slides | #25–#29 |
| Submission & demo | 16 Nov | Demo script, submission | #30–#31 |
| Self-reflection | 18 Nov | Individual reports | #32 |

### What happened

| Sprint | Planned | What happened | Evidence |
|---|---|---|---|
| Sprint 0 | Decisions by 26 Oct | The decisions were not made by the due date and no issues were closed. On 5 Nov only Galen and Mthobisi were in the GitHub organisation. | Milestone past due with 7 open issues; re-plan of 5 Nov |
| Sprint 1 | Design by 1 Nov | Not started by the due date. | Re-plan of 5 Nov |
| Re-plan 1 (5 Nov) | – | Compressed the remaining work into four short sprints: decisions on the evening of 5 Nov, design 6–7 Nov with a scope freeze, build 8–11 Nov with a **feature freeze on 11 Nov**, polish and documents 12–14 Nov. | `docs/PLAN.md` (header and "Schedule") |
| Sprint 2 (build) | Build 8–11 Nov | Francois built a working prototype on 7 Nov, ahead of the compressed build sprint, using GenAI (logged in `docs/PROMPTS.md`). His first idea, decision trees, turned out not to be on the CS2023 list, so the same game moved to binary-tree traversal. This prototype settled the topic and covered most of the planned build issues (#18, #19, #21–#24). | Commit `35d4cd7` on `DevFS` (7 Nov); `PROMPTS.md` |
| Re-plan 2 (9 Nov) | – | Because the build was mostly done, the build roles were moved to quality, evidence and the demo (section 2.2). New rules: no more large features, one branch and PR per issue with one review. Decisions 001 (topic) and 004 (stack) were drafted, matching what had been built. | `docs/PLAN.md` ("Re-plan of the build roles"); decisions 001 and 004, dated 9 Nov |
| Feature freeze | 11 Nov | Mostly held. On 12–13 Nov Francois pushed three commits directly to `main`, without a PR: avatars (`achievements.js`), Random Order with one heart plus one every 5 trees, a vine animation, and new hint and mistake wording with tests. We kept these changes and documented them (FR-22, FR-23), but they broke both the freeze and the one-PR-per-change rule. On 15 Nov he pushed one more commit directly to `main` that only adds code comments (`f1c7de9`). | Commits `f44f699`, `4ab5817`, `d6d30f5` (12–13 Nov), merged with PR #39; `f1c7de9` (15 Nov) |
| Re-plan 3 (12 Nov) | – | The prototype was merged to `main` (PR #33). The remaining work was rebalanced (section 2.2), the deployment moved from GitHub Pages to Vercel because the repository stays private until the presentation, and a Monday deliverables checklist was added. | PRs #33, #34, #35; `docs/PLAN.md` ("Current plan") |
| Sprint 3 | Polish and documents 12–14 Nov | Unit tests and CI (12 Nov); deployment to Vercel (12 Nov); SE and ID drafts and the slide outline (12 Nov); demo-readiness fixes from a review of the app: saved progress, scoring, accessibility, projector and phone layout, tutorial wording, Random Order unlock lowered from 40 to 30 stars (14 Nov); UI design, storyboard, learning styles and ARCS sections (15 Nov). Usability test with five participants (section 7). | PRs #36–#40 |

In Scrum terms, the sprint length was not fixed: we shortened the sprints and moved the scope at each re-plan instead of carrying the original dates forward. The first two sprints produced no closed work, and the build happened as one large prototype instead of a sequence of small increments. We describe this as it happened because it shaped the rest of the project: once the prototype existed, the backlog changed from "build features" to "test, document and demo what we have", which is the point of evolutionary prototyping, but it came later than planned.

## Tools and practices

| Tool / practice | How we used it |
|---|---|
| **GitHub Issues** | The product and sprint backlog. 32 issues, each with a "What needs to be done" and a "Done when" checklist. |
| **Labels** | By deliverable: `app`, `se-doc`, `id-doc`, `content`, `presentation`, `team`, `decision`. |
| **Milestones** | One per sprint (section 2.3.1), with due dates. |
| **Branches and pull requests** | Work is done on a branch and merged to `main` by PR (`DevFS` for the app, `docs/...` for documents). From 9 Nov the rule is one branch and PR per issue with one review. |
| **Decision records** | `docs/decisions/`: one short file per significant choice (context, options, decision, rationale, consequences). These are our answers to the panel's "why?" questions. |
| **Plan document** | `docs/PLAN.md`: deadlines, roles, schedule and per-person checklists. Each re-plan adds a section and keeps the old plan as a record. |
| **GenAI log** | `docs/PROMPTS.md`: every GenAI use with the tool and prompt, as the spec requires. |
| **Hosting** | Vercel, deploying `app/` from `main` on every push (see section 6). |
| **Communication** | A WhatsApp group, used throughout the project for day-to-day coordination, questions and hand-overs. |

## Process evidence

### Pull requests

| PR | Title | Opened by | Merged | Notes |
|---|---|---|---|---|
| #33 | Tree Hop app: tutorial, traversal games and Random Order | galenmyburgh | 12 Nov 2026 | Merges `DevFS`. The app code is Francois's commit `35d4cd7` (SchoItz, 7 Nov). Closed #21. |
| #34 | Add decisions 001 and 004, re-plan remaining work | galenmyburgh | 12 Nov 2026 | Decision records and re-plan 3 |
| #35 | Plan: rebalance remaining work and Monday deliverables | galenmyburgh | 12 Nov 2026 | Workload split, Vercel deployment, Monday checklist |
| #36 | Unit tests for the tree model + CI | galenmyburgh | 12 Nov 2026 | 42 unit tests (now 56) and a GitHub Actions workflow. Closed #18. |
| #37 | Draft SE and ID documents, decision 002 and slides outline | galenmyburgh | 12 Nov 2026 | Document outlines and drafts, decision 002, usability test plan |
| #38 | Add the live Vercel URL and update decision 004 to Vercel | galenmyburgh | 12 Nov 2026 | Live URL in the docs |
| #39 | Demo readiness: bug fixes, accessibility and teaching wording | galenmyburgh | 14 Nov 2026 | Fixes from the app review; merged Francois's direct pushes to `main` |
| #40 | Docs: UI design (SE 5), storyboard (ID 6), learning styles/Mayer (ID 7), ARCS (ID 8) | HendreB | 15 Nov 2026 | Hendré's sections and screenshots; one GitHub review. Closed #11, #12, #14, #17. |

Only PR #40 has a review recorded on GitHub; PRs #33–#39 were merged without one, which broke our own one-review rule.

### Issues

The backlog has **32 issues**, each with a "What needs to be done" and a "Done when" checklist. On 15 Nov, 6 are closed and 26 are open: most of the work is done, but the issues were not closed as it was finished. PR #33 also listed four issues after one `Closes` keyword, and GitHub closed only the first.

### Commit history

On the evening of 15 Nov, before the final documents were merged, there are 31 commits across all branches, including 10 merge commits (22 by Galen, 6 by Francois and 3 by Hendré). The history is short and uneven: the whole app arrived as one commit on 7 Nov, and most other commits are planning, documentation and the demo-readiness fixes.

## What we would do differently

- **Make the first decisions in the first week.** Sprint 0 slipped by about two weeks (due 26 Oct; decisions 001 and 004 drafted 9 Nov), and everything after it was compressed. Deciding the topic, method and stack together in the first week would have given us a design sprint before the build.
- **Build a small prototype on purpose, early.** The prototype was the turning point of the project: it settled the topic and made the requirements concrete. We should have planned a deliberate throw-away "spike" in the first sprint instead of a long design phase on paper.
- **Merge in small pieces.** The app arrived as one commit and one large PR, which is hard to review and gives little evidence of how it grew. Smaller PRs per feature, each reviewed, would have spread the knowledge of the code across the team earlier.
- **Assign issues and close them as we go.** The backlog was well structured but nobody was assigned, and nothing was closed until 12 Nov, so the board did not show the real state of the project. Closing keywords must be written once per issue.
- **Start the ID analysis before the build.** The learning objectives and learner analysis should drive the content and the assessment. Because the app was built first, we had to check the content against the objectives afterwards.

What worked: short sprints and a single plan document let us re-plan quickly three times without losing track; the feature freeze was mostly respected after the documented exceptions (section 2.3.2); and decision records gave us written answers to "why?" for each major choice.

---

# Requirements and user stories

This section lists what Tree Hop must do (functional requirements), how well it must do it (non-functional requirements), the constraints we work under and what is out of scope. It then gives the user stories, grouped by epic, with acceptance criteria, and a traceability table from each requirement to its user stories and the code that implements it.

Following our evolutionary prototyping approach (decision 002, Appendix A), the requirements were written against the prototype as built (merged in PR #33) and checked against the exam specification. Every functional requirement below maps to a screen or feature that exists in `app/`.

## Users

| Persona | Description | What they need |
|---|---|---|
| **COS212 student** (primary) | A second-year Data Structures and Algorithms student at the University of Pretoria who has **not yet** seen binary trees or traversal in class. Uses the app on their own, before the lecture, on a laptop or a phone. | A short, self-paced introduction that assumes nothing, lets them practise, tells them what they did wrong, and helps more when they struggle. |
| **COS212 lecturer** (secondary) | The client in the spec. Shares the app with the class before the traversal lecture and may show it in the lecture venue. | Students who arrive with the basic idea, and an app that is easy to share and runs without setup. |

## Functional requirements

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
| **FR-19** | Progress (stars per level, Endless best per order, Random Order high score and trees cleared, tutorial done, chosen avatar and avatars already announced) is saved in the browser's `localStorage` on that device and restored on the next visit. If storage is blocked, the app still works for the current visit; saved data that is missing or damaged is reset or corrected when the app loads. |

### Challenge: Endless and Random Order
| ID | Requirement |
|---|---|
| **FR-20** | **Endless mode** (one per order) unlocks after level 5 of that order is cleared. Trees start at 5 nodes and grow by one node per tree up to 15. There are no hints and no new-tree button; the student has 3 hearts for the whole run and wins one back every 5 trees (up to 3). The number of trees cleared is the score, and the best score per order is saved and shown on the home page. |
| **FR-21** | **Random Order mode** unlocks when the student has earned a set number of stars across the three games (`RANDOM_UNLOCK`: 30 of the 45 stars in total, for example two stars on each of the 15 levels). Until then the home page shows a locked card with a progress bar towards the unlock. |
| **FR-22** | In Random Order, each tree gets a random order, shown in a colour-coded banner; the same order never comes up three times in a row. Trees grow from 4 to 25 nodes and from 2 to 4 levels deep. The student starts with one heart and wins another for every 5 trees cleared; a wrong tap costs a heart, and the game ends when the last heart is gone. The score is +1 per correct node plus a bonus equal to the tree's size when it is cleared. The high score is saved. |

### Rewards: avatars
| ID | Requirement |
|---|---|
| **FR-23** | **Avatars**: the student unlocks new characters that replace the monkey on every tree. They are unlocked at 10, 20, 30, 40 and 45 stars, for clearing 10 trees in one Endless run and in all three orders, and for clearing 15 trees in one Random Order run; a "legendary" Dragon unlocks when all the others are unlocked. The home page shows the avatars with their goals, and the student picks one there. A newly unlocked avatar is announced in the level summary or game-over dialog. Added after the feature freeze (see the section 2.3.2). |

## Non-functional requirements

| ID | Category | Requirement | How we check it |
|---|---|---|---|
| **NFR-1** | Portability / offline | The app runs by opening `app/index.html` in a browser. No install, no build step, no network access and no third-party libraries are needed. | The app has no external URLs or dependencies; open it from a USB copy with Wi-Fi off. |
| **NFR-2** | Access | No accounts, no sign-up, no login. A student can start within one click of opening the link. | Inspection: there is no login screen. |
| **NFR-3** | Privacy | No personal data is collected. The only data stored is the student's progress, under the `localStorage` key `cos212-tree-hop-v1` on their own device. No cookies, analytics or application backend; the app does not send progress anywhere (the static files are served by Vercel). | Code review of `main.js`; browser dev tools show no network requests after load. |
| **NFR-4** | Compatibility | Works in current versions of Chrome, Edge, Firefox and Safari on laptops and phones, with mouse, touch or keyboard. The layout adapts to phone width (one column below 620 px). | Usability test: Chrome 131 and Edge 131 on laptops, Chrome on an Android phone (Samsung Galaxy A14) and Safari on an iPad (8th gen). Firefox not tested. |
| **NFR-5** | Appearance | Light and dark themes follow the device setting (`prefers-color-scheme`). | Switch the OS theme. |
| **NFR-6** | Performance | Target: the first page is usable within 2 seconds on a typical student phone or laptop. The whole app (HTML, CSS and JS) is about 90 KB with no images to download. | Partly checked: the file size is measured; the load time was not formally measured. |
| **NFR-7** | Accessibility | Tree nodes can be reached with Tab and chosen with Enter or Space; nodes, hearts and progress bars have text labels for screen readers; feedback is announced through live regions; animations are reduced when the device asks for reduced motion. Target: WCAG 2.1 level AA colour contrast (W3C, 2018). | Checked after the feature freeze; the contrast results and fixes are in section 5. |
| **NFR-8** | Usability | A student with no prior knowledge can finish the tutorial in about 10 minutes and play level 1 without help. Text is plain and short, and every mistake is explained. | Usability test (section 7): met on a laptop (tutorial 11–12 min, level 1 unaided); only partly met on a small phone and a tablet. |
| **NFR-9** | Reliability | The app must not fail during the live demo. No runtime dependency on the network; storage errors are caught; random trees always have exactly the requested number of nodes. Backups: the deployed site, an offline copy and a recorded video. | Unit tests in CI (see section 6); rehearsals. |
| **NFR-10** | Maintainability | Plain JavaScript split into small files by responsibility (model, drawing, pages, storage and routing), each under 500 lines, with comments explaining intent. Any team member can change the app and see the result with a browser refresh. | Code review; see the architecture section. |
| **NFR-11** | Deployability | The app is a static site. Every push to `main` deploys automatically to the live URL. | See section 6. |

## Constraints

From the exam specification:

- **C-1** One core data structure from the CS2023 *Foundational Data Structures and Algorithms* knowledge unit (not one-dimensional arrays or linked lists) and one core algorithm on it. We chose binary trees and depth-first traversal (decision 001, Appendix A).
- **C-2** No prior knowledge of the topic may be assumed: the app is used **before** the lecture.
- **C-3** The app must include an assessment that gives extra scaffolding to students who struggle.
- **C-4** An SE approach and an ID approach must be used and documented in **separate** documents, available at the presentation.
- **C-5** GenAI use must be acknowledged, with the prompts and tools, in the ID document.
- **C-6** Deadlines: documents on ClickUP before 08:00 on Mon 16 Nov; on 16 or 17 Nov, a presentation of up to 10 minutes and a separate live demonstration of up to 10 minutes, followed by 5 minutes of questions and 5 minutes to set up and vacate; slides uploaded before presenting, and a link to the source-code repository.
- **C-7** Group of five, all present at the presentation.

From the team and the situation:

- **C-8** About three and a half weeks in total, alongside other modules (decision 002, Appendix A).
- **C-9** The repository stays private until the presentation, so hosting must work with a private repository (decision 004 in Appendix A, `docs/PLAN.md`).

## Out of scope

These were left out on purpose to keep the scope small enough to build, test and explain well:

- **Binary search trees** (insert, search, delete). BSTs appear only as a "fun fact" in the in-order step.
- **Level-order (breadth-first) traversal** as a skill to learn. It appears only as a wrong option in the quiz, with an explanation.
- Graphs and other data structures.
- Writing or reading traversal **code** (recursive or iterative). The app teaches the visiting order, which the lecture then turns into code.
- **User accounts**, a server or a database. Progress is per device only.
- A **lecturer dashboard** or class results. The lecturer cannot see individual students' results.
- Building your own tree, sound, and languages other than English.

## User stories

Format: *As a … I want … so that …* (Cohn, 2004), with acceptance criteria in *Given / When / Then* form. "Student" means a COS212 student with no prior knowledge of trees.

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
As a COS212 student who knows all three orders, I want a mode that picks an order for each tree, so that I can check I can tell the orders apart and not just repeat one.

- *Given* I have fewer stars than the unlock threshold, *then* Random Order shows a lock and my progress towards it.
- *Given* I play Random Order, *then* each tree shows its order in a banner, the same order never appears three times in a row, I start with one heart and win another every 5 trees, and losing my last heart ends the game with my score and high score.

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

## Traceability

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
| FR-23 Avatars | US-10, US-12 | `js/achievements.js` (`AVATARS`, `claimNewAvatars`, `avatarSection`) |

All code paths are relative to `app/`. Non-functional requirements map to the whole app; NFR-1 to NFR-3 are covered by US-1, US-12 and US-15, and NFR-4, NFR-5 and NFR-9 by US-17.

---

# Architecture and technology choices

This section explains how Tree Hop is built and why it is built that way. It covers how the code is organised, what the app stores, and why we chose these tools.

## The big picture

Tree Hop runs entirely in the web browser. There is no server and no database. The code is split into small files, and each file has one job. Figure 4.1 shows the files in layers. Each layer mostly uses the layer below it. The screens also save progress through the store in main.js.

![Figure 4.1: The Tree Hop files in layers.](img/arch-layers.png){width=85%}


Table 4.1 explains what each file does.

| **File** | **Its job** |
|----|----|
| tree.js | Knows the rules. Builds trees, works out the correct order for pre-order, in-order and post-order, and writes the "why" messages. |
| view.js | Draws the tree, moves the monkey and checks each tap against the correct order. |
| tutorial.js | The six-step lesson and the quick check. |
| game.js | The three games, with five levels each, plus Endless mode. |
| random.js | Random Order mode, which mixes the three orders. |
| achievements.js | The avatars a student can unlock. |
| main.js | Saves progress, shows the home page and switches between screens. |

*Table 4.1: What each file does.*

**Why it is split this way.** The rules in tree.js are kept apart from the screens. The tutorial, the games and Random Order mode all reuse the same tree and the same tap checking. Only the cost of a mistake changes: hearts, hints and stars. This is how the app can give more help to beginners and less help to confident students without changing the rules code.

## What happens when a student taps a node

Figure 4.2 shows the path of a single tap.

![Figure 4.2: What happens on each tap.](img/arch-tap-flow.png){width=85%}


1.  The tree drawing in view.js passes the tapped node to the Board.

2.  The Board compares it with the next node in the correct order, which tree.js worked out when the tree was created.

3.  If it matches, the node is marked, the monkey jumps to it and the sequence bar fills in.

4.  If it does not match, tree.js writes the reason. The screen shows the reason and, in a game, removes a heart.

## What the app stores

Figure 4.3 shows the three kinds of data. A tree node and the board only exist while a screen is open. Only the progress record is saved.

![Figure 4.3: The three kinds of data. The board holds a tree made of nodes.](img/arch-data.png){width=85%}

- **Where it is saved:** one small record in the browser (localStorage). Nothing is sent to a server, and there are no accounts.
- **What is saved:** best stars for each level and order, best Endless and Random Order scores, whether the tutorial is finished, and the chosen avatar.
- **What is not saved:** hearts, mistakes and hints. They only last while a level is open.
- **If the record is damaged or storage is blocked:** missing values are reset to defaults and the app keeps working. Progress is simply not kept.
- **Limit:** progress is tied to one browser on one device. Clearing browser data removes it, and the lecturer cannot see it.

## Technology choices

The main choice is in decision record 004: plain HTML, CSS and JavaScript with no framework and no build step. Table 4.2 lists the choices and the reason for each.

| **Area** | **What we chose** | **Why** |
|----|----|----|
| Language | Plain HTML, CSS and JavaScript, no framework | No setup for anyone on the team, works offline, and nothing can fail at build time before the demo. We rejected React with Vite and TypeScript because it needed build tools and React knowledge from everyone. |
| Drawing the tree | SVG | Each node is its own clickable element, so it works with keyboard and screen readers. It also scales to any screen size. |
| Screens | One page, with the screen named after \# in the address | Works on any static host without extra setup, and also when the page is opened as a file. |
| Saving progress | localStorage | No accounts or server needed, and no personal data leaves the device. |
| Testing | Node's built-in test runner | No packages to install. It tests tree.js, the file that holds the rules, and loading saved progress in main.js. |
| Hosting | Vercel, serving the app folder | The repository is private until the presentation, and GitHub Pages cannot host a private repository on a free organisation. The backups are an offline copy and a recorded video. |

*Table 4.2: Technology choices and reasons.*

All of these choices serve the same needs. The app must survive a live demo at the venue, five part-time students must be able to read and change it, and there is no data to keep on a server.

## How the code is tested and published

Two separate automatic steps run, as Figure 4.4 shows.

![Figure 4.4: From pull request to live site. The workflow and Vercel run separately: Vercel does not wait for the tests to pass.](img/arch-pipeline.png){width=85%}

- **GitHub Actions** runs on every push to main and every pull request to main. It checks every script in app/js for syntax errors and then runs the unit tests with npm test.
- **Vercel** publishes the app. A merge to main goes live, and every pull request gets a preview link.

The workflow tests the code and Vercel publishes it. The two run separately: the workflow does not publish anything, and Vercel does not wait for the tests, so we check that the workflow has passed before merging.

## Weak points and what we would improve

- **Repeated code.** game.js and random.js repeat some code, such as the message line, the hearts display, the dialogs and the walkthrough. Sharing it would be the first clean-up.
- **Progress store in the shell file.** Store sits in main.js, so every screen depends on the shell. It could move into its own file.
- **Limited automatic testing.** Only the rules in tree.js and loading saved progress in main.js have unit tests. The screens are checked by hand, in the usability test and in rehearsals.

---

# UI design and wireframes

Tree Hop was built as an evolutionary prototype (decision 002, Appendix A). The UI was therefore designed in code and refined on the working app, not drawn as wireframes first. The figures in this section are **annotated screenshots of the finished app**, used as wireframes and as the storyboard for the ID document (section 6).

## Screen flow

![Figure 5.1: Screen flow.](img/screen-flow.png)

*Every screen also has a "← Home" link, and the browser's back button works because each page has its own address (`#/`, `#/tutorial`, `#/play/pre|in|post`, `#/play/random`).*


## Screens

The screenshots were taken from the app at laptop width (1200 px) and phone width (390 px), in light and dark mode. They are in `docs/se/img/`.

| # | Screen | File | What the student does | Feedback they get | User stories |
|--|----------|----------------------|----------------------|-------------------------|-------|
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
| 11 | Random Order | `random.png` | Clears trees, each with its own order (never the same three times in a row) | Large coloured banner per tree, score, high score | US-14 |

![Figure 5.2: Home page for a new student. The tutorial is marked "Start here", every game is at level 1, and Random Order is locked.](img/home.png){width=60%}

![Figure 5.3: Tutorial step 1. The student tapped 3 when asked for a leaf, and the feedback explains why it is not one.](img/tut-1.png){width=60%}

![Figure 5.4: Tutorial step 2, in-order. The dots under each node count the monkey's passes, and in-order writes the node down on the 2nd pass.](img/tut-2.png){width=60%}

![Figure 5.5: Tutorial step 3, pre-order practice after a wrong tap. No hearts are lost in the tutorial.](img/tut-3.png){width=60%}

![Figure 5.6: Tutorial step 6, quick check. In-order was answered wrongly on purpose, and a "Review In-order" button leads back to that step.](img/tut-6.png){width=60%}

![Figure 5.7: Post-order level 2 after two correct taps. The nodes are numbered in visit order and the sequence bar fills.](img/game.png){width=60%}

![Figure 5.8: The same level after two wrong taps (two hearts lost) and a hint. The next node is outlined and the hint explains why it is next.](img/game-wrong.png){width=60%}

![Figure 5.9: Out of hearts. The student is offered a step-by-step walkthrough instead of a "game over".](img/out-of-hearts.png){width=60%}

![Figure 5.10: The walkthrough. Each press of "Next step" visits one node and explains why.](img/walkthrough.png){width=60%}

![Figure 5.11: Level complete with 3 stars, the mistakes and hints, and the full sequence.](img/level-complete.png){width=60%}

![Figure 5.12: Endless mode (in-order) after two trees.](img/endless.png){width=60%}

![Figure 5.13: Home page with 30 stars. Random Order is unlocked and the first avatars are available.](img/home-progress.png){width=60%}

![Figure 5.14: Random Order. The coloured banner announces the order for each new tree.](img/random.png){width=60%}

## Design decisions

| Decision | Why |
|---|---|
| **One character as a guide** (the monkey, or an avatar the student unlocks) that swings on a vine to every visited node | Makes the traversal a *path* the student can watch, not just a list of numbers. Gives the app a friendly identity (ID section 8, Attention). |
| **One colour per order**: pre-order blue, in-order green, post-order orange, used for the game card, rule card, buttons, banner and sequence bar | The student always knows which order they are in, which matters most in Random Order, where it changes every tree (Mayer's signalling principle, ID section 7). |
| **Rule card above the tree, feedback line directly below it** | The rule, the tree and the explanation are read together, with no hunting around the screen (spatial contiguity). |
| **Numbered badges and a sequence bar** | Shows what has been written down so far, so the student doesn't have to hold the sequence in their head (cognitive load, ID section 5). |
| **Hearts and stars** | Familiar game signals for "how many mistakes I have left" and "how well I did". The stars rule is shown with the mistakes and hints in the level summary. |
| **Explanations instead of "Wrong!"** | Every wrong tap names the rule and the node involved, because the purpose is learning, not scoring (ID section 9). |
| **Large tap targets** | Each node has an invisible tap area 10 px wider than the circle, and every button is at least 44 px high. Buttons work well with a finger; tree nodes are smaller, and the usability test found them hard to tap on a small phone and a tablet (section 7). |
| **Plain HTML, CSS and SVG, no images** | The trees are drawn in SVG, so they stay sharp at any size, and the whole app is about 90 KB and works offline (NFR-1, NFR-6). |

## Responsive layout, light and dark mode

- **Width.**
  - The content is at most 760 px wide and centred on a laptop.
  - Below 620 px the three game cards stack in one column (NFR-4).
  - The tree is an SVG that scales with the screen. Deep trees (the largest Random Order trees, up to 4 levels below the root) get a wider drawing, and the board scrolls sideways on a phone instead of shrinking the nodes further.
  - On a 390 px phone, a node in a game tree is about 26 px across, with a tap area of about 36 px. That is above the WCAG 2.2 minimum target size (24 px) but below the 44 px that the buttons use, so small trees are easier to tap and the largest trees are tighter; two usability participants on touch screens found the nodes hard to hit (section 7).
- **Light and dark mode.**
  - Both themes follow the device setting (`prefers-color-scheme`, NFR-5).
  - Every colour is a CSS variable, so the dark theme redefines the palette in one place. The order colours are lighter in dark mode so they stay readable.

![Figure 5.15: Home page on a 390 px phone. The game cards stack in one column.](img/phone-home.png){width=60%}

![Figure 5.16: A pre-order level on a phone, light mode.](img/phone-game.png){width=60%}

![Figure 5.17: The same level in dark mode.](img/phone-dark.png){width=35%}

## Accessibility and the UI check after the feature freeze

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

The amber outline on the hinted node (2.20 on white) is below the 3:1 that WCAG 2.1 asks for graphics that carry information (W3C, 2018). We kept it because the outline is not the only way the hint is given: the hint text names the node ("Tap 30."), and the node pulses unless reduced motion is on. A darker outline would be a small improvement for a later version.

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

---

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

The usability evaluation is in section 7.

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

---

# Usability evaluation

We planned a moderated test with 3–5 students who had not done COS212 (`docs/se/usability-test-plan.md`), with the six tasks, a pre- and post-knowledge check on a tree that does not appear in the app, and the System Usability Scale (SUS; Brooke, 1996). To fit the time we had, we turned it into a self-completed questionnaire (`docs/se/usability-questionnaire.md`) that covers tasks T1–T5, and ran it before the submission.

## Participants

We could not recruit students in time, so the five participants are adults outside computer science: a hairdresser, a civil engineer, a university administration clerk, a retired farmer and a UX designer, aged 24 to 67. They are referred to only as P1–P5. Four had never learnt about trees; P5 had, so P5 is left out of the learning-gain figures. Three used a laptop (Chrome or Edge), P1 an Android phone (Chrome) and P4 an iPad (Safari). P1 and P4 had help from a family member. This is a real deviation from the plan: the results tell us how usable the app is for adults new to the topic, but they are not evidence about COS212 students. The questionnaire was self-completed, so completion and times are what participants reported, not what we observed. The answers were written up from what the participants said, so the quotes are close paraphrases.

## Results

| | Device | Tutorial | In-order L1 | Post-order L1 + L2 | Explain post-order | Quick check | Pre → post check | SUS |
|---|---|---|---|---|---|---|---|---|
| P1 | Phone | A 16 min | A 10 min | A 20 min | ✓ | 1/3 | 0 → 3 (one guess) | 57.5 |
| P2 | Laptop | ✓ 11 min | ✓ 5 min | ✓ 10 min | ✓ | 2/3 | 0 → 3 | 92.5 |
| P3 | Laptop | ✓ 12 min | ✓ 5 min | ✓ 11 min | ✓ | 2/3 | 0 → 3 | 92.5 |
| P4 | Tablet | A 28 min | A 15 min | A 27 min | ✓ | 0/3 | 0 → 3 (helped) | 27.5 |
| P5 (prior knowledge) | Laptop | ✓ 6 min | ✓ 2 min | ✓ 6 min | ✓ | 3/3 | 3 → 3 | 92.5 |

*Table 7.1: Usability results per participant. ✓ = finished without being stuck; A = finished, but stuck for a while. Times are the participants' own, to the minute.*

- **Completion.** All five reported finishing every task; three did so without getting stuck, and two (P1, P4) had help from a family member. Three used the Hint and two (P1, P4) ran out of hearts and reached the walkthrough, which then got them through the level.
- **Understanding.** All five explained the post-order rule correctly in their own words (children or subtrees before the node), three with an analogy of their own, such as "clearing the sub-folders before closing the main folder". The four participants new to trees went from 0/3 on the pre-check to 3/3 on the post-check. This is encouraging but not proof that the app caused the gain: P1 guessed one answer, P4 was helped, the sample is tiny and there was no comparison group.
- **Progress.** Everyone read their star count correctly. No one could say how to unlock Endless: they all described the Random Order card (30 stars) instead, because Endless only appears after level 5. We count this as a fault in our question.
- **SUS.** The mean is 72.5 and the median 92.5. The three laptop users gave 92.5; the phone and tablet users gave 57.5 and 27.5. Those two were also the least experienced with technology, so we cannot say whether the device or the person explains the lower scores.

## Issues and what we did

| # | Issue | Seen by | Severity | Decision |
|---|---|---|---|---|
| U1 | Tree words still felt foreign, and a root at the top contradicts a real tree. The tutorial defines the words; the metaphor is the problem. | P1, P2, P4 | Medium | Known limitation: add a line saying CS trees are drawn upside down. |
| U2 | Nodes hard to tap on a small phone and a tablet. | P1, P4 | Medium | Known limitation: set a minimum on-screen tap size. |
| U3 | Tutorial too fast for one participant, and cannot be skipped by one who already knew trees. | P4, P5 | Low | Kept (the tutorial is learner-paced and optional); skip/replay is future work. |
| U4 | The Hint shows the next node rather than a nudge. | P5 | Low | Kept: the Hint is always available, is highlighted after two mistakes, and explains why that node is next. A graded nudge first is future work. |
| U5 | Wish for an animated replay of the full order after a level (the level summary shows the sequence as text); the quick check came as a surprise. | P3, P5 | Low | Future work. |
| U6 | Applying post-order to bigger trees ("which left?"). | P3, P5 | Medium | Known limitation: the app teaches the order, not the recursion (section 8). |

*Table 7.2: Issues found in the usability test.*

The full table, with all nine issues and the quotes, is in `docs/se/usability-test-plan.md`, section 10.

## What this means for NFR-8

NFR-8 asks that a student with no prior knowledge finishes the tutorial in about 10 minutes and plays level 1 without help. On a laptop, the two participants new to trees reported finishing the tutorial in 11 and 12 minutes and level 1 in 5 minutes without help, which is close to the target. The phone and tablet users needed much longer and some help, so on small touch screens NFR-8 is only partly met, and U2 is the change most likely to close that gap. The mistake explanations were the feature every participant mentioned, which supports the scaffolding design described in the ID document.

---

# Conclusion

We built Tree Hop, a pre-lecture app that teaches binary trees and pre-, in- and post-order traversal to COS212 students with no prior knowledge. It meets the spec's core requirements: it covers one CS2023 core data structure and algorithm, it teaches from first principles through a tutorial, and it assesses every step of a traversal, adding scaffolding (an explanation for each mistake, then a hint, then a full walkthrough) only for students who need it. The requirements in section 3 are traced to the screens and code that implement them.

On the process side, we followed a Scrum-based iterative approach with evolutionary prototyping. It did not run to the original schedule: the first two sprints slipped, and the project turned on a working prototype that was built later than planned. The method's value showed in how we responded: we re-planned three times, cut scope, kept the work after the feature freeze mostly to fixes (with the exceptions in section 2.3.2) and moved the team's effort from building to testing, documenting and preparing the demo. The main lessons, set out in section 2, are to make the first decisions in the first week, to build an early prototype on purpose, to merge in small reviewed pieces, and to close issues as we go.

The app has clear limits that follow from its scope: progress is stored only on the student's device, the lecturer cannot see results, and it teaches the visiting order but not the traversal code. Natural next steps would be an optional lecturer view of anonymous class results, a short section linking the walk around the tree to recursive code, and extending the same tap-in-order design to level-order traversal and binary search trees. In the usability test with five adult participants (four new to trees), all reported finishing the tutorial and the games and could explain post-order afterwards; the mean SUS score was 72.5, with lower scores on the two touch devices, where small tap targets were the main problem and the first change we would make.

---

# References {-}

References use the Harvard style, as in the ID document.

- Brooke, J. (1996) 'SUS: A "quick and dirty" usability scale', in Jordan, P.W., Thomas, B., Weerdmeester, B.A. and McClelland, I.L. (eds) *Usability evaluation in industry*. London: Taylor & Francis, pp. 189–194.
- Cohn, M. (2004) *User Stories Applied: For Agile Software Development*. Boston: Addison-Wesley.
- Kumar, A.N., Raj, R.K., Aly, S.G., Anderson, M.D., Becker, B.A., Blumenthal, R.L., Eaton, E., Epstein, S.L., Goldweber, M., Jalote, P., Lea, D., Oudshoorn, M., Pias, M., Reiser, S., Servin, C., Simha, R., Winters, T. and Xiang, Q. (2024) *Computer Science Curricula 2023*. New York: Association for Computing Machinery.
- Schwaber, K. and Sutherland, J. (2020) *The Scrum Guide*. Available at: https://scrumguides.org/ (Accessed: 15 November 2026).
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/ (Accessed: 15 November 2026).
- W3C (2018) *Web Content Accessibility Guidelines (WCAG) 2.1*. Available at: https://www.w3.org/TR/WCAG21/ (Accessed: 15 November 2026).
