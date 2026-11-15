// Avatars: playable climbers unlocked by milestones (stars, endless runs, random
// order). The monkey is free; the dragon needs every other avatar.
// Unlocks aren't saved: they're worked out from the stars and scores in Store
// each time, so they can't get out of sync. Only which unlocks the student has
// already been told about is saved (seenAvatars).
const ENDLESS_GOAL = 10; // trees in one Endless run
const RANDOM_GOAL = 15;  // trees in one Random Order run

// target(stats) returns [have, need, unit] for the progress bar; the avatar is
// unlocked when have >= need. `vine` colours the vine when playing as it.
const AVATARS = [
  { id: 'monkey', icon: '🐒', name: 'Monkey', goal: 'Your first climber', target: () => [1, 1, ''] },
  { id: 'parrot', vine: '#e23d6d', icon: '🦜', name: 'Parrot', goal: 'Earn 10 stars', target: (s) => [s.stars, 10, '★'] },
  { id: 'frog', vine: '#6cc24a', icon: '🐸', name: 'Tree frog', goal: 'Earn 20 stars', target: (s) => [s.stars, 20, '★'] },
  { id: 'sloth', vine: '#8a9a2b', icon: '🦥', name: 'Sloth', goal: 'Earn 30 stars', target: (s) => [s.stars, 30, '★'] },
  { id: 'orangutan', vine: '#b5532a', icon: '🦧', name: 'Orangutan', goal: 'Earn 40 stars', target: (s) => [s.stars, 40, '★'] },
  { id: 'gorilla', vine: '#8a8f98', icon: '🦍', name: 'Gorilla', goal: 'Earn all 45 stars', target: (s) => [s.stars, 45, '★'] },
  { id: 'tiger', vine: '#f28c18', icon: '🐯', name: 'Tiger', goal: `Clear ${ENDLESS_GOAL} trees in one Endless run`, target: (s) => [s.endless, ENDLESS_GOAL, 'trees'] },
  { id: 'lion', vine: '#d9b21c', icon: '🦁', name: 'Lion', goal: `Clear ${ENDLESS_GOAL} trees in Endless in all 3 orders`, target: (s) => [s.endlessOrders, 3, 'orders'] },
  { id: 'phoenix', vine: '#e8341c', icon: '🐦‍🔥', name: 'Phoenix', goal: `Clear ${RANDOM_GOAL} trees in one Random Order run`, target: (s) => [s.randomTrees, RANDOM_GOAL, 'trees'] },
  { id: 'dragon', vine: '#22a88a', icon: '🐉', name: 'Dragon', legendary: true, goal: 'Legendary: unlock every other avatar', target: (s) => [s.achievements, s.achievementsTotal, 'avatars'] },
];

// Everything the avatar goals are measured against, read from saved progress.
function achievementStats() {
  const stats = {
    stars: totalStars(),
    endless: Math.max(...KINDS.map((k) => Store.best(k))),
    endlessOrders: KINDS.filter((k) => Store.best(k) >= ENDLESS_GOAL).length,
    randomTrees: Store.best('randomTrees'),
  };
  // For the legendary dragon: how many of the other unlockable avatars are done.
  // Counted after the stats above are filled in, because their goals use them.
  const others = AVATARS.filter((a) => a.id !== 'monkey' && !a.legendary);
  stats.achievementsTotal = others.length;
  stats.achievements = others.filter((a) => {
    const [have, need] = a.target(stats);
    return have >= need;
  }).length;
  return stats;
}

// Progress towards one avatar, capped at its goal for the progress bar.
function avatarProgress(a, stats = achievementStats()) {
  const [have, need, unit] = a.target(stats);
  return { have: Math.min(have, need), need, unit, unlocked: have >= need };
}

// The chosen avatar, or the monkey if the saved choice is unknown or not unlocked.
function currentAvatar() {
  const a = AVATARS.find((x) => x.id === Store.avatar());
  return a && avatarProgress(a).unlocked ? a : AVATARS[0];
}

// Avatars unlocked since the student last saw them. Marks them as seen, so each
// "New avatar unlocked" message appears once (end-of-level modal or home page).
function claimNewAvatars() {
  const stats = achievementStats();
  const seen = Store.seenAvatars();
  const fresh = AVATARS.filter((a) => a.id !== 'monkey' && !seen.includes(a.id) && avatarProgress(a, stats).unlocked);
  if (fresh.length) Store.markAvatarsSeen(fresh.map((a) => a.id));
  return fresh;
}

// HTML announcing newly unlocked avatars ('' when there are none).
function newAvatarNote(list) {
  if (!list.length) return '';
  const names = list.map((a) => `<b>${a.icon} ${a.name}</b>`).join(', ');
  return `<div class="avatar-unlock">
    <p class="icons" aria-hidden="true">${list.map((a) => a.icon).join(' ')}</p>
    <p><b>New avatar${list.length === 1 ? '' : 's'} unlocked:</b> ${names}. Choose ${list.length === 1 ? 'it' : 'one'} under Avatars on the home page.</p>
  </div>`;
}

// The Avatars grid on the home page: unlocked ones can be picked, locked ones
// show their goal and a progress bar. `fresh` get a "New!" tag.
function avatarSection(fresh) {
  const stats = achievementStats();
  const current = currentAvatar().id;
  const unlockedCount = AVATARS.filter((a) => avatarProgress(a, stats).unlocked).length;
  const items = AVATARS.map((a) => {
    const p = avatarProgress(a, stats);
    const isNew = fresh.some((f) => f.id === a.id);
    const status = p.unlocked
      ? `<small class="status">${a.id === current ? 'Playing as' : 'Tap to play as'}</small>`
      : `<div class="unlock-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${p.need}" aria-valuenow="${p.have}" aria-label="${a.goal}"><span style="width:${Math.round((p.have / p.need) * 100)}%"></span></div>
         <small class="status">${p.have}/${p.need} ${p.unit}</small>`;
    return `<button type="button" class="avatar${a.legendary ? ' legendary' : ''}" data-avatar="${a.id}" ${p.unlocked ? `aria-pressed="${a.id === current}"` : 'disabled'}
        aria-label="${a.name}. ${p.unlocked ? 'Unlocked' : `Locked: ${a.goal}, ${p.have} of ${p.need}`}">
      ${isNew ? '<span class="new-tag">New!</span>' : ''}
      <span class="icon" aria-hidden="true">${a.icon}</span>
      <span class="name">${a.name}</span>
      <small>${p.unlocked ? a.goal : `🔒 ${a.goal}`}</small>
      ${status}
    </button>`;
  }).join('');
  return `
    <h2 class="section-title">Avatars <small class="count">${unlockedCount}/${AVATARS.length} unlocked</small></h2>
    <p class="tip">Reach milestones to unlock new climbers. Pick one and it hops around the trees instead of the monkey.</p>
    <div class="avatars">${items}</div>`;
}

// Makes the avatar buttons work: save the choice and update the page in place
// (no full re-render, so keyboard focus stays on the button).
function wireAvatarPicker(root) {
  root.querySelectorAll('.avatar:not(:disabled)').forEach((b) => {
    b.addEventListener('click', () => {
      Store.setAvatar(b.dataset.avatar);
      root.querySelectorAll('.avatar:not(:disabled)').forEach((x) => {
        const on = x === b;
        x.setAttribute('aria-pressed', on);
        x.querySelector('.status').textContent = on ? 'Playing as' : 'Tap to play as';
      });
      const logo = root.querySelector('.hero .logo');
      if (logo) logo.textContent = `${currentAvatar().icon}🌳`;
    });
  });
}
