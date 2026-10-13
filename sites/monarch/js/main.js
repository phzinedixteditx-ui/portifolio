const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ---------- Lenis Smooth Scroll ---------- */
const lenis = new Lenis({
  duration: 1.25,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});
lenis.stop();

/* ---------- Elementos & Interação ---------- */
const progress = $('#progress');
const parallaxImgs = $$('[data-parallax]');

/* ---------- Loop de Animação e Parallax Editorial ---------- */
function tick(now) {
  requestAnimationFrame(tick);
  lenis.raf(now);

  // Barra de progresso do scroll no topo
  if (progress) {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    progress.style.width = clamp(pct, 0, 100) + '%';
  }

  // Parallax sutil apenas nas imagens do editorial (sem zoom no hero)
  const vh = innerHeight;
  for (const img of parallaxImgs) {
    const parent = img.parentElement;
    if (!parent) continue;
    const r = parent.getBoundingClientRect();
    if (r.bottom < -80 || r.top > vh + 80) continue;
    const k = (r.top + r.height / 2 - vh / 2) / vh;
    img.style.transform = `translateY(${k * -8}%) scale(1.15)`;
  }
}

/* ---------- UI & Menu ---------- */
const menu = document.body;
const menuBtn = $('#menuBtn');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    menu.classList.contains('menu-open') ? lenis.stop() : lenis.start();
  });
}

$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  const t = id === '#top' ? 0 : $(id);
  if (t === null) return;
  e.preventDefault();
  if (menu.classList.contains('menu-open')) {
    menu.classList.remove('menu-open');
    lenis.start();
  }
  lenis.scrollTo(t, { duration: 1.8, offset: 0 });
}));

/* ---------- Revelações por Scroll (Intersection Observer) ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    io.unobserve(entry.target);
    $$('[data-count]', entry.target).forEach(counter => {
      const end = +counter.dataset.count;
      const s = performance.now();
      (function step(now) {
        const k = clamp((now - s) / 1800);
        counter.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      })(s);
    });
  });
}, { threshold: 0.15 });

$$('[data-reveal]').forEach(el => io.observe(el));

/* ---------- Preloader Sofisticado Estilo Feadship ---------- */
const bar = $('#preBar');
const cnt = $('#preCount');
let loaded = document.readyState === 'complete';
if (!loaded) addEventListener('load', () => loaded = true);
setTimeout(() => loaded = true, 1600); // Garante conclusão mesmo se 'load' já disparou

const t0 = performance.now();
let shown = 0;

(function pre() {
  const target = loaded ? 100 : 90;
  const minT = clamp((performance.now() - t0) / 1200);
  shown = Math.min(shown + (target - shown) * 0.1, minT * 100);
  if (loaded && minT >= 1) shown = 100;
  if (bar) bar.style.width = shown + '%';
  if (cnt) cnt.textContent = String(Math.round(shown)).padStart(3, '0');

  if (shown < 99.5) return requestAnimationFrame(pre);

  if (bar) bar.style.width = '100%';
  if (cnt) cnt.textContent = '100';

  setTimeout(() => {
    const preloader = $('#preloader');
    if (preloader) preloader.classList.add('done');
    document.body.classList.remove('is-loading');
    lenis.start();
    setTimeout(() => {
      if (preloader) preloader.remove();
    }, 1200);
  }, 180);
})();

requestAnimationFrame(tick);
