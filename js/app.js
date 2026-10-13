/**
 * MATHEUS FELIPE — PORTFÓLIO AUTORAL INTERACTION ENGINE
 * Rolagem Fluida Lenis Smooth Scroll a 60fps/120fps (Zero Stutter)
 */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Motor de Rolagem Fluida (Lenis Smooth Scroll Engine)
  // ------------------------------------------------------------------------
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ------------------------------------------------------------------------
  // 2. Barra de Progresso no Topo & Header Dinâmico
  // ------------------------------------------------------------------------
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Pré-calcula posições das seções para evitar reflows síncronos no scroll
  let cachedOffsets = [];
  function updateCachedOffsets() {
    cachedOffsets = Array.from(sections).map(sec => ({
      id: sec.getAttribute('id'),
      top: sec.offsetTop - 140,
      bottom: sec.offsetTop + sec.offsetHeight - 140
    }));
  }

  window.addEventListener('resize', updateCachedOffsets, { passive: true });
  window.addEventListener('load', updateCachedOffsets, { passive: true });
  updateCachedOffsets();

  function onScrollUpdate(scrollY, maxScroll) {
    if (progressBar && maxScroll > 0) {
      progressBar.style.width = `${(scrollY / maxScroll) * 100}%`;
    }

    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    let activeId = '';
    for (let i = 0; i < cachedOffsets.length; i++) {
      if (scrollY >= cachedOffsets[i].top && scrollY < cachedOffsets[i].bottom) {
        activeId = cachedOffsets[i].id;
        break;
      }
    }

    navLinks.forEach(link => {
      if (link.getAttribute('data-section') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Desativa pointer-events nos iframes durante a rolagem para zero lag
  let scrollTimeout = null;
  function handleScrollMotion() {
    document.body.classList.add('is-scrolling');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 120);
  }

  if (lenis) {
    lenis.on('scroll', (e) => {
      handleScrollMotion();
      onScrollUpdate(e.scroll, e.limit);
    });
  } else {
    window.addEventListener('scroll', () => {
      handleScrollMotion();
      const scrollY = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      onScrollUpdate(scrollY, maxScroll);
    }, { passive: true });
  }

  // Rolagem suave para links internos através do Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(target, { offset: -70, duration: 1.1 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. Scroll Reveal com IntersectionObserver
  // ------------------------------------------------------------------------
  const revealBlocks = document.querySelectorAll('.reveal-block');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealBlocks.forEach(el => revealObserver.observe(el));
  } else {
    revealBlocks.forEach(el => el.classList.add('is-visible'));
  }

  // ------------------------------------------------------------------------
  // 4. Molduras dos Dispositivos (100% Nativas, Sem Transform Scale)
  // ------------------------------------------------------------------------
  const frames = document.querySelectorAll('.frame');

  frames.forEach(frame => {
    const section = frame.closest('.work');
    const screen = frame.querySelector('.screen');
    const iframe = frame.querySelector('iframe');
    const shield = frame.querySelector('.shield');
    const releaseBar = frame.querySelector('.release-scroll-bar');

    // Alternar entre modo Computador e Celular
    section.querySelectorAll('.switch button').forEach(btn => {
      btn.addEventListener('click', () => {
        section.querySelectorAll('.switch button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mobile = btn.dataset.mode === 'mobile';
        frame.classList.toggle('is-mobile', mobile);

        showToast(mobile ? 'Visualização Mobile (380 × 700)' : 'Visualização Desktop (Tela Cheia)');
      });
    });

    // FOCO INTELIGENTE: Ao clicar para interagir, a tela foca e centraliza suavemente
    if (shield) {
      shield.addEventListener('click', () => {
        document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.frame.is-focused').forEach(f => f.classList.remove('is-focused'));

        screen.classList.add('active');
        frame.classList.add('is-focused');

        // Centraliza a moldura na tela com rolagem aveludada do Lenis
        const headerHeight = header ? header.offsetHeight : 62;
        const rect = frame.getBoundingClientRect();
        const availableHeight = window.innerHeight - headerHeight;
        const targetOffset = -headerHeight - Math.max(12, (availableHeight - rect.height) / 2);

        if (lenis) {
          lenis.scrollTo(frame, { offset: targetOffset, duration: 1.0 });
        } else {
          window.scrollTo({
            top: Math.max(0, window.pageYOffset + rect.top + targetOffset),
            behavior: 'smooth'
          });
        }

        // Foca o iframe para navegação imediata
        setTimeout(() => {
          try {
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.focus();
            }
          } catch (err) {}
        }, 320);

        showToast('Site em foco interativo. Role para navegar.');
      });
    }

    // Botão de liberar rolagem da página
    if (releaseBar) {
      releaseBar.addEventListener('click', (e) => {
        e.stopPropagation();
        screen.classList.remove('active');
        frame.classList.remove('is-focused');
        showToast('Rolagem da página liberada');
      });
    }

    // Sair com o mouse devolve o controle suavemente
    screen.addEventListener('mouseleave', () => {
      setTimeout(() => {
        screen.classList.remove('active');
        frame.classList.remove('is-focused');
      }, 400);
    });

    // Lazy Loading do Iframe
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && iframe.dataset.src && !iframe.src) {
            iframe.src = iframe.dataset.src;
            io.disconnect();
          }
        });
      }, { rootMargin: '600px 0px' });
      io.observe(frame);
    } else {
      iframe.src = iframe.dataset.src;
    }
  });

  // Toque fora desativa interação em telas touch
  document.addEventListener('touchstart', (e) => {
    document.querySelectorAll('.screen.active').forEach(s => {
      if (!s.contains(e.target)) {
        s.classList.remove('active');
        const f = s.closest('.frame');
        if (f) f.classList.remove('is-focused');
      }
    });
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 5. Botões de Recarregar com Animação de Giro
  // ------------------------------------------------------------------------
  const reloadButtons = document.querySelectorAll('[data-reload]');
  reloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-reload');
      const iframe = document.getElementById(targetId);
      if (iframe) {
        btn.classList.add('is-spinning');
        const currentSrc = iframe.src || iframe.getAttribute('data-src');
        iframe.src = '';
        iframe.src = currentSrc;
        showToast('Reiniciando abertura do projeto...');

        setTimeout(() => {
          btn.classList.remove('is-spinning');
        }, 800);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. Botão de Copiar Telefone & Toast Apple
  // ------------------------------------------------------------------------
  const copyBtn = document.getElementById('btn-copy-contact');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const phone = '+55 31 97188-0711';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('WhatsApp copiado: (31) 97188-0711');
      }).catch(() => {
        showToast('Contato: (31) 97188-0711');
      });
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('apple-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'apple-toast';
      toast.className = 'apple-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

})();
