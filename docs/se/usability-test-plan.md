# Usability test plan: Tree Hop

- **Owner:** Galen (taken over from Francois, issue #25)
- **When:** Fri 13 Nov 2026 [TODO Galen: actual date(s) and times]
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
| T4 | "Without using the app, explain to me in your own words how post-order decides which node comes next." | Understanding (objective on the post-order rule) | Mentions that both subtrees (children) are finished before the node itself, or the 3rd visit of the monkey's walk | ≤ 1 min |
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

[TODO Galen: fill in after the sessions. Do not add participants or numbers that did not happen.]

### Task results

| Participant | Done COS212 / traversal before? | T1 tutorial | T2 in-order L1 | T3 post-order + hint | T4 explain post-order | T5 find progress | T6 phone | Hints used | Pre-check (0–3) | Post-check (0–3) | SUS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | | | | | | | | | | | |
| P2 | | | | | | | | | | | |
| P3 | | | | | | | | | | | |
| P4 | | | | | | | | | | | |
| P5 | | | | | | | | | | | |
| **Mean / count** | | | | | | | | | | | |

Per task cell: ✓ (unaided), A (assisted) or ✗ (not completed), plus the time, e.g. "✓ 6:40".

### Quotes

| Participant | Task | Quote (exact words) |
|---|---|---|
| | | |

### Issues found → severity → fix or decision

Severity: **High** = stops the task or teaches something wrong; **Medium** = slows the participant or needs a moderator prompt; **Low** = cosmetic or a preference. Fix High issues before the code freeze if they are small; otherwise record them as known limitations.

| # | Issue observed | Seen by (P#) | Severity | Fix or decision | Issue / PR |
|---|---|---|---|---|---|
| U1 | | | | | |
| U2 | | | | | |
| U3 | | | | | |

### Summary for the documents

[TODO Galen: 4–6 sentences: number of participants, completion rates, mean SUS, pre → post change, the main issues and what was changed. Use these sentences in the SE testing section and the ID evaluation (ADDIE) section, and in the conclusion of the ID document.]
