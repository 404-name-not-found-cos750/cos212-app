# Tree Hop: Software Engineering document

<!-- Master outline. Each section links to its source file; the final PDF is assembled by
     concatenating the section files in this order. -->

## Title page

- **Title:** Tree Hop: a pre-lecture app for binary tree traversal. Software Engineering document
- **Group:** 404: Name Not Found
- **Members:** [TODO Galen: names + student numbers]
  - Galen Myburgh – [student number]
  - Hendré Beyer – [student number]
  - Mthobisi Khoza – [student number]
  - Francois Scholtz – [student number]
  - Shekinah Maja – [student number]
- **Module:** COS750 Educational Software Development, Department of Computer Science, University of Pretoria
- **Date:** [TODO Galen: submission date, 15 or 16 November 2026]
- **Code:** https://github.com/404-name-not-found-cos750/cos212-app · **Live app:** https://cos212-tree-hop.vercel.app

## Contents

1. Introduction
2. SE methodology and process
3. Requirements and user stories
4. Architecture and technology choices
5. UI design and wireframes
6. Testing and deployment
7. Usability evaluation
8. Conclusion
- References
- Appendix A: Decision records

---

## 1. Introduction

### 1.1 Purpose of this document
The COS212 (Data Structures and Algorithms) lecturer asked for an app that gives students a tutor-style introduction to a topic **before** the lecture. This document describes the software engineering side of our prototype, **Tree Hop**: the development method we followed and how the process actually went, the requirements and user stories, the architecture and technology choices, the user interface, and how we tested, deployed and evaluated the app. The instructional design (learning objectives, learner analysis, learning theories, assessment design and the GenAI acknowledgement) is in the separate ID document, as the spec requires.

### 1.2 The app
Tree Hop teaches **binary trees** and **depth-first tree traversal** (pre-order, in-order and post-order) to students who have never seen them. A six-step tutorial introduces the parts of a tree and then one idea, a monkey walking around the tree and passing every node three times, from which all three orders follow. The student watches each order demonstrated, practises it straight away and finishes with a three-question quick check that sends them back to what they got wrong. Three games, one per order, then ask the student to tap the nodes of random trees in the right order over five levels of growing size. Every wrong tap costs a heart and is explained; after two mistakes the app suggests a hint; and when the hearts run out it walks the student through the tree step by step. Stars, unlockable levels, an Endless mode and a mixed Random Order mode keep stronger students busy. The app is plain HTML, CSS and JavaScript, runs offline from `index.html`, needs no account and keeps progress only in the browser.

### 1.3 Choice of topic
The spec allows one core data structure from the CS2023 Foundational Data Structures and Algorithms knowledge unit (excluding one-dimensional arrays and linked lists) with one core algorithm on it (Kumar et al., 2024). We chose binary trees with pre-, in- and post-order traversal because a traversal is a sequence of node visits: every tap can be assessed on its own, so the app can give immediate, specific feedback and add scaffolding only where a student struggles. The three orders share one mental model, and the scope was small enough to build, test and demonstrate in the time we had. Binary search trees, level-order traversal and graphs were considered and left out. The full reasoning is in [decision 001](../decisions/001-data-structure-and-algorithm.md).

### 1.4 How this document is organised
Section 2 explains our method (Scrum with short sprints and evolutionary prototyping) and gives an honest account of how the sprints went, including three re-plans. Section 3 lists the requirements and user stories and traces them to the code. Sections 4 and 5 describe the architecture and the user interface. Section 6 covers testing and deployment, section 7 the usability evaluation with students, and section 8 concludes. The decision records that justify our main choices are in Appendix A.

---

## 2. SE methodology and process
Source: [methodology-and-process.md](methodology-and-process.md) (decision: [002](../decisions/002-se-methodology.md)).

## 3. Requirements and user stories
Source: [requirements.md](requirements.md).

## 4. Architecture and technology choices
**Owner: Mthobisi.** [TODO Mthobisi: write `docs/se/architecture.md`; due Sat 14 Nov 12:00.] It must cover:
- The technology choice and why (build on [decision 004](../decisions/004-tech-stack-and-hosting.md)): plain HTML/CSS/JS, no build step, static hosting, `localStorage`; the alternatives (React + Vite + TypeScript) and the trade-offs (demo safety, team speed, no type checking).
- A component/module diagram of the actual code: `index.html` script order; `tree.js` (model), `view.js` (`TreeView`, `SeqBar`, `Board`), `game.js`, `random.js`, `tutorial.js`, `main.js` (`Store` and router), and which depends on which.
- The data model: the tree node (`value`, `left`, `right`, `parent`, `depth`, `slot`), the traversal `MODES`, and the saved progress object in `localStorage` (`stars` per order and level, `best` per order and Random, `tutorialDone`).
- A sequence diagram of one tap in a game: `Board.tap` → correct or `Tree.explain` → `onWrong` → hearts and hint nudge → walkthrough.
- The page flow / routing (`#/`, `#/tutorial`, `#/play/:kind`, `#/play/random`) as a state or navigation diagram.
- How the design meets the non-functional requirements (offline, privacy, reliability, maintainability): link NFR-1, NFR-3, NFR-9, NFR-10 in [requirements.md](requirements.md).
- Known limitations (no type checking, global script order, progress per device only).

## 5. UI design and wireframes
**Owner: Hendré.** [TODO Hendré: write `docs/se/ui-design.md` with images in `docs/se/img/`; due Sat 14 Nov 12:00.] It must cover:
- Wireframes or annotated screenshots of every screen: home, tutorial steps 1–6, a game level, the level-complete and out-of-hearts dialogs, the walkthrough, Endless, Random Order (locked and playing).
- The screen flow (storyboard) between them, also used as the tutorial storyboard in the ID document (#14, #17).
- The design decisions: the monkey as a guide, colour coding per order, hearts and stars, the sequence bar, large tap targets, feedback placement.
- Responsive layout (phone vs laptop), light and dark mode, and accessibility (keyboard access, screen-reader labels, live regions, reduced motion, contrast), with the results of the UI fixes made after the feature freeze.
- Which user stories each screen serves (refer to US numbers in [requirements.md](requirements.md)).

## 6. Testing and deployment
Source: [testing-and-deployment.md](testing-and-deployment.md).

## 7. Usability evaluation
**Owner: Galen.** Plan: [usability-test-plan.md](usability-test-plan.md). [TODO Galen: write the results in `docs/se/usability.md` after the test with 3–5 students who have not done COS212.] It must cover: the participants (number and background, no names), the tasks they were given, what we measured (task completion, time, mistakes, hints used, quiz score, comments), the results, the bug list and what we fixed, and how the findings relate to NFR-8 and the user stories.

## 8. Conclusion
We built Tree Hop, a pre-lecture app that teaches binary trees and pre-, in- and post-order traversal to COS212 students with no prior knowledge. It meets the spec's core requirements: it covers one CS2023 core data structure and algorithm, it teaches from first principles through a tutorial, and it assesses every step of a traversal, adding scaffolding (an explanation for each mistake, then a hint, then a full walkthrough) only for students who need it. The requirements in section 3 are traced to the screens and code that implement them.

On the process side, we followed Scrum with short sprints and evolutionary prototyping. It did not run to the original schedule: the first two sprints slipped, and the project turned on a working prototype that was built later than planned. The method's value showed in how we responded: we re-planned three times, cut scope, held the feature freeze and moved the team's effort from building to testing, documenting and preparing the demo. The main lessons, set out in section 2, are to make the first decisions in the first week, to build an early prototype on purpose, to merge in small reviewed pieces, and to record meetings and close issues as we go.

The app has clear limits that follow from its scope: progress is stored only on the student's device, the lecturer cannot see results, and it teaches the visiting order but not the traversal code. Natural next steps would be an optional lecturer view of anonymous class results, a short section linking the walk around the tree to recursive code, and extending the same tap-in-order design to level-order traversal and binary search trees. [TODO Galen: add one or two sentences on the usability test results and the changes they led to.]

---

## References

[TODO Galen: confirm the referencing style the module expects (e.g. Harvard or IEEE) and add the references used in sections 4–7.]

- Beck, K. et al. (2001) *Manifesto for Agile Software Development*. Available at: https://agilemanifesto.org/ (Accessed: [date]).
- Cohn, M. (2004) *User Stories Applied: For Agile Software Development*. Boston: Addison-Wesley.
- Kumar, A.N., Raj, R.K., Aly, S.G., Anderson, M.D., Becker, B.A., Blumenthal, R.L., Eaton, E., Epstein, S.L., Goldweber, M., Jalote, P., Lea, D., Oudshoorn, M., Pias, M., Reiser, S., Servin, C., Simha, R., Winters, T. and Xiang, Q. (2024) *Computer Science Curricula 2023*. New York: Association for Computing Machinery.
- Schwaber, K. and Sutherland, J. (2020) *The Scrum Guide*. Available at: https://scrumguides.org/ (Accessed: [date]).
- Sommerville, I. (2016) *Software Engineering*. 10th edn. Boston: Pearson.
- W3C (2018) *Web Content Accessibility Guidelines (WCAG) 2.1*. Available at: https://www.w3.org/TR/WCAG21/ (Accessed: [date]).

## Appendix A: Decision records

Include the final text of each record:
- [001 – Data structure and algorithm](../decisions/001-data-structure-and-algorithm.md)
- [002 – SE methodology](../decisions/002-se-methodology.md)
- [004 – Tech stack and hosting](../decisions/004-tech-stack-and-hosting.md)
- [TODO Galen: set the status of 001, 002 and 004 to Accepted once the group has agreed.]

Decision 003 (ID model) belongs in the ID document.
