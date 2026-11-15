# SE methodology and process

## 1. Approach

We used a **Scrum-based iterative approach with short sprints, combined with evolutionary prototyping**. We took the backlog, sprints, milestones and re-planning checkpoints from Scrum (Schwaber and Sutherland, 2020), but did not run the full framework; for example, sprint lengths changed at each re-plan. The reasons, and the alternatives we considered (waterfall, pure Scrum, Kanban and prototyping on its own), are in [decision 002](../decisions/002-se-methodology.md). In short:

- The requirements were uncertain at the start, and the spec asks for a prototype, so we built a working version early and improved it rather than specifying everything first.
- The deadline was fixed and close, so we worked in short sprints and re-planned at the end of each one.
- The team is five part-time students, so we kept the practices light: GitHub issues and milestones, one branch and PR per piece of work, decision records, and a single plan document (`docs/PLAN.md`) that is updated at each re-plan.

The ID process (ADDIE, decision 003) ran alongside: Analysis and Design map onto Sprints 0–1, Development onto Sprint 2, and Implementation and Evaluation onto Sprint 3.

## 2. Roles

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

## 3. Sprints: planned and as they happened

The project ran from the spec's release on 22 Oct to the presentation on 16 Nov. On 23 Oct we set up the repository, a backlog of **32 issues**, seven custom labels and six milestones, one per sprint.

### 3.1 Original plan (23 Oct)

| Milestone | Due | Goal | Issues |
|---|---|---|---|
| Sprint 0 – Decisions | 26 Oct | Topic, SE method, ID model, stack, roles, onboarding | #1–#7 |
| Sprint 1 – Design | 1 Nov | Learner analysis, objectives, theories, styles, motivation, assessment design, storyboard, requirements, architecture, wireframes, skeleton + CI | #8–#18 |
| Sprint 2 – Build & content | 8 Nov | Learning content, question bank, visualisation, animation, quiz engine, progress tracking | #19–#24 |
| Sprint 3 – Polish & documents | 13 Nov | Testing, deployment, SE and ID documents, slides | #25–#29 |
| Submission & demo | 16 Nov | Demo script, submission | #30–#31 |
| Self-reflection | 18 Nov | Individual reports | #32 |

### 3.2 What happened

| Sprint | Planned | What happened | Evidence |
|---|---|---|---|
| Sprint 0 | Decisions by 26 Oct | The decisions were not made by the due date and no issues were closed. On 5 Nov only Galen and Mthobisi were in the GitHub organisation. | Milestone past due with 7 open issues; re-plan of 5 Nov |
| Sprint 1 | Design by 1 Nov | Not started by the due date. | Re-plan of 5 Nov |
| Re-plan 1 (5 Nov) | – | Compressed the remaining work into four short sprints: decisions on the evening of 5 Nov, design 6–7 Nov with a scope freeze, build 8–11 Nov with a **feature freeze on 11 Nov**, polish and documents 12–14 Nov. | `docs/PLAN.md` (header and "Schedule") |
| Sprint 2 (build) | Build 8–11 Nov | Francois built a working prototype on 7 Nov, ahead of the compressed build sprint, using GenAI (logged in `docs/PROMPTS.md`). His first idea, decision trees, turned out not to be on the CS2023 list, so the same game moved to binary-tree traversal. This prototype settled the topic and covered most of the planned build issues (#18, #19, #21–#24). | Commit `35d4cd7` on `DevFS` (7 Nov); `PROMPTS.md` |
| Re-plan 2 (9 Nov) | – | Because the build was mostly done, the build roles were moved to quality, evidence and the demo (section 2). New rules: no more large features, one branch and PR per issue with one review. Decisions 001 (topic) and 004 (stack) were drafted, matching what had been built. | `docs/PLAN.md` ("Re-plan of the build roles"); decisions 001 and 004, dated 9 Nov |
| Feature freeze | 11 Nov | Mostly held. On 12–13 Nov Francois pushed three commits directly to `main`, without a PR: avatars (`achievements.js`), Random Order with one heart plus one every 5 trees, a vine animation, and new hint and mistake wording with tests. We kept these changes and documented them (FR-22, FR-23), but they broke both the freeze and the one-PR-per-change rule. On 15 Nov he pushed one more commit directly to `main` that only adds code comments (`f1c7de9`). | Commits `f44f699`, `4ab5817`, `d6d30f5` (12–13 Nov), merged with PR #39; `f1c7de9` (15 Nov) |
| Re-plan 3 (12 Nov) | – | The prototype was merged to `main` (PR #33). The remaining work was rebalanced (section 2), the deployment moved from GitHub Pages to Vercel because the repository stays private until the presentation, and a Monday deliverables checklist was added. | PRs #33, #34, #35; `docs/PLAN.md` ("Current plan") |
| Sprint 3 | Polish and documents 12–14 Nov | Unit tests and CI (12 Nov); deployment to Vercel (12 Nov); SE and ID drafts and the slide outline (12 Nov); demo-readiness fixes from a review of the app: saved progress, scoring, accessibility, projector and phone layout, tutorial wording, Random Order unlock lowered from 40 to 30 stars (14 Nov); UI design, storyboard, learning styles and ARCS sections (15 Nov). Usability test with five participants (SE document, section 7). | PRs #36–#40 |

In Scrum terms, the sprint length was not fixed: we shortened the sprints and moved the scope at each re-plan instead of carrying the original dates forward. The first two sprints produced no closed work, and the build happened as one large prototype instead of a sequence of small increments. We describe this as it happened because it shaped the rest of the project: once the prototype existed, the backlog changed from "build features" to "test, document and demo what we have", which is the point of evolutionary prototyping, but it came later than planned.

## 4. Tools and practices

| Tool / practice | How we used it |
|---|---|
| **GitHub Issues** | The product and sprint backlog. 32 issues, each with a "What needs to be done" and a "Done when" checklist. |
| **Labels** | By deliverable: `app`, `se-doc`, `id-doc`, `content`, `presentation`, `team`, `decision`. |
| **Milestones** | One per sprint (section 3.1), with due dates. |
| **Branches and pull requests** | Work is done on a branch and merged to `main` by PR (`DevFS` for the app, `docs/...` for documents). From 9 Nov the rule is one branch and PR per issue with one review. |
| **Decision records** | `docs/decisions/`: one short file per significant choice (context, options, decision, rationale, consequences). These are our answers to the panel's "why?" questions. |
| **Plan document** | `docs/PLAN.md`: deadlines, roles, schedule and per-person checklists. Each re-plan adds a section and keeps the old plan as a record. |
| **GenAI log** | `docs/PROMPTS.md`: every GenAI use with the tool and prompt, as the spec requires. |
| **Hosting** | Vercel, deploying `app/` from `main` on every push (see [testing-and-deployment.md](testing-and-deployment.md)). |
| **Communication** | A WhatsApp group, used throughout the project for day-to-day coordination, questions and hand-overs. |

## 5. Process evidence

### 5.1 Pull requests

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

### 5.2 Issues

The backlog has **32 issues**, each with a "What needs to be done" and a "Done when" checklist. On 15 Nov, 6 are closed and 26 are open: most of the work is done, but the issues were not closed as it was finished. PR #33 also listed four issues after one `Closes` keyword, and GitHub closed only the first.

### 5.3 Commit history

On the evening of 15 Nov, before the final documents were merged, there are 31 commits across all branches, including 10 merge commits (22 by Galen, 6 by Francois and 3 by Hendré). The history is short and uneven: the whole app arrived as one commit on 7 Nov, and most other commits are planning, documentation and the demo-readiness fixes.


## 6. What we would do differently

- **Make the first decisions in the first week.** Sprint 0 slipped by about two weeks (due 26 Oct; decisions 001 and 004 drafted 9 Nov), and everything after it was compressed. Deciding the topic, method and stack together in the first week would have given us a design sprint before the build.
- **Build a small prototype on purpose, early.** The prototype was the turning point of the project: it settled the topic and made the requirements concrete. We should have planned a deliberate throw-away "spike" in the first sprint instead of a long design phase on paper.
- **Merge in small pieces.** The app arrived as one commit and one large PR, which is hard to review and gives little evidence of how it grew. Smaller PRs per feature, each reviewed, would have spread the knowledge of the code across the team earlier.
- **Assign issues and close them as we go.** The backlog was well structured but nobody was assigned, and nothing was closed until 12 Nov, so the board did not show the real state of the project. Closing keywords must be written once per issue.
- **Start the ID analysis before the build.** The learning objectives and learner analysis should drive the content and the assessment. Because the app was built first, we had to check the content against the objectives afterwards.

What worked: short sprints and a single plan document let us re-plan quickly three times without losing track; the feature freeze was mostly respected after the documented exceptions (section 2.3.2); and decision records gave us written answers to "why?" for each major choice.
