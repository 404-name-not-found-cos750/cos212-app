# GenAI usage log

The exam spec requires us to acknowledge GenAI use and include **the prompt and the tool** in the ID document.
Log every use here as it happens; it is much harder to reconstruct afterwards.

| Date | Who | Tool (and model) | Used for | Prompt (or link to full prompt below) |
|---|---|---|---|---|
| 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Topic check against the spec, then generating the first version of the app (`app/`): home page, tutorial and the three traversal games | See [2026-11-07 – Francois – app prototype](#2026-11-07--francois--app-prototype) |

## Full prompts

<!-- Paste long prompts here under a heading per entry, e.g. ### 2026-10-23 – Galen – registration document -->

### 2026-11-07 – Francois – app prototype

1. (With the exam specification PDF attached) "Would it work if i want to create a app that lets you play a game on how the dicision trees work where the player either needs to pick the order correctly or a characcter jumps from one tree to another"
   - Outcome: decision trees aren't in the CS2023 Foundational Data Structures list, so we moved to binary trees, using the same game mechanics.
2. "Great create a website with this as te base: Home page has 3 Game options in-order, pre-order, post-order: Tree traversal order is the main game topic: Have a tutorial option that players can play that teaches them how tree traversal works in a practical way. The game should run on a website"
   - Outcome: generated the Tree Hop prototype in `app/`.
