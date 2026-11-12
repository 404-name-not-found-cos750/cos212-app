// Drawing: the SVG tree with the monkey, the visit-sequence bar, and the
// Board that both the tutorial and the game use for "tap the next node".
const SVGNS = 'http://www.w3.org/2000/svg';
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  constructor(container, root, { onTap = null } = {}) {
    this.alive = true;
    this.R = 24;
    this.nodes = Tree.nodes(root);
    this.root = root;
    this.groups = new Map();
    this.pos = new Map();
    this.anim = 0;

    const depth = Math.max(...this.nodes.map((n) => n.depth));
    // Wider canvas for deep trees so the bottom row never overlaps.
    const W = Math.max(640, 2 ** depth * 60);
    const top = 70;
    const gap = 92;
    const H = top + depth * gap + 70;
    for (const n of this.nodes) {
      const slots = 2 ** n.depth;
      this.pos.set(n.id, { x: ((n.slot + 0.5) * W) / slots, y: top + n.depth * gap });
    }

    const svg = svgEl('svg', {
      viewBox: `0 0 ${W} ${H}`,
      class: 'tree-svg',
      role: 'group',
      'aria-label': 'Binary tree',
    });
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
      svgEl('circle', { r: this.R + 10, class: 'hit' }, g);
      svgEl('circle', { r: this.R, class: 'body' }, g);
      const t = svgEl('text', { class: 'label', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, g);
      t.textContent = n.value;
      const badge = svgEl('g', { class: 'badge', transform: `translate(${this.R * 0.8} ${-this.R * 0.8})` }, g);
      svgEl('circle', { r: 11 }, badge);
      svgEl('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central' }, badge);
      // Three dots under the node that count visits (only shown in the tutorial walk).
      const pips = svgEl('g', { class: 'pips', transform: `translate(0 ${this.R + 11})` }, g);
      [-12, 0, 12].forEach((dx) => svgEl('circle', { cx: dx, r: 4.5 }, pips));
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

    this.monkey = svgEl('text', {
      class: 'monkey',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      'aria-hidden': 'true',
    }, svg);
    this.monkey.textContent = '🐒';
    this.placeMonkey(this.start());

    // Keep nodes big enough to tap on phones; the board scrolls sideways instead.
    if (W > 640) svg.style.minWidth = `${Math.round(W * 0.62)}px`;
    this.svg = svg;
    container.appendChild(svg);
  }

  g(n) { return this.groups.get(n.id); }

  setClass(n, cls, on) { this.g(n).classList.toggle(cls, on); }

  clearClass(cls) { this.groups.forEach((g) => g.classList.remove(cls)); }

  setBadge(n, text) {
    const g = this.g(n);
    g.querySelector('.badge text').textContent = text == null ? '' : text;
    g.classList.toggle('has-badge', text != null);
  }

  flash(n, cls, ms = 600) {
    const g = this.g(n);
    g.classList.remove(cls);
    void g.getBBox(); // restart the CSS animation
    g.classList.add(cls);
    setTimeout(() => g.classList.remove(cls), ms);
  }

  // Mark visit number `pass` (1-3) of node n: 'seen' or 'write'.
  setPip(n, pass, cls) {
    this.g(n).querySelectorAll('.pips circle')[pass - 1].setAttribute('class', cls);
  }

  resetMarks() {
    for (const n of this.nodes) {
      this.g(n).querySelectorAll('.pips circle').forEach((c) => c.removeAttribute('class'));
      this.setBadge(n, null);
      ['visited', 'hint', 'wrong', 'current', 'subtree', 'picked'].forEach((c) => this.setClass(n, c, false));
    }
    this.placeMonkey(this.start());
  }

  // Monkey positions
  start() {
    const p = this.pos.get(this.root.id);
    return { x: p.x - 90, y: p.y - 30 };
  }

  perch(n) {
    const p = this.pos.get(n.id);
    return { x: p.x, y: p.y - this.R - 20 };
  }

  placeMonkey(p) {
    this.mpos = { x: p.x, y: p.y };
    this.monkey.setAttribute('x', p.x);
    this.monkey.setAttribute('y', p.y);
  }

  // Jump (arc > 0) or walk (arc = 0) to a point. A newer move cancels an older one.
  moveMonkey(to, { arc = 70, ms = 420 } = {}) {
    const id = ++this.anim;
    const from = { ...this.mpos };
    if (REDUCED_MOTION) ms = 0;
    return new Promise((resolve) => {
      if (!ms) {
        this.placeMonkey(to);
        resolve();
        return;
      }
      // Animation frames pause in background tabs; make sure the move still finishes.
      setTimeout(() => {
        if (this.alive && id === this.anim) this.placeMonkey(to);
        resolve();
      }, ms + 150);
      const t0 = performance.now();
      const step = (t) => {
        if (!this.alive || id !== this.anim) return resolve();
        const k = Math.min(1, (t - t0) / ms);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        this.placeMonkey({
          x: from.x + (to.x - from.x) * e,
          y: from.y + (to.y - from.y) * e - arc * Math.sin(Math.PI * k),
        });
        if (k < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  destroy() { this.alive = false; }
}

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

// One traversal puzzle: tap the nodes in the right order.
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

  reset() {
    this.i = 0;
    this.visited = new Set();
    this.locked = false;
    this.view.resetMarks();
    this.seq.reset();
  }

  get done() { return this.i >= this.order.length; }

  get next() { return this.order[this.i] || null; }

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

  // Highlight the next node and say why it's next.
  hint() {
    const n = this.next;
    if (!n) return null;
    this.view.setClass(n, 'hint', true);
    return Tree.visitReason(this.kind, n);
  }

  // Walkthrough: visit the next node for the learner and explain it.
  demoStep() {
    const n = this.next;
    if (!n) return null;
    const reason = Tree.visitReason(this.kind, n);
    this.visit(n);
    return { node: n, reason };
  }

  destroy() { this.view.destroy(); }
}
