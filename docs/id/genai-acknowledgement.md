# Appendix A: GenAI acknowledgement

The examination specification allows generative AI (GenAI) to be used for the app's content and GUI, on condition that we acknowledge it and include the prompt and the tool used. This appendix does that. It is built from the team's running log in `docs/PROMPTS.md`, where each member recorded their GenAI use as it happened.

For every use we give the date, who used it, the tool and model, what it was used for, the prompt exactly as typed (spelling unchanged), and how the team reviewed and changed the output.

## Summary

| # | Date | Who | Tool (model) | Used for |
|---|---|---|---|---|
| A1 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Checking the first topic idea against the specification |
| A2 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Generating the first version of the app (`app/`): home page, tutorial and the three traversal games |
| ... | [TODO Galen] | | | |

## A1. Topic check against the specification

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Purpose:** check whether a game about decision trees would meet the specification.
- **Input:** the examination specification PDF was attached.
- **Prompt (verbatim):**

  > Would it work if i want to create a app that lets you play a game on how the dicision trees work where the player either needs to pick the order correctly or a characcter jumps from one tree to another

- **Outcome and how the team used it:** the response pointed out that decision trees are not on the CS2023 Foundational data structures list (Kumar et al., 2024). The team therefore kept the game mechanics (pick the order, a character jumps between nodes) and moved the topic to binary trees and traversal. The options and the final choice are recorded in decision 001 (`docs/decisions/001-data-structure-and-algorithm.md`).

## A2. First version of the app

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Purpose:** generate the first working prototype of Tree Hop.
- **Prompt (verbatim):**

  > Great create a website with this as te base: Home page has 3 Game options in-order, pre-order, post-order: Tree traversal order is the main game topic: Have a tutorial option that players can play that teaches them how tree traversal works in a practical way. The game should run on a website

- **Outcome:** generated the Tree Hop prototype in `app/`: the home page, the tutorial and the three traversal games.
- **How the team reviewed and changed it:** [TODO Francois/Galen: describe what was checked and changed by hand after generation, e.g. tutorial wording, levels, hearts/hints/walkthrough, Endless and Random Order modes, bug fixes, and any later prompts. If later prompts were used for those changes, add them as separate entries below.] The prototype was merged to `main` through pull request #33, and the tutorial text was reviewed against the learning objectives (section 6). [TODO Galen: confirm the review of PR #33 and the content review actually took place before keeping this sentence.]

## [TODO Galen: further entries before submission]

> **[TODO Galen: add entries from the team's PROMPTS.md log and from his own GenAI use before submission]**
>
> - Copy every new row from `docs/PROMPTS.md` (all five members) into the summary table and give each its own A-numbered entry in the format above.
> - Add your own GenAI use (e.g. planning, document drafting, outlines, tests), with the tool and model, the prompt as typed, and what you kept, rewrote or discarded.
> - Ask each member on Sat 14 Nov whether anything is missing from `PROMPTS.md`, in particular for the ID and SE sections they wrote.
> - Keep prompts verbatim. Where a prompt was very long, quote the instruction in full and summarise only attached material (say what was attached).

## Statement

[TODO Galen: check this statement matches the final entries.] GenAI was used as an assistant for generating a first version of the app and for drafting, as listed above. All generated output was read, tested and edited by the team before it was used, and every design decision described in the SE and ID documents was made and is owned by the team. Sections that were drafted with GenAI help are identified in the entries above.
