// Custom cursor: a dot that tracks the pointer exactly and a ring that trails it.
// Only runs for a real mouse (hover + fine pointer); touch devices keep their normal behaviour.
// Styles live in src/styles/global.css (.cursor-*).

const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (fine) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring, dot);

  let x = -100;
  let y = -100;
  let rx = x;
  let ry = y;
  let shown = false;
  let raf = 0;

  const INTERACTIVE = 'a, button, summary, [role="button"], label';

  const render = () => {
    // Trail the pointer; with reduced motion the ring snaps to it instead.
    const k = reduced ? 1 : 0.18;
    rx += (x - rx) * k;
    ry += (y - ry) * k;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(render) : 0;
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        // First movement: appear in place instead of flying in from the corner.
        rx = x;
        ry = y;
        shown = true;
        root.classList.add('has-cursor');
      }
      const target = e.target as Element | null;
      root.classList.toggle('cursor-link', !!target?.closest?.(INTERACTIVE));
      kick();
    },
    { passive: true },
  );

  addEventListener('pointerdown', () => root.classList.add('cursor-down'));
  addEventListener('pointerup', () => root.classList.remove('cursor-down'));
  document.addEventListener('mouseleave', () => root.classList.remove('has-cursor'));
  document.addEventListener('mouseenter', () => shown && root.classList.add('has-cursor'));
}
