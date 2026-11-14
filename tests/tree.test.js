// Unit tests for the tree model (app/js/tree.js).
//
// tree.js is a plain browser script that defines a global `Tree`. To test it
// without changing it, we run the file inside a Node `vm` context and read
// `Tree` back out of that context.
//
// Run with: npm test   (or: node --test tests/)

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app', 'js', 'tree.js'), 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context, { filename: 'tree.js' });
const Tree = vm.runInContext('Tree', context);

const KINDS = ['pre', 'in', 'post'];

// Helpers ------------------------------------------------------------------

// Arrays made inside the vm context have their own Array prototype, so copy
// them into plain arrays before comparing with assert.deepEqual.
const values = (list) => Array.from(list, (n) => n.value);
const ids = (list) => Array.from(list, (n) => n.id);
const byValue = (root, v) => Tree.nodes(root).find((n) => n.value === v);
const visitedSet = (root, vals) => new Set(vals.map((v) => byValue(root, v).id));

// Tree sizes used by the app. These mirror LEVELS and endlessSize() in
// app/js/game.js and randomTreeCfg() in app/js/random.js.
const GAME_LEVELS = [
  { n: 3, maxDepth: 1 },
  { n: 5, maxDepth: 2 },
  { n: 7, maxDepth: 3 },
  { n: 9, maxDepth: 3 },
  { n: 12, maxDepth: 3 },
];
const ENDLESS_SIZES = Array.from({ length: 11 }, (_, i) => ({ n: 5 + i, maxDepth: 3 })); // 5..15
const RANDOM_ORDER_SIZES = Array.from({ length: 12 }, (_, i) => {
  const n = Math.min(25, 4 + 2 * i);
  return { n, maxDepth: n <= 6 ? 2 : n <= 13 ? 3 : 4 };
});
const APP_CONFIGS = [...GAME_LEVELS, ...ENDLESS_SIZES, ...RANDOM_ORDER_SIZES];

// Known trees ----------------------------------------------------------------

// The tree used in the tutorial (T_MEET in app/js/tutorial.js):
//         8
//       /   \
//      3     10
//     / \      \
//    1   6      14
const TUTORIAL = [8, [3, [1], [6]], [10, null, [14]]];

// A second, unbalanced tree:
//          1
//        /   \
//       2     3
//      / \     \
//     4   5     6
//              /
//             7
const SAMPLE = [1, [2, [4], [5]], [3, null, [6, [7], null]]];

const LEFT_CHAIN = [1, [2, [3], null], null]; // 1 -> left 2 -> left 3
const RIGHT_CHAIN = [1, null, [2, null, [3]]]; // 1 -> right 2 -> right 3
const ZIGZAG = [1, [2, null, [3, [4], null]], null]; // left, right, left

// Traversal orders -----------------------------------------------------------

describe('Traversal orders on known trees', () => {
  const cases = [
    { name: 'the tutorial tree', spec: TUTORIAL, pre: [8, 3, 1, 6, 10, 14], in: [1, 3, 6, 8, 10, 14], post: [1, 6, 3, 14, 10, 8] },
    { name: 'an unbalanced tree', spec: SAMPLE, pre: [1, 2, 4, 5, 3, 6, 7], in: [4, 2, 5, 1, 3, 7, 6], post: [4, 5, 2, 7, 6, 3, 1] },
    { name: 'a single node', spec: [42], pre: [42], in: [42], post: [42] },
    { name: 'a left-only chain', spec: LEFT_CHAIN, pre: [1, 2, 3], in: [3, 2, 1], post: [3, 2, 1] },
    { name: 'a right-only chain', spec: RIGHT_CHAIN, pre: [1, 2, 3], in: [1, 2, 3], post: [3, 2, 1] },
    { name: 'a zig-zag chain', spec: ZIGZAG, pre: [1, 2, 3, 4], in: [2, 4, 3, 1], post: [4, 3, 2, 1] },
  ];

  for (const c of cases) {
    for (const kind of KINDS) {
      test(`${Tree.MODES[kind].name} of ${c.name} is ${c[kind].join(', ')}`, () => {
        assert.deepEqual(values(Tree.order(Tree.fromSpec(c.spec), kind)), c[kind]);
      });
    }
  }

  test('an empty tree has an empty order', () => {
    for (const kind of KINDS) assert.equal(Tree.order(null, kind).length, 0);
  });

  test('in-order of a binary search tree comes out sorted', () => {
    // The tutorial tree is a BST, so in-order must list the values smallest first.
    const seq = values(Tree.order(Tree.fromSpec(TUTORIAL), 'in'));
    assert.deepEqual(seq, [...seq].sort((a, b) => a - b));
  });

  test('the walk around the tree passes each node three times, and the passes give the three orders', () => {
    const root = Tree.fromSpec(SAMPLE);
    const walk = Tree.euler(root);
    assert.equal(walk.length, 3 * Tree.nodes(root).length);
    const pass = { pre: 1, in: 2, post: 3 };
    for (const kind of KINDS) {
      const fromWalk = values(Array.from(walk).filter((e) => e.pass === pass[kind]).map((e) => e.node));
      assert.deepEqual(fromWalk, values(Tree.order(root, kind)));
    }
  });

  test('every mode has a name and a rule shown to the student', () => {
    assert.equal(Tree.MODES.pre.rule, 'Root → Left → Right');
    assert.equal(Tree.MODES.in.rule, 'Left → Root → Right');
    assert.equal(Tree.MODES.post.rule, 'Left → Right → Root');
    for (const kind of KINDS) {
      assert.ok(Tree.MODES[kind].name && Tree.MODES[kind].desc);
    }
  });
});

// Building trees -------------------------------------------------------------

describe('Building a tree from a nested list', () => {
  test('nodes are numbered 0, 1, 2 ... level by level, left to right', () => {
    const root = Tree.fromSpec(TUTORIAL);
    const list = Tree.nodes(root);
    assert.deepEqual(values(list), [8, 3, 10, 1, 6, 14]);
    assert.deepEqual(ids(list), [0, 1, 2, 3, 4, 5]);
  });

  test('each node knows its parent, depth and layout slot', () => {
    const root = Tree.fromSpec(TUTORIAL);
    const n14 = byValue(root, 14);
    assert.equal(root.parent, null);
    assert.equal(root.depth, 0);
    assert.equal(n14.parent.value, 10);
    assert.equal(n14.depth, 2);
    assert.equal(n14.slot, 3); // rightmost position on row 2
    assert.equal(byValue(root, 1).slot, 0); // leftmost position on row 2
  });
});

// Random trees ---------------------------------------------------------------

// Checks every structural property a random tree must have and returns the
// list of nodes so callers can make extra checks.
function assertValidTree(root, n, maxDepth) {
  const list = Tree.nodes(root);
  assert.equal(list.length, n, 'node count');
  assert.equal(root.parent, null, 'root has no parent');
  assert.deepEqual(ids(list), [...Array(n).keys()], 'ids are 0..n-1 in level order');
  const vals = values(list);
  assert.equal(new Set(vals).size, n, 'values are unique');
  for (const x of list) {
    assert.ok(Number.isInteger(x.value) && x.value >= 1 && x.value <= 99, `value ${x.value} is 1–99`);
    assert.ok(x.depth <= maxDepth, `depth ${x.depth} <= ${maxDepth}`);
    for (const side of ['left', 'right']) {
      const c = x[side];
      if (!c) continue;
      assert.equal(c.parent, x, 'child points back to its parent');
      assert.equal(c.depth, x.depth + 1, 'child is one level deeper');
      assert.equal(c.slot, x.slot * 2 + (side === 'right' ? 1 : 0), 'child slot');
    }
  }
  for (const kind of KINDS) {
    assert.equal(Tree.order(root, kind).length, n, `${kind}-order visits every node once`);
  }
  return list;
}

describe('Random trees', () => {
  test('every tree size the app uses gives a valid tree (200 trees per size)', () => {
    for (const { n, maxDepth } of APP_CONFIGS) {
      for (let i = 0; i < 200; i++) assertValidTree(Tree.random(n, maxDepth), n, maxDepth);
    }
  });

  test('random sizes and depth limits always give a valid tree (2 000 trees)', () => {
    for (let i = 0; i < 2000; i++) {
      const maxDepth = Math.floor(Math.random() * 5); // 0..4
      const capacity = 2 ** (maxDepth + 1) - 1;
      const n = 1 + Math.floor(Math.random() * Math.min(capacity, 30));
      assertValidTree(Tree.random(n, maxDepth), n, maxDepth);
    }
  });

  test('a one-node tree is just a root', () => {
    const root = Tree.random(1, 3);
    assertValidTree(root, 1, 3);
    assert.equal(root.left, null);
    assert.equal(root.right, null);
  });

  test('a tree filled to its depth limit is a perfect tree', () => {
    for (let i = 0; i < 50; i++) {
      const list = assertValidTree(Tree.random(15, 3), 15, 3);
      const leaves = list.filter((x) => !x.left && !x.right);
      assert.equal(leaves.length, 8);
      assert.ok(leaves.every((x) => x.depth === 3));
    }
  });

  test('random trees really are random (different shapes and values)', () => {
    const shapes = new Set();
    const roots = new Set();
    for (let i = 0; i < 200; i++) {
      const root = Tree.random(7, 3);
      shapes.add(Tree.nodes(root).map((x) => `${x.depth}:${x.slot}`).join(','));
      roots.add(root.value);
    }
    assert.ok(shapes.size > 10, `only ${shapes.size} shapes in 200 trees`);
    assert.ok(roots.size > 10, `only ${roots.size} root values in 200 trees`);
  });
});

// Mistake explanations -------------------------------------------------------

describe('Explanations for a wrong tap', () => {
  const root = Tree.fromSpec(SAMPLE);
  const tap = (kind, value, visitedValues) => {
    const visited = visitedSet(root, visitedValues);
    const expected = Tree.order(root, kind).find((x) => !visited.has(x.id));
    return Tree.explain(kind, byValue(root, value), expected, visited);
  };

  test('pre-order: tapping a node before its parent names the highest unvisited ancestor', () => {
    assert.equal(tap('pre', 4, []), "In pre-order a parent comes before its children. 1 is above 4 and hasn't been visited yet.");
    assert.equal(tap('pre', 7, [1, 2, 4, 5, 3]), "In pre-order a parent comes before its children. 6 is above 7 and hasn't been visited yet.");
  });

  test('pre-order: jumping to the right subtree too early says "left before right"', () => {
    assert.equal(tap('pre', 3, [1, 2, 4]), "Left before right: 1's left subtree still has unvisited nodes.");
  });

  test('in-order: tapping a node whose left side is not done says so', () => {
    assert.equal(tap('in', 2, []), 'In in-order a node waits until its whole left subtree is done. 2 still has unvisited nodes on its left.');
  });

  test('in-order: going right before visiting the parent names the parent', () => {
    assert.equal(tap('in', 3, [4, 2, 5]), '1 has to be visited before anything in its right subtree, and 3 is on its right.');
  });

  test('post-order: tapping a parent before its children says children come first', () => {
    assert.equal(tap('post', 2, [4]), 'In post-order children come before parents. 2 still has unvisited nodes below it.');
    assert.equal(tap('post', 1, [4, 5, 2, 7, 6]), 'In post-order children come before parents. 1 still has unvisited nodes below it.');
  });

  test('post-order: a leaf on the right while the left is unfinished says "left before right"', () => {
    assert.equal(tap('post', 7, [4]), "Left before right: finish 1's left subtree first.");
  });

  test('the same wrong tap gets a different, order-specific explanation in each order', () => {
    const msgs = KINDS.map((kind) => tap(kind, 2, []));
    // In pre-order 2 is reached after 1; in in-order and post-order 2 still has 4 below it.
    assert.match(msgs[0], /pre-order/);
    assert.match(msgs[1], /in-order/);
    assert.match(msgs[2], /post-order/);
    assert.equal(new Set(msgs).size, 3);
  });

  test('if no specific reason applies, the student is reminded of the rule', () => {
    // Asking about the node that is actually next has no specific mistake to explain.
    for (const kind of KINDS) {
      const first = Tree.order(root, kind)[0];
      const msg = Tree.explain(kind, first, first, new Set());
      assert.equal(msg, `Not ${first.value} yet. Something earlier still needs a visit. Remember: ${Tree.MODES[kind].rule}.`);
    }
  });

  test('every possible wrong tap on 300 random trees gets a specific, true explanation', () => {
    // Plays every game to the end and, at every step, taps every wrong node.
    // Each explanation must be one of the specific ones (not the general
    // reminder), mention the tapped node, and its claim must be true.
    const unvisitedBelow = (sub, visited) => !!sub && Tree.nodes(sub).some((x) => !visited.has(x.id));
    const isInRightOf = (x, a) => { for (let p = x; p; p = p.parent) if (p === a.right) return true; return false; };
    let checked = 0;
    for (let t = 0; t < 300; t++) {
      const { n, maxDepth } = APP_CONFIGS[t % APP_CONFIGS.length];
      const tree = Tree.random(n, maxDepth);
      const find = (v) => byValue(tree, Number(v));
      for (const kind of KINDS) {
        const seq = Tree.order(tree, kind);
        const visited = new Set();
        for (const expected of seq) {
          for (const wrong of Tree.nodes(tree)) {
            if (wrong === expected || visited.has(wrong.id)) continue;
            const msg = Tree.explain(kind, wrong, expected, visited);
            assert.doesNotMatch(msg, /^Not \d+ yet/, `fell back to the general reminder: ${msg}`);
            let m;
            if ((m = msg.match(/^In pre-order a parent comes before its children\. (\d+) is above (\d+)/))) {
              const a = find(m[1]);
              assert.equal(Number(m[2]), wrong.value);
              assert.ok(!visited.has(a.id), msg);
              assert.ok(a !== wrong && Tree.nodes(a).includes(wrong), `${a.value} is above ${wrong.value}`);
            } else if ((m = msg.match(/^Left before right: (?:finish )?(\d+)'s left subtree/))) {
              const a = find(m[1]);
              assert.ok(isInRightOf(wrong, a) && unvisitedBelow(a.left, visited), msg);
            } else if ((m = msg.match(/^In in-order .* (\d+) still has unvisited nodes on its left\.$/))) {
              assert.equal(Number(m[1]), wrong.value);
              assert.ok(unvisitedBelow(wrong.left, visited), msg);
            } else if ((m = msg.match(/^(\d+) has to be visited before anything in its right subtree, and (\d+) is on its right\.$/))) {
              const a = find(m[1]);
              assert.equal(Number(m[2]), wrong.value);
              assert.ok(!visited.has(a.id) && isInRightOf(wrong, a), msg);
            } else if ((m = msg.match(/^In post-order children come before parents\. (\d+) still has unvisited nodes below it\.$/))) {
              assert.equal(Number(m[1]), wrong.value);
              assert.ok(unvisitedBelow(wrong.left, visited) || unvisitedBelow(wrong.right, visited), msg);
            } else {
              assert.fail(`unexpected explanation for ${kind}-order: ${msg}`);
            }
            checked++;
          }
          visited.add(expected.id);
        }
      }
    }
    assert.ok(checked > 10000, `only ${checked} wrong taps checked`);
  });
});

// Hint text ------------------------------------------------------------------

describe('Hint text for the next node', () => {
  const root = Tree.fromSpec(TUTORIAL);
  const reason = (kind, v) => Tree.visitReason(kind, byValue(root, v));

  test('pre-order: the root, a left child and a right child each say why they come next', () => {
    assert.equal(reason('pre', 8), 'Start at the root, 8. Pre-order visits a node as soon as it arrives.');
    assert.equal(reason('pre', 3), "Go down to 8's left child, 3, and visit it straight away.");
    assert.equal(reason('pre', 6), "3's left subtree is finished, so go to its right child 6 and visit it straight away.");
    assert.equal(reason('pre', 14), '10 has nothing on its left, so go to its right child 14 and visit it straight away.');
  });

  test('in-order: a node with no left child says where the walk came from; otherwise its left subtree is done', () => {
    assert.equal(reason('in', 1), 'Go left from the root as far as you can: 1 has no left child, so it comes first.');
    assert.equal(reason('in', 10), '8 is done, so go to its right child 10. 10 has no left child, so visit it now.');
    assert.equal(reason('in', 8), "8's whole left subtree is done, so now it's 8's turn, then its right side.");
    assert.equal(reason('in', 3), "3's whole left subtree is done, so now it's 3's turn, then its right side.");
  });

  test('post-order: leaves say how the walk got there, parents come after everything below them', () => {
    assert.equal(reason('post', 1), 'Go down from the root as far as you can, left whenever possible: 1 is a leaf, so it comes first.');
    assert.equal(reason('post', 6), "3's left subtree is done, so go to its right child 6. It's a leaf, so visit it.");
    assert.equal(reason('post', 14), "8's left subtree is done, so go down its right side as far as you can, left whenever possible: 14 is a leaf, so visit it.");
    assert.equal(reason('post', 3), 'Everything below 3 is done, so the parent 3 goes last.');
  });

  test('a one-node tree gets a hint in every order', () => {
    const single = Tree.fromSpec([42]);
    assert.equal(Tree.visitReason('pre', single), 'Start at the root, 42. Pre-order visits a node as soon as it arrives.');
    assert.equal(Tree.visitReason('in', single), "Start at the root, 42. It has no left child, so there's nothing to finish on its left: visit it now.");
    assert.equal(Tree.visitReason('post', single), '42 is a leaf: nothing below it to finish first, so visit it.');
  });

  test('every hint on 300 random trees names the next node and only says true things', () => {
    // Plays every game to the end. At every step the hint for the correct next
    // node must name it, match one of the known sentences, and each claim in
    // that sentence must hold for the tree and the nodes visited so far.
    const allVisited = (sub, visited) => !sub || Tree.nodes(sub).every((x) => visited.has(x.id));
    const isLeaf = (x) => !x.left && !x.right;
    // Following left links only from `top` reaches `n`.
    const leftmostFrom = (top, n) => { let x = top; while (x.left) x = x.left; return x === n; };
    // Going down from `top`, left whenever possible, otherwise right, reaches `n`.
    const firstLeafFrom = (top, n) => { let x = top; while (!isLeaf(x)) x = x.left || x.right; return x === n; };
    const isInside = (x, sub) => { for (let y = x; y; y = y.parent) if (y === sub) return true; return false; };
    let checked = 0;
    for (let t = 0; t < 300; t++) {
      const { n, maxDepth } = APP_CONFIGS[t % APP_CONFIGS.length];
      const tree = Tree.random(n, maxDepth);
      const find = (v) => byValue(tree, Number(v));
      for (const kind of KINDS) {
        const visited = new Set();
        for (const next of Tree.order(tree, kind)) {
          const hint = Tree.visitReason(kind, next);
          assert.ok(typeof hint === 'string' && hint.length > 0);
          assert.ok(new RegExp(`\\b${next.value}\\b`).test(hint), `does not name ${next.value}: ${hint}`);
          const first = visited.size === 0;
          let m;
          if (kind === 'pre' && (m = hint.match(/^Start at the root, (\d+)\. Pre-order visits a node as soon as it arrives\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(!next.parent && first, hint);
          } else if (kind === 'pre' && (m = hint.match(/^Go down to (\d+)'s left child, (\d+), and visit it straight away\.$/))) {
            const p = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(p.left === next && visited.has(p.id), hint);
          } else if (kind === 'pre' && (m = hint.match(/^(\d+) has nothing on its left, so go to its right child (\d+) and visit it straight away\.$/))) {
            const p = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(p.right === next && !p.left && visited.has(p.id), hint);
          } else if (kind === 'pre' && (m = hint.match(/^(\d+)'s left subtree is finished, so go to its right child (\d+) and visit it straight away\.$/))) {
            const p = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(p.right === next && p.left && allVisited(p.left, visited) && visited.has(p.id), hint);
          } else if (kind === 'in' && (m = hint.match(/^(\d+)'s whole left subtree is done, so now it's \1's turn(, then its right side)?\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(next.left && allVisited(next.left, visited), hint);
            assert.equal(!!m[2], !!next.right, hint);
          } else if (kind === 'in' && (m = hint.match(/^Start at the root, (\d+)\. It has no left child, so there's nothing to finish on its left: visit it now\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(!next.parent && !next.left && first, hint);
          } else if (kind === 'in' && (m = hint.match(/^Go left from the root as far as you can: (\d+) has no left child, so it comes first\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(next.parent && !next.left && leftmostFrom(tree, next) && first, hint);
          } else if (kind === 'in' && (m = hint.match(/^(\d+) is done, so go to its right child (\d+)\. \2 has no left child, so visit it now\.$/))) {
            const a = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(a.right === next && !next.left && visited.has(a.id), hint);
          } else if (kind === 'in' && (m = hint.match(/^(\d+) is done, so go to its right subtree and then left as far as you can: (\d+) has no left child, so visit it now\.$/))) {
            const a = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(a.right && a.right !== next && leftmostFrom(a.right, next) && !next.left && visited.has(a.id), hint);
          } else if (kind === 'post' && (m = hint.match(/^Everything below (\d+) is done, so the parent \1 goes last\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(!isLeaf(next) && allVisited(next.left, visited) && allVisited(next.right, visited), hint);
          } else if (kind === 'post' && (m = hint.match(/^(\d+) is a leaf: nothing below it to finish first, so visit it\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(isLeaf(next), hint);
          } else if (kind === 'post' && (m = hint.match(/^Go down from the root as far as you can, left whenever possible: (\d+) is a leaf, so it comes first\.$/))) {
            assert.equal(find(m[1]), next);
            assert.ok(isLeaf(next) && firstLeafFrom(tree, next) && first, hint);
          } else if (kind === 'post' && (m = hint.match(/^(\d+)'s left subtree is done, so go to its right child (\d+)\. It's a leaf, so visit it\.$/))) {
            const a = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(a.right === next && isLeaf(next) && a.left && allVisited(a.left, visited), hint);
          } else if (kind === 'post' && (m = hint.match(/^(\d+)'s left subtree is done, so go down its right side as far as you can, left whenever possible: (\d+) is a leaf, so visit it\.$/))) {
            const a = find(m[1]);
            assert.equal(find(m[2]), next);
            assert.ok(a.right && a.right !== next && isInside(next, a.right) && firstLeafFrom(a.right, next), hint);
            assert.ok(isLeaf(next) && a.left && allVisited(a.left, visited), hint);
          } else {
            assert.fail(`unexpected hint for ${kind}-order: ${hint}`);
          }
          // Nothing the hint points at may already be visited.
          assert.ok(!visited.has(next.id));
          visited.add(next.id);
          checked++;
        }
      }
    }
    assert.ok(checked > 5000, `only ${checked} hints checked`);
  });
});
