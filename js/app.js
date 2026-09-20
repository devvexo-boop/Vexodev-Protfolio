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
        window.showToast(`Discord handle "${discordTag}" copied to clipboard!`);
      }).catch(() => {
        window.showToast(`Discord handle: ${discordTag}`);
      });
    });
  });

  // ==========================================
  // 6. Technical Skills Tab Switcher
  // ==========================================
  window.switchTab = function (tabName, btnElement) {
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

  revealElements.forEach(el => revealObserver.observe(el));
})();
