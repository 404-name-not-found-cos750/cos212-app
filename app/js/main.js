const Store = (() => {
  const KEY = 'cos212-tree-hop-v1';

  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    data = data || {};
    data.stars = data.stars || {};
    data.best = data.best || {};
    if (typeof data.best.random !== 'number') data.best.random = 0;
    if (typeof data.best.randomTrees !== 'number') data.best.randomTrees = 0;
    for (const k of ['pre', 'in', 'post']) {
      if (!Array.isArray(data.stars[k]) || data.stars[k].length !== LEVELS.length) {
        data.stars[k] = LEVELS.map(() => 0);
      }
      if (typeof data.best[k] !== 'number') data.best[k] = 0;
    }
    if (typeof data.avatar !== 'string') data.avatar = 'monkey';
    if (!Array.isArray(data.seenAvatars)) data.seenAvatars = [];
    return data;
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { }
  }

  let cache = load();

  return {
    progress: () => cache.stars,
    tutorialDone: () => !!cache.tutorialDone,
    best: (kind) => cache.best[kind],
    saveBest(kind, score) {
      if (score <= cache.best[kind]) return false;
      cache.best[kind] = score;
      save(cache);
      return true;
    },
    saveStars(kind, level, stars) {
      cache.stars[kind][level] = Math.max(cache.stars[kind][level], stars);
      save(cache);
    },
    markTutorialDone() {
      cache.tutorialDone = true;
      save(cache);
    },
    avatar: () => cache.avatar,
    setAvatar(id) {
      cache.avatar = id;
      save(cache);
    },
    seenAvatars: () => cache.seenAvatars,
    markAvatarsSeen(ids) {
      cache.seenAvatars = [...new Set([...cache.seenAvatars, ...ids])];
      save(cache);
    },
  };
})();

function randomCard() {
  const have = totalStars();
  if (have >= RANDOM_UNLOCK) {
    return `
      <a class="card random-card" href="#/play/random">
        <h3>🎲 Random Order</h3>
        <p>All three orders mixed. Trees keep getting bigger. One life. How far can you go?</p>
        <p class="meta"><span>🏆 High score: ${Store.best('random')}</span><span>Play →</span></p>
      </a>`;
  }
  const pct = Math.round((have / RANDOM_UNLOCK) * 100);
  return `
    <div class="card random-card locked" aria-disabled="true">
      <h3>🔒 Random Order</h3>
      <p>All three orders mixed, bigger and bigger trees, one life. Earn <b>${RANDOM_UNLOCK} stars</b> to unlock it.</p>
      <div class="unlock-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${RANDOM_UNLOCK}" aria-valuenow="${have}" aria-label="Stars towards unlock"><span style="width:${pct}%"></span></div>
      <p class="meta"><span>★ ${have}/${RANDOM_UNLOCK}</span></p>
    </div>`;
}

function mountHome(root) {
  const stars = Store.progress();
  const done = Store.tutorialDone();
  const fresh = claimNewAvatars();
  const cards = ['pre', 'in', 'post'].map((k) => {
    const m = Tree.MODES[k];
    const total = stars[k].reduce((a, b) => a + b, 0);
    const cleared = stars[k].filter((s) => s > 0).length;
    const endless = stars[k][LEVELS.length - 1] > 0
      ? `<p class="meta endless-meta"><span>∞ Endless best: ${Store.best(k)}</span></p>`
      : '';
    return `
      <a class="card mode-card" data-kind="${k}" href="#/play/${k}">
        <h3>${m.name}</h3>
        <p class="rule">${m.rule}</p>
        <p class="meta"><span aria-label="${total} of 15 stars">★ ${total}/15</span><span>${cleared}/${LEVELS.length} levels</span></p>
        ${endless}
      </a>`;
  }).join('');

  root.innerHTML = `
    <div class="page home">
      <header class="hero">
        <div class="logo" aria-hidden="true">${currentAvatar().icon}🌳</div>
        <h1>Tree Hop</h1>
        <p>Help the monkey visit every node of a binary tree in the right order, and learn the three classic ways to <b>traverse a tree</b> before your COS 212 lecture.</p>
      </header>

      <a class="card tutorial-card" href="#/tutorial">
        <span class="tag">${done ? '✓ Completed' : 'Start here'}</span>
        <h2>Tutorial</h2>
        <p>New to trees? Six short, hands-on steps teach you what a tree is and how pre-order, in-order and post-order work. About 10 minutes.</p>
        <span class="cta">${done ? 'Go through it again →' : 'Start the tutorial →'}</span>
      </a>

      <h2 class="section-title">Play</h2>
      ${done ? '' : '<p class="tip">Tip: do the tutorial first, then pick a game.</p>'}
      <div class="modes">${cards}</div>
      ${randomCard()}

      ${avatarSection(fresh)}

      <footer class="foot">COS212 app prototype · 404: Name Not Found · COS750 2026</footer>
    </div>`;
  wireAvatarPicker(root);
  return () => {};
}

(function router() {
  const app = document.getElementById('app');
  let cleanup = () => {};

  function route() {
    cleanup();
    const path = location.hash.replace(/^#/, '') || '/';
    const play = path.match(/^\/play\/(pre|in|post)$/);
    if (path === '/play/random') {
      cleanup = mountRandom(app);
      document.title = 'Random Order · Tree Hop';
    } else if (play) {
      cleanup = mountGame(app, play[1]);
      document.title = `${Tree.MODES[play[1]].name} · Tree Hop`;
    } else if (path === '/tutorial') {
      cleanup = mountTutorial(app);
      document.title = 'Tutorial · Tree Hop';
    } else {
      cleanup = mountHome(app);
      document.title = 'Tree Hop';
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();
})();
