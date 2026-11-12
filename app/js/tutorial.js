// Tutorial: six short hands-on steps.
// 1 Meet the tree  2 The walk around the tree  3-5 One step per order  6 Quick check
const T_MEET = [8, [3, [1], [6]], [10, null, [14]]];

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function stepMeet(body, ctx) {
  body.append(el(`<div>
    <p>A <b>tree</b> is a set of <b>nodes</b> (circles) joined by <b>edges</b> (lines). In a <b>binary tree</b>, every node has at most two children: a <b>left child</b> and a <b>right child</b>.</p>
    <ul class="terms">
      <li><b>Root</b>: the single node at the top. It has no parent.</li>
      <li><b>Leaf</b>: a node with no children.</li>
      <li><b>Subtree</b>: a node together with everything below it.</li>
    </ul>
  </div>`));
  const task = body.appendChild(el('<p class="task"></p>'));
  const host = body.appendChild(el('<div></div>'));
  const fb = body.appendChild(el('<p class="feedback" aria-live="polite"></p>'));
  const tree = Tree.fromSpec(T_MEET);

  const tasks = [
    {
      prompt: 'Tap the <b>root</b>.',
      check: (n) => !n.parent,
      ok: (n) => `Yes! ${n.value} is the root: the only node without a parent.`,
      no: (n) => `${n.value} has a parent (${n.parent.value}) above it, so it isn't the root.`,
    },
    {
      prompt: 'Now tap any <b>leaf</b>.',
      check: (n) => !n.left && !n.right,
      ok: (n) => `Correct, ${n.value} has no children, so it's a leaf.`,
      no: (n) => `${n.value} still has children below it. Leaves are at the ends of the branches.`,
    },
    {
      prompt: 'Tap the <b>right child</b> of 3.',
      check: (n) => n.parent && n.parent.value === 3 && n.parent.right === n,
      ok: () => 'Exactly. 6 hangs off the right side of 3.',
      no: (n) => (n.value === 1 ? '1 is the left child of 3. Look at the other side.' : `${n.value} isn't directly below 3.`),
    },
  ];
  let t = 0;
  task.innerHTML = `Try it: ${tasks[0].prompt}`;

  const view = new TreeView(host, tree, {
    onTap: (n) => {
      if (t >= tasks.length) return;
      const cur = tasks[t];
      if (!cur.check(n)) {
        view.flash(n, 'wrong');
        fb.textContent = cur.no(n);
        fb.className = 'feedback bad';
        return;
      }
      view.flash(n, 'picked', 900);
      view.moveMonkey(view.perch(n));
      fb.textContent = cur.ok(n);
      fb.className = 'feedback good';
      t++;
      if (t < tasks.length) {
        task.innerHTML = `Next: ${tasks[t].prompt}`;
      } else {
        task.innerHTML = 'Last idea: <b>subtrees</b>.';
        Tree.nodes(tree.left).forEach((x) => view.setClass(x, 'subtree', true));
        fb.innerHTML = `${fb.textContent} The highlighted nodes <b>3, 1 and 6</b> form the <b>left subtree</b> of 8. Every traversal is defined in terms of left and right subtrees, so keep this in mind!`;
        ctx.complete();
      }
    },
  });
  return () => view.destroy();
}

function stepWalk(body, ctx) {
  body.append(el(`<div>
    <p>To <b>traverse</b> a tree means to visit every node <b>exactly once</b>, following a rule. Here's a trick that makes all three rules easy to remember.</p>
    <p>The monkey explores the tree from the root. It always tries the <b>left</b> child before the <b>right</b> child, and climbs back up when a branch is finished. That way it lands on every node <b>three times</b>:</p>
    <ol class="passes">
      <li><b>1st visit</b>: when it first arrives at the node</li>
      <li><b>2nd visit</b>: when it comes back up from the node's left side</li>
      <li><b>3rd visit</b>: when it comes back up from the node's right side</li>
    </ol>
    <p>The three dots under each node count its visits. The three traversals differ only in <b>which visit</b> you write the node down on. Pick one and watch.</p>
  </div>`));
  const picker = body.appendChild(el(`<div class="picker" role="radiogroup" aria-label="Traversal to run">
    <button type="button" data-kind="pre" class="on"><span class="pk-name">Pre-order</span><small>writes on the 1st visit</small></button>
    <button type="button" data-kind="in"><span class="pk-name">In-order</span><small>writes on the 2nd visit</small></button>
    <button type="button" data-kind="post"><span class="pk-name">Post-order</span><small>writes on the 3rd visit</small></button>
  </div>`));
  const banner = body.appendChild(el('<p class="now-running" aria-live="polite"></p>'));
  const host = body.appendChild(el('<div class="board"></div>'));
  const status = body.appendChild(el('<p class="feedback" aria-live="polite">Press "Watch" to start.</p>'));
  const go = body.appendChild(el('<button class="btn" type="button"></button>'));
  const reveal = body.appendChild(el(`<div class="callout" hidden>
    <p><b>That's the whole secret:</b></p>
    <ul>
      <li>Write a node down on its <b>1st</b> visit → <b>pre-order</b></li>
      <li>Write a node down on its <b>2nd</b> visit → <b>in-order</b></li>
      <li>Write a node down on its <b>3rd</b> visit → <b>post-order</b></li>
    </ul>
    <p>Try the other two orders as well, then go to the next step.</p>
  </div>`));

  const tree = Tree.fromSpec(T_MEET);
  const view = new TreeView(host, tree);
  view.svg.classList.add('show-pips');
  const seq = new SeqBar(host, Tree.nodes(tree).length, 'Written down');
  const PASS = { pre: 1, in: 2, post: 3 };
  const ORD = ['', '1st', '2nd', '3rd'];
  let kind = 'pre';
  let running = false;

  function selectKind(k) {
    kind = k;
    const m = Tree.MODES[k];
    body.dataset.kind = k;
    banner.innerHTML = `Now running: <b>${m.name}</b> <span>(${m.rule}) · writes a node down on its <b>${ORD[PASS[k]]}</b> visit</span>`;
    go.textContent = `▶ Watch ${m.name.toLowerCase()}`;
    picker.querySelectorAll('button').forEach((x) => {
      x.classList.toggle('on', x.dataset.kind === k);
      x.setAttribute('aria-checked', x.dataset.kind === k);
    });
    if (!running) {
      view.resetMarks();
      seq.reset();
    }
  }

  picker.querySelectorAll('button').forEach((b) => {
    b.setAttribute('role', 'radio');
    b.addEventListener('click', () => { if (!running) selectKind(b.dataset.kind); });
  });
  selectKind('pre');

  go.addEventListener('click', async () => {
    if (running) return;
    running = true;
    go.disabled = true;
    picker.classList.add('locked');
    view.resetMarks();
    seq.reset();
    status.className = 'feedback info';
    const name = Tree.MODES[kind].name;
    const pass = PASS[kind];
    let k = 0;
    let at = null;
    for (const e of Tree.euler(tree)) {
      if (!view.alive) return;
      // Jump only when moving to a different node; repeat visits happen in place.
      if (e.node !== at) {
        await view.moveMonkey(view.perch(e.node), { arc: 45, ms: 450 });
        at = e.node;
      }
      if (!view.alive) return;
      const v = e.node.value;
      view.flash(e.node, 'current', 500);
      if (e.pass === pass) {
        view.setPip(e.node, e.pass, 'write');
        view.setClass(e.node, 'visited', true);
        view.setBadge(e.node, ++k);
        seq.set(k - 1, v);
        status.innerHTML = `${ORD[e.pass]} visit to <b>${v}</b>: ${name} writes it down ✍`;
      } else {
        view.setPip(e.node, e.pass, 'seen');
        status.textContent = `${ORD[e.pass]} visit to ${v}. ${name} waits for the ${ORD[pass]} visit.`;
      }
      await wait(e.pass === pass ? 900 : 550);
    }
    if (!view.alive) return;
    status.textContent = `Done! Writing each node down on its ${ORD[pass]} visit gives the ${name.toLowerCase()} sequence: ${seq.slots.map((s) => s.textContent).join(' → ')}.`;
    status.className = 'feedback good';
    reveal.hidden = false;
    running = false;
    go.disabled = false;
    picker.classList.remove('locked');
    ctx.complete();
  });

  return () => view.destroy();
}

function makeOrderStep(kind, demoSpec, practiceSpec, extra) {
  const m = Tree.MODES[kind];
  return function (body, ctx) {
    body.dataset.kind = kind;
    body.append(el(`<div>
      <p class="now-running">Now learning: <b>${m.name}</b></p>
      <div class="rule-card"><strong>${m.rule}</strong><span>${m.desc}</span></div>
      <p>On the monkey's trip around the tree, this means writing each node down on its <b>${m.pass} visit</b>.</p>
      ${extra}
      <h3>Watch it</h3>
      <p>Tap <b>Next step</b> to watch ${m.name.toLowerCase()} on a small tree.</p>
    </div>`));
    const demoHost = body.appendChild(el('<div></div>'));
    const demoFb = body.appendChild(el('<p class="feedback" aria-live="polite"></p>'));
    const demoBtn = body.appendChild(el('<button class="btn" type="button">Next step ▶</button>'));
    const practice = body.appendChild(el(`<div hidden>
      <h3>Your turn</h3>
      <p class="task">Tap the nodes of this bigger tree in <b>${m.name.toLowerCase()}</b> order. No hearts here, so take your time.</p>
    </div>`));
    const practiceHost = practice.appendChild(el('<div></div>'));
    const fb = practice.appendChild(el('<p class="feedback" aria-live="polite"></p>'));
    const hintBtn = practice.appendChild(el('<button class="btn ghost" type="button">💡 Hint</button>'));

    const demo = new Board(demoHost, { tree: Tree.fromSpec(demoSpec), kind, interactive: false });
    let board = null;
    let wrong = 0;

    demoBtn.addEventListener('click', () => {
      if (demo.done) {
        demo.reset();
        demoFb.textContent = '';
        demoBtn.textContent = 'Next step ▶';
        return;
      }
      const s = demo.demoStep();
      demoFb.textContent = `Step ${demo.i}: ${s.reason}`;
      if (demo.done) {
        demoBtn.textContent = '↻ Watch again';
        demoFb.textContent += ` That's it: ${demo.order.map((n) => n.value).join(' → ')}.`;
        if (practice.hidden) {
          practice.hidden = false;
          startPractice();
        }
      }
    });

    function startPractice() {
      board = new Board(practiceHost, {
        tree: Tree.fromSpec(practiceSpec),
        kind,
        onCorrect: (n) => {
          fb.textContent = `✓ ${n.value}`;
          fb.className = 'feedback good';
        },
        onWrong: (n, why) => {
          wrong++;
          fb.textContent = wrong >= 2 ? `${why} Try the Hint button if you're stuck.` : why;
          fb.className = 'feedback bad';
        },
        onInfo: (t) => {
          fb.textContent = t;
          fb.className = 'feedback info';
        },
        onComplete: () => {
          fb.textContent = `🎉 Well done! ${m.name}: ${board.order.map((n) => n.value).join(' → ')}`;
          fb.className = 'feedback good';
          hintBtn.hidden = true;
          ctx.complete();
        },
      });
    }

    hintBtn.addEventListener('click', () => {
      if (!board || board.done) return;
      fb.textContent = `💡 ${board.hint()}`;
      fb.className = 'feedback info';
    });

    return () => {
      demo.destroy();
      if (board) board.destroy();
    };
  };
}

function stepQuiz(body, ctx) {
  const spec = [5, [2, [1], [4]], [8, null, [9]]];
  const tree = Tree.fromSpec(spec);
  const seqs = {
    pre: Tree.order(tree, 'pre'),
    in: Tree.order(tree, 'in'),
    post: Tree.order(tree, 'post'),
    level: Tree.nodes(tree),
  };
  const fmt = (list) => list.map((n) => n.value).join(' → ');
  const why = {
    pre: 'Pre-order starts at the root (5), then does all of the left subtree (2, 1, 4) before the right subtree (8, 9).',
    in: 'In-order finishes the left subtree (1, 2, 4) before the root 5, then does the right subtree (8, 9).',
    post: 'Post-order finishes both subtrees before the root, so the root 5 comes last.',
  };
  const revisitStep = { pre: 2, in: 3, post: 4 };

  body.append(el('<p>Three questions about this tree. Pick the correct sequence for each.</p>'));
  const host = body.appendChild(el('<div></div>'));
  const view = new TreeView(host, tree);
  const qWrap = body.appendChild(el('<div class="quiz"></div>'));
  const summary = body.appendChild(el('<div class="callout" hidden aria-live="polite"></div>'));

  const results = {};
  ['pre', 'in', 'post'].forEach((kind, qi) => {
    const opts = ['pre', 'in', 'post', 'level'].sort(() => Math.random() - 0.5);
    const q = qWrap.appendChild(el(`<fieldset class="q">
      <legend>${qi + 1}. What is the <b>${Tree.MODES[kind].name.toLowerCase()}</b> sequence?</legend>
      <div class="opts"></div>
      <p class="feedback" aria-live="polite"></p>
    </fieldset>`));
    const box = q.querySelector('.opts');
    const fb = q.querySelector('.feedback');
    opts.forEach((o) => {
      const b = box.appendChild(el(`<button type="button" class="opt">${fmt(seqs[o])}</button>`));
      b.addEventListener('click', () => {
        if (kind in results) return;
        const right = o === kind;
        results[kind] = right;
        box.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        b.classList.add(right ? 'right' : 'wrong');
        if (right) {
          fb.textContent = `Correct! ${why[kind]}`;
          fb.className = 'feedback good';
        } else {
          const picked = o === 'level'
            ? 'That reads the tree level by level, top to bottom. It is a different traversal (breadth-first).'
            : `That's the ${Tree.MODES[o].name.toLowerCase()} sequence.`;
          fb.textContent = `Not quite. ${picked} ${why[kind]}`;
          fb.className = 'feedback bad';
          [...box.children][opts.indexOf(kind)].classList.add('right');
        }
        if (Object.keys(results).length === 3) finish();
      });
    });
  });

  function finish() {
    const score = Object.values(results).filter(Boolean).length;
    const missed = Object.keys(results).filter((k) => !results[k]);
    Store.markTutorialDone();
    if (score === 3) {
      summary.innerHTML = '<p><b>3 / 3. You\'re ready!</b> Head to the games and earn all the stars.</p>';
    } else {
      summary.innerHTML = `<p><b>${score} / 3.</b> Good effort! Before the lecture, have another look at:</p><div class="revisit"></div><p>Or jump into the games. Mistakes there come with explanations too.</p>`;
      const r = summary.querySelector('.revisit');
      missed.forEach((k) => {
        const b = r.appendChild(el(`<button type="button" class="btn ghost">Review ${Tree.MODES[k].name}</button>`));
        b.addEventListener('click', () => ctx.goTo(revisitStep[k]));
      });
    }
    summary.hidden = false;
    ctx.complete();
  }

  return () => view.destroy();
}

const TUTORIAL_STEPS = [
  { title: 'Meet the tree', render: stepMeet },
  { title: 'Walking around a tree', render: stepWalk },
  {
    title: 'Pre-order',
    render: makeOrderStep('pre', [7, [4], [9]], [50, [30, [20], [40]], [70]],
      '<p>Good for copying a tree: you meet every parent before its children.</p>'),
  },
  {
    title: 'In-order',
    render: makeOrderStep('in', [7, [4], [9]], [40, [20, [10], [30]], [60]],
      '<p>Fun fact: in a <b>binary search tree</b> (smaller values left, bigger values right), in-order visits the values from smallest to largest. Watch for it in the practice tree!</p>'),
  },
  {
    title: 'Post-order',
    render: makeOrderStep('post', [7, [4], [9]], [9, [4, [2], [7]], [12]],
      '<p>Good for jobs where children must be handled before their parent, like deleting a tree or adding up the sizes of folders.</p>'),
  },
  { title: 'Quick check', render: stepQuiz },
];

function mountTutorial(root) {
  let index = 0;
  let cleanup = () => {};
  const reached = new Set();

  root.innerHTML = `
    <div class="page tutorial">
      <header class="topbar">
        <a class="back" href="#/">← Home</a>
        <h1>Tutorial</h1>
        <span class="count"></span>
      </header>
      <div class="progress" aria-hidden="true"><span></span></div>
      <section class="step">
        <h2></h2>
        <div class="step-body"></div>
      </section>
      <footer class="step-nav">
        <button type="button" class="btn ghost prev">← Back</button>
        <button type="button" class="btn next">Next →</button>
      </footer>
    </div>`;
  const $ = (s) => root.querySelector(s);
  const prev = $('.prev');
  const next = $('.next');

  function show(i) {
    cleanup();
    index = i;
    const step = TUTORIAL_STEPS[i];
    $('.count').textContent = `Step ${i + 1} of ${TUTORIAL_STEPS.length}`;
    $('.progress span').style.width = `${((i + 1) / TUTORIAL_STEPS.length) * 100}%`;
    $('.step h2').textContent = step.title;
    const body = $('.step-body');
    body.innerHTML = '';
    delete body.dataset.kind;
    prev.disabled = i === 0;
    const last = i === TUTORIAL_STEPS.length - 1;
    next.textContent = last ? 'Finish 🎉' : 'Next →';
    // Steps you've finished before stay unlocked.
    next.disabled = !reached.has(i);
    cleanup = step.render(body, {
      complete: () => {
        reached.add(i);
        next.disabled = false;
      },
      goTo: (j) => show(j),
    }) || (() => {});
    window.scrollTo(0, 0);
  }

  prev.addEventListener('click', () => { if (index > 0) show(index - 1); });
  next.addEventListener('click', () => {
    if (index === TUTORIAL_STEPS.length - 1) location.hash = '#/';
    else show(index + 1);
  });

  show(0);
  return () => cleanup();
}
