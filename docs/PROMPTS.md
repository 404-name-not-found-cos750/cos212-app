# GenAI usage log

The exam spec requires us to acknowledge GenAI use and include **the prompt and the tool** in the ID document.
Log every use here as it happens; it is much harder to reconstruct afterwards.

| Date | Who | Tool (and model) | Used for | Prompt (or link to full prompt below) |
|---|---|---|---|---|
| 2026-11-07 | Francois Scholtz | Claude Code (Claude Opus 5.5) | Topic check against the spec, then generating the first version of the app (`app/`): home page, tutorial and the three traversal games | See [2026-11-07 – Francois – app prototype](#2026-11-07--francois--app-prototype) |
| 2026-11-11 to 2026-11-15 | Hendré Beyer | Claude Code (Claude Opus 5.5) | Review of the app against the issues; first drafts of ID sections 7 (learning styles, Mayer) and 8 (ARCS) and SE section 5 (UI design); contrast measurements; screenshots and automated browser checks; speaker notes for slides 12–13. A local UI-fix branch was dropped because PR #39 made the same fixes. All drafts reviewed and edited by Hendré. | See [2026-11-11 – Hendré – review, UI fixes and sections](#2026-11-11--hendré--review-ui-fixes-and-sections) |

## Full prompts

<!-- Paste long prompts here under a heading per entry, e.g. ### 2026-10-23 – Galen – registration document -->

### 2026-11-07 – Francois – app prototype

1. (With the exam specification PDF attached) "Would it work if i want to create a app that lets you play a game on how the dicision trees work where the player either needs to pick the order correctly or a characcter jumps from one tree to another"
   - Outcome: decision trees aren't in the CS2023 Foundational Data Structures list, so we moved to binary trees, using the same game mechanics.
2. "Great create a website with this as te base: Home page has 3 Game options in-order, pre-order, post-order: Tree traversal order is the main game topic: Have a tutorial option that players can play that teaches them how tree traversal works in a practical way. The game should run on a website"
   - Outcome: generated the Tree Hop prototype in `app/`.

### 2026-11-11 – Hendré – review, UI fixes and sections

1. "read the whole repo to understand waht is happening i know one person has started building the app"
   - Outcome: a summary of the repository and of the app on the `DevFS` branch.
2. "so he did the whole app part by himself can you analyze it in detail and make sure it is the best it could be and what we are looking for wihtout changing anything and what still needs to be done is send the ussues here: [the list of GitHub issues #1–#32 pasted]"
   - Outcome: a review of the app (the logic was tested and no correctness bugs were found) with suggested improvements, and the status of each issue.
3. (12 Nov) "i pulled check everything again and what i need to do"
   - Outcome: the status after the merge, and Hendré's task list from `docs/PLAN.md`.
4. (14 Nov) "what can you do now and what would be left?", then "yes pull dont push anything but i dont think we have done anything"
   - Outcome: first drafts of `docs/id/learning-styles-multimedia.md`, `docs/id/motivation-arcs.md` and `docs/se/ui-design.md`; screenshots in `docs/se/img/`; speaker notes for slides 12–13; local UI fixes in `app/` (contrast, screen-reader labels, dialog focus, `RANDOM_UNLOCK` 40 → 30).
5. (15 Nov) "so what do i still have left", then "can you doo all i need to do please"
   - Outcome: PR #39 (Galen) had already merged the same UI fixes, so the local `app/` changes were dropped in favour of `main`. Section 5.5 and section 7.3 were rewritten to describe PR #39, with contrast ratios measured on the merged colours. All screenshots were retaken from the merged app, and 14 automated browser checks passed. Wording was matched to the app ("pass" for the monkey's three passes, the new step 2 title).
   - Hendré reviewed and edited the drafts before submission. <!-- TODO Hendré: replace this line with what you actually changed. -->
