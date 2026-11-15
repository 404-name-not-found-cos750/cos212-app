# 003 – ID model: ADDIE, run iteratively

- **Status:** Proposed (to be accepted by the group)
- **Date:** 2026-11-15
- **Issue:** #3

## Context
The spec asks for an instructional design (ID) approach, documented separately from the SE approach. The ID document needs a clear structure (learner analysis, objectives, design, assessment, evaluation), and the model has to fit alongside the SE process: Scrum with short sprints and an evolutionary prototype ([002](002-se-methodology.md)). By the time this record was written the prototype already existed, so the model also had to cope with design work that overlapped with the build.

## Options considered
1. **ADDIE** (Analysis, Design, Development, Implementation, Evaluation; Branch, 2009) – well documented, so each step can be justified; its phases give the ID document its structure; its evaluation phase pairs with our usability test. Classic ADDIE is linear, which does not match how we worked.
2. **SAM** (Successive Approximation Model, a rapid-prototyping model) – iterative, which matches our prototype-first build. Less familiar to the team and less standard as a structure for the ID document.
3. **Dick and Carey** – a detailed, systematic model. Too heavy for a three-week project with one topic and one app.

## Decision
**ADDIE, run iteratively rather than as a strict waterfall.** The phases overlapped and evaluation fed back into earlier phases. Scrum sprints gave the time boxes in which we worked through the phases.

| Phase | What we did |
|---|---|
| Analysis | Topic chosen against CS2023 ([001](001-data-structure-and-algorithm.md)); learner analysis; first learning objectives. |
| Design | Objectives refined (LO1–LO6); storyboard and wireframes; assessment (quick check, games, Random Order) and scaffolding (hints, walkthrough) designed. |
| Development | App built on `DevFS` and merged by PR #33; tutorial text reviewed against the objectives. |
| Implementation | Deployed to https://cos212-tree-hop.vercel.app; presentation and demo. |
| Evaluation | Formative: the quick check, game feedback and the usability test (SE document, section 7). Summative (not done): comparing lecture performance of students who used the app with those who did not. |

## Rationale
ADDIE is the most widely documented ID model (Branch, 2009), so every phase can be explained to the panel and maps directly to a section of the ID document. Running it iteratively lets it sit inside the Scrum sprints instead of competing with them.

## Consequences
- The ID document is structured by ADDIE's phases (ID document, section 2).
- Because the content was reviewed against the objectives only after the app was built, the gaps we found (for example "parent" never being defined) were fixed in a working app (PR #39) instead of being designed out. Next time we would agree the objectives and review the content before coding starts.
- The evaluation phase depends on the usability test (SE document, section 7).
