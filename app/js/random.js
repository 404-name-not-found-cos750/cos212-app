// Random Order mode: unlocked at 30 of the 45 stars, i.e. all 15 levels cleared
// with an average of 2 stars. Endless trees, each with a random traversal
// order, growing bigger and deeper. One heart to start, plus one more for every
// 5 trees cleared. High score is saved.
const RANDOM_UNLOCK = 30;
const KINDS = ['pre', 'in', 'post'];
const RANDOM_HEART_EVERY = 5;

// Stars across all three games (out of 45). Also used by achievements.js.
function totalStars() {
  const p = Store.progress();
  return KINDS.reduce((sum, k) => sum + p[k].reduce((a, b) => a + b, 0), 0);
}

function randomUnlocked() {
  return totalStars() >= RANDOM_UNLOCK;
}

// Size of the i-th tree in a run (0-based): 4, 6, 8 ... nodes, up to 25. The
// depth limit grows with it, so there is always room for every node.
function randomTreeCfg(i) {
  const n = Math.min(25, 4 + 2 * i);
  const maxDepth = n <= 6 ? 2 : n <= 13 ? 3 : 4;
  return { n, maxDepth };
}

// Builds the Random Order screen and returns a cleanup function for the router.
function mountRandom(root) {
  // Reached by typing the URL before unlocking it: explain instead of playing.
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

  let board = null;     // the current tree
  let state = null;     // this run: score, trees, lives, recent orders
  let nextTimer = null; // the pause before the next tree

  root.innerHTML = `
    <div class="page play random-mode">
      <header class="topbar">
        <a class="back" href="#/">← Home</a>
        <h1>Random Order</h1>
        <div class="hearts" aria-label="1 heart left">❤️</div>
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

  function renderHearts() {
    hearts.textContent = state.lives > 0 ? '❤️'.repeat(state.lives) : '🤍';
    hearts.setAttribute('aria-label', `${state.lives} heart${state.lives === 1 ? '' : 's'} left`);
  }

  function renderBar() {
    const best = Math.max(Store.best('random'), state.score);
    bar.innerHTML = `<span>⭐ Score: <b>${state.score}</b></span><span>🌳 Trees: <b>${state.trees}</b></span><span>🏆 High score: <b>${best}</b></span>`;
  }

  // Same dialog helpers as game.js.
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

  // Random traversal for the next tree, but never the same one three times in a
  // row, so the student keeps having to switch rules.
  function pickKind() {
    const h = state.history;
    let options = KINDS;
    if (h.length >= 2 && h[h.length - 1] === h[h.length - 2]) options = KINDS.filter((k) => k !== h[h.length - 1]);
    const k = options[Math.floor(Math.random() * options.length)];
    h.push(k);
    return k;
  }

  // Loads the next tree and announces its order in the banner (with a "pop" so
  // the change is noticed; aria-live reads it out).
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
    void banner.offsetWidth; // re-layout so the pop animation plays again
    banner.classList.add('pop');
    board = new Board(host, {
      tree: Tree.random(cfg.n, cfg.maxDepth),
      kind,
      onCorrect: () => {
        state.score++; // 1 point per correct node
        // (and a bonus equal to the tree's size when it's cleared, see treeCleared)
        renderBar();
        say('');
      },
      onWrong,
      onInfo: (t) => say(t, 'info'),
      onComplete: treeCleared,
    });
    if (refocus) host.querySelector('.node.tappable').focus();
    say(`Tree ${state.trees + 1}: ${cfg.n} nodes in ${m.name.toLowerCase()}.`);
  }

  function onWrong(n, why) {
    state.lives--;
    renderHearts();
    if (state.lives <= 0) {
      gameOver(n, why);
      return;
    }
    say(`${why} You lost a heart: ${state.lives} left.`, 'bad');
  }

  // Tree finished: bonus points, maybe an extra heart, then the next tree.
  function treeCleared() {
    state.trees++;
    const bonus = randomTreeCfg(state.trees - 1).n;
    state.score += bonus;
    Store.saveBest('random', state.score); // saved now in case the student leaves mid-run
    let heart = '';
    if (state.trees % RANDOM_HEART_EVERY === 0) {
      state.lives++;
      renderHearts();
      heart = ' +1 ❤️';
    }
    renderBar();
    board.locked = true;
    say(`🌳 Tree cleared! +${bonus} bonus.${heart} Watch the order for the next one…`, 'good');
    nextTimer = setTimeout(nextTree, 1300);
  }

  // Out of hearts: save the high score and trees cleared (the Phoenix avatar
  // goal), then offer a walkthrough of the tree that ended the run.
  function gameOver(n, why) {
    board.locked = true;
    say(why, 'bad');
    const prev = state.startBest;
    Store.saveBest('random', state.score);
    const isBest = state.score > prev;
    Store.saveBest('randomTrees', state.trees);
    const avatarNote = newAvatarNote(claimNewAvatars());
    const m = Tree.MODES[state.kind];
    openModal(
      `<h2>Game over</h2>
       <p class="big-score">${state.score}</p>
       ${isBest && state.score > 0 ? '<p class="stars">🏆 New high score!</p>' : `<p>High score: <b>${Math.max(prev, state.score)}</b></p>`}
       <p>${state.trees} tree${state.trees === 1 ? '' : 's'} cleared. This tree was <b>${m.name.toLowerCase()}</b> (${m.rule}).</p>
       <p>${why}</p>
       ${avatarNote}`,
      [
        { label: 'Show me this tree step by step', run: walkthrough },
        { label: 'Play again', cls: 'ghost', run: start },
        { label: 'Home', cls: 'ghost', run: () => { location.hash = '#/'; } },
      ],
    );
  }

  // Replays the last tree one step at a time, explaining each visit.
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

  // A new run: score 0, one heart.
  function start() {
    // Started from the modal or the walkthrough? Then move focus to the new
    // tree, because that button is about to go.
    const refocus = root.contains(document.activeElement);
    closeModal();
    clearTimeout(nextTimer);
    root.querySelectorAll('.walkthrough').forEach((w) => w.remove());
    state = { score: 0, trees: 0, lives: 1, history: [], kind: 'pre', startBest: Store.best('random') };
    renderHearts();
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
