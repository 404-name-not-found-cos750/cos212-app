---
title: "Tree Hop: Instructional Design document"
subtitle: "COS750 Educational Software Development, final examination: the COS212 app"
author: "404: Name Not Found"
date: "16 November 2026"
---

<!--
EDITOR NOTES (Galen). Delete this comment before the PDF export.
- This is the master file for the ID document. Paste each owner's section in place of its brief.
- Sections due to Galen: Sat 14 Nov 12:00. Final PDF: Sun 15 Nov 18:00. Submit: Sun 15 Nov 22:00.
- Every brief lists what the section must cover, the app features to point to, and a target length.
  "App hooks" are the concrete things in Tree Hop to name and, where useful, screenshot.
- Shared references live in references.md (Harvard style). Cite in text as (Author, Year).
- Appendix A is genai-acknowledgement.md. Append it at export time (see the export notes).
- Terminology to keep consistent across sections: "node", "root", "leaf", "subtree", "traversal",
  "pre-order / in-order / post-order", "the monkey's walk", "visit" (1st/2nd/3rd), "hearts",
  "hint", "walkthrough", "stars", "Endless mode", "Random Order mode".
-->

**Group:** 404: Name Not Found

**Members:**

| Name | Student number | Sections written |
|---|---|---|
| Galen Myburgh | [TODO Galen] | 1, 10, references, Appendix A, editing |
| Shekinah Maja | [TODO Galen] | 2, 3, 4, 5, 6 (content review) |
| Hendré Beyer | [TODO Galen] | 6 (storyboard), 7, 8 |
| Mthobisi Khoza | [TODO Galen] | 9 |
| Francois Scholtz | [TODO Galen] | App build; input to 9 |

**Repository:** https://github.com/404-name-not-found-cos750/cos212-app
**Live app:** https://cos212-tree-hop.vercel.app

---

# Introduction

This document describes the instructional design of **Tree Hop**, the COS212 app our group built for the COS750 final examination. It sets out what the app is meant to teach, who it is for, and why its content, presentation, motivation and assessment were designed the way they are. The software engineering side (methodology, requirements, architecture and testing) is covered in the separate SE document.

**Purpose.** The COS212 (Data Structures and Algorithms) lecturer asked for an app that gives students a tutor-style introduction to a topic *before* the lecture. The app may not assume any prior knowledge of the topic, and it has to include an assessment that gives extra scaffolding to students who are not yet comfortable with the work, so that they arrive at the lecture ready to build on it.

**Target learner.** The learner is a COS212 student at the University of Pretoria who has done introductory programming but has not yet been taught trees in the module. They may never have seen the words *root*, *leaf* or *traversal*. They use the app on their own, in a short session before the lecture, on a laptop or a phone. Section 3 analyses this learner in detail.

**Topic.** The app teaches one data structure, the **binary tree**, and one algorithm applied to it, **depth-first tree traversal** in its three classic orders: pre-order, in-order and post-order. Both fall under the Algorithmic Foundations (AL) knowledge area of CS2023 (Kumar et al., 2024). We first considered decision trees, but they are not on the Foundational data structures list, so we kept the game idea and moved it to binary trees. Decision record 001 in the repository (`docs/decisions/001-data-structure-and-algorithm.md`) gives the options we weighed and why traversal won: a traversal is a sequence of node visits, so every single tap can be checked and explained, and the three orders share one mental model that the tutorial can teach once and reuse.

**Tree Hop in one paragraph.** A monkey hops around a binary tree, and the student's job is to tell it which node to visit next. A six-step tutorial introduces the parts of a tree, then shows the monkey walking around the tree so that it passes every node three times; pre-order writes a node down on its first pass, in-order on its second and post-order on its third. One step per order follows, each with a step-by-step demonstration and a practice tree with hints, and the tutorial ends with a three-question quick check that links back to the steps the student got wrong. Three games (one per order) then offer five levels each on random trees of 3 to 12 nodes. Every wrong tap costs one of three hearts and explains why it was wrong; after two mistakes a hint is offered; when the hearts run out the app walks the student through that tree step by step. Stars reward accuracy and unlock the next level, an Endless mode, and finally a Random Order mode that mixes all three orders. Progress is saved in the browser on the student's own device.

**Structure of this document.** Section 2 describes the ID model we followed (ADDIE) and how its phases map onto our work. Sections 3 and 4 analyse the learner and state the learning objectives. Section 5 explains the learning theories behind the design, and sections 6 to 8 cover the content and storyboard, multimedia design and learning styles, and motivation. Section 9 describes the assessment, the scaffolding and the question bank. Section 10 concludes. Appendix A acknowledges our use of generative AI, with the prompts and tools used, as the examination specification requires.

---

# Instructional design model: ADDIE

> **Owner: Shekinah.** Target length: 1 to 1½ pages. Also the basis for decision record 003.

Brief: what this section must cover.

- **What ADDIE is**, in a short paragraph: Analysis, Design, Development, Implementation, Evaluation (cite Branch, 2009).
- **Why ADDIE and not another model** (e.g. a rapid-prototyping model such as SAM, or Dick and Carey): it is well documented, its phases give us the structure the ID document needs, and its evaluation phase pairs with the usability test. Be honest that we ran it iteratively, not as a strict waterfall.
- **A table mapping each phase to what we actually did and when**, using the sprints in `docs/PLAN.md`:
  Analysis = topic choice against CS2023 (decision 001), learner analysis, objectives;
  Design = objectives, storyboard/wireframes, assessment and scaffolding design;
  Development = the app on `DevFS`, merged by PR #33, tutorial text review;
  Implementation = deployment to the live URL, the presentation and demo;
  Evaluation = formative: usability test with students who haven't done COS212, the tutorial quick check and game feedback; summative: what we would measure in a real COS212 rollout.
- **How ADDIE fits with Scrum** (the SE method in the SE document): ADDIE gives the instructional phases; Scrum sprints gave the time boxes in which we worked through them. One or two sentences, with a pointer to the SE document.
- **One limitation** we hit (e.g. the build moved faster than the analysis, so objectives were written against a working prototype and then used to review the content). [TODO Shekinah: confirm what actually happened.]

---

# Learner analysis

> **Owner: Shekinah.** Target length: 1 page. Due first: sections 4 to 9 depend on it.

Brief: what this section must cover.

- **Who the learner is**: second-year-level COS212 student at UP, has done introductory programming (variables, loops, functions, likely recursion), has **no prior knowledge of trees or traversal** (the spec says we may not assume any).
- **Context of use**: alone, before the lecture, short session (estimate how long a full tutorial + one game takes; time it yourself), on a laptop or phone, possibly on a slow connection. App hooks: works offline, no login, phone layout, progress kept on the device.
- **Prior knowledge and likely misconceptions** we designed for: confusing *depth-first* with *level-by-level* reading (the quiz uses the level-order sequence as a distractor on purpose); thinking in-order means "left to right across the page"; mixing up which pass each order writes on. Link each to where the app addresses it.
- **Differences between learners**: some confident and fast (Endless and Random Order give them a challenge), some anxious or struggling (no hearts in tutorial practice, hint after 2 mistakes, walkthrough). Mention language: English-only text, kept short.
- **Accessibility needs** we considered (keyboard, colour contrast, screen-reader labels, light/dark mode). Coordinate with Hendré's UI fixes so this matches the app.
- **Evidence**: what the usability test participants told us about their background. [TODO Shekinah/Galen: summarise from the usability test results once done; do not describe participants beyond "students who haven't done COS212".]

---

# Learning objectives

> **Owner: Shekinah.** Target length: 1 page including the table. Cite Anderson and Krathwohl (2001).

Brief: what this section must cover.

- **One overall goal** in a sentence (e.g. "Before the lecture, the student can produce and explain the pre-, in- and post-order traversals of a small binary tree").
- **A table of 5 to 7 objectives**, each with: ID (LO1, LO2, ...), the objective written as "The student will be able to [verb] ...", the revised Bloom's level, and **where in the app it is taught** and **where it is assessed**. Suggested spread, adjust as needed:
  - *Remember*: identify the root, a leaf, a child and a subtree (tutorial step 1, "Meet the tree").
  - *Understand*: explain that a traversal visits every node exactly once, and that the three orders differ only in which of the three passes writes the node down (step 2, the monkey's walk).
  - *Apply*: produce the pre-, in- and post-order sequence of a given tree (steps 3 to 5 practice; game levels 1 to 5).
  - *Analyse*: explain why a given node cannot be visited yet (the mistake explanations, e.g. "In post-order children come before parents. 30 still has unvisited nodes below it.").
  - *Analyse/Evaluate*: pick the correct sequence from distractors, including a level-order distractor (step 6 quick check); identify which order a sequence came from (Random Order mode).
- **Why the objectives stop at Analyse/Evaluate**: a pre-lecture app prepares students for the lecture; *Create* (e.g. writing the recursive traversal code) is left for the lecture and practicals.
- **Scope**: say clearly that BST insert/search, level-order (breadth-first) traversal and graphs are out of scope (decision 001).
- The objective IDs (LO1 ...) are reused in section 9's question-bank table, so fix them early and send them to Mthobisi.

---

# Learning theories applied

> **Owner: Shekinah.** Target length: 1½ to 2 pages. Cite Vygotsky (1978), Wood, Bruner and Ross (1976), Sweller (1988), plus any others in references.md.

Brief: what this section must cover. For each theory: one short paragraph on the idea, then **one or two concrete examples from Tree Hop**.

- **Constructivism / active learning**: students learn by doing, not by reading definitions. App hooks: every tutorial step has a task (tap the root, tap a leaf, tap the right child of 3); the games are entirely "tap the next node".
- **Scaffolding and the zone of proximal development** (Vygotsky, 1978; Wood, Bruner and Ross, 1976): support that is given when needed and withdrawn as the student improves. App hooks: watch a demo → practise with hints and no hearts → games with hearts → Endless with no hints → Random Order with one life. Keep this short and point to section 9, which covers the scaffolding mechanics in detail.
- **Cognitive load theory** (Sweller, 1988): limit what the student must hold in working memory. App hooks: **the monkey's walk, where each node is passed three times**, gives one mental model for all three orders instead of three separate rules; trees start at 3 nodes and grow (levels 1 to 5: 3, 5, 7, 9, 12 nodes); one idea per tutorial step; the rule card ("Root → Left → Right") stays on screen during play; the visit-order bar shows what has been written down so far.
- **Behaviourism / immediate feedback and reinforcement**: each tap gets immediate right/wrong feedback; stars and unlocks reinforce accurate work. Make the point that the feedback is *explanatory*, not just "wrong", which moves it beyond pure drill.
- **Mastery learning** (optional): a level must be cleared to unlock the next; the quick check sends students back to the step they missed ("Review In-order").
- Close with a short table: theory → design decision → app feature, so the panel can see the mapping at a glance.

---

# Content design and storyboard

> **Owners: Shekinah (content review) and Hendré (storyboard).** Target length: 2 pages including figures.

Brief: what this section must cover.

- **Content structure** (Shekinah): the order in which ideas are introduced and why: vocabulary (step 1) → the walk (step 2) → pre-order (3) → in-order (4) → post-order (5) → quick check (6) → games. Explain why pre-order comes first (the node is written on arrival, so it is the easiest to see) and why the walk comes before the individual rules.
- **Content review against the objectives** (Shekinah, issue #19): read the tutorial text in `app/js/tutorial.js` and the rule cards and mistake messages in `app/js/tree.js`. List each objective with the screen that teaches it, and **list any corrections or wording changes** (with the reason). [TODO Shekinah: the actual list of corrections, or state that none were needed.]
- **Worked examples used** (Shekinah): the tutorial trees and why they were chosen, e.g. step 4's practice tree is a binary search tree so that in-order comes out sorted (10, 20, 30, 40, 60); step 5 links post-order to deleting a tree or adding up folder sizes; step 3 links pre-order to copying a tree.
- **Storyboard** (Hendré, issues #14, #17): one frame per tutorial step and one for each game state (playing, wrong tap, hint, out of hearts → walkthrough, level complete with stars). Screenshots from the live app, each with a one-line caption of what the learner does and what feedback they get. The same figures can be reused as the wireframes in the SE document.
- **Screen flow**: Home → Tutorial (6 steps) → Games (pre / in / post, levels 1 to 5 → Endless) → Random Order (unlocked by stars). A simple diagram is enough.

---

# Learning styles and multimedia design

> **Owner: Hendré.** Target length: 1½ pages. Cite Mayer (2009).

Brief: what this section must cover.

- **Learning styles catered for**, framed carefully: describe how the app offers **several modes of representation** (visual tree and animation, short text, hands-on tapping) so different learners have more than one way in. Add one sentence acknowledging that matching instruction to a single preferred "style" is contested in the literature, which is why we used multiple representations for everyone rather than a style quiz ([TODO Hendré: if you keep this sentence, add a source you have read to references.md]). App hooks: the SVG tree and monkey (visual), the step explanations and rule cards (verbal), tapping nodes and the step-by-step demo button (active/kinaesthetic), self-paced "Next step" (reflective learners).
- **Mayer's multimedia principles**, 4 to 6 of them, each with the app feature that applies it:
  *Multimedia* (words + picture: every rule is shown on a tree, not just stated);
  *Signalling* (colour-coded orders, the highlighted current node, the three pass dots under each node in step 2, the "Now running" banner);
  *Spatial contiguity* (feedback text sits directly under the tree, the rule card above it);
  *Temporal contiguity* (the explanation appears at the same moment as the node flashes);
  *Segmenting* (six short steps, the "Next step ▶" button lets the learner control the pace);
  *Coherence* (no background music, decoration or extra text on the play screen).
  Pick the ones that fit best and say honestly where the app does not follow a principle (e.g. no narration, so the modality principle does not apply).
- **Accessibility as part of multimedia design**: colour is never the only cue (text explains every result), `aria-live` feedback for screen readers, keyboard access, light and dark mode, phone layout. Match this to the UI fixes actually merged.
- **Screenshots**: 2 or 3, annotated with the principle they show.

---

# Motivation: the ARCS model

> **Owner: Hendré.** Target length: 1 to 1½ pages. Cite Keller (1987) or Keller (2010).

Brief: what this section must cover.

- **The ARCS model** in a short paragraph: Attention, Relevance, Confidence, Satisfaction (Keller, 1987).
- **Attention**: the monkey character and its jumps, the game framing ("help the monkey"), random trees so no two rounds look the same, the Random Order banner that changes every tree.
- **Relevance**: the tutorial ties each order to a real use (pre-order copies a tree, in-order on a BST gives sorted values, post-order deletes a tree or sums folder sizes); the app is framed as preparation for the COS212 lecture.
- **Confidence**: small steps (3-node first level), practice with no hearts in the tutorial, clear success criteria (the stars rule: 3 = no mistakes or hints, 2 = up to 2 mistakes and hints combined, 1 = finished), the hint after 2 mistakes, and the walkthrough framed positively ("That's part of learning. Let's go through this tree together").
- **Satisfaction**: stars per level, the per-game star total on the home page, **unlocks** (next level, Endless after level 5, Random Order at 30 of the 45 stars), best scores saved for Endless and Random Order, praise messages ("Perfect run!", "Nicely done!", "You got there!").
- A short **ARCS table** (category → strategy → app feature), and one risk: hearts can feel punishing for anxious learners, which is why the tutorial practice has none and the walkthrough replaces a "game over".

---

# Assessment, scaffolding and question bank

> **Owner: Mthobisi** (issues #13, #20). Target length: 2 to 2½ pages including the question-bank table. Francois can answer questions about the code.

Brief: what this section must cover.

- **Assessment types**: *formative* throughout (every tap in a game is checked immediately), and a short *diagnostic* quick check at the end of the tutorial (3 multiple-choice questions on one tree, one per order). Say why there is no high-stakes test: this is pre-lecture preparation, so the goal is to find gaps and close them before the lecture.
- **The scaffolding flow**, step by step, with a small diagram: wrong tap → **heart lost + explanation of why** (from `Tree.explain` in `tree.js`) → after **2 mistakes the Hint button lights up** ("Stuck? Tap Hint...") → a hint highlights the next node and says *why* it is next (`visitReason`) → with **no hearts left, a step-by-step walkthrough** of that same tree, then a fresh tree. In the tutorial: no hearts, a hint button, and a nudge to use it after 2 wrong taps. Link this to the theory in section 5 (support given when needed, faded as the learner progresses: Endless has no hints, Random Order has one life).
- **How the quick check scaffolds**: each wrong answer explains what the chosen sequence actually was (including the level-order distractor: "That reads the tree level by level ... breadth-first"), and the summary offers "Review Pre-order / In-order / Post-order" buttons that jump back to the step that was missed.
- **Stars as a measure of progress**: the rule (3 / 2 / 1), how it combines mistakes and hints, and that stars gate the next level. Note honestly that progress is stored per device in `localStorage` and is not reported to the lecturer (a possible extension).
- **The question-bank table**, documented from what the app already asks (no new questions are added in code): one row per item with columns *Item* (e.g. Tutorial step 1, task "Tap the root"; Quiz Q2 "What is the in-order sequence?"; Pre-order game level 3, 7 nodes), *Objective (LO#)* from section 4, *Bloom's level*, *Feedback on a wrong answer*, *Hint / scaffolding available*. Cover: the 3 tasks in step 1, the practice trees in steps 3 to 5, the 3 quiz questions, the 5 levels per game, Endless and Random Order. Take the exact feedback wording from `tutorial.js` and `tree.js`.
- **Limitations**: game trees are random, so difficulty within a level can vary; the quiz has 3 fixed questions on one tree; no data is collected across students.

---

# Conclusion

> **Draft by Galen.** Adjust once the other sections and the usability results are in. Target length: half a page.

Tree Hop is a small, focused app: it teaches one data structure and one algorithm, binary trees and their depth-first traversals, to students who have not seen either before. The design choices described in this document all come back to that learner and that purpose. The tutorial teaches one mental model, the monkey's walk in which every node is passed three times, and builds the three orders on it, so the student does not have to memorise three unrelated rules. Every tap is checked immediately and every mistake is explained, and the support steps up only for students who need it: a hint after two mistakes, and a step-by-step walkthrough when the hearts run out. Stars, unlocks and harder modes give confident students a reason to keep going, while the tutorial practice and walkthroughs keep the experience safe for students who struggle.

We followed ADDIE for the instructional design and ran it in Scrum sprints alongside the software work. The usability test with students who had not done COS212 [TODO Galen: one sentence on what it showed, e.g. task completion and the main change it led to].

The prototype has clear limits. Progress stays on the student's device and is not reported to the lecturer, the tutorial quiz has only three questions, and the app covers depth-first traversal only. Natural next steps would be a lecturer view of class progress, a larger question bank tagged by objective, and further units on binary search trees and level-order traversal, reusing the same tree view and feedback engine. [TODO Galen: adjust to match what the team agrees are the most important limitations and next steps.]

---

<!--
References and Appendix A are kept in their own files and appended when the PDF is built:
  references.md            -> References (unnumbered)
  genai-acknowledgement.md -> Appendix A: GenAI acknowledgement (unnumbered)
The editor builds the PDF with pandoc (one command, title page, contents and numbered sections).
-->
