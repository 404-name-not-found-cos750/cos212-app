// Binary tree model: building trees, traversal orders and the feedback text
// used by the tutorial and the game.
const Tree = (() => {
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

  function makeNode(value, parent, side) {
    return {
      id: 0,
      value,
      left: null,
      right: null,
      parent,
      depth: parent ? parent.depth + 1 : 0,
      // Position in a full tree row (0 = leftmost). Used for layout.
      slot: parent ? parent.slot * 2 + (side === 'right' ? 1 : 0) : 0,
    };
  }

  function numberNodes(root) {
    nodes(root).forEach((n, i) => { n.id = i; });
    return root;
  }

  // Build from a nested spec: [value, leftSpec, rightSpec]; null means no child.
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

  function uniqueValues(count) {
    const pool = [];
    for (let v = 1; v <= 99; v++) pool.push(v);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  // Random binary tree with n nodes, no deeper than maxDepth (root = depth 0).
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

  // Breadth-first list of nodes (also the "level order").
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

  // Walk around the outside of the tree. Each node is passed three times:
  // on its left side (1), underneath it (2) and on its right side (3).
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

  function ancestors(n) {
    const out = [];
    for (let p = n.parent; p; p = p.parent) out.push(p);
    return out; // nearest first
  }

  function isInside(n, sub) {
    for (let x = n; x; x = x.parent) if (x === sub) return true;
    return false;
  }

  function hasUnvisited(sub, visited) {
    return !!sub && nodes(sub).some((x) => !visited.has(x.id));
  }

  // Why was tapping `tapped` wrong? Returns a short, specific explanation.
  function explain(kind, tapped, expected, visited) {
    const v = tapped.value;
    if (kind === 'pre') {
      const up = ancestors(tapped).reverse().find((a) => !visited.has(a.id));
      if (up) return `In pre-order a parent comes before its children. ${up.value} is above ${v} and hasn't been visited yet.`;
      for (const a of ancestors(tapped)) {
        if (isInside(tapped, a.right) && hasUnvisited(a.left, visited)) {
          return `Left before right: ${a.value}'s left subtree still has unvisited nodes.`;
        }
      }
    }
    if (kind === 'in') {
      if (hasUnvisited(tapped.left, visited)) {
        return `In in-order a node waits until its whole left subtree is done. ${v} still has unvisited nodes on its left.`;
      }
      for (const a of ancestors(tapped)) {
        if (isInside(tapped, a.right) && !visited.has(a.id)) {
          return `${a.value} has to be visited before anything in its right subtree, and ${v} is on its right.`;
        }
      }
    }
    if (kind === 'post') {
      if (hasUnvisited(tapped.left, visited) || hasUnvisited(tapped.right, visited)) {
        return `In post-order children come before parents. ${v} still has unvisited nodes below it.`;
      }
      for (const a of ancestors(tapped)) {
        if (isInside(tapped, a.right) && hasUnvisited(a.left, visited)) {
          return `Left before right: finish ${a.value}'s left subtree first.`;
        }
      }
    }
    return `Not ${v} yet. Something earlier still needs a visit. Remember: ${MODES[kind].rule}.`;
  }

  // Why is `n` the next node to visit? Used by hints and walkthroughs.
  function visitReason(kind, n) {
    const v = n.value;
    const p = n.parent;
    if (kind === 'pre') {
      if (!p) return `Start at the root, ${v}. Pre-order visits a node as soon as it arrives.`;
      // A left child comes straight after its parent; a right child once the
      // parent's left subtree (if any) is finished.
      if (p.left === n) return `Go down to ${p.value}'s left child, ${v}, and visit it straight away.`;
      if (!p.left) return `${p.value} has nothing on its left, so go to its right child ${v} and visit it straight away.`;
      return `${p.value}'s left subtree is finished, so go to its right child ${v} and visit it straight away.`;
    }
    if (kind === 'in') {
      if (n.left) return `${v}'s whole left subtree is done, so now it's ${v}'s turn${n.right ? ', then its right side' : ''}.`;
      // No left child: n is where "go left as far as you can" stops, either
      // from the root or from the right child of the node visited just before.
      let x = n;
      while (x.parent && x.parent.left === x) x = x.parent;
      if (!x.parent) {
        if (x === n) return `Start at the root, ${v}. It has no left child, so there's nothing to finish on its left: visit it now.`;
        return `Go left from the root as far as you can: ${v} has no left child, so it comes first.`;
      }
      const a = x.parent.value;
      if (x === n) return `${a} is done, so go to its right child ${v}. ${v} has no left child, so visit it now.`;
      return `${a} is done, so go to its right subtree and then left as far as you can: ${v} has no left child, so visit it now.`;
    }
    if (n.left || n.right) return `Everything below ${v} is done, so the parent ${v} goes last.`;
    // A leaf: n is where "go down as far as you can, left whenever possible"
    // stops, either from the root or from the right child of a node whose
    // left subtree has just been finished.
    let x = n;
    while (x.parent && (x.parent.left === x || !x.parent.left)) x = x.parent;
    if (!x.parent) {
      if (x === n) return `${v} is a leaf: nothing below it to finish first, so visit it.`;
      return `Go down from the root as far as you can, left whenever possible: ${v} is a leaf, so it comes first.`;
    }
    const a = x.parent.value;
    if (x === n) return `${a}'s left subtree is done, so go to its right child ${v}. It's a leaf, so visit it.`;
    return `${a}'s left subtree is done, so go down its right side as far as you can, left whenever possible: ${v} is a leaf, so visit it.`;
  }

  return { MODES, fromSpec, random, nodes, order, euler, explain, visitReason };
})();
