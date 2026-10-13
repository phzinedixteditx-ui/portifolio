/**
 * NEXA TELECOM — UI & Stage Transitions Engine
 */

let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

document.addEventListener('DOMContentLoaded', () => {
  initStudioCursor();
  initAmbientNebula();
  initScrollStageReveals();
  initNavbar();
  initCoverageChecker();
});

/* -------------------------------------------------------------
 * 1. Studio Minimalist Magnetic Cursor
 * ----------------------------------------------------------- */
function initStudioCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Hide on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth lerp loop for the trailing ring
  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursorRing);
  }
  renderCursorRing();

  // Magnetic hover state over interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, .plan-editorial-card, .spec-row');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}

/* -------------------------------------------------------------
 * 2. Ambient Deep Nebula Follower
 * ----------------------------------------------------------- */
function initAmbientNebula() {
  const nebula = document.getElementById('ambient-nebula');
  if (!nebula) return;

  let mouseX = window.innerWidth * 0.6;
  let mouseY = window.innerHeight * 0.4;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderNebula() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    nebula.style.left = `${currentX}px`;
    nebula.style.top = `${currentY}px`;

    requestAnimationFrame(renderNebula);
  }
  renderNebula();
}

/* -------------------------------------------------------------
 * 3. Stage Transitions Engine (Scroll-Driven Reveal)
 * ----------------------------------------------------------- */
function initScrollStageReveals() {
  const stages = document.querySelectorAll('.reveal-stage');
  if (!stages.length) return;

  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  stages.forEach(stage => stageObserver.observe(stage));
}

/* -------------------------------------------------------------
 * 4. Minimalist Navbar Scroll Effect
 * ----------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      menu.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        burger.classList.remove('is-open');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* -------------------------------------------------------------
 * 5. High-End Single-Line Coverage Checker
 * ----------------------------------------------------------- */
function initCoverageChecker() {
  const cepInput = document.getElementById('cep-input');
  const checkBtn = document.getElementById('btn-check-cep');
  const resultBox = document.getElementById('cep-result');

  if (!cepInput || !checkBtn || !resultBox) return;

  // Mask CEP: 00000-000
  cepInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);
    if (val.length > 5) {
      val = val.substring(0, 5) + '-' + val.substring(5);
    }
    e.target.value = val;
  });

  cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkBtn.click();
  });

  checkBtn.addEventListener('click', async () => {
    const rawCep = cepInput.value.replace(/\D/g, '');
    if (rawCep.length !== 8) {
      resultBox.innerHTML = `
        <div style="padding: 16px 20px; border: 1px solid rgba(255,255,255,0.15); color: #94a3b8; font-size: 0.9rem;">
          Digite um CEP válido com 8 dígitos para consultar a viabilidade.
        </div>
      `;
      resultBox.style.display = 'block';
      return;
    }

    checkBtn.disabled = true;
    checkBtn.innerText = 'Consultando...';
    resultBox.style.display = 'none';

    try {
      const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
      const data = await res.json();

      if (data.erro) throw new Error('CEP não encontrado');

      const logradouro = data.logradouro ? `${data.logradouro}, ${data.bairro}` : data.bairro || 'sua região';
      const cidadeUf = `${data.localidade} — ${data.uf}`;

      resultBox.innerHTML = `
        <div class="cep-status-success">
          <div style="font-size: 0.76rem; letter-spacing: 0.12em; color: #10b981; margin-bottom: 6px; font-weight: 700;">
            ● COBERTURA DE FIBRA MONOMODO CONFIRMADA
          </div>
          <h4>${logradouro}</h4>
          <p>${cidadeUf}</p>
          <a href="https://wa.me/5511999999999?text=${encodeURIComponent('Olá NEXA! Consultei a viabilidade do meu CEP (' + cepInput.value + ' em ' + logradouro + ') e gostaria de agendar a instalação da fibra.')}" target="_blank">
            Agendar instalação técnica via WhatsApp →
          </a>
        </div>
      `;
    } catch (err) {
      resultBox.innerHTML = `
        <div class="cep-status-success">
          <div style="font-size: 0.76rem; letter-spacing: 0.12em; color: #10b981; margin-bottom: 6px; font-weight: 700;">
            ● INFRAESTRUTURA NEXA DISPONÍVEL
          </div>
          <h4>CEP ${cepInput.value} verificado</h4>
          <p>Rede subterrânea ativa com suporte até 1.000 Mbps.</p>
          <a href="https://wa.me/5511999999999?text=${encodeURIComponent('Olá NEXA! Gostaria de consultar a instalação de fibra para o CEP ' + cepInput.value)}" target="_blank">
            Falar com a engenharia NEXA →
          </a>
        </div>
      `;
    } finally {
      checkBtn.disabled = false;
      checkBtn.innerText = 'Consultar';
      resultBox.style.display = 'block';
    }
  });
}
