const ENDLESS_GOAL = 10;
const RANDOM_GOAL = 15;

const AVATARS = [
  { id: 'monkey', icon: '🐒', name: 'Monkey', goal: 'Your first climber', target: () => [1, 1, ''] },
  { id: 'parrot', icon: '🦜', name: 'Parrot', goal: 'Earn 10 stars', target: (s) => [s.stars, 10, '★'] },
  { id: 'frog', icon: '🐸', name: 'Tree frog', goal: 'Earn 20 stars', target: (s) => [s.stars, 20, '★'] },
  { id: 'sloth', icon: '🦥', name: 'Sloth', goal: 'Earn 30 stars', target: (s) => [s.stars, 30, '★'] },
  { id: 'orangutan', icon: '🦧', name: 'Orangutan', goal: 'Earn 40 stars', target: (s) => [s.stars, 40, '★'] },
  { id: 'gorilla', icon: '🦍', name: 'Gorilla', goal: 'Earn all 45 stars', target: (s) => [s.stars, 45, '★'] },
  { id: 'tiger', icon: '🐯', name: 'Tiger', goal: `Clear ${ENDLESS_GOAL} trees in one Endless run`, target: (s) => [s.endless, ENDLESS_GOAL, 'trees'] },
  { id: 'lion', icon: '🦁', name: 'Lion', goal: `Clear ${ENDLESS_GOAL} trees in Endless in all 3 orders`, target: (s) => [s.endlessOrders, 3, 'orders'] },
  { id: 'phoenix', icon: '🐦‍🔥', name: 'Phoenix', goal: `Clear ${RANDOM_GOAL} trees in one Random Order run`, target: (s) => [s.randomTrees, RANDOM_GOAL, 'trees'] },
  { id: 'dragon', icon: '🐉', name: 'Dragon', legendary: true, goal: 'Legendary: unlock every other avatar', target: (s) => [s.achievements, s.achievementsTotal, 'avatars'] },
];

function achievementStats() {
  const stats = {
    stars: totalStars(),
    endless: Math.max(...KINDS.map((k) => Store.best(k))),
    endlessOrders: KINDS.filter((k) => Store.best(k) >= ENDLESS_GOAL).length,
    randomTrees: Store.best('randomTrees'),
  };
  const others = AVATARS.filter((a) => a.id !== 'monkey' && !a.legendary);
  stats.achievementsTotal = others.length;
  stats.achievements = others.filter((a) => {
    const [have, need] = a.target(stats);
    return have >= need;
  }).length;
  return stats;
}

function avatarProgress(a, stats = achievementStats()) {
  const [have, need, unit] = a.target(stats);
  return { have: Math.min(have, need), need, unit, unlocked: have >= need };
}

function currentAvatar() {
  const a = AVATARS.find((x) => x.id === Store.avatar());
  return a && avatarProgress(a).unlocked ? a : AVATARS[0];
}

function claimNewAvatars() {
  const stats = achievementStats();
  const seen = Store.seenAvatars();
  const fresh = AVATARS.filter((a) => a.id !== 'monkey' && !seen.includes(a.id) && avatarProgress(a, stats).unlocked);
  if (fresh.length) Store.markAvatarsSeen(fresh.map((a) => a.id));
  return fresh;
}

function newAvatarNote(list) {
  if (!list.length) return '';
  const names = list.map((a) => `<b>${a.icon} ${a.name}</b>`).join(', ');
  return `<div class="avatar-unlock">
    <p class="icons" aria-hidden="true">${list.map((a) => a.icon).join(' ')}</p>
    <p><b>New avatar${list.length === 1 ? '' : 's'} unlocked:</b> ${names}. Choose ${list.length === 1 ? 'it' : 'one'} under Avatars on the home page.</p>
  </div>`;
}

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
