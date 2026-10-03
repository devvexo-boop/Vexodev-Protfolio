/**
 * VEXO DEV - MAIN APPLICATION CONTROLLER
 * Ambient lighting, interactions, skills tabs, stats counters, accordion, and global toast.
 */

(function () {
  // ==========================================
  // 1. Toast Notification System
  // ==========================================
  const toastBox = document.getElementById('toast-box');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  window.showToast = function (msg) {
    if (!toastBox || !toastMessage) return;
    toastMessage.textContent = msg;
    toastBox.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 3200);
  };

  // ==========================================
  // 2. Interactive Cursor Light Glow
  // ==========================================
  const cursorGlow = document.querySelector('.cursor-light-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // ==========================================
  // 3. Navbar Sticky Blur & Mobile Toggle
  // ==========================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 4. FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================
  // 5. Discord Tag Copy Buttons
  // ==========================================
  const discordCopyBtns = document.querySelectorAll('.btn-copy-discord');
  discordCopyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const discordTag = btn.dataset.discord || "vexodev.";
      navigator.clipboard.writeText(discordTag).then(() => {
        window.playSfx('chime');
        window.showToast(`Discord handle "${discordTag}" copied to clipboard!`);
      }).catch(() => {
        window.playSfx('chime');
        window.showToast(`Discord handle: ${discordTag}`);
      });
    });
  });

  // ==========================================
  // 6. Technical Skills Tab Switcher
  // ==========================================
  window.switchTab = function (tabName, btnElement) {
    window.playSfx('click');
    document.querySelectorAll('.stab').forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
      btnElement.classList.add('active');
    }

    document.querySelectorAll('.skills-tab-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    const activePanel = document.getElementById(`tab-${tabName}`);
    if (activePanel) {
      activePanel.classList.remove('hidden');
      if (tabName === 'bars') {
        animateProfBars();
      }
    }
  };

  function animateProfBars() {
    document.querySelectorAll('.prof-fill').forEach(bar => {
      const width = bar.dataset.w || '0';
      bar.style.width = `${width}%`;
    });
  }

  // ==========================================
  // 7. Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.querySelector('.prof-fill')) {
          animateProfBars();
        }
      }
    });
  }, { threshold: 0.15 });

  // ==========================================
  // 8. 3D Model Card View Switcher (Render / Wireframe / Viewport)
  // ==========================================
  window.setModelView = function (btnElement, wrapId, mode) {
    if (typeof window.playSfx === 'function') window.playSfx('click');
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    wrap.querySelectorAll('.mv-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    wrap.querySelectorAll('.model-img-layer').forEach(img => img.classList.remove('active'));

    let target = wrap.querySelector(`.img-${mode}`);
    if (!target && mode === 'shaded') target = wrap.querySelector('.img-render');
    if (!target && mode === 'render') target = wrap.querySelector('.img-shaded');
    if (!target && mode === 'wireframe') target = wrap.querySelector('.img-wireframe');
    if (!target && mode === 'viewport') target = wrap.querySelector('.img-viewport') || wrap.querySelector('.img-wireframe');

    if (target) {
      target.classList.add('active');
    }
  };

  // ==========================================
  // 9. Scroll Progress Indicator (Serieko Inspired)
  // ==========================================
  const scrollProgressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ==========================================
  // 10. Hero 3D Collage Spring Bounce (Interactive Showcase)
  // ==========================================
  const heroBounceBtn = document.getElementById('hero-bounce-btn');
  if (heroBounceBtn) {
    heroBounceBtn.addEventListener('click', () => {
      const cards = document.querySelectorAll('.hero-scene-wrap .collage-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.remove('bounce-active');
          void card.offsetWidth; // trigger reflow
          card.classList.add('bounce-active');
          setTimeout(() => card.classList.remove('bounce-active'), 950);
        }, i * 85);
      });
      if (typeof window.showToast === 'function') {
        window.showToast("⚡ Showcase energized!");
      }
    });
  }

  // ==========================================
  // 11. 3D Model Category Filter Toolbar
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modelCards = document.querySelectorAll('.modelling-showcase-grid .model-showcase-card');
  if (filterBtns.length > 0 && modelCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.dataset.filter || 'all';

        modelCards.forEach(card => {
          const cardCat = card.dataset.category || 'all';
          if (filterVal === 'all' || cardCat === filterVal) {
            card.classList.remove('filtered-out');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 30);
          } else {
            card.classList.add('filtered-out');
          }
        });
      });
    });
  }

  // ==========================================
  // Audio SFX Engine (Web Audio API - Pure Synthetic)
  // ==========================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.playSfx = function(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'flip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {
      // Audio not permitted or unsupported, fail gracefully
    }
  };

  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '<span>🔊 SFX ON</span>' : '<span>🔇 SFX OFF</span>';
      if (soundEnabled) window.playSfx('click');
      window.showToast(soundEnabled ? 'Audio feedback enabled' : 'Audio muted');
    });
  }

  // ==========================================
  // Interactive Constellation Network Canvas (Falnox Inspired)
  // ==========================================
  const canvas = document.getElementById('networkCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    const particleCount = Math.min(45, Math.floor(width / 36));
    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    function renderNetwork() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - mdist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(renderNetwork);
    }
    requestAnimationFrame(renderNetwork);
  }

  // ==========================================
  // Architecture Flip Card Controller (Falnox Inspired)
  // ==========================================
  window.toggleArchFlip = function(btnElement) {
    const card = btnElement.closest('.system-flip-card');
    if (!card) return;
    card.classList.toggle('flipped');
    window.playSfx('flip');
  };

  // ==========================================
  // Commission Scope & Quote Builder (Koze & Falnox Inspired)
  // ==========================================
  const serviceSelect = document.getElementById('calc-service');
  const speedSelect = document.getElementById('calc-speed');
  const quoteUSD = document.getElementById('quote-usd');
  const quoteRobux = document.getElementById('quote-robux');
  const btnBrief = document.getElementById('btn-copy-brief');

  const pricing = {
    'combat': { usd: '$120 - $220', rbx: '35K - 65K R$' },
    'movement': { usd: '$80 - $140', rbx: '25K - 40K R$' },
    'avatar': { usd: '$100 - $180', rbx: '30K - 55K R$' },
    'full-game': { usd: '$350 - $650+', rbx: '100K - 200K+ R$' },
    'optim': { usd: '$70 - $130', rbx: '20K - 38K R$' }
  };

  function updateQuote() {
    if (!serviceSelect || !quoteUSD || !quoteRobux) return;
    const s = serviceSelect.value || 'combat';
    const rate = pricing[s] || pricing['combat'];
    quoteUSD.textContent = rate.usd;
    quoteRobux.textContent = rate.rbx;
  }

  if (serviceSelect && speedSelect) {
    serviceSelect.addEventListener('change', () => {
      updateQuote();
      window.playSfx('click');
    });
    speedSelect.addEventListener('change', () => {
      window.playSfx('click');
    });
    updateQuote();
  }

  if (btnBrief) {
    btnBrief.addEventListener('click', () => {
      const serviceText = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Core System';
      const speedText = speedSelect ? speedSelect.options[speedSelect.selectedIndex].text : 'Standard Delivery';
      const brief = `Hey Vexo! I'd like to commission you for: ${serviceText} (${speedText}). Found your portfolio on https://devvexo-boop.github.io/Vexodev-Protfolio/`;
      navigator.clipboard.writeText(brief).then(() => {
        window.playSfx('chime');
        window.showToast("📋 Project brief copied! Paste into Discord DM.");
      });
    });
  }

  // ==========================================
  // Motion Toggle (Serieko Inspired)
  // ==========================================
  const motionToggle = document.getElementById('motion-toggle');
  if (motionToggle) {
    let motionPaused = false;
    motionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      motionPaused = !motionPaused;
      document.body.classList.toggle('reduce-motion', motionPaused);
      motionToggle.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
      if (typeof window.showToast === 'function') {
        window.showToast(motionPaused ? 'Reduced motion enabled' : 'Smooth motion restored');
      }
    });
  }
})();
