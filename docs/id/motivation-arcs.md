# Motivation: the ARCS model

> **Owner: Hendré.** Section 8 of the ID document. Draft for Galen to paste in place of the brief.

## 8.1 Why motivation needs its own design

Tree Hop is used **before** the lecture, on the student's own time, and nobody checks whether they used it. A pre-lecture app that is accurate but dull will simply not be opened, or will be closed after the first screen. We therefore designed motivation as deliberately as the content, using Keller's **ARCS model** (Keller, 1987; Keller, 2010). ARCS says that a learner is motivated to learn when four conditions are met:

- **Attention:** their curiosity is caught and kept.
- **Relevance:** they see why the content matters to them.
- **Confidence:** they believe they can succeed if they put in the effort.
- **Satisfaction:** they feel good about what they have achieved.

## 8.2 How Tree Hop applies each category

**Attention.**
- A character guides the student from the first screen: "Help the monkey visit every node." On every correct tap the monkey swings on a vine to the node.
- Every attempt uses a **new random tree**, so no two rounds look the same and there is always something new to look at.
- The modes change the challenge: levels → Endless (no hints) → Random Order, where the order changes on every tree and a large coloured banner pops up to announce it.
- Questions keep the student thinking instead of reading. Each level opens with "Where does pre-order start?", and the tutorial ends with a quick check.

**Relevance.**
- The app is framed as **preparation for the COS212 lecture**. The home page says so, and the tutorial card says it takes about 10 minutes.
- Each order is linked to a real use:
  - Pre-order is "good for copying a tree".
  - In-order on a binary search tree gives the values from smallest to largest; the practice tree in step 4 is chosen so that the student sees this happen.
  - Post-order is used "for jobs where children must be handled before their parent, like deleting a tree or adding up the sizes of folders".
- The game mechanics (levels, stars, hearts and unlocks) are familiar from mobile games most students already play, so there is nothing new to learn about *how* to play.

**Confidence.**
- Small first steps. Level 1 has only 3 nodes, and trees grow slowly (3, 5, 7, 9, 12 nodes), so early success comes quickly.
- Practice is safe. The tutorial practice has **no hearts**, so mistakes cost nothing while the student is still learning the rule.
- **Help arrives before the student gives up**:
  - every mistake is explained;
  - after 2 mistakes the Hint button lights up;
  - running out of hearts leads to a step-by-step walkthrough instead of a "game over".

  The wording is encouraging: "That's part of learning. Let's go through this tree together."
- **Personal control:**
  - the student chooses which game to play and when;
  - they can replay any unlocked level or ask for a new tree;
  - the demonstrations move only when the student presses **Next step**.

  Keller links this kind of control to confidence: success then feels like the student's own doing.
- **Clear success criteria.** The rule is always on screen. After each level, the summary shows the stars together with the number of mistakes and hints, so the student can see exactly what earned them.

**Satisfaction.**
- **Extrinsic rewards:**
  - Up to **3 stars per level**: 3 for no mistakes or hints, 2 for up to 2 mistakes and hints combined, 1 for finishing.
  - A star total per game on the home page.
  - Praise in the level summary: "Perfect run!", "Nicely done!", "You got there!".
  - Best scores saved for Endless and Random Order.
- **Unlocks:**
  - the next level;
  - Endless mode after level 5;
  - Random Order mode at **30 of the 45 stars**;
  - **avatars**: new characters that replace the monkey on every tree, unlocked at 10, 20, 30, 40 and 45 stars, and for long Endless and Random Order runs, with a "legendary" Dragon for unlocking all the others.
- **Natural consequences.** What the student has just learnt is used straight away on bigger trees and in Endless mode. In-order on the step 4 tree comes out in sorted order, which rewards understanding rather than luck.
- **Fairness (equity).** The star rules are the same for everyone, they depend only on mistakes and hints, and every tree at a level has the same number of nodes.

## 8.3 Summary table

| ARCS category | Strategy (Keller, 1987) | Tree Hop feature |
|---|---|---|
| Attention | Perceptual arousal (novelty, surprise) | Monkey and vine animation, random trees each round, the Random Order banner, avatars |
| Attention | Inquiry arousal (pose questions) | "Where does pre-order start?" at the start of each level; the quick check; "Which node is next?" after a correct tap |
| Attention | Variability | Tutorial → levels → Endless → Random Order: different challenges with the same skill |
| Relevance | Goal orientation | Framed as COS212 lecture preparation; "About 10 minutes" |
| Relevance | Familiarity | Real uses of each order (copying, sorted BST output, deleting a tree, folder sizes); familiar game mechanics |
| Confidence | Learning requirements | Rule card always visible; stars shown with the mistakes and hints that earned them |
| Confidence | Success opportunities | 3-node first level, growing trees, tutorial practice without hearts, hints, walkthrough |
| Confidence | Personal control | Choose the game and level, new tree on demand, learner-paced Next step, hint on demand |
| Satisfaction | Natural consequences | Skills used immediately on bigger trees and in Endless; in-order on a BST comes out sorted |
| Satisfaction | Positive consequences | Stars, praise messages, unlocks, avatars, saved best scores |
| Satisfaction | Equity | Same star rules for everyone, based only on mistakes and hints |

## 8.4 Risks and how we handled them

- **Hearts can feel punishing for anxious learners.** Losing hearts may discourage exactly the students who most need practice. This is why the tutorial practice has no hearts, every lost heart comes with an explanation, and running out leads to a walkthrough rather than a "game over" screen.
- **Rewards can become the goal.** Stars and avatars could lead students to chase rewards rather than understanding, and a student can restart a level with **New tree** to reset their mistakes before finishing. We accept this for a short, voluntary pre-lecture app. The rewards are tied to accurate traversals, and every mistake is still explained. It does mean the stars are a measure of effort and progress, **not a reliable assessment of mastery**; section 9 discusses this.
- **The final unlock was too far away.** Random Order first needed 40 of the 45 stars, which is close to a perfect run of all 15 levels. A goal that feels out of reach lowers confidence instead of building it, so we lowered it to 30 (an average of 2 stars per level).
