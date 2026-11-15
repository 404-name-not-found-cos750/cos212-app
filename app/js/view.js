// Drawing and interaction. Three classes:
//   TreeView  draws one tree as SVG, makes nodes tappable, moves the climber
//   SeqBar    the row of slots that fills up with the visit sequence
//   Board     one playable tree: checks each tap against the correct order and
//             reports back through callbacks (used by the games and the tutorial)
const SVGNS = 'http://www.w3.org/2000/svg';
// Students who ask their OS for less motion get instant moves instead of swings.
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Creates an SVG element with attributes and (optionally) appends it to parent.
function svgEl(tag, attrs, parent) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

class TreeView {
  // onTap(node) is called when a node is clicked or chosen with Enter/Space.
  // Without onTap the tree is display-only (tutorial demos, quiz).
  constructor(container, root, { onTap = null } = {}) {
    this.alive = true;            // false after destroy(): running animations stop
    this.R = 24;                  // node radius
    this.nodes = Tree.nodes(root);
    this.root = root;
    this.groups = new Map();      // node id -> its SVG <g>
    this.pos = new Map();         // node id -> {x, y} centre
    this.anim = 0;                // bumped by every new move; older moves see it changed and stop

    // Layout: each level is split into 2^depth equal slots and a node sits in the
    // middle of its slot, so the tree always looks like a tree and nothing overlaps.
    // The drawing gets wider as the tree gets deeper.
    const depth = Math.max(...this.nodes.map((n) => n.depth));
    const W = Math.max(640, 2 ** depth * 60);
    const top = 70;
    const gap = 92;
    const H = top + depth * gap + 70;
    for (const n of this.nodes) {
      const slots = 2 ** n.depth;
      this.pos.set(n.id, { x: ((n.slot + 0.5) * W) / slots, y: top + n.depth * gap });
    }

    // Spell out the shape so the tree can be followed without seeing it.
    const kid = (c, side) => (c ? `${side} child ${c.value}` : `no ${side} child`);
    const shape = this.nodes
      .map((n) => (n.left || n.right ? `${n.value}: ${kid(n.left, 'left')}, ${kid(n.right, 'right')}` : `${n.value}: leaf`))
      .join('; ');
    const svg = svgEl('svg', {
      viewBox: `0 0 ${W} ${H}`,
      class: 'tree-svg',
      role: 'group',
      'aria-label': `Binary tree with root ${root.value}. ${shape}.`,
    });
    // Edges go in their own layer underneath, so lines never cover the nodes.
    const edges = svgEl('g', { class: 'edges' }, svg);
    const nodeLayer = svgEl('g', {}, svg);

    for (const n of this.nodes) {
      if (!n.parent) continue;
      const a = this.pos.get(n.parent.id);
      const b = this.pos.get(n.id);
      svgEl('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'edge' }, edges);
    }

    for (const n of this.nodes) {
      const p = this.pos.get(n.id);
      const g = svgEl('g', { class: 'node', transform: `translate(${p.x} ${p.y})` }, nodeLayer);
      // Each node: an invisible, larger "hit" circle (an easier target on touch
      // screens), the visible circle, its value, and a badge for the visit number.
      svgEl('circle', { r: this.R + 10, class: 'hit' }, g);
      svgEl('circle', { r: this.R, class: 'body' }, g);
      const t = svgEl('text', { class: 'label', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, g);
      t.textContent = n.value;
      const badge = svgEl('g', { class: 'badge', transform: `translate(${this.R * 0.8} ${-this.R * 0.8})` }, g);
      svgEl('circle', { r: 11 }, badge);
      svgEl('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central' }, badge);
      // Three dots under the node that count passes (only shown in the tutorial walk).
      const pips = svgEl('g', { class: 'pips', transform: `translate(0 ${this.R + 11})` }, g);
      [-12, 0, 12].forEach((dx) => svgEl('circle', { cx: dx, r: 4.5 }, pips));
      // Tappable nodes are also keyboard buttons (Tab to reach, Enter/Space to visit).
      if (onTap) {
        g.classList.add('tappable');
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', `Node ${n.value}`);
        g.addEventListener('click', () => onTap(n));
        g.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTap(n);
          }
        });
      }
      this.groups.set(n.id, g);
    }

    // The climber (an emoji) and its vine are drawn last so they sit on top.
    // The vine colour comes from the chosen avatar (achievements.js) via --vine.
    this.vine = svgEl('path', { class: 'vine', visibility: 'hidden' }, svg);
    this.vineTip = svgEl('circle', { class: 'vine-tip', r: 5, visibility: 'hidden' }, svg);
    this.monkey = svgEl('text', {
      class: 'monkey',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      'aria-hidden': 'true',
    }, svg);
    const avatar = typeof currentAvatar === 'function' ? currentAvatar() : null;
    this.monkey.textContent = avatar ? avatar.icon : '🐒';
    if (avatar && avatar.vine) svg.style.setProperty('--vine', avatar.vine);
    this.placeMonkey(this.start());
    // Big trees keep a minimum width (the board scrolls sideways) instead of
    // shrinking until the nodes are too small to tap on a phone.
    if (W > 640) svg.style.minWidth = `${Math.round(W * 0.62)}px`;
    this.svg = svg;
    container.appendChild(svg);
  }

  // --- Node marks. The look of each class (visited, hint, wrong, ...) is in style.css. ---

  g(n) { return this.groups.get(n.id); }

  setClass(n, cls, on) { this.g(n).classList.toggle(cls, on); }

  clearClass(cls) { this.groups.forEach((g) => g.classList.remove(cls)); }

  // Shows the visit number on a node (null hides it) and updates the screen-reader label.
  setBadge(n, text) {
    const g = this.g(n);
    g.querySelector('.badge text').textContent = text == null ? '' : text;
    g.classList.toggle('has-badge', text != null);
    if (g.classList.contains('tappable')) {
      g.setAttribute('aria-label', text == null ? `Node ${n.value}` : `Node ${n.value}, visited, number ${text}`);
    }
  }

  // Adds a class for ms milliseconds (e.g. the red shake on a wrong tap).
  flash(n, cls, ms = 600) {
    const g = this.g(n);
    g.classList.remove(cls);
    void g.getBBox(); // forces a re-layout so the CSS animation restarts on a repeat tap
    g.classList.add(cls);
    setTimeout(() => g.classList.remove(cls), ms);
  }

  // Mark pass number `pass` (1-3) of node n: 'seen' or 'write'.
  setPip(n, pass, cls) {
    this.g(n).querySelectorAll('.pips circle')[pass - 1].setAttribute('class', cls);
  }

  // Clears every mark and sends the climber back to its start (Board.reset, tutorial replays).
  resetMarks() {
    for (const n of this.nodes) {
      this.g(n).querySelectorAll('.pips circle').forEach((c) => c.removeAttribute('class'));
      this.setBadge(n, null);
      ['visited', 'hint', 'wrong', 'current', 'subtree', 'picked'].forEach((c) => this.setClass(n, c, false));
    }
    this.anim++;
    this.hideVine();
    this.placeMonkey(this.start());
  }

  // --- The climber ---

  // Where the climber waits before the first visit: up and to the left of the root.
  start() {
    const p = this.pos.get(this.root.id);
    return { x: p.x - 90, y: p.y - 30 };
  }

  // Where the climber sits when it's at node n: just above the circle.
  perch(n) {
    const p = this.pos.get(n.id);
    return { x: p.x, y: p.y - this.R - 20 };
  }

  placeMonkey(p) {
    this.mpos = { x: p.x, y: p.y };
    this.monkey.setAttribute('x', p.x);
    this.monkey.setAttribute('y', p.y);
  }

  hideVine() {
    this.vine.setAttribute('visibility', 'hidden');
    this.vineTip.setAttribute('visibility', 'hidden');
  }

  // Draws the vine as a curve from a to b; slack makes it sag in the middle.
  drawVine(a, b, slack) {
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2 + slack;
    this.vine.setAttribute('d', `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`);
    this.vineTip.setAttribute('cx', b.x);
    this.vineTip.setAttribute('cy', b.y);
    this.vine.setAttribute('visibility', 'visible');
    this.vineTip.setAttribute('visibility', 'visible');
  }

  // Swings the climber to point `to` in two phases:
  //   1. shoot (an extra 45% of ms, before the swing): the vine flies out from the climber's
  //      hand to the anchor, 20px below `to` (the top of the node when `to`
  //      is a perch);
  //   2. swing (ms): the climber is pulled along an arc (higher in the middle,
  //      at most `arc` px) while the vine shortens and straightens.
  // Returns a promise that resolves when the move ends, so the tutorial can
  // await each move. A newer move (or destroy()) stops this one at the next frame.
  moveMonkey(to, { arc = 70, ms = 420 } = {}) {
    const id = ++this.anim;
    const from = { ...this.mpos };
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    if (REDUCED_MOTION || dist < 2) ms = 0;
    return new Promise((resolve) => {
      if (!ms) {
        this.hideVine();
        this.placeMonkey(to);
        resolve();
        return;
      }
      const shootMs = Math.round(ms * 0.45);
      const anchor = { x: to.x, y: to.y + 20 };
      const lift = Math.min(arc * 0.6, dist * 0.25);
      const hand = (p) => ({ x: p.x, y: p.y - 6 });
      // Safety net: animation frames pause in background tabs, so after the
      // expected time put the climber at its destination anyway and resolve.
      setTimeout(() => {
        if (this.alive && id === this.anim) {
          this.placeMonkey(to);
          this.hideVine();
        }
        resolve();
      }, shootMs + ms + 150);
      const t0 = performance.now();
      const step = (t) => {
        if (!this.alive || id !== this.anim) return resolve();
        const elapsed = t - t0;
        if (elapsed < shootMs) {
          // Phase 1: the vine tip flies out (fast start, slow finish).
          const k = elapsed / shootMs;
          const e = 1 - Math.pow(1 - k, 3);
          const h = hand(from);
          const tip = { x: h.x + (anchor.x - h.x) * e, y: h.y + (anchor.y - h.y) * e };
          this.drawVine(h, tip, 30 * Math.sin(Math.PI * k));
          requestAnimationFrame(step);
          return;
        }
        // Phase 2: swing along the arc (ease in and out), vine still attached.
        const k = Math.min(1, (elapsed - shootMs) / ms);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const p = {
          x: from.x + (to.x - from.x) * e,
          y: from.y + (to.y - from.y) * e - lift * Math.sin(Math.PI * k),
        };
        this.placeMonkey(p);
        if (k < 1) {
          this.drawVine(hand(p), anchor, 16 * (1 - k));
          requestAnimationFrame(step);
        } else {
          this.hideVine();
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  // Call when the screen is left, so animations still running stop touching the page.
  destroy() { this.alive = false; }
}

// The row of empty slots under a tree that fills in as nodes are visited.
class SeqBar {
  constructor(container, length, label = 'Visit order') {
    this.el = document.createElement('div');
    this.el.className = 'seq';
    this.el.innerHTML = `<span class="seq-label">${label}</span><ol class="seq-slots"></ol>`;
    this.list = this.el.querySelector('ol');
    this.slots = [];
    for (let i = 0; i < length; i++) {
      const li = document.createElement('li');
      this.list.appendChild(li);
      this.slots.push(li);
    }
    container.appendChild(this.el);
  }

  set(i, value) {
    const li = this.slots[i];
    li.textContent = value;
    li.classList.add('filled');
  }

  reset() {
    this.slots.forEach((li) => {
      li.textContent = '';
      li.classList.remove('filled');
    });
  }
}

// One playable tree for one traversal (kind). It knows the correct order and
// checks every tap; the screen using it decides what a mistake costs (hearts,
// stars, nothing in tutorial practice) through the callbacks:
//   onCorrect(node)       right node tapped
//   onWrong(node, why)    wrong node; `why` explains the broken rule (Tree.explain)
//   onInfo(text)          a neutral note, e.g. the node was already visited
//   onComplete()          every node visited
// interactive: false makes a demo board driven by demoStep() instead of taps.
class Board {
  constructor(host, { tree, kind, interactive = true, onCorrect, onWrong, onComplete, onInfo, seqLabel }) {
    this.kind = kind;
    this.tree = tree;
    this.order = Tree.order(tree, kind);
    this.cb = { onCorrect, onWrong, onComplete, onInfo };
    this.el = document.createElement('div');
    this.el.className = 'board';
    this.el.dataset.kind = kind;
    host.appendChild(this.el);
    this.view = new TreeView(this.el, tree, { onTap: interactive ? (n) => this.tap(n) : null });
    this.seq = new SeqBar(this.el, this.order.length, seqLabel || `${Tree.MODES[kind].name} sequence`);
    this.reset();
  }

  // Back to the start of the same tree (used before a walkthrough).
  reset() {
    this.i = 0;                 // index of the next node in this.order
    this.visited = new Set();   // ids of visited nodes
    this.locked = false;        // true = ignore taps (between trees, in modals and walkthroughs)
    this.view.resetMarks();
    this.seq.reset();
  }

  get done() { return this.i >= this.order.length; }

  get next() { return this.order[this.i] || null; }

  // Records a correct visit: colour the node, number it, fill the next slot, swing there.
  visit(n) {
    this.visited.add(n.id);
    this.view.clearClass('hint');
    this.view.setClass(n, 'visited', true);
    this.view.setBadge(n, this.i + 1);
    this.seq.set(this.i, n.value);
    this.i++;
    this.view.moveMonkey(this.view.perch(n));
  }

  tap(n) {
    if (this.locked || this.done) return;
    if (this.visited.has(n.id)) {
      if (this.cb.onInfo) this.cb.onInfo(`You've already visited ${n.value}. Each node is visited exactly once.`);
      return;
    }
    const expected = this.next;
    if (n === expected) {
      this.visit(n);
      if (this.cb.onCorrect) this.cb.onCorrect(n);
      if (this.done && this.cb.onComplete) this.cb.onComplete();
    } else {
      this.view.flash(n, 'wrong');
      if (this.cb.onWrong) this.cb.onWrong(n, Tree.explain(this.kind, n, expected, this.visited));
    }
  }

  // Highlights the next node and returns the reason it's next (doesn't visit it).
  hint() {
    const n = this.next;
    if (!n) return null;
    this.view.setClass(n, 'hint', true);
    return Tree.visitReason(this.kind, n);
  }

  // Walkthroughs and demos: visits the next node for the student and returns
  // { node, reason } so the screen can explain the step.
  demoStep() {
    const n = this.next;
    if (!n) return null;
    const reason = Tree.visitReason(this.kind, n);
    this.visit(n);
    return { node: n, reason };
  }

  destroy() { this.view.destroy(); }
}
