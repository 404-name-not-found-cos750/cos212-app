// Random Order mode: unlocked at 30 of the 45 stars, i.e. all 15 levels cleared
// with an average of 2 stars. Endless trees, each with a random traversal
// order, growing bigger and deeper. One life. High score is saved.
const RANDOM_UNLOCK = 30;
const KINDS = ['pre', 'in', 'post'];

function totalStars() {
  const p = Store.progress();
  return KINDS.reduce((sum, k) => sum + p[k].reduce((a, b) => a + b, 0), 0);
}

function randomUnlocked() {
  return totalStars() >= RANDOM_UNLOCK;
}

// Tree i (0-based): 4, 6, 8, ... nodes up to 25, and deeper as it grows.
function randomTreeCfg(i) {
  const n = Math.min(25, 4 + 2 * i);
  const maxDepth = n <= 6 ? 2 : n <= 13 ? 3 : 4;
  return { n, maxDepth };
}

function mountRandom(root) {
  if (!randomUnlocked()) {
    root.innerHTML = `
      <div class="page play">
        <header class="topbar"><a class="back" href="#/">← Home</a><h1>Random Order</h1></header>
        <div class="callout">
          <p><b>🔒 Locked.</b> Earn <b>${RANDOM_UNLOCK} stars</b> across the three games to unlock Random Order mode.</p>
          <p>You have <b>${totalStars()}</b> so far.</p>
        </div>
      </div>`;
    return () => {};
  }

  let board = null;
  let state = null;
  let nextTimer = null;

  root.innerHTML = `
    <div class="page play random-mode">
      <header class="topbar">
        <a class="back" href="#/">← Home</a>
        <h1>Random Order</h1>
        <div class="hearts" aria-label="1 life left">❤️</div>
      </header>
      <div class="endless-bar" aria-live="polite"></div>
      <div class="order-banner" aria-live="assertive"></div>
      <div class="board-host"></div>
      <p class="feedback" aria-live="polite"></p>
      <div class="overlay" hidden><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"></div></div>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const page = $('.page');
  const bar = $('.endless-bar');
  const banner = $('.order-banner');
  const host = $('.board-host');
  const feedback = $('.feedback');
  const hearts = $('.hearts');
  const overlay = $('.overlay');
  const modal = $('.modal');

  function say(text, tone = '') {
    feedback.textContent = text;
    feedback.className = `feedback ${tone}`;
  }

  function renderBar() {
    const best = Math.max(Store.best('random'), state.score);
    bar.innerHTML = `<span>⭐ Score: <b>${state.score}</b></span><span>🌳 Trees: <b>${state.trees}</b></span><span>🏆 High score: <b>${best}</b></span>`;
  }

  function openModal(html, buttons) {
    modal.innerHTML = html + '<div class="modal-actions"></div>';
    modal.querySelector('h2').id = 'modal-title';
    const row = modal.querySelector('.modal-actions');
    buttons.forEach(({ label, cls = '', run }) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `btn ${cls}`;
      b.textContent = label;
      b.addEventListener('click', run);
      row.appendChild(b);
    });
    // Keep keyboard and screen-reader focus inside the dialog while it's open.
    root.querySelectorAll('.page > :not(.overlay)').forEach((e) => { e.inert = true; });
    overlay.hidden = false;
    row.querySelector('button').focus();
  }

  function closeModal() {
    root.querySelectorAll('[inert]').forEach((e) => { e.inert = false; });
    overlay.hidden = true;
    modal.innerHTML = '';
  }

  // Pick the order for the next tree. Never the same order 3 times running.
  function pickKind() {
    const h = state.history;
    let options = KINDS;
    if (h.length >= 2 && h[h.length - 1] === h[h.length - 2]) options = KINDS.filter((k) => k !== h[h.length - 1]);
    const k = options[Math.floor(Math.random() * options.length)];
    h.push(k);
    return k;
  }

  function nextTree() {
    clearTimeout(nextTimer);
    const refocus = host.contains(document.activeElement);
    if (board) board.destroy();
    host.innerHTML = '';
    const kind = pickKind();
    const m = Tree.MODES[kind];
    const cfg = randomTreeCfg(state.trees);
    state.kind = kind;
    page.dataset.kind = kind;
    banner.innerHTML = `This tree: <b>${m.name}</b> <span>${m.rule}</span>`;
    banner.classList.remove('pop');
    void banner.offsetWidth; // restart the pop animation
    banner.classList.add('pop');
    board = new Board(host, {
      tree: Tree.random(cfg.n, cfg.maxDepth),
      kind,
      onCorrect: () => {
        state.score++;
        renderBar();
        say('');
      },
      onWrong: gameOver,
      onInfo: (t) => say(t, 'info'),
      onComplete: treeCleared,
    });
    if (refocus) host.querySelector('.node.tappable').focus();
    say(`Tree ${state.trees + 1}: ${cfg.n} nodes in ${m.name.toLowerCase()}.`);
  }

  function treeCleared() {
    state.trees++;
    const bonus = randomTreeCfg(state.trees - 1).n;
    state.score += bonus;
    Store.saveBest('random', state.score); // saved now in case the student leaves mid-run
    renderBar();
    board.locked = true;
    say(`🌳 Tree cleared! +${bonus} bonus. Watch the order for the next one…`, 'good');
    nextTimer = setTimeout(nextTree, 1300);
  }

  function gameOver(n, why) {
    board.locked = true;
    hearts.textContent = '🤍';
    hearts.setAttribute('aria-label', '0 lives left');
    say(why, 'bad');
    const prev = state.startBest;
    Store.saveBest('random', state.score);
    const isBest = state.score > prev;
    const m = Tree.MODES[state.kind];
    openModal(
      `<h2>Game over</h2>
       <p class="big-score">${state.score}</p>
       ${isBest && state.score > 0 ? '<p class="stars">🏆 New high score!</p>' : `<p>High score: <b>${Math.max(prev, state.score)}</b></p>`}
       <p>${state.trees} tree${state.trees === 1 ? '' : 's'} cleared. This tree was <b>${m.name.toLowerCase()}</b> (${m.rule}).</p>
       <p>${why}</p>`,
      [
        { label: 'Show me this tree step by step', run: walkthrough },
        { label: 'Play again', cls: 'ghost', run: start },
        { label: 'Home', cls: 'ghost', run: () => { location.hash = '#/'; } },
      ],
    );
  }

  function walkthrough() {
    closeModal();
    board.reset();
    board.locked = true;
    const m = Tree.MODES[state.kind];
    const wt = document.createElement('div');
    wt.className = 'walkthrough';
    wt.innerHTML = '<button class="btn" type="button">Next step ▶</button>';
    host.after(wt);
    const btn = wt.querySelector('button');
    say(`Walkthrough of this ${m.name.toLowerCase()} tree: ${m.rule}.`, 'info');
    btn.addEventListener('click', () => {
      if (board.done) {
        start();
        return;
      }
      const step = board.demoStep();
      say(`Step ${board.i}: ${step.reason}`, 'info');
      if (board.done) btn.textContent = 'Got it. Play again ↻';
    });
    btn.focus();
  }

  function start() {
    // Started from the modal or the walkthrough? Then move focus to the new
    // tree, because that button is about to go.
    const refocus = root.contains(document.activeElement);
    closeModal();
    clearTimeout(nextTimer);
    root.querySelectorAll('.walkthrough').forEach((w) => w.remove());
    state = { score: 0, trees: 0, history: [], kind: 'pre', startBest: Store.best('random') };
    hearts.textContent = '❤️';
    hearts.setAttribute('aria-label', '1 life left');
    renderBar();
    nextTree();
    const first = refocus && host.querySelector('.node.tappable');
    if (first) first.focus();
  }

  start();

  return () => {
    clearTimeout(nextTimer);
    if (board) board.destroy();
  };
}
