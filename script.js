(() => {
  const MAX_HITS = 15;
  const HIT_MS = 800;                 // keep in sync with --hit-time in style.css
  const IMPACT_MS = HIT_MS * 0.45;    // moment the club lands

  const hitter = document.getElementById('hitter');
  const target = document.getElementById('target');
  const fill = document.getElementById('healthFill');
  const bar = target.querySelector('.health');
  const message = document.getElementById('message');
  const restart = document.getElementById('restart');

  document.documentElement.style.setProperty('--hit-time', HIT_MS + 'ms');

  let hits = 0, busy = false, over = false;

  function updateHealth() {
    const pct = ((MAX_HITS - hits) / MAX_HITS) * 100;
    fill.style.width = pct + '%';
    fill.style.backgroundColor = pct > 60 ? '#4cd964' : pct > 30 ? '#ffcc00' : '#ff3b30';
    bar.setAttribute('aria-valuenow', MAX_HITS - hits);
  }

  function swing(e) {
    e.preventDefault();
    if (busy || over) return;
    busy = true;
    hitter.classList.remove('hit');
    target.classList.remove('hurt');
    void hitter.offsetWidth;          // restart animation
    hitter.classList.add('hit');
    target.classList.add('hurt');

    setTimeout(() => {
      hits++;
      updateHealth();
      if (hits >= MAX_HITS) {
        over = true;
        message.textContent = 'You win! 🎉';
        message.classList.add('win');
        restart.hidden = false;
      }
    }, IMPACT_MS);

    setTimeout(() => {
      hitter.classList.remove('hit');
      target.classList.remove('hurt');
      busy = false;
    }, HIT_MS);
  }

  function reset() {
    hits = 0; over = false;
    updateHealth();
    message.textContent = 'Tap the left caveman to hit!';
    message.classList.remove('win');
    restart.hidden = true;
  }

  hitter.addEventListener('pointerdown', swing);
  restart.addEventListener('click', reset);
  updateHealth();
})();
