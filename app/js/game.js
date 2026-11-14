// The game: 5 levels per traversal order (3 hearts each), then Endless mode.
// Scaffolding: specific feedback on every mistake, a hint offer after 2
// mistakes, and a step-by-step walkthrough when the hearts run out.
const LEVELS = [
  { n: 3, maxDepth: 1 },
  { n: 5, maxDepth: 2 },
  { n: 7, maxDepth: 3 },
  { n: 9, maxDepth: 3 },
  { n: 12, maxDepth: 3 },
];
const ENDLESS = LEVELS.length; // level index of Endless mode
const MAX_HEARTS = 3;
const ENDLESS_HEART_EVERY = 5; // win a heart back every 5 trees

function starsFor(mistakes, hints) {
  if (mistakes === 0 && hints === 0) return 3;
  if (mistakes + hints <= 2) return 2;
  return 1;
}

// Endless trees start at 5 nodes and grow by one per tree, up to 15.
function endlessSize(score) {
  return Math.min(15, 5 + score);
}

function endlessUnlocked(kind) {
  return Store.progress()[kind][LEVELS.length - 1] > 0;
}

function mountGame(root, kind) {
  const mode = Tree.MODES[kind];
  const progress = Store.progress();
  let level = Math.max(0, progress[kind].findIndex((s) => s === 0));
  if (progress[kind].every((s) => s > 0)) level = ENDLESS;
  let board = null;
  let state = null;
  let nextTimer = null;
  let hintedAt = -1; // step the last hint was for, so asking again doesn't count twice

  root.innerHTML = `
    <div class="page play" data-kind="${kind}">
      <header class="topbar">
        <a class="back" href="#/">← Home</a>
        <h1>${mode.name}</h1>
        <div class="hearts" aria-label="Hearts left"></div>
      </header>
      <nav class="levels" aria-label="Levels"></nav>
      <div class="rule-card">
        <strong>${mode.rule}</strong>
        <span>${mode.desc}</span>
      </div>
      <div class="endless-bar" hidden aria-live="polite"></div>
      <p class="instruction"></p>
      <div class="board-host"></div>
      <p class="feedback" aria-live="polite"></p>
      <div class="actions">
        <button class="btn hint-btn" type="button">💡 Hint</button>
        <button class="btn ghost new-btn" type="button">↻ New tree</button>
      </div>
      <div class="overlay" hidden><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"></div></div>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const heartsEl = $('.hearts');
  const levelsEl = $('.levels');
  const host = $('.board-host');
  const feedback = $('.feedback');
  const actions = $('.actions');
  const hintBtn = $('.hint-btn');
  const newBtn = $('.new-btn');
  const endlessBar = $('.endless-bar');
  const instruction = $('.instruction');
  const overlay = $('.overlay');
  const modal = $('.modal');

  function say(text, tone = '') {
    feedback.textContent = text;
    feedback.className = `feedback ${tone}`;
  }

  function renderHearts() {
    heartsEl.innerHTML = '';
    for (let i = 0; i < MAX_HEARTS; i++) {
      const s = document.createElement('span');
      s.textContent = i < state.hearts ? '❤️' : '🤍';
      heartsEl.appendChild(s);
    }
    heartsEl.setAttribute('aria-label', `${state.hearts} of ${MAX_HEARTS} hearts left`);
  }

  function renderEndlessBar() {
    const best = Store.best(kind);
    endlessBar.innerHTML = `<span>🌳 Trees cleared: <b>${state.score}</b></span><span>🏆 Best: <b>${Math.max(best, state.score)}</b></span>`;
  }

  function renderLevels() {
    const stars = Store.progress()[kind];
    levelsEl.innerHTML = '';
    const addButton = (i, html, unlocked, label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'level' + (i === level ? ' current' : '') + (i === ENDLESS ? ' endless' : '');
      b.disabled = !unlocked;
      b.innerHTML = html;
      b.setAttribute('aria-label', label);
      b.addEventListener('click', () => { level = i; startLevel(); });
      levelsEl.appendChild(b);
    };
    LEVELS.forEach((_, i) => {
      const unlocked = i === 0 || stars[i - 1] > 0;
      const got = Math.min(3, Math.max(0, stars[i] | 0));
      const starHtml = `<b class="on">${'★'.repeat(got)}</b><b class="off">${'★'.repeat(3 - got)}</b>`;
      addButton(
        i,
        `<span>Level ${i + 1}</span><small>${unlocked ? starHtml : '🔒'}</small>`,
        unlocked,
        unlocked ? `Level ${i + 1}, ${got} stars` : `Level ${i + 1}, locked`,
      );
    });
    const open = endlessUnlocked(kind);
    const best = Store.best(kind);
    addButton(
      ENDLESS,
      `<span>Endless ∞</span><small>${open ? `🏆 ${best}` : '🔒'}</small>`,
      open,
      open ? `Endless mode, best ${best} trees` : 'Endless mode, locked. Clear level 5 to unlock it.',
    );
  }

  function closeModal() {
    root.querySelectorAll('[inert]').forEach((e) => { e.inert = false; });
    overlay.hidden = true;
    modal.innerHTML = '';
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

  // Swap in a fresh tree, keeping the run state (hearts, score).
  function newBoard(cfg) {
    clearTimeout(nextTimer);
    const refocus = host.contains(document.activeElement);
    if (board) board.destroy();
    host.innerHTML = '';
    board = new Board(host, {
      tree: Tree.random(cfg.n, cfg.maxDepth),
      kind,
      onCorrect: (n) => {
        say(`✓ ${n.value}. ${board.done ? '' : 'Which node is next?'}`, 'good');
        hintBtn.classList.remove('nudge');
      },
      onWrong: onWrong,
      onInfo: (t) => say(t, 'info'),
      onComplete: state.endless ? onEndlessTree : onComplete,
    });
    hintedAt = -1;
    if (refocus) host.querySelector('.node.tappable').focus();
  }

  function startLevel() {
    // Started from a button on this page (modal, level bar, walkthrough)? Then
    // move focus to the new tree, because that button may be gone.
    const refocus = root.contains(document.activeElement);
    closeModal();
    clearTimeout(nextTimer);
    root.querySelectorAll('.walkthrough').forEach((w) => w.remove());
    const endless = level === ENDLESS;
    state = { hearts: MAX_HEARTS, mistakes: 0, hints: 0, endless, score: 0, startBest: Store.best(kind) };
    actions.hidden = false;
    hintBtn.hidden = endless;
    newBtn.hidden = endless;
    hintBtn.classList.remove('nudge');
    endlessBar.hidden = !endless;
    if (endless) {
      instruction.innerHTML = `<b>Endless mode:</b> clear as many trees as you can. Trees grow bigger as you go, there are no hints, and you only have ${MAX_HEARTS} hearts for the whole run. Every ${ENDLESS_HEART_EVERY} trees wins a heart back.`;
      newBoard({ n: endlessSize(0), maxDepth: 3 });
      renderEndlessBar();
      say(`Tree 1: ${endlessSize(0)} nodes. Go!`);
    } else {
      instruction.innerHTML = `Tap the nodes in <b>${mode.name.toLowerCase()}</b> order. The monkey jumps to each node you visit.`;
      const cfg = LEVELS[level];
      newBoard(cfg);
      say(`Level ${level + 1}: ${cfg.n} nodes. Where does ${mode.name.toLowerCase()} start?`);
    }
    renderHearts();
    renderLevels();
    const first = refocus && host.querySelector('.node.tappable');
    if (first) first.focus();
  }

  function onWrong(n, why) {
    state.hearts--;
    state.mistakes++;
    renderHearts();
    if (state.hearts <= 0) {
      board.locked = true;
      say(why, 'bad');
      if (state.endless) endlessOver(why);
      else levelFailed(why);
      return;
    }
    if (!state.endless && state.mistakes >= 2) {
      hintBtn.classList.add('nudge');
      say(`${why} Stuck? Tap Hint to see which node is next and why.`, 'bad');
    } else {
      say(why, 'bad');
    }
  }

  function levelFailed(why) {
    openModal(
      `<h2>Out of hearts 💔</h2>
       <p>${why}</p>
       <p>That's part of learning. Let's go through this tree together, one step at a time.</p>`,
      [
        { label: 'Show me step by step', run: startWalkthrough },
        { label: 'Try a new tree', cls: 'ghost', run: startLevel },
      ],
    );
  }

  function onEndlessTree() {
    state.score++;
    Store.saveBest(kind, state.score); // saved now in case the student leaves mid-run
    let bonus = '';
    if (state.score % ENDLESS_HEART_EVERY === 0 && state.hearts < MAX_HEARTS) {
      state.hearts++;
      renderHearts();
      bonus = ' +1 ❤️';
    }
    renderEndlessBar();
    const size = endlessSize(state.score);
    say(`🌳 Tree cleared!${bonus} Next up: ${size} nodes…`, 'good');
    board.locked = true;
    nextTimer = setTimeout(() => {
      newBoard({ n: size, maxDepth: 3 });
      say(`Tree ${state.score + 1}: ${size} nodes.`);
    }, 1100);
  }

  function endlessOver(why) {
    const prevBest = state.startBest;
    Store.saveBest(kind, state.score);
    const isBest = state.score > prevBest;
    renderLevels();
    const record = isBest && state.score > 0
      ? `<p class="stars">🏆 New best!</p>`
      : `<p>Your best: <b>${Math.max(prevBest, state.score)}</b></p>`;
    openModal(
      `<h2>Run over: ${state.score} tree${state.score === 1 ? '' : 's'} cleared</h2>
       ${record}
       <p>Last mistake: ${why}</p>
       <p>Want to see how the tree you were on should have gone?</p>`,
      [
        { label: 'Show me step by step', run: startWalkthrough },
        { label: 'Play again', cls: 'ghost', run: startLevel },
        { label: 'Home', cls: 'ghost', run: () => { location.hash = '#/'; } },
      ],
    );
  }

  function onComplete() {
    const stars = starsFor(state.mistakes, state.hints);
    const wasLocked = !endlessUnlocked(kind);
    const randomWasLocked = !randomUnlocked();
    Store.saveStars(kind, level, stars);
    const randomNote = randomWasLocked && randomUnlocked()
      ? `<p><b>🎲 Random Order mode unlocked!</b> You've earned ${RANDOM_UNLOCK} stars. Find it on the home page.</p>`
      : '';
    renderLevels();
    const seq = board.order.map((n) => n.value).join(' → ');
    const last = level === LEVELS.length - 1;
    const buttons = [];
    if (last) buttons.push({ label: 'Play Endless ∞', run: () => { level = ENDLESS; startLevel(); } });
    else buttons.push({ label: 'Next level →', run: () => { level++; startLevel(); } });
    buttons.push({ label: 'Play again', cls: 'ghost', run: startLevel });
    buttons.push({ label: 'Home', cls: 'ghost', run: () => { location.hash = '#/'; } });
    const praise = stars === 3 ? 'Perfect run!' : stars === 2 ? 'Nicely done!' : 'You got there!';
    const unlockNote = last && wasLocked ? '<p><b>Endless mode unlocked!</b> How many trees can you clear in a row?</p>' : '';
    openModal(
      `<h2>${last ? `${mode.name} mastered! 🏆` : `Level ${level + 1} complete!`}</h2>
       <p class="stars" aria-label="${stars} of 3 stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</p>
       <p>${praise} ${state.mistakes} mistake${state.mistakes === 1 ? '' : 's'}, ${state.hints} hint${state.hints === 1 ? '' : 's'}.</p>
       <p class="seq-summary">${mode.name}: ${seq}</p>
       ${unlockNote}${randomNote}`,
      buttons,
    );
  }

  function startWalkthrough() {
    closeModal();
    board.reset();
    board.locked = true;
    actions.hidden = true;
    const wt = document.createElement('div');
    wt.className = 'walkthrough';
    wt.innerHTML = `<button class="btn" type="button">Next step ▶</button>`;
    host.after(wt);
    const btn = wt.querySelector('button');
    say(`Walkthrough: ${mode.rule}. Tap "Next step" to watch the monkey visit each node.`, 'info');
    btn.addEventListener('click', () => {
      if (board.done) {
        startLevel();
        return;
      }
      const step = board.demoStep();
      say(`Step ${board.i}: ${step.reason}`, 'info');
      if (board.done) btn.textContent = state.endless ? 'Got it. New run ↻' : 'Got it. Try a new tree ↻';
    });
    btn.focus();
  }

  hintBtn.addEventListener('click', () => {
    if (!board || board.done || board.locked || state.endless) return;
    const text = board.hint();
    if (!text) return;
    if (hintedAt !== board.i) {
      state.hints++;
      hintedAt = board.i;
    }
    hintBtn.classList.remove('nudge');
    say(`💡 ${text}`, 'info');
  });
  newBtn.addEventListener('click', startLevel);

  startLevel();

  return () => {
    clearTimeout(nextTimer);
    if (board) board.destroy();
  };
}
