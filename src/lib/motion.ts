// Scroll-driven motion: reveals and hero parallax. No dependencies.
// Hidden/visible states live in src/styles/global.css; this only toggles `.is-in`.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const REVEAL = [
  '.card',
  '.head__title',
  '.head__intro',
  '.head__line',
  '.head-line',
  '.focus__label',
  '.focus__grid li',
  '.directions__list li',
  '.contact__row',
  '.detail__head > *',
  '.detail__media',
  '.detail__section',
  '.detail__next',
].join(',');

function reveal() {
  const items = document.querySelectorAll<HTMLElement>(REVEAL);
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      // Items arriving together are staggered, so a row of tiles cascades.
      const arriving = entries.filter((e) => e.isIntersecting);
      arriving.forEach((entry, i) => {
        const el = entry.target as HTMLElement;
        el.style.transitionDelay = `${Math.min(i, 5) * 110}ms`;
        el.classList.add('is-in');
        // Don't let the stagger delay later hover transitions.
        setTimeout(() => (el.style.transitionDelay = ''), 2400);
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

function heroParallax() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero || reduced) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const p = Math.min(Math.max(scrollY / hero.offsetHeight, 0), 1);
    hero.style.setProperty('--p', p.toFixed(3));
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

reveal();
heroParallax();
