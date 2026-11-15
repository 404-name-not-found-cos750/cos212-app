// Binary tree model and traversal logic. Pure data and rules: no DOM code here,
// so tests/tree.test.js can check it with node --test.
//
// A node is { id, value, left, right, parent, depth, slot }:
//   - id    0..n-1 in breadth-first order (used as a key in Sets and Maps)
//   - depth 0 for the root
//   - slot  the node's left-to-right position among the 2^depth places on its
//           level (left child = 2*slot, right child = 2*slot + 1); view.js uses
//           it to lay the tree out without nodes overlapping.
const Tree = (() => {
  // The three depth-first traversals. `pass` is which of the walker's three
  // passes of a node (see euler below) writes it down; the tutorial uses it.
  const MODES = {
    pre: {
      name: 'Pre-order',
      rule: 'Root → Left → Right',
      desc: 'Visit the node first, then everything in its left subtree, then everything in its right subtree.',
      pass: 'first',
    },
    in: {
      name: 'In-order',
      rule: 'Left → Root → Right',
      desc: 'Visit everything in the left subtree first, then the node, then everything in its right subtree.',
      pass: 'second',
    },
    post: {
      name: 'Post-order',
      rule: 'Left → Right → Root',
      desc: 'Visit everything in the left subtree, then everything in the right subtree, and the node itself last.',
      pass: 'third',
    },
  };

  // side is 'left' or 'right' (null for the root).
  function makeNode(value, parent, side) {
    return {
      id: 0,
      value,
      left: null,
      right: null,
      parent,
      depth: parent ? parent.depth + 1 : 0,
      slot: parent ? parent.slot * 2 + (side === 'right' ? 1 : 0) : 0,
    };
  }

  // Gives every node its id once the tree is complete.
  function numberNodes(root) {
    nodes(root).forEach((n, i) => { n.id = i; });
    return root;
  }

  // Builds a fixed tree from a nested array [value, leftSpec, rightSpec], where
  // a missing child is null or left out. Used for the tutorial's hand-picked trees,
  // e.g. [8, [3, [1], [6]], [10, null, [14]]].
  function fromSpec(spec) {
    function build(s, parent, side) {
      if (!s) return null;
      const n = makeNode(s[0], parent, side);
      n.left = build(s[1], n, 'left');
      n.right = build(s[2], n, 'right');
      return n;
    }
    return numberNodes(build(spec, null, null));
  }

  // `count` different numbers from 1..99, shuffled (Fisher-Yates), so no two
  // nodes share a value and a tap is never ambiguous.
  function uniqueValues(count) {
    const pool = [];
    for (let v = 1; v <= 99; v++) pool.push(v);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  // A random binary tree with n nodes, no deeper than maxDepth. Each new node is
  // attached to a random free child spot, so shapes vary (bushy or lopsided).
  // Values are random too: this is a plain binary tree, not a search tree, so the
  // student must follow the traversal rule rather than sort the numbers.
  // Callers must keep n <= 2^(maxDepth+1) - 1, or there would be no free spot left.
  function random(n, maxDepth) {
    const values = uniqueValues(n);
    const root = makeNode(values[0], null, null);
    const all = [root];
    while (all.length < n) {
      const open = [];
      for (const nd of all) {
        if (nd.depth >= maxDepth) continue;
        if (!nd.left) open.push([nd, 'left']);
        if (!nd.right) open.push([nd, 'right']);
      }
      const [p, side] = open[Math.floor(Math.random() * open.length)];
      const child = makeNode(values[all.length], p, side);
      p[side] = child;
      all.push(child);
    }
    return numberNodes(root);
  }

  // Every node in breadth-first (level) order: top to bottom, left to right.
  function nodes(root) {
    const out = [];
    const queue = root ? [root] : [];
    while (queue.length) {
      const n = queue.shift();
      out.push(n);
      if (n.left) queue.push(n.left);
      if (n.right) queue.push(n.right);
    }
    return out;
  }

  // The correct visit order for kind 'pre' | 'in' | 'post'. One recursive walk;
  // only the moment the node is written down changes:
  //   pre-order  before both subtrees  (node, left, right)
  //   in-order   between them         (left, node, right)
  //   post-order after both           (left, right, node)
  function order(root, kind) {
    const out = [];
    (function go(n) {
      if (!n) return;
      if (kind === 'pre') out.push(n);
      go(n.left);
      if (kind === 'in') out.push(n);
      go(n.right);
      if (kind === 'post') out.push(n);
    })(root);
    return out;
  }

  // The "Euler tour" used in tutorial step 2: walking around the tree, the walker
  // passes each node three times: on arrival (pass 1), back from its left
  // subtree (pass 2) and back from its right subtree (pass 3). Writing nodes down
  // on pass 1, 2 or 3 gives pre-, in- or post-order respectively.
  function euler(root) {
    const ev = [];
    (function go(n) {
      if (!n) return;
      ev.push({ node: n, pass: 1 });
      go(n.left);
      ev.push({ node: n, pass: 2 });
      go(n.right);
      ev.push({ node: n, pass: 3 });
    })(root);
    return ev;
  }

  // --- Helpers for the feedback messages below ---

  // Parent, grandparent, ... up to the root (nearest first).
  function ancestors(n) {
    const out = [];
    for (let p = n.parent; p; p = p.parent) out.push(p);
    return out;
  }

  // Is node n somewhere in the subtree rooted at sub (including sub itself)?
  function isInside(n, sub) {
    for (let x = n; x; x = x.parent) if (x === sub) return true;
    return false;
  }

  // Does the subtree still contain a node the student hasn't visited?
  // visited is a Set of node ids.
  function hasUnvisited(sub, visited) {
    return !!sub && nodes(sub).some((x) => !visited.has(x.id));
  }

  // Shared by pre- and post-order: was the tapped node in some ancestor's right
  // subtree while that ancestor's left subtree is unfinished?
  function leftBeforeRight(tapped, visited) {
    for (const a of ancestors(tapped)) {
      if (isInside(tapped, a.right) && hasUnvisited(a.left, visited)) {
        return `Left before right: ${tapped.value} is in ${a.value}'s right subtree, but ${a.value}'s left subtree isn't finished yet.`;
      }
    }
    return null;
  }

  // Feedback for a WRONG tap: explains which rule of the traversal the tap broke,
  // naming the actual nodes, instead of just saying "wrong". Checks run from the
  // most specific reason to the general one; the last line is a fallback.
  // (expected, the correct node, is passed in but not needed by the current rules.)
  function explain(kind, tapped, expected, visited) {
    const v = tapped.value;
    if (kind === 'pre') {
      const up = ancestors(tapped).reverse().find((a) => !visited.has(a.id));
      if (up) return `In pre-order, a parent comes before its children. ${up.value} is above ${v} and hasn't been visited yet.`;
      const lr = leftBeforeRight(tapped, visited);
      if (lr) return lr;
    }
    if (kind === 'in') {
      if (hasUnvisited(tapped.left, visited)) {
        return `In in-order, a node waits until its whole left subtree is done. ${v} still has nodes in its left subtree to visit first.`;
      }
      for (const a of ancestors(tapped)) {
        if (isInside(tapped, a.right) && !visited.has(a.id)) {
          return `In in-order, ${a.value} comes before its right subtree, and ${v} is in that right subtree. Visit ${a.value} before going right.`;
        }
      }
    }
    if (kind === 'post') {
      if (hasUnvisited(tapped.left, visited) || hasUnvisited(tapped.right, visited)) {
        return `In post-order, children come before their parent. ${v} still has nodes below it to visit first.`;
      }
      const lr = leftBeforeRight(tapped, visited);
      if (lr) return lr;
    }
    return `Not ${v} yet. Another node needs to be visited first. Remember the rule: ${MODES[kind].rule}.`;
  }

  // --- Helpers for visitReason ---

  function rootOf(n) {
    let r = n;
    while (r.parent) r = r.parent;
    return r;
  }

  // First in-order node: keep going left from the root.
  function firstIn(root) {
    let n = root;
    while (n.left) n = n.left;
    return n;
  }

  // First post-order node: keep going down, left if possible, else right,
  // until reaching a leaf.
  function firstPost(root) {
    let n = root;
    while (n.left || n.right) n = n.left || n.right;
    return n;
  }

  // Explains why n is the CORRECT next node. Used by the Hint button and by the
  // step-by-step walkthroughs, so a hint teaches the rule, not just the answer.
  function visitReason(kind, n) {
    const v = n.value;
    const p = n.parent;
    if (kind === 'pre') {
      if (!p) return `Pre-order starts at the root, the node at the top. Tap ${v}.`;
      if (p.left === n) return `Pre-order goes from a node straight to its left child. ${p.value} is done, so tap its left child, ${v}.`;
      if (p.left) return `${p.value}'s left subtree is finished, so now go to its right child. Tap ${v}.`;
      return `${p.value} has no left child, so go straight to its right child. Tap ${v}.`;
    }
    if (kind === 'in') {
      if (n === firstIn(rootOf(n))) return `In-order starts at the far left: from the root, keep going to the left child until there isn't one. That's ${v}.`;
      if (!n.left) return `${v} has no left subtree, so there is nothing to finish first. Tap ${v}.`;
      return `${v}'s left subtree is finished, so it's ${v}'s turn. After ${v}, go to its right subtree.`;
    }
    if (n === firstPost(rootOf(n))) return `Post-order starts at the bottom: from the root, keep going down (left if you can, otherwise right) until you reach a leaf. That's ${v}.`;
    if (!n.left && !n.right) return `${v} is a leaf: it has no children, so there is nothing below it to finish first. Tap ${v}.`;
    return `Everything below ${v} is finished. In post-order the parent comes last, so tap ${v} now.`;
  }

  return { MODES, fromSpec, random, nodes, order, euler, explain, visitReason };
})();
