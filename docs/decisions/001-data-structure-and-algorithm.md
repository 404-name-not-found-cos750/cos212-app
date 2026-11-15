# 001 – Data structure and algorithm: binary trees and tree traversal

- **Status:** Proposed (to be accepted by the group at the next stand-up)
- **Date:** 2026-11-09
- **Issue:** #1

## Context
The spec asks for a pre-lecture app on one data structure and one algorithm from the CS2023 AL-Foundational core list. The app has to work for students with no prior knowledge and has to include an assessment that adds scaffolding for students who struggle. We have about 10 days until the documents are due, so the topic has to be small enough to build, test and explain well.

## Options considered
1. **Decision trees** (first idea) – a fun game idea, but decision trees aren't on the CS2023 Foundational data structures list, so the topic wouldn't meet the spec.
2. **Binary search tree + insert/search** (recommended in the plan) – easy to visualise, but insert and search mostly test one rule (smaller left, larger right), which gives less room for varied assessment.
3. **Binary tree + traversal (pre-, in- and post-order)** – easy to visualise; the three orders give three related but distinct skills, so it's a natural fit for levels, hints and targeted feedback. Each mistake can be explained precisely ("a parent comes before its children").
4. **Graph + BFS/DFS** – more to visualise, and the layout of random graphs is harder to keep readable.

## Decision
**Binary trees (the data structure) and depth-first tree traversal: pre-order, in-order and post-order (the algorithm).** The app is called **Tree Hop**.

## Rationale
- Binary trees and their traversals are CS Core in the CS2023 AL-Foundational knowledge unit (topic 9a "Trees: Binary, n-ary, and search trees"; topic 11c "uninformed depth/breadth-first tree search"), so the topic meets the spec.
- A traversal is a sequence of node visits, which turns directly into a "tap the nodes in the right order" task. Every tap is assessable on its own, so the app can give immediate, specific feedback and step up its scaffolding (hint → walkthrough) only for students who struggle.
- The three orders share one idea (the walk around the tree, where each node is passed three times), so the tutorial can teach one mental model and build all three orders on it.
- The scope is small enough to finish, test with real students, and demo without risk in the time left.

## Consequences
- **App:** tutorial + three games (one per order) + mixed-order mode. Already built on `DevFS`.
- **ID document:** learning objectives, the learner analysis and the question bank must be written for traversal specifically (e.g. *apply* = produce the in-order sequence of a given tree; *analyse* = explain why a given node can't be visited yet).
- **SE document:** requirements and user stories are scoped to traversal only. BST insert/search, graphs and level-order (breadth-first) traversal are out of scope.
