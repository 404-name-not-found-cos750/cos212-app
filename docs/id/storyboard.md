# Storyboard

> **Owner: Hendré** (issues #14, #17). The storyboard part of section 6 of the ID document. Shekinah's content structure, content review and worked examples come before it in the same section. Draft for Galen to paste in place of the "Storyboard" and "Screen flow" points of the brief.

## Storyboard and screen flow

Tree Hop was built as a working prototype first ([decision 002](../decisions/002-se-methodology.md)), so the storyboard was drawn from the finished app, not before it. There is one frame per tutorial step and one per game state. Each caption says what the learner does and what feedback they get. The same screenshots are the wireframes in the SE document (section 5), where the full set of 17 figures, including phone and dark mode, is shown.

**Screen flow.** Home → Tutorial (6 steps) → Games (pre-order, in-order, post-order; levels 1 to 5, then Endless) → Random Order (unlocked at 30 of the 45 stars). When a student runs out of hearts, they get a walkthrough of that tree and then a fresh tree, not a "game over". The diagram is Figure 5.1 in the SE document.

### Tutorial: six learner-paced steps

In every step, **Next** stays disabled until the step's task is done, and there are no hearts to lose.

![Frame 1: Tutorial step 1, "Meet the tree". The learner reads the five terms (parent and child, root, leaf, subtree), then taps the root, any leaf and the right child of 3. Feedback: here they tapped 3 when asked for a leaf, and the reply explains why it is not one ("3 still has children below it. Leaves are at the ends of the branches.").](../se/img/tut-1.png)

![Frame 2: Tutorial step 2, "Walking around a tree". The learner picks an order and presses Watch. The monkey walks around the tree and passes every node three times, and the three dots under each node fill in. Feedback: the "Now running" banner says which pass the chosen order writes on, each node is written into the sequence on that pass, and a line of text describes every pass ("3rd pass at 6. In-order waits for the 2nd pass.").](../se/img/tut-2.png)

![Frame 3: Tutorial step 3, pre-order. The learner steps through a three-node demonstration with Next step, then taps a bigger practice tree in pre-order. Feedback: each demo step gives its reason. Here the learner tapped 20 too early, and the reply names the rule and the node ("In pre-order, a parent comes before its children. 30 is above 20 and hasn't been visited yet."). The Hint button is always available.](../se/img/tut-3.png)

![Frame 4: Tutorial step 4, in-order. Same pattern: the demo, then practice. The practice tree is a binary search tree, so in-order comes out sorted (10, 20, 30, 40, 60), which the step points out beforehand. Feedback: numbered badges, the sequence bar and "✓ 30" after each correct tap.](../se/img/tut-4.png)

![Frame 5: Tutorial step 5, post-order. The demo shows the parent coming last ("Everything below 7 is finished. In post-order the parent comes last."). Post-order is linked to deleting a tree or adding up folder sizes. Feedback: as in steps 3 and 4.](../se/img/tut-5.png)

![Frame 6: Tutorial step 6, "Quick check". The learner answers three multiple-choice questions on one tree. The tree is deliberately not a search tree, so in-order is not simply the values sorted. Feedback: right or wrong with an explanation (here the pre-order sequence was chosen for in-order), a score out of 3, and a "Review In-order" button that leads back to the step they missed.](../se/img/tut-6.png)

### Games: one level, from first tap to the result

![Frame 7: Playing a level (post-order, level 2). The learner taps the nodes in order. Feedback: the monkey swings on a vine to each correct node, the node gets a numbered badge, the sequence bar fills, and the line below asks "Which node is next?". The rule card stays above the tree the whole time.](../se/img/game.png)

![Frame 8: Wrong taps and a hint. Each wrong tap costs a heart (two are gone here) and gets an explanation. After two mistakes the Hint button is highlighted. Feedback: the hint outlines the next node and says why it is next ("45 is a leaf: it has no children, so there is nothing below it to finish first. Tap 45.").](../se/img/game-wrong.png)

![Frame 9: Out of hearts. Instead of "game over", the learner gets the explanation for the last mistake and a reassuring message ("That's part of learning. Let's go through this tree together, one step at a time."), with the choice of a walkthrough or a new tree.](../se/img/out-of-hearts.png)

![Frame 10: The walkthrough. The learner presses Next step, and the monkey visits one node at a time on the same tree. Feedback: the reason for each step ("Everything below 62 is finished. In post-order the parent comes last, so tap 62 now."). After the walkthrough comes a fresh tree.](../se/img/walkthrough.png)

![Frame 11: Level complete. Feedback: one to three stars, a praise line with the mistakes and hints that earned them ("Perfect run! 0 mistakes, 0 hints."), and the full sequence. The learner chooses the next level, to play again, or to go home.](../se/img/level-complete.png)

### After the levels: support fades

![Frame 12: Endless mode, unlocked after level 5. Trees grow bigger, there are no hints, and three hearts last the whole run, with a heart back every 5 trees. Feedback: trees cleared and the best score.](../se/img/endless.png)

![Frame 13: Random Order, unlocked at 30 stars. The order changes with every tree and is announced in a large coloured banner. One heart to start, plus one more every 5 trees. Feedback: the score, the trees cleared and the high score.](../se/img/random.png)

