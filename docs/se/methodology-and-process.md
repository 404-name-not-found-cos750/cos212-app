# SE methodology and process

## 1. Approach

We used **Scrum with short sprints, combined with evolutionary prototyping**. The reasons, and the alternatives we considered (waterfall, pure Scrum, Kanban and prototyping on its own), are in [decision 002](../decisions/002-se-methodology.md). In short:

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
| Sprint 0 – Decisions | 26 Oct | Topic, SE method, ID model, stack, roles, meetings, onboarding | #1–#7 |
| Sprint 1 – Design | 1 Nov | Learner analysis, objectives, theories, styles, motivation, assessment design, storyboard, requirements, architecture, wireframes, skeleton + CI | #8–#18 |
| Sprint 2 – Build & content | 8 Nov | Learning content, question bank, visualisation, animation, quiz engine, progress tracking | #19–#24 |
| Sprint 3 – Polish & documents | 13 Nov | Testing, deployment, SE and ID documents, slides | #25–#29 |
| Submission & demo | 16 Nov | Demo script, submission | #30–#31 |
| Self-reflection | 18 Nov | Individual reports | #32 |

### 3.2 What happened

| Sprint | Planned | What happened | Evidence |
|---|---|---|---|
| Sprint 0 | Decisions by 26 Oct | The decisions were not made by the due date and no issues were closed. On 5 Nov only Galen and Mthobisi were in the GitHub organisation. [TODO Galen: one sentence on why, e.g. tests/assignments in other modules, if the team agrees to say so.] | Milestone past due with 7 open issues; re-plan of 5 Nov |
| Sprint 1 | Design by 1 Nov | Not started by the due date. | Re-plan of 5 Nov |
| Re-plan 1 (5 Nov) | – | Compressed the remaining work into four short sprints: decisions on the evening of 5 Nov, design 6–7 Nov with a scope freeze, build 8–11 Nov with a **feature freeze on 11 Nov**, polish and documents 12–14 Nov. | `docs/PLAN.md` (header and "Schedule") |
| Sprint 2 (build) | Build 8–11 Nov | Francois built a working prototype on 7 Nov, ahead of the compressed build sprint, using GenAI (logged in `docs/PROMPTS.md`). His first idea, decision trees, turned out not to be on the CS2023 list, so the same game moved to binary-tree traversal. This prototype settled the topic and covered most of the planned build issues (#18, #19, #21–#24). | Commit `35d4cd7` on `DevFS` (7 Nov); `PROMPTS.md` |
| Re-plan 2 (9 Nov) | – | Because the build was mostly done, the build roles were moved to quality, evidence and the demo (section 2). New rules: no more large features, one branch and PR per issue with one review. Decisions 001 (topic) and 004 (stack) were drafted, matching what had been built. | `docs/PLAN.md` ("Re-plan of the build roles"); decisions 001 and 004, dated 9 Nov |
| Feature freeze | 11 Nov | Held: no features were added after it. | No app changes after `35d4cd7` |
| Re-plan 3 (12 Nov) | – | The prototype was merged to `main` (PR #33). The remaining work was rebalanced (section 2), the deployment moved from GitHub Pages to Vercel because the repository stays private until the presentation, and a Monday deliverables checklist was added. | PRs #33, #34, #35; `docs/PLAN.md` ("Current plan") |
| Sprint 3 | Polish and documents 12–14 Nov | [TODO Galen: fill in at the end: tests + CI, deployment, usability test, UI fixes, documents assembled, rehearsal 1.] | [TODO Galen: PR numbers] |
| Submission | Docs Sun 15 Nov 22:00 (internal), 16 Nov 08:00 (hard) | [TODO Galen: date and time submitted.] | [TODO Galen: ClickUP receipt] |

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
| **Meeting notes** | `docs/meetings/`, one file per meeting from a template (present, agenda, decisions, action items). |
| **Hosting** | Vercel, deploying `app/` from `main` on every push (see [testing-and-deployment.md](testing-and-deployment.md)). |
| **Communication** | [TODO Galen: the channel the team actually used, e.g. WhatsApp group, Discord, calls.] |

## 5. Process evidence

### 5.1 Pull requests

| PR | Title | Opened by | Merged | Notes |
|---|---|---|---|---|
| #33 | Tree Hop app: tutorial, traversal games and Random Order | galenmyburgh | 12 Nov 2026 | Merges `DevFS`. The app code is Francois's commit `35d4cd7` (SchoItz, 7 Nov). Closed #21. |
| #34 | Add decisions 001 and 004, re-plan remaining work | galenmyburgh | 12 Nov 2026 | Decision records and re-plan 3 |
| #35 | Plan: rebalance remaining work and Monday deliverables | galenmyburgh | 12 Nov 2026 | Workload split, Vercel deployment, Monday checklist |
| [TODO Galen] | [later PRs: tests + CI, UI fixes, decision 002, SE/ID sections] | | | |

No PR has a review recorded on GitHub. [TODO Galen: if PRs #33–#35 were reviewed outside GitHub (e.g. in a call), say so here; otherwise make sure the PRs from 13 Nov onwards each get one GitHub review, as the working agreement requires.]

### 5.2 Issues

As of 12 Nov 2026: **32 issues**, **1 closed** (#21, by PR #33) and 31 open. None are assigned yet.

| Label | Issues |
|---|---|
| `id-doc` | 12 |
| `app` | 11 |
| `se-doc` | 7 |
| `decision` | 4 |
| `presentation` | 4 |
| `team` | 4 |
| `content` | 3 |

(An issue can have more than one label.)

PR #33's description lists `Closes #21, #22, #23, #24`, but GitHub only closed #21: each issue needs its own closing keyword. Issues #22 (animation), #23 (quiz engine and scaffolding) and #24 (progress tracking) are done in the code and are being closed by hand with a link to the code.

[TODO Galen: update the closed/open counts and list the issues closed after 12 Nov, just before submission.]

### 5.3 Commit history

As of 12 Nov 2026 there are 10 commits across all branches, including 3 merge commits (9 by Galen, 1 by Francois):

| Date | Who | What |
|---|---|---|
| 23 Oct | Galen | Repository structure, decision log and meeting-note templates |
| 7 Nov | Francois (SchoItz) | The whole Tree Hop app in one commit on `DevFS` ("Game finished") |
| 12 Nov | Galen | Merge of PR #33; decisions 001 and 004 and the re-plan (PR #34); rebalanced plan and Monday checklist (PR #35); two small README fixes made directly on `main` |

The history is short and uneven: the app arrived as one large commit, and most other commits are planning and documentation. [TODO Galen: add the commits from 13–15 Nov (tests, CI, deployment, UI fixes, document sections) at the end.]

### 5.4 Meetings and stand-ups

The plan calls for a daily 15-minute stand-up (yesterday / today / blockers) with notes in `docs/meetings/`. As of 12 Nov there are no meeting notes in the repository.

- [TODO Galen: list the meetings that actually took place (date, who was there, what was decided), e.g. the decision meeting planned for 5 Nov and the code walkthrough planned for 12 Nov, and add a notes file for each in `docs/meetings/`.]
- [TODO Galen: stand-up notes for 13, 14 and 15 Nov.]

## 6. What we would do differently

- **Make the first decisions in the first week.** Sprint 0 slipped by about two weeks (due 26 Oct; decisions 001 and 004 drafted 9 Nov), and everything after it was compressed. A one-hour decision meeting in the first week, with the topic, method and stack decided together, would have given us a design sprint before the build.
- **Build a small prototype on purpose, early.** The prototype was the turning point of the project: it settled the topic and made the requirements concrete. We should have planned a deliberate throw-away "spike" in the first sprint instead of a long design phase on paper.
- **Merge in small pieces.** The app arrived as one commit and one large PR, which is hard to review and gives little evidence of how it grew. Smaller PRs per feature, each reviewed, would have spread the knowledge of the code across the team earlier.
- **Assign issues and close them as we go.** The backlog was well structured but nobody was assigned, and nothing was closed until 12 Nov, so the board did not show the real state of the project. Closing keywords must be written once per issue.
- **Write meeting notes when the meeting happens.** They are easy to write in five minutes and impossible to reconstruct honestly afterwards.
- **Start the ID analysis before the build.** The learning objectives and learner analysis should drive the content and the assessment. Because the app was built first, we had to check the content against the objectives afterwards.

What worked: short sprints and a single plan document let us re-plan quickly three times without losing track; the feature freeze held; and decision records gave us written answers to "why?" for each major choice.
