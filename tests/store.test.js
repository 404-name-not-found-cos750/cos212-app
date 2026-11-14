// Unit tests for loading saved progress (Store in app/js/main.js).
//
// main.js is a browser script: it reads localStorage when it loads and then
// draws the home page. We run it in a Node `vm` context together with the
// scripts it needs (tree.js, game.js, random.js), with a fake localStorage
// and just enough of `document`, `window` and `location` for the home page.
//
// Run with: npm test

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const KEY = 'cos212-tree-hop-v1';
const read = (f) => fs.readFileSync(path.join(__dirname, '..', 'app', 'js', f), 'utf8');
const SCRIPTS = ['tree.js', 'game.js', 'random.js', 'main.js'].map((f) => ({ f, src: read(f) }));

// Loads the app with `saved` as the raw localStorage value (a string, or null
// for "nothing saved"). Returns the Store, the fake storage and the page.
function boot(saved, { blocked = false } = {}) {
  const items = new Map();
  if (saved !== null) items.set(KEY, saved);
  const localStorage = {
    getItem(k) {
      if (blocked) throw new Error('storage blocked');
      return items.has(k) ? items.get(k) : null;
    },
    setItem(k, v) {
      if (blocked) throw new Error('storage blocked');
      items.set(k, String(v));
    },
  };
  const app = { innerHTML: '' };
  const context = vm.createContext({
    localStorage,
    document: { getElementById: () => app, title: '' },
    window: { addEventListener() {}, scrollTo() {} },
    location: { hash: '' },
  });
  for (const { f, src } of SCRIPTS) vm.runInContext(src, context, { filename: f });
  return { Store: vm.runInContext('Store', context), items, app };
}

// Copy vm-made arrays into plain arrays before deepEqual.
const plain = (x) => JSON.parse(JSON.stringify(x));
const ZERO = { pre: [0, 0, 0, 0, 0], in: [0, 0, 0, 0, 0], post: [0, 0, 0, 0, 0] };
const KINDS = ['pre', 'in', 'post', 'random'];

function assertFresh(Store, app) {
  assert.deepEqual(plain(Store.progress()), ZERO);
  for (const k of KINDS) assert.equal(Store.best(k), 0);
  assert.equal(Store.tutorialDone(), false);
  assert.match(app.innerHTML, /Tree Hop/, 'home page was drawn');
}

describe('Loading saved progress', () => {
  test('nothing saved gives a fresh start', () => {
    const { Store, app } = boot(null);
    assertFresh(Store, app);
  });

  test('blocked storage gives a fresh start and progress still works for this visit', () => {
    const { Store, app } = boot(null, { blocked: true });
    assertFresh(Store, app);
    Store.saveStars('pre', 0, 3);
    assert.equal(Store.progress().pre[0], 3);
  });

  test('invalid JSON gives a fresh start', () => {
    for (const bad of ['{', 'oops', '{"stars":', '']) {
      const { Store, app } = boot(bad);
      assertFresh(Store, app);
    }
  });

  test('JSON that is not an object (string, number, array, null, boolean) gives a fresh start', () => {
    for (const bad of ['"oops"', '42', '[]', '[1,2,3]', 'null', 'true']) {
      const { Store, app } = boot(bad);
      assertFresh(Store, app);
    }
  });

  test('stars and best that are the wrong type are reset', () => {
    for (const bad of [{ stars: 'x', best: 5 }, { stars: [], best: [] }, { stars: null, best: null }]) {
      const { Store, app } = boot(JSON.stringify(bad));
      assertFresh(Store, app);
    }
  });

  test('star values are clamped to whole numbers from 0 to 3', () => {
    const { Store } = boot(JSON.stringify({
      stars: { pre: [4, -1, 2.7, '3', null], in: [99, 'x', true, -0.5, 1], post: [NaN, {}, [], 3, 0] },
    }));
    assert.deepEqual(plain(Store.progress()), {
      pre: [3, 0, 2, 3, 0],
      in: [3, 0, 1, 0, 1],
      post: [0, 0, 0, 3, 0],
    });
  });

  test('star lists of the wrong length, or not lists, are reset to zero', () => {
    const { Store } = boot(JSON.stringify({ stars: { pre: [3, 3, 3], in: [3, 3, 3, 3, 3, 3], post: 'all' } }));
    assert.deepEqual(plain(Store.progress()), ZERO);
  });

  test('best scores that are negative, fractional, text or missing are fixed', () => {
    const { Store } = boot(JSON.stringify({ best: { pre: -4, in: 7.9, post: 'lots' } }));
    assert.equal(Store.best('pre'), 0);
    assert.equal(Store.best('in'), 7);
    assert.equal(Store.best('post'), 0);
    assert.equal(Store.best('random'), 0);
  });

  test('a huge best score stays a finite number', () => {
    const { Store } = boot('{"best":{"random":1e400}}'); // 1e400 parses as Infinity
    assert.ok(Number.isFinite(Store.best('random')));
  });

  test('tutorialDone only counts when it is exactly true', () => {
    for (const v of ['"yes"', '1', '"true"', '{}', 'null']) {
      const { Store } = boot(`{"tutorialDone":${v}}`);
      assert.equal(Store.tutorialDone(), false, `tutorialDone: ${v}`);
    }
    assert.equal(boot('{"tutorialDone":true}').Store.tutorialDone(), true);
  });

  test('valid saved data loads and saves back unchanged', () => {
    const data = {
      stars: { pre: [3, 3, 3, 3, 3], in: [3, 2, 1, 0, 0], post: [3, 3, 3, 3, 2] },
      best: { random: 120, pre: 6, in: 0, post: 11 },
      tutorialDone: true,
    };
    const { Store, items } = boot(JSON.stringify(data));
    assert.deepEqual(plain(Store.progress()), data.stars);
    for (const k of KINDS) assert.equal(Store.best(k), data.best[k]);
    assert.equal(Store.tutorialDone(), true);
    Store.markTutorialDone(); // writes the loaded data back to storage
    assert.deepEqual(JSON.parse(items.get(KEY)), data);
  });

  test('the demo seed snippet loads as written', () => {
    const seed = { stars: { pre: [3, 3, 3, 3, 3], in: [3, 3, 3, 3, 3], post: [3, 3, 3, 3, 2] }, best: { random: 0, pre: 0, in: 0, post: 0 }, tutorialDone: true };
    const { Store, app } = boot(JSON.stringify(seed));
    assert.deepEqual(plain(Store.progress()), seed.stars);
    assert.match(app.innerHTML, /random-card" href="#\/play\/random"/, 'Random Order is unlocked on the home page');
  });

  test('a bad entry is replaced the next time progress is saved', () => {
    const { Store, items } = boot('"oops"');
    Store.saveStars('in', 0, 2);
    const saved = JSON.parse(items.get(KEY));
    assert.deepEqual(saved.stars.in, [2, 0, 0, 0, 0]);
    assert.equal(saved.tutorialDone, false);
  });
});
