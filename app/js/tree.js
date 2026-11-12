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
      slot: parent ? parent.slot * 2 + (side === 'right' ? 1 : 0) : 0,
    };
  }

  function numberNodes(root) {
    nodes(root).forEach((n, i) => { n.id = i; });
    return root;
  }

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
    return out;
  }

  function isInside(n, sub) {
    for (let x = n; x; x = x.parent) if (x === sub) return true;
    return false;
  }

  function hasUnvisited(sub, visited) {
    return !!sub && nodes(sub).some((x) => !visited.has(x.id));
  }

  function leftBeforeRight(tapped, visited) {
    for (const a of ancestors(tapped)) {
      if (isInside(tapped, a.right) && hasUnvisited(a.left, visited)) {
        return `Left before right: ${tapped.value} is in ${a.value}'s right subtree, but ${a.value}'s left subtree isn't finished yet.`;
      }
    }
    return null;
  }

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

  function rootOf(n) {
    let r = n;
    while (r.parent) r = r.parent;
    return r;
  }

  function firstIn(root) {
    let n = root;
    while (n.left) n = n.left;
    return n;
  }

  function firstPost(root) {
    let n = root;
    while (n.left || n.right) n = n.left || n.right;
    return n;
  }

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
