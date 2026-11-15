# GenAI usage log

The exam spec requires us to acknowledge GenAI use and include **the prompt and the tool** in the ID document.
Log every use here as it happens; it is much harder to reconstruct afterwards.

| Date | Who | Tool (and model) | Used for | Prompt (or link to full prompt below) |
|---|---|---|---|---|
| 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Topic check against the spec, then generating the first version of the app (`app/`): home page, tutorial and the three traversal games | See [2026-11-07 – Francois – app prototype](#2026-11-07--francois--app-prototype) |
| 2026-11-11 to 2026-11-15 | Hendré Beyer | Claude Code (Claude Opus 5.5) | Review of the app against the issues; first drafts of ID sections 6 (storyboard), 7 (learning styles, Mayer) and 8 (ARCS) and SE section 5 (UI design); contrast measurements; screenshots; speaker notes for slides 12–13; presentation preparation | See [2026-11-11 – Hendré – review, UI fixes and sections](#2026-11-11--hendré--review-ui-fixes-and-sections) |

## Full prompts

<!-- Paste long prompts here under a heading per entry, e.g. ### 2026-10-23 – Galen – registration document -->

### 2026-11-07 – Francois – app prototype

1. (With the exam specification PDF attached) "Would it work if i want to create a app that lets you play a game on how the dicision trees work where the player either needs to pick the order correctly or a characcter jumps from one tree to another"
   - Outcome: decision trees aren't in the CS2023 Foundational Data Structures list, so we moved to binary trees, using the same game mechanics.
2. "Great create a website with this as te base: Home page has 3 Game options in-order, pre-order, post-order: Tree traversal order is the main game topic: Have a tutorial option that players can play that teaches them how tree traversal works in a practical way. The game should run on a website"
   - Outcome: generated the Tree Hop prototype in `app/`.

### 2026-11-11 – Hendré – review, UI fixes and sections

The prompts below are summarised, with spelling corrected; they are not verbatim.

1. **Understand and review the app (11–12 Nov).** "Read the repository and explain what has been built. Analyse the app in detail against our GitHub issues (#1–#32, pasted in) without changing anything, and tell me what still needs to be done and what my tasks are."
   - Outcome: a summary of the app, a review (the logic was tested and no correctness bugs were found) with suggested improvements, the status of each issue, and Hendré's task list from `docs/PLAN.md`.
2. **Update after the team's changes (15 Nov).** "What do I still have left? 
