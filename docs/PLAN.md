# Project plan: 404: Name Not Found

_Re-planned Thursday 5 November 2026. The Sprint 0 (26 Oct) and Sprint 1 (1 Nov) milestones are past due and none of their issues are closed, so this plan compresses the remaining work into the time left._

## Deadlines (hard)

| Deliverable | Weight | Due | Time left (from 5 Nov) |
|---|---|---|---|
| SE + ID documents on ClickUP | **50%** | **Mon 16 Nov, before 08:00** | 10.5 days |
| Slides on ClickUP + GitHub link; presentation + live demo | 20% | 16 or 17 Nov (slot **still to be confirmed**) | 11–12 days |
| Individual self-reflection | **30%** | Wed 18 Nov, 20:00 | 13 days |

**Internal deadline: submit the documents on Sun 15 Nov by 22:00.** Never leave it for the 08:00 Monday cut-off.

## Current plan (Thu 12 Nov): where we stand and who does what

_This section replaces the role tables and the schedule further down. Those are kept only as a record of the original plan._

### Where we stand
| Area | State |
|---|---|
| App (Tree Hop) | **Built by Francois** on `DevFS`: tutorial, quiz, three games, Endless mode and Random Order. Being merged to `main` today. Not deployed yet. No tests and no CI. |
| Decisions | 001 (topic) and 004 (stack) drafted. **002 (SE method) and 003 (ID model) not written.** |
| SE document | Not started in the repo |
| ID document | Not started in the repo. Objectives and learner analysis are the blocker for everything else in it. |
| Process evidence | 32 issues, all still open. No PRs merged yet and no meeting notes. |
| Slides / demo script | Not started |
| Days left | Thu 12 → **Sun 15 Nov 22:00** (internal doc deadline): 3½ days |

**Scope rule:** the feature freeze (Wed 11 Nov) has passed. No new features. The only code changes allowed are tests, CI, deployment, bug and UI fixes, and lowering the Random Order unlock. The question bank is **documented from what the app already asks** (tutorial quiz + game levels) and mapped to the objectives. It is not extended in code.

### Francois (light load: he built the app)
- [ ] **Tonight:** 20-minute code walkthrough for the team (screen share). Everyone needs it to write about and present their part.
- [ ] Answer questions about the code while the others write. Review Mthobisi's tests PR.
- [ ] Present the quiz/game part of the demo (2 min) and take code questions in the Q&A.
- [ ] Own self-reflection (#32)

### Galen (R1: project lead, SE editor)
- [ ] Merge `DevFS` → `main` by PR. Commit decisions 001 and 004 and this plan. **Thu 12**
- [ ] Decision 002: SE methodology (Scrum, short sprints + prototyping) (#2). **Thu 12**
- [ ] Requirements + user stories, written to match the app as built (#15). **Fri 13**
- [ ] Usability test with 3–5 students who haven't done COS212, plus the bug list (#25, taken over from Francois). **Fri 13**
- [ ] SE doc: methodology, requirements, process evidence (issues, PRs, sprints, meetings) and usability results. Then **merge the full SE draft** (#27). **Sat 14**
- [ ] Close or update the issues the app already covers (#18–#24), linking the code. Write stand-up notes in `docs/meetings/` from today. **Ongoing**
- [ ] Assemble the slides (#29). Submit the docs, slides and GitHub link on ClickUP (#31). **Sun 15 22:00**

### Mthobisi (R2: tech lead)
- [ ] Deploy the app (#26). **Thu 12.** Note: the repo is private on a free org, so GitHub Pages won't work. Either make the repo public or deploy to Vercel/Netlify (static, no build step).
- [ ] Unit tests for `tree.js` (orders, random trees, mistake explanations) + GitHub Actions CI (#18, #25). **Fri 13**
- [ ] Architecture and data-model diagrams of the actual code (#16). **Fri 13**
- [ ] SE doc: architecture, tech choices, testing, deployment. **Sat 14**
- [ ] ID doc: **assessment design and scaffolding** (hearts → explanation → hint after 2 mistakes → walkthrough; stars) (#13, taken over from Francois). **Sat 14**
- [ ] Backup video of the demo + an offline copy on a USB stick. **Sat 14**

### Hendré (R3: UI and demo)
- [ ] Lower the Random Order unlock (`RANDOM_UNLOCK` in `app/js/random.js`, currently 40/45) and fix UI bugs: phone layout, contrast, accessibility (taken over from Francois). **Fri 13**
- [ ] Wireframes / screen flow drawn from the finished UI (#17). **Fri 13**
- [ ] SE doc: UI design. **Sat 14**
- [ ] ID doc: learning styles + multimedia (Mayer's principles) (#11) and **motivation (ARCS)** mapped to stars, hearts, unlocks and the monkey (#12, taken over from Francois). **Sat 14**
- [ ] Demo script; drives the live demo (#30). **Sat 14** (rehearsal 1)

### Shekinah (R4: ID lead, ID editor)
- [ ] Learning objectives (Bloom's) + learner analysis (#8, #9). **Thu 12, first thing.** Everyone else's ID sections depend on them.
- [ ] Decision 003: ID model (ADDIE) (#3). **Thu 12**
- [ ] Learning theories (#10), storyboard of the tutorial as built (#14), review of the tutorial text against the objectives (#19). **Fri 13**
- [ ] **Question bank table:** each tutorial-quiz question and game level → objective → hint/feedback it gives (#20, taken over from Francois). **Fri 13**
- [ ] ID doc: model, learner analysis, objectives, theories, content, GenAI acknowledgement (from `PROMPTS.md`). Then **merge the full ID draft** (#28). **Sat 14**

### Everyone (including Francois)
- [ ] Log every GenAI prompt in `PROMPTS.md` as it happens
- [ ] Send your 2–3 slides to Galen. **Sat 14 12:00**
- [ ] Cross-review one section you didn't write. **Sat 14 evening**
- [ ] Rehearsal 1 **Sat 14**, rehearsal 2 with practice Q&A **Sun 15**
- [ ] Keep a daily journal for the self-reflection. Submit it by **Wed 18 Nov 17:00** (#32).

### Timeline
| Day | Must be true by the end of the day |
|---|---|
| Thu 12 | App on `main` and deployed; code walkthrough done; objectives + learner analysis written; decisions 002 and 003 written |
| Fri 13 | Tests + CI green; usability test done; wireframes, diagrams, question-bank table and all section drafts done |
| Sat 14 | Full SE and ID drafts merged; cross-reviews done; slides assembled; backup video; rehearsal 1 |
| Sun 15 | Final proofread and PDF export by 18:00; **submit by 22:00**; rehearsal 2 |

## Priorities

1. **Unblock everything tonight.** Until the topic (#1) is chosen, no one can write content, objectives or code.
2. **Documents first (50%).** Each owner writes their doc section *while* they build, not afterwards.
3. **A working, deployed demo that never fails live (20%).** Freeze features early and keep a recorded backup.
4. **Self-reflection (30%, individual).** Starts **today**: each person keeps a short daily journal (what I did, what went well, conflicts, what I learnt). This is the biggest single-person mark, and it can't be written well from memory on the 18th.
5. **Log every GenAI prompt in [`PROMPTS.md`](PROMPTS.md) as it happens.** The ID document has to include them.

## Roles (fair split: one build stream, one doc share and one presentation share each)

Every role owns roughly the same load: about 5–7 issues, about 20% of the combined documentation, and about 2 minutes of the presentation. **The names are a starting proposal. Swap them at tonight's meeting to fit people's skills.**

| Role | Proposed | Owns (issues) | Writes in SE doc | Writes in ID doc | Presentation |
|---|---|---|---|---|---|
| **R1 Project lead / Scrum Master** | Galen | #2 SE method, #5 roles, #6 meetings, #7 onboarding, #15 requirements & user stories, #27 SE doc **editor**, #29 slide assembly, #31 submission | Methodology, requirements, user stories, process evidence (sprints, issues, PRs, meetings) | – | Intro, problem and SE approach (2 min) |
| **R2 Tech lead** | Mthobisi | #4 stack & hosting, #16 architecture, #18 skeleton & CI, #23 quiz engine & scaffolding logic, #26 deploy + backup, unit tests in #25 | Architecture, tech choices, data model, testing, deployment | – | Architecture and tech (2 min); on standby during the demo |
| **R3 UI & visualisation** | Hendré | #17 wireframes & UI, #21 data-structure visualisation, #22 algorithm animation, #11 learning styles, #30 demo script & **demo driver** | Wireframes and UI design | Learning styles; multimedia design (e.g. Mayer's principles) | Runs the live demo (10 min, shared with R5) |
| **R4 ID lead & content** | Shekinah | #3 ID model, #8 learner analysis, #9 objectives (Bloom's), #10 learning theories, #14 storyboard, #19 learning content, #28 ID doc **editor** | – | ID model, learner analysis, objectives, theories, content design, GenAI acknowledgement | ID approach and objectives (2 min) |
| **R5 Assessment & motivation** | Francois | #13 assessment & scaffolding design, #20 question bank, #12 motivation, #24 progress tracking, usability test in #25 | Usability test results | Assessment design, scaffolding, motivation (e.g. ARCS) | Assessment and scaffolding rationale (2 min); narrates the quiz part of the demo |

**Everyone:** #1 topic decision (as a group), #32 own self-reflection, a daily journal, logging prompts, reviewing at least one PR from another role, reviewing one other person's doc section (Fri 13 Nov), and attending all rehearsals.

Pairs for review and back-up (each covers the other if someone is ill): R1 ↔ R4 (doc editors), R2 ↔ R3 (code), R5 ↔ R4 (content and questions).

### Re-plan of the build roles (Mon 9 Nov)

The working app (Tree Hop, on `DevFS`) already covers most of the planned build: the skeleton (#18), visualisation (#21), animation (#22), quiz engine and scaffolding (#23), progress tracking (#24) and a first version of the tutorial content (#19). The build issues for R2 and R3 are therefore mostly done, so their streams move to **quality, evidence and the demo**. Each role keeps a fair share, and **all five still own their doc sections**.

| Role | Build work now | Docs (unchanged, but write about the app as built) | Done by |
|---|---|---|---|
| **R1 Galen** | Review and merge the `DevFS` PR; decision records 001 and 004 (and 002 SE method); requirements + user stories written to match the app's features (#15) | SE: methodology, requirements, process evidence | Tue 10 Nov |
| **R2 Mthobisi** | Unit tests for `tree.js` (orders, random trees, mistake explanations); GitHub Actions CI that runs them (finishes #18); deploy to GitHub Pages + backup video + offline copy (#26); architecture and data-model diagrams of the actual code (#16) | SE: architecture, tech choices, testing, deployment | Thu 12 Nov |
| **R3 Hendré** | Wireframes / screen flow drawn from the finished UI (#17); UI polish and bug fixes (accessibility, phone layout, colour contrast); demo script + demo driver (#30) | SE: UI design. ID: learning styles, multimedia (Mayer's principles), mapped to the screens | Thu 12 Nov |
| **R4 Shekinah** | Learning objectives (Bloom's) and learner analysis **first**, then review and correct the tutorial text against them (#19); storyboard of the tutorial as built (#14) | ID: ID model, learner analysis, objectives, theories, content, GenAI acknowledgement | Objectives **Tue 10 Nov**, rest Wed 11 Nov |
| **R5 Francois** | Question bank linked to the objectives, with a hint per question (#20), extending the 3-question tutorial quiz; lower the Random Order unlock (40/45 stars is very high for a pre-lecture app); usability test with 3–5 students (#25) | ID: assessment design, scaffolding, motivation (ARCS). SE: usability results | Question bank Wed 11 Nov, test Thu 12 Nov |

**New rules from now on:**
- No more large features. New work goes in a branch per issue and is merged to `main` by PR with one review (this includes changes to the app).
- Everyone must be able to explain the code and the design choices in the part they present, so read through `app/README.md` and the code for your area before Sat 14 Nov.

## Schedule

### Sprint 0: Decisions (Thu 5 Nov, tonight, 1 hour, everyone)
| Do | Owner | Done by |
|---|---|---|
| Get Hendré, Francois and Shekinah into the GitHub org (only Galen and Mthobisi are members) | R1 | Thu 5 Nov 22:00 |
| Choose the data structure + algorithm, checked against the CS2023 AL-Foundational core list → `decisions/001` | All | Thu 5 Nov |
| SE methodology (recommended: **Scrum with short sprints + prototyping**) → `decisions/002` | R1 | Thu 5 Nov |
| ID model (recommended: **ADDIE**; its phases map onto our sprints) → `decisions/003` | R4 | Thu 5 Nov |
| Tech stack (recommended: **React + Vite + TypeScript**, static, no backend, progress in localStorage, hosted on GitHub Pages or Vercel) → `decisions/004` | R2 | Thu 5 Nov |
| Confirm roles, fix a daily 15-minute stand-up time, and **ask the lecturer which day/slot we present** | R1 | Thu 5 Nov |

> Recommended topic, chosen to keep the scope small: **Binary Search Tree + insert/search (or in-order traversal)**. It is easy to visualise and easy to assess, and the scaffolding is natural. Alternative: **Graph + BFS/DFS**. Avoid anything needing heavy visualisation work (e.g. Dijkstra) with this little time.

### Sprint 1: Design (Fri 6 – Sat 7 Nov)
| Do | Owner | Done by |
|---|---|---|
| App skeleton, CI and a deployed "hello world" (so build can start in parallel) | R2 | **Fri 6 Nov** |
| Learner analysis + learning objectives (Bloom's) | R4 | Fri 6 Nov |
| Requirements + user stories (based on the objectives) | R1 | Fri 6 Nov |
| Learning theories + content storyboard (screen-by-screen flow) | R4 | Fri 6 Nov |
| Wireframes + learning styles strategy | R3 | Fri 6 Nov |
| Assessment & scaffolding design + motivation strategy | R5 | Fri 6 Nov |
| Architecture & data model diagrams | R2 | Sat 7 Nov |
| **Design review meeting: freeze the scope** (anything not agreed here is out) | All | **Sat 7 Nov** |

### Sprint 2: Build & content (Sun 8 – Wed 11 Nov)
| Do | Owner | Done by |
|---|---|---|
| Learning content written (text, examples, GenAI prompts logged) | R4 | **Mon 9 Nov** |
| Question bank (with hints/scaffolding per question) | R5 | **Mon 9 Nov** |
| Data-structure visualisation | R3 | Tue 10 Nov |
| Quiz engine + scaffolding logic | R2 | Tue 10 Nov |
| Algorithm step-by-step animation | R3 | Wed 11 Nov |
| Progress tracking / motivation features | R5 | Wed 11 Nov |
| Everyone: first draft of their own doc sections | All | Wed 11 Nov |
| **Feature freeze** (bug fixes only after this) | All | **Wed 11 Nov 23:59** |

### Sprint 3: Polish & documents (Thu 12 – Sat 14 Nov)
| Do | Owner | Done by |
|---|---|---|
| Usability test with 3–5 students who haven't done COS212 + bug list | R5 | Thu 12 Nov |
| Unit tests + bug fixes | R2, R3 | Fri 13 Nov |
| SE and ID docs merged into full drafts | R1 (SE), R4 (ID) | Thu 12 Nov |
| **Cross-review**: each person reviews one section they didn't write | All | Fri 13 Nov |
| Final deploy + a recorded backup video of the demo + an offline local build | R2 | Fri 13 Nov |
| Slides: each owner sends their 2–3 slides, R1 assembles | All → R1 | Fri 13 Nov |
| Demo script | R3 | Fri 13 Nov |
| **Rehearsal 1** (timed: 10 + 10 min) | All | **Sat 14 Nov** |

### Submission & demo (Sun 15 – Tue 17 Nov)
| Do | Owner | Done by |
|---|---|---|
| Docs final: PROMPTS.md appendix in ID doc, references, PDF export, final proofread | R1, R4 | Sun 15 Nov 18:00 |
| **Submit SE + ID docs on ClickUP** (save the receipts in `registration/`-style folder) | R1 | **Sun 15 Nov 22:00** |
| **Rehearsal 2**, with practice Q&A ("why this theory / this design?") | All | Sun 15 Nov |
| Upload slides + GitHub link to ClickUP; bring printed/available copies of both docs | R1 | Before our slot |
| Present: all five present, arrive early, test the laptop/projector | All | 16 or 17 Nov |

### Self-reflection (individual, Tue 17 – Wed 18 Nov)
| Do | Owner | Done by |
|---|---|---|
| Draft from your daily journal (design → development → presentation → teamwork) | Each person | Tue 17 Nov |
| **Submit on ClickUP** | Each person | **Wed 18 Nov 17:00** (3 h buffer before 20:00) |

## Working agreements
- Daily 15-minute stand-up (yesterday / today / blockers), with notes in `docs/meetings/`.
- If you are blocked for more than half a day, tell the group immediately; the backup pair takes over.
- One PR per issue, with one review from another role before merging.
- Each significant choice gets a `docs/decisions/` entry. These are our answers to the panel's "why?" questions.
