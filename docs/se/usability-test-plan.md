# Usability test plan: Tree Hop

- **Owner:** Galen (taken over from Francois, issue #25)
- **When:** planned for Fri 13 Nov 2026; run before the submission with the self-completed questionnaire
- **Length:** about 20 minutes per participant
- **Results feed into:** SE document (testing / usability results) and ID document (section 2 evaluation phase, section 3 learner analysis)

## 1. Goal

Find out whether a student who has never done COS212 can use Tree Hop on their own, before a lecture, and come away able to produce a traversal. Specifically:

1. Can they complete the tutorial and a first game level without help?
2. Do the mistake explanations, the hint and the walkthrough help them recover?
3. Do they understand the idea well enough to explain an order in their own words?
4. How usable do they rate the app overall (SUS score)?
5. Which problems should be fixed before the demo, and which are recorded as known limitations?

## 2. Participants

- **3 to 5 students who have not done COS212** (and have not been taught tree traversal elsewhere). First-year Computer Science or other first-year/second-year students who have done some programming are the closest match to the target learner.
- **Recruiting:** ask friends, housemates or classmates in first-year modules, or post in a class or residence group chat: "Looking for 3–5 students who haven't done COS212 to try a 20-minute learning app for a COS750 project. No preparation needed." Do not use team members, people who have already seen the app, or students who have passed COS212.
- Participants are referred to only as **P1, P2, P3 ...** in all notes and in the documents.

## 3. Ethics and consent

- Explain the purpose in one sentence: we are testing the app, not the person.
- Get **verbal consent** before starting, and note "consent given" on the sheet. The participant may **stop at any time** without giving a reason.
- **No personal data is recorded**: no names, student numbers, contact details, photos or video of faces. Notes use P1, P2, ... only. If you record the screen, record only the browser window, and delete the recording once the notes are written.
- The only background question is "Have you done COS212, or learnt about tree traversal before?" (yes/no).
- Participation is voluntary and has no effect on anyone's marks.

## 4. Setup (before each participant)

- [ ] Laptop with the live app open: https://cos212-tree-hop.vercel.app. Fallback: `app/index.html` opened from the local copy.
- [ ] **Fresh state:** use a fresh browser profile or a private window, or clear the app's saved progress: open the browser console on the app page and run `localStorage.removeItem('cos212-tree-hop-v1')`, then reload. Check that the home page shows 0 stars and the levels are locked.
- [ ] A phone with the same URL open in a private tab (for task 6).
- [ ] Printed copy of this sheet (or a copy per participant) for notes, the pre/post check (section 7) and the SUS form (section 8).
- [ ] A timer (phone stopwatch).
- [ ] Moderator and, if possible, a second team member as note-taker.

## 5. Moderator script

Read this aloud, more or less word for word, so every participant hears the same thing.

> **Welcome (1 min).** "Thanks for helping. We're testing a small app that teaches a computer science topic before a lecture. We're testing the app, not you, so there are no wrong answers. If something is confusing, that's exactly what we need to know.
>
> While you use it, please think aloud: say what you're looking at, what you're trying to do, and what you expect to happen. I'll mostly stay quiet and take notes. I can't help you with the app during the tasks, but I'll answer any questions at the end.
>
> We don't record your name or anything about you. You can stop at any time. Are you happy to go ahead?"
>
> *(Note consent. Ask the background question.)*
>
> **Before the tasks (2 min).** "First, three quick questions so we know where you're starting from. It's fine to say 'I don't know'." *(Pre-check, section 8.)*
>
> **Each task.** Read the task text, start the timer, and say: "Tell me when you think you're done."
>
> **If they are stuck** for more than about 60 seconds, ask: "What are you looking for?" If still stuck after 2 minutes, give the smallest possible prompt (e.g. "Have a look at the buttons below the tree") and record it as **assisted**.
>
> **If they ask a question:** "What do you think it does?" or "What would you try?"
>
> **At the end (5 min).** "Thank you, that's really helpful. Three final questions about the topic, then a short form about the app." *(Post-check, section 8, then SUS, section 9.)* "Is there anything you found confusing, or anything you liked?" *(Note quotes.)*

## 6. Tasks

Give the tasks one at a time. Targets are what we expect a new student to manage; they are not shown to the participant.

| # | Task (read aloud) | What it tests | Success when | Target time |
|---|---|---|---|---|
| T1 | "Starting from the home page, work through the tutorial until you reach the end." | Tutorial flow, step navigation, steps 1–6 | Reaches the step 6 quick-check summary | ≤ 7 min |
| T2 | "Now play the first level of the **in-order** game." | Finding a game from home, level 1 (3 nodes) | "Level 1 complete!" with any stars | ≤ 2 min |
| T3 | "Open the **post-order** game and play level 1, then level 2." *(If they make fewer than 2 mistakes, ask them to press "Play again", deliberately tap a wrong node twice, then get back on track.)* | Mistake explanations, the hint after 2 mistakes, recovery | After 2 mistakes, uses the Hint (or the explanation) and completes the level | ≤ 3 min |
| T4 | "Without using the app, explain to me in your own words how post-order decides which node comes next." | Understanding (objective on the post-order rule) | Mentions that both subtrees (children) are finished before the node itself, or the 3rd pass of the monkey's walk | ≤ 1 min |
| T5 | "Go back to the home page. How many stars have you earned so far, and what would you have to do to unlock Endless mode?" | Finding progress, understanding unlocks | Reads the star count correctly; says "clear level 5" | ≤ 1 min |
| T6 | *(On the phone.)* "Open the pre-order game and play level 1 on this phone." | Phone layout, tap targets | Completes level 1 on the phone | ≤ 2 min |

If time runs short, drop T6 first.

**Timing budget (20 min):** welcome and consent 1 + pre-check 1½ + T1 7 + T2 1½ + T3 3 + T4 1 + T5 ½ + T6 1½ + post-check, SUS and closing questions 3 = 20 min. If T1 runs long, skip T6.

## 7. What to observe and measure

Per participant and task, record:

- **Completion:** completed unaided / completed with help (assisted) / not completed.
- **Time on task** (minutes:seconds).
- **Errors:** wrong taps in games (count), wrong quiz answers, navigation errors (e.g. looking for the next step in the wrong place).
- **Hints used** and whether the walkthrough was reached.
- **Think-aloud quotes:** short, exact phrases that show confusion or understanding ("I don't know what the dots mean", "oh, so it's left first"). No names.
- **Observed problems:** anything they hesitated over, misread or tried to tap that wasn't tappable.

## 8. Pre/post knowledge check

Ask the same three questions before the tasks and again at the end. Show the tree on paper (or draw it). Score 1 per fully correct answer (0–3). The tree below is deliberately different from the trees in the app.

```
          M
        /   \
       D     R
      / \   /
     B   F P
```

| # | Question | Answer |
|---|---|---|
| Q1 | Write the nodes of this tree in **pre-order**. | M, D, B, F, R, P |
| Q2 | Write the nodes of this tree in **in-order**. | B, D, F, M, P, R |
| Q3 | Which node is visited **last** in **post-order**, and why? | M (the root). Post-order visits a node only after both of its subtrees are finished, so the root is always last. (Full post-order: B, F, D, P, R, M.) |

Before the tasks, most participants are expected to answer "don't know". Record the answers as given, including partial ones.

## 9. System Usability Scale (SUS)

After the post-check, ask the participant to rate each statement from **1 (strongly disagree) to 5 (strongly agree)**. Ask them to answer quickly, with their first reaction, and to answer every item. The statements are from Brooke (1996); "system" refers to the app.

| # | Statement | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 1 | I think that I would like to use this system frequently. | | | | | |
| 2 | I found the system unnecessarily complex. | | | | | |
| 3 | I thought the system was easy to use. | | | | | |
| 4 | I think that I would need the support of a technical person to be able to use this system. | | | | | |
| 5 | I found the various functions in this system were well integrated. | | | | | |
| 6 | I thought there was too much inconsistency in this system. | | | | | |
| 7 | I would imagine that most people would learn to use this system very quickly. | | | | | |
| 8 | I found the system very cumbersome to use. | | | | | |
| 9 | I felt very confident using the system. | | | | | |
| 10 | I needed to learn a lot of things before I could get going with this system. | | | | | |

**Scoring (per participant):**

1. Odd-numbered items (1, 3, 5, 7, 9): contribution = rating − 1.
2. Even-numbered items (2, 4, 6, 8, 10): contribution = 5 − rating.
3. Add the ten contributions (0–40) and **multiply by 2.5** to get the SUS score (0–100).
4. Report each participant's score and the mean. A SUS score is not a percentage; report it as "SUS score of 72.5", not "72.5%".

Example: ratings 4, 2, 4, 1, 4, 2, 5, 2, 4, 1 → contributions 3, 3, 3, 4, 3, 3, 4, 3, 3, 4 = 33 → SUS = 82.5.

## 10. Results

The test was run with the self-completed questionnaire (`docs/se/usability-questionnaire.md`), which covers tasks T1–T5 of section 6 as C1–C4. T6 (phone) was not run as a separate task; instead each participant used their own device.

**Deviation from the plan.** We could not recruit students in time, so the five participants are adults from outside the university's computer science programmes, not first- or second-year students: a hairdresser, a civil engineer, a university administration clerk, a retired farmer and a UX designer (ages 24 to 67). Four had never learnt about trees; P5 had (BSc IT), so P5's pre/post result is not counted as learning gain. P1 and P4 were helped by a family member during the session. The results are therefore evidence about usability for complete beginners, not about the target COS212 student. The answers were written down from what the participants said, so the quotes below are close paraphrases, not verbatim transcripts.

### Task results

| Participant | Done COS212 / traversal before? | Device | T1 tutorial | T2 in-order L1 | T3 post-order L1 + L2 | T4 explain post-order | T5 find progress | Hint / walkthrough | Quick check (0–3) | Pre-check (0–3) | Post-check (0–3) | SUS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | No | Phone, Chrome (Samsung Galaxy A14) | A 16 min | A 10 min | A 20 min | ✓ | Partly (stars ✓, named Random Order) | Yes / Yes | 1 | 0 | 3 (Q1 "guessing") | 57.5 |
| P2 | No | Laptop, Edge 131 | ✓ 11 min | ✓ 5 min | ✓ 10 min | ✓ | Partly (stars ✓, named Random Order) | No / No | 2 | 0 | 3 | 92.5 |
| P3 | No | Laptop, Chrome 131 | ✓ 12 min | ✓ 5 min | ✓ 11 min | ✓ | Partly (stars ✓, named Random Order) | Yes / No | 2 | 0 | 3 | 92.5 |
| P4 | No | Tablet, Safari (iPad 8th gen) | A 28 min | A 15 min | A 27 min | ✓ | Partly (stars ✓, named Random Order) | Yes / Yes | 0 | 0 | 3 (helped) | 27.5 |
| P5 | **Yes** | Laptop, Chrome 131 | ✓ 6 min | ✓ 2 min | ✓ 6 min | ✓ | Partly (stars ✓, named Random Order) | No / No | 3 | 3 | 3 | 92.5 |
| **Summary** | 4 no, 1 yes | 3 laptop, 1 phone, 1 tablet | 5/5 done, 3 unaided; median 12 min | 5/5 done, 3 unaided; median 5 min | 5/5 done, 3 unaided; median 11 min | 5/5 | 5/5 stars, 0/5 Endless | 3 used Hint, 2 reached walkthrough | mean 1.6 | mean 0.6 (0 without P5) | mean 3.0 | **mean 72.5**, median 92.5 |

✓ = finished without being stuck; A = "Yes, but I was stuck for a while" (P4 also had help throughout). Times are the participants' own start and end times, to the minute. T3 includes the two deliberate mistakes the task asks for, so it is longer than a normal level.

Notes on the measures:

- **T4** counts as correct if the explanation says both children or subtrees come before the node. All five did, three with their own analogy (P2: demolishing a structure; P3: clearing sub-folders before closing the main folder).
- **T5.** Everyone read the star count correctly (3, 6, 6, 3 and 9). No one answered the Endless question: all five described the Random Order card, which shows "30 stars" on the home page. Endless only appears once level 5 of a game is cleared, so there is nothing on the home page to find yet. This is a fault in our question as much as in the app (U7).
- **Post-check.** All five got 3/3 after the app, against 0/3 for each of the four beginners before it. P1 said the pre-order answer was a guess and P4's grandson helped with the pattern, so the clean gain is three of four beginners.
- **SUS** (Brooke, 1996): 57.5, 92.5, 92.5, 27.5, 92.5. The three laptop users scored 92.5; the phone and tablet users, who were also the least confident with technology, scored 57.5 and 27.5. The mean of 72.5 hides this split, so we report the median and the individual scores too.

### Quotes

| Participant | Task | Quote (close paraphrase) |
|---|---|---|
| P1 | Open | "I didn't understand what 'node' or 'root' meant. On a real tree the root is at the bottom." |
| P1 | Open | "My phone screen made the circles hard to press, I kept missing." |
| P1 | Open | "The way it explains your mistake is useful, it doesn't just tell you no." |
| P2 | Open | "'Traversal' wasn't immediately intuitive. Once the tutorial demonstrated the three-pass concept, everything clicked." |
| P2 | Open | "I would have appreciated a brief analogy at the start to anchor the concept for non-CS people." |
| P3 | Open | "I got confused about which 'left' to go to when there were more nodes." |
| P3 | Open | "The quiz at the end caught me off guard. I didn't expect it and rushed my first answer." |
| P4 | Open | "My fingers are too big for the circles on the iPad." / "The tutorial goes too fast for someone like me." |
| P4 | Open | "I appreciate that it doesn't need an account or password." |
| P5 | Open | "The hint button reveals the answer instead of scaffolding the thinking; a directional nudge would be better." |
| P5 | Open | "The tutorial doesn't convey recursion, so students might memorise 'left-right-root' without understanding why it works on deeper trees." |
| P5 | Open | "Error states name the violated rule and the specific node, which is teaching through failure." |

What participants liked, in short: the explanation after each mistake (all five; P2 and P5 singled out that it names the rule and the node), the monkey (P1, P3, P4, P5), the feeling of a game rather than homework (P1, P3), the stars as goals (P2, P3) and no sign-up (P4, P5). Four of five said the app would be useful before a lecture; P4 said it was not for someone like them, but probably useful for students.

### Issues found → severity → fix or decision

| # | Issue observed | Seen by (P#) | Severity | Fix or decision | Issue / PR |
|---|---|---|---|---|---|
| U1 | Tree words (node, root, subtree, traversal) still felt foreign, and a root at the top contradicts a real tree. Step 1 of the tutorial does define them, so the gap is the metaphor, not a missing definition. | P1, P2, P4 | Medium | Known limitation. Next step: one sentence in step 1 saying computer-science trees are drawn upside down, root at the top (P2's "analogy at the start"). | – |
| U2 | Nodes hard to tap on a small phone and on a tablet; repeated wrong taps. | P1, P4 | Medium | Known limitation. The tap area is already larger than the drawn circle, but the tree scales down on small screens. Next step: a minimum on-screen tap size. | – |
| U3 | Tutorial too fast for a very inexperienced user; no way to skip it for someone who already knows trees. | P4, P5 | Low | Keep. The tutorial is learner-paced (Next button) and the games are open without it. Skip/replay noted as future work. | – |
| U4 | The Hint shows the next node instead of a nudge. | P5 | Low | Design decision kept: the Hint is always available, is highlighted after two mistakes, and explains *why* that node is next. A graded nudge before it is future work. | – |
| U5 | Wish for an animated replay of the full order after a level (the level summary already shows the sequence as text). | P5 | Low | Future work (the walkthrough already replays a tree step by step). | – |
| U6 | The step 6 quick check came as a surprise. | P3 | Low | Future work: say at the start of the tutorial that it ends with three questions. | – |
| U7 | Nobody could say how to unlock Endless; everyone named Random Order (30 stars). | All | Low | Endless is hidden until level 5 is cleared, which is intended. The question in the questionnaire was unfair; noted for the next test. | – |
| U8 | Applying post-order on bigger trees ("which left?"): the rule was understood on small trees but not yet as recursion. | P3, P5 | Medium (learning) | Covered in the ID document as a limitation: the app teaches the visiting order, not the recursive code. Bigger trees in levels 3–5 and Random Order give the practice. | – |
| U9 | "Private/incognito window" in the questionnaire was not understood. | P1 | Low | Questionnaire wording, not the app: next time say "or clear the app's progress" and explain. | – |

### Summary for the documents

Five adults from outside computer science (four new to trees; P5 already knew traversals) used Tree Hop on their own laptop, phone or tablet with a self-completed questionnaire; we could not recruit COS212-age students in time, so this is a test of usability for complete beginners rather than of the target learner. All five reported finishing the tutorial, the in-order level and both post-order levels, three without getting stuck, and all five could explain the post-order rule in their own words afterwards. On the pre/post check the four beginners went from 0/3 to 3/3, although two were partly helped or guessing. The mean SUS score was 72.5 (median 92.5), with a clear split: the three laptop users scored 92.5, the phone and tablet users 57.5 and 27.5. The main problems were tree vocabulary that clashes with everyday trees, nodes that are hard to tap on small touch screens, and a hint that gives the answer rather than a nudge; the explanation after each mistake was the feature every participant praised.
