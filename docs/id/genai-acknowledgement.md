# Appendix A: GenAI acknowledgement

The examination specification allows generative AI (GenAI) to be used for the app's content and GUI, on condition that we acknowledge it and include the prompt and the tool used. This appendix does that. It is built from the team's log in `docs/PROMPTS.md` and from what each member reported; where a prompt was reconstructed afterwards, the entry says so.

For every use we give the date, who used it, the tool and model, what it was used for, the prompt (exactly as typed where it was recorded, otherwise marked as summarised), and how the team reviewed and changed the output.

## Summary

| # | Date | Who | Tool (model) | Used for |
|---|---|---|---|---|
| A1 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Checking the first topic idea against the specification |
| A2 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | List of CS2023 data structures and algorithms to choose from |
| A3 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | App skeleton (file structure of `app/`) |
| A4 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Look, tutorial animations and a check of the traversal logic |
| A5 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Stars, levels and Endless mode |
| A6 | 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Random Order mode |
| A7 | 2026-11-12 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Avatars and achievements |
| A8 | 2026-11-12 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Vine animation |
| A9 | 2026-11-13 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Hearts in Random Order, and updated tests |
| A10 | 2026-11-15 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Explanatory comments in the app's code |
| A11 | 2026-11-11 to 2026-11-15 | Hendré Beyer | Claude Code (Claude Opus 5.5) | Reviewing the app against the issues; first drafts of ID sections 6 (storyboard), 7 and 8 and SE section 5; contrast measurements; screenshots; speaker notes for slides 12–13 |
| A12 | Not recorded | Shekinah Maja | Claude (model not recorded) | Understanding the code; checking her sections against the repository; aligning and structuring her sections |
| A13 | 2026-11-08 to 2026-11-15 | Mthobisi Khoza | Claude (Claude Sonnet 5.5) | Structuring ID section 9, then reviewing it for gaps, repetition and clarity |
| A14 | 2026-11-12 | Galen Myburgh | Claude Code (Claude Sonnet 5.5) | App review |
| A15 | 2026-11-12 | Galen Myburgh | Claude Code (Claude Sonnet 5.5) | Unit tests for `tree.js` and the CI workflow |
| A16 | 2026-11-12 | Galen Myburgh | Claude Code (Claude Sonnet 5.5) | SE document drafts |
| A17 | 2026-11-12 | Galen Myburgh | Claude Code (Claude Sonnet 5.5) | ID outline, slides and usability kit |
| A18 | 2026-11-15 | Galen Myburgh | Claude Code (Claude Sonnet 5.5) | Document review after integration |

*Table A.1: Summary of GenAI use.*

## A1. Topic check against the specification

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Input:** the examination specification PDF was attached.
- **Prompt (summarised by Francois, spelling corrected):** "Would it work to make an app with a game about how decision trees work, where the player either picks the order correctly or a character jumps from one tree to another?"
- **Outcome and how the team used it:** decision trees are not on the CS2023 Foundational Data Structures list (Kumar et al., 2024), so the team kept the game mechanics and moved the topic to binary trees (decision 001).

## A2. CS2023 data structures and algorithms

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Give me a list of the CS2023 Foundational data structures and the algorithms that go with them."
- **Outcome and how the team used it:** a list to choose the topic from. Decision 001 records the options weighed (decision trees, binary search tree insert and search, and binary tree traversal) and the choice of binary trees with pre-, in- and post-order traversal.

## A3. App skeleton

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Create a skeleton for a JavaScript game called Tree Hop, with a tutorial, on binary trees and binary search trees."
- **Outcome and how the team used it:** the file structure the app still uses: plain HTML, CSS and JavaScript with no build step, with the tree logic (`tree.js`) kept separate from the SVG drawing (`view.js`), the game (`game.js`), the tutorial (`tutorial.js`) and saved progress with a hash router (`main.js`). The committed app covers binary trees and traversal only; there is no binary search tree mode.

## A4. Look, tutorial animations and a logic check

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Make the app look better, add animations to the tutorial, and confirm that the traversal logic is correct and has no bugs."
- **Outcome and how the team used it:** a light and a dark theme, and animated tutorial steps in which the monkey walks around the tree, passing each node three times (1st = pre-order, 2nd = in-order, 3rd = post-order) while the visit order fills in, followed by a three-question quiz that links back to the steps the student got wrong. No tests were committed with this version; the team's unit tests for the tree logic were added later (`9eadd10`, 12 Nov).

## A5. Stars, levels and Endless mode

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Add stars to the levels of all three games: 3 for no mistakes and no hints, fewer for more mistakes and hints. When level 5 is completed, unlock a harder Endless mode that keeps getting harder."
- **Outcome and how the team used it:** 5 levels per game (3 to 12 nodes), each unlocking the next, with the best stars shown per level. Stars: 3 for no mistakes or hints, 2 for up to 2 mistakes and hints combined, and 1 for finishing. Endless unlocks after level 5: back-to-back random trees that grow from 5 to 15 nodes, no hints, 3 hearts for the whole run with one won back every 5 trees, and the best score saved per game.

## A6. Random Order mode

- **Date:** 2026-11-07
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Add a Random Order mode that unlocks at 40 stars."
- **Outcome and how the team used it:** Random Order unlocked at 40 of the 45 stars. Each tree asks for a random order (never the same one 3 times in a row), and trees grow from 4 to 25 nodes. The first wrong tap ended the run, and the high score is saved. The team later lowered the unlock to 30 stars (`cc20791`, 14 Nov) and gave the mode hearts (A9).

## A7. Avatars and achievements

- **Date:** 2026-11-12
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Add achievements that unlock playable characters: one every 10 stars, one for all the stars, one for 10+ trees in Endless, one for 15 trees in Random Order, and one for unlocking all the others."
- **Outcome and how the team used it:** `app/js/achievements.js` with nine avatars that replace the monkey once unlocked: 10, 20, 30 and 40 stars, all 45 stars, 10 trees in one Endless run, 10 trees in Endless in all three orders, 15 trees in one Random Order run, and a legendary Dragon for unlocking all the others. New unlocks are announced and tagged "New!", and the chosen avatar is saved. The same commit reworded the wrong-tap explanations. Committed in `f44f699` (12 Nov).

## A8. Vine animation

- **Date:** 2026-11-12
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Give the character a vine animation that hooks onto the node and pulls the character closer, in the colour of the selected avatar."
- **Outcome and how the team used it:** the jump was replaced by a vine that shoots out from the character's hand, hooks just below the top of the target node, and pulls the character across in an arc while getting shorter and straighter. Each avatar has its own vine colour. A timer puts the character at its destination if animation frames pause (for example in background tabs), and the animation is skipped when the user prefers reduced motion. Committed in `4ab5817` (12 Nov).

## A9. Random Order hearts and test updates

- **Date:** 2026-11-13
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Give Random Order hearts instead of one life, and update the tests."
- **Outcome and how the team used it:** Random Order starts with 1 heart and wins one back every 5 trees, and the expected wrong-tap explanations in `tests/tree.test.js` were updated to match the new wording. Committed in `d6d30f5` (13 Nov).

## A10. Code comments

- **Date:** 2026-11-15
- **Who:** Francois Scholtz
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Prompt (summarised by Francois):** "Read the app code and add comments."
- **Outcome and how the team used it:** comments only: a header for each file explaining its role, a comment on each function, and notes on the non-obvious parts (the node `slot` used for the tree layout, the three passes behind the tutorial walk, wrong-tap explanations and hints, the vine animation and its background-tab safety net, the hash router, how progress is saved and checked on load, how avatar unlocks are worked out, and why the scripts load in a fixed order). The CSS got section headings and notes on the per-traversal colours. A check of the diff confirmed that no code changed, and all 56 tests still passed. Committed in `f1c7de9` (15 Nov).

## A11. Review, UI section and ID sections 7 and 8

- **Date:** 2026-11-11 to 2026-11-15
- **Who:** Hendré Beyer
- **Tool:** Claude Code (model: Claude Opus 5.5)
- **Purpose:** understand and review the app against the GitHub issues; first drafts of ID sections 6 (storyboard), 7 (learning styles, Mayer) and 8 (ARCS) and SE section 5 (UI design); contrast measurements; screenshots; speaker notes for slides 12–13.
- **Prompts (summarised by Hendré, not verbatim):**

  > 1. "Read the repository and explain what has been built. Analyse the app in detail against our GitHub issues (#1–#32, pasted in) without changing anything, and tell me what still needs to be done and what my tasks are."
  > 2. "What do I still have left?" (15 Nov, after the team's changes)

  The prompts for drafting the sections, the contrast measurements, the screenshots and the speaker notes were not recorded one by one.

- **How the output was reviewed and changed:** the sections were reviewed in pull request #40 (one GitHub review) and checked against the app again when the documents were assembled.

## A12. Code comprehension, checking and structuring (ID sections 2 to 6)

- **Who:** Shekinah Maja
- **Tool:** Claude (model not recorded)
- **Purpose:** support for her ID sections (ADDIE, learner analysis, learning objectives, learning theories and the content review).
- **Uses (summarised by Shekinah, not verbatim):**
  1. **Code comprehension:** help to go through and understand the app's code.
  2. **Comparison and double-checking:** comparing what she wrote against what was already in the GitHub repository, to check that her work was correct and consistent with the existing guidelines and hints in the repository.
  3. **Document alignment and structuring:** aligning and structuring her sections.
- **Prompts (example prompts given by Shekinah, reconstructed after the fact, not verbatim):**

  > 1. "Can you help me read through this repository and explain what the code does? I want to understand how it works."
  > 2. "I'm writing a document for my assignment. Here are the guidelines and hints from the GitHub repo — can you check that what I've written covers everything that's in the repo?"
  > 3. "Can you help me reorganise and structure my document so it's well-formatted and aligns with the assignment requirements?"
- **How the output was reviewed and changed:** the content of her sections, including the objectives and the content review findings, is her own work; GenAI was used to understand the code, check consistency with the repository and structure the text.

## A13. Structure and review of the assessment section (ID section 9)

- **Date:** 2026-11-08 to 2026-11-15
- **Who:** Mthobisi Khoza
- **Tool:** Claude (model: Claude Sonnet 5.5)
- **Purpose:** structuring section 9 before filling it with project-specific information, then reviewing the completed section for redundancy, clarity and compliance with the ID document requirements.
- **Prompts (verbatim):**

  > 1. "Review the ID document requirements and suggest a suitable structure for the assessment, scaffolding and question bank section, identifying the key topics that need to be addressed."
  > 2. "Review the drafted section against the ID requirements and identify any missing information or specifications that need to be addressed."
  > 3. "Review the completed section for unnecessary repetition, clarity, consistency and alignment with the ID requirements. Suggest improvements without changing the underlying design decisions."

- **How the output was reviewed and changed:** the proposed structure was used as a framework, and the section was filled in from the project's existing design decisions and the app's functionality. The review suggestions were checked against the actual implementation and the ID requirements before changes were made. The completed section was then integrated into the full ID document.

## A14. App review

- **Who:** Galen Myburgh
- **Tool:** Claude Code (model: Claude Sonnet 5.5)
- **Prompt:** "Do a thorough, practical review of the Tree Hop app (frontend, UX, correctness, accessibility, teaching quality) and write a prioritised list of changes and suggestions"
- **Output:** Prioritised P0/P1/P2 bug and accessibility list, demo tips, and theory mapping to Bloom/Mayer/ARCS.

## A15. Unit tests and CI

- **Who:** Galen Myburgh
- **Tool:** Claude Code (model: Claude Sonnet 5.5)
- **Prompt:** "Unit tests for app/js/tree.js covering the three traversal orders, random tree generation, mistake explanations and hint text; and a GitHub Actions CI workflow"
- **Output:** 42 passing tests across 5 areas, a CI workflow, and an SE testing section.

## A16. SE document drafts

- **Who:** Galen Myburgh
- **Tool:** Claude Code (model: Claude Sonnet 5.5)
- **Prompt:** "Draft decision 002, requirements with user stories and traceability, methodology with sprint evidence from GitHub, and the master SE document outline"
- **Output:** Requirements (FR-1–FR-22, NFR-1–NFR-11), 17 user stories with acceptance criteria, methodology with PR/issue evidence, and the SE master outline.

## A17. ID outline, slides and usability kit

- **Who:** Galen Myburgh
- **Tool:** Claude Code (model: Claude Sonnet 5.5)
- **Prompt:** "Draft the ID master outline, GenAI acknowledgement appendix, shared reference list, usability test kit with SUS, and 10-minute slides outline with demo running order"
- **Output:** ID document framework, usability test plan (consent, tasks, SUS scoring), 14-slide outline with speakers and Q&A, and the reference list.

## A18. Document review after integration

- **Who:** Galen Myburgh
- **Tool:** Claude Code (model: Claude Sonnet 5.5)
- **Prompt:** "Review the SE and ID documents now that Mthobisi's and Shekinah's sections have been integrated — check for consistency, gaps, and anything that doesn't align with the app or the spec"
- **Output:** Found and fixed inconsistencies across sections (table/figure numbering, heading mismatches, wording discrepancies between sections), verified claims against the actual app code, corrected factual errors, and aligned terminology throughout both documents.

## Statement

GenAI was used to generate the first version of the app and some later features, to write unit tests, and to draft, review and structure parts of both documents, as listed above. All generated output was read, tested and edited by the team before it was used, and every design decision described in the SE and ID documents was made and is owned by the team. Sections that were drafted with GenAI help are identified in the entries above.
