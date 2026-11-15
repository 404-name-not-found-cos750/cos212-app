# 002 – SE methodology: Scrum with short sprints and evolutionary prototyping

- **Status:** Implemented; formal acceptance by the group was not recorded.
- **Date:** 2026-11-12
- **Issue:** #2

## Context
We have to build a working prototype of the COS212 app and document the SE approach in about three and a half weeks (spec issued 22 Oct, documents due 16 Nov before 08:00). The team is five students who also have other modules and exams, so nobody works on the project full time and availability changes from week to week. At the start the requirements were vague: the spec fixes the goal (a pre-lecture app with assessment and scaffolding for one CS2023 data structure and algorithm) but not the topic, the screens or the assessment design. The topic itself was only settled after the first prototype existed (see [001](001-data-structure-and-algorithm.md)).

The process also has to produce evidence for the SE document (sprints, issues, PRs, decisions) and has to run alongside the ID process (ADDIE, decision 003), which needs objectives and a learner analysis before content and assessment can be checked.

The plan of 23 Oct already set the project up as sprints (GitHub milestones Sprint 0 to Sprint 3). This record writes down that choice and the reasons for it, and how we adapted it.

## Options considered
1. **Waterfall** (requirements → design → build → test, each phase signed off before the next) – easy to document and matches the order of the SE document. But it needs stable requirements up front, which we did not have, and it leaves testing to the end, when there is no time left to act on what we find. One late phase delays everything after it.
2. **Pure Scrum** (fixed-length sprints, product backlog, sprint planning, daily stand-up, review and retrospective, with a Product Owner and a Scrum Master) – handles changing requirements well and gives regular checkpoints. The full set of ceremonies is heavy for five part-time students over three weeks, and one-week or two-week sprints would give us only two or three sprints in total.
3. **Kanban** (a continuous flow of issues on a board with work-in-progress limits) – light and flexible, but it has no built-in checkpoints. With a hard deadline and a team that does not meet every day, we need fixed points where we stop, review and re-plan. Kanban also gives less structure to describe in the SE document.
4. **Prototyping on its own** (throw-away or evolutionary) – suits an app whose look and interaction we can only judge by trying it, and the spec asks for a prototype. On its own it says nothing about how the team plans, divides and tracks the work.

## Decision
**Scrum with short sprints (a few days each), combined with evolutionary prototyping.**

- The work is a backlog of GitHub issues, grouped into sprints as GitHub milestones (Sprint 0 Decisions, Sprint 1 Design, Sprint 2 Build & content, Sprint 3 Polish & documents, then Submission & demo).
- Sprints are short, and we re-plan at the end of each one instead of carrying a fixed plan to the end.
- Galen acts as Scrum Master and project lead (R1). The COS212 lecturer, as described in the spec, is the product owner; we stand in for them by checking every change against the spec.
- The app is built as an **evolutionary prototype**: the first working version is kept and improved, not thrown away. Requirements and user stories are written against it and the gaps become backlog items.
- A **feature freeze** at the end of the build sprint: after it, only tests, bug and UI fixes, and deployment work go in.
- Lightweight practices instead of the full ceremony set: one branch and PR per issue with a review before merging, and a decision record for each significant choice.

## Rationale
- **Requirements were uncertain.** We could not write a complete specification before seeing the app. Scrum accepts that the backlog changes, and prototyping lets the team (and test users) react to something concrete instead of a description.
- **Hard, fixed deadline.** Short sprints give several checkpoints in three weeks. When a sprint slips, the next planning point is days away, not weeks, so we can cut scope early. This happened three times (5, 9 and 12 Nov) and is described in [methodology-and-process.md](../se/methodology-and-process.md).
- **Part-time team.** Lightweight practices (issues, PRs, decision records) cost little time but still keep everyone informed, and they leave a written trail.
- **The spec asks for a prototype.** Evolutionary prototyping fits that directly and means no work is wasted on a throw-away version.
- **Fits the ID process.** ADDIE's phases map onto the sprints (Analysis and Design in Sprints 0–1, Development in Sprint 2, Implementation and Evaluation in Sprint 3), so the SE and ID work can run in step.
- **Evidence for the SE document.** Milestones, issues, PRs and decision records are the evidence of the process the SE document has to describe.

## Consequences
- **Process:** every task is a GitHub issue in a milestone. Re-plans are recorded in `docs/PLAN.md` and the old plan is kept as a record, not deleted.
- **App:** the prototype built on `DevFS` (merged in #33) is the product. New work after the feature freeze (11 Nov) is limited to tests, CI, deployment, bug and UI fixes, and lowering the Random Order unlock.
- **SE document:** the methodology section describes the sprints as planned and as they happened, including the re-plans. Requirements and user stories are written to match the app as built ([requirements.md](../se/requirements.md)).
- **ID document:** the ADDIE phases (decision 003) are mapped onto these sprints.
