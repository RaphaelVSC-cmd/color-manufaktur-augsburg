'use strict';

/* ==========================================================================
   COLOR MANUFAKTUR GmbH – Master JS Engine (v7.0 Bespoke Unikat)
   Lenis + GSAP ScrollTrigger + SplitType + Live-Alarm Tracker
   ========================================================================== */

// === LENIS SMOOTH SCROLL ===
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    smoothTouch: false, // Natives Touch-Scrollen auf Smartphones
    autoResize: true,
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Interne Anker-Links geschmeidig über Lenis ansteuern
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id && id !== '#' && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -75, immediate: false });
        }
      }
    });
  });
}

// === DEMO LIVE-ALARM TRACKER (Meister schaut Demo an!) ===
function initDemoTracker() {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.search.includes('preview=true')
  ) {
    return;
  }

  const startTime = Date.now();
  const company = document.title.split('–')[0].split('|')[0].trim();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'Smartphone (Mobil)' : 'Desktop-Computer';
  const referrer = document.referrer
    ? document.referrer.includes('whatsapp')
      ? 'WhatsApp Direktlink'
      : document.referrer
    : 'Direktaufruf';

  let pingSent = false;
  let exitSent = false;
  const clickedActions = new Set();

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      const type = el.getAttribute('data-track');
      if (type === 'whatsapp') clickedActions.add('WhatsApp-Direktchat');
      else if (type === 'telefon') clickedActions.add('Telefonnummer');
      else if (type === 'rechner') clickedActions.add('Oberflächen-Rechner');
      else if (type === 'angebot') clickedActions.add('Projekt-Anfrage');
    });
  });

  async function sendAlert(stage) {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const durationText =
      elapsedSeconds < 60
        ? `${elapsedSeconds}s`
        : `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`;

    let statusText = '⚡ Reingeschaut';
    let empfehlung =
      'Wie vereinbart Malermeister Oleg Rogalski anrufen und Bezug auf den WhatsApp-Link nehmen.';

    if (elapsedSeconds >= 45 || clickedActions.size > 0) {
      statusText = '🔥 HEISS! Hohes Interesse & Klicks!';
      empfehlung =
        'SOFORTIGE AKTION: In den nächsten 15–30 Minuten via WhatsApp nachhaken („Servus Herr Rogalski, ich habe gesehen, Sie prüfen den Entwurf gerade...“).';
    } else if (elapsedSeconds >= 20) {
      statusText = '👍 WARM! Hat die Seite aufmerksam betrachtet.';
      empfehlung =
        'Follow-Up Call vorbereiten. Skript Phase 7/8 bereithalten.';
    }

    const clickedList =
      clickedActions.size > 0
        ? Array.from(clickedActions).join(', ')
        : 'Nur gescrollt';
    const message =
      `🔔 [NEXBOT LIVE-ALARM] Meister schaut Demo an!\n\n` +
      `🏢 Firma: ${company}\n` +
      `📱 Gerät: ${deviceType}\n` +
      `🔗 Quelle: ${referrer}\n` +
      `⏱️ Verweildauer: ${durationText}\n` +
      `🎯 Klicks: ${clickedList}\n` +
      `📊 Status: ${statusText}\n\n` +
      `💡 Empfehlung für Raphael:\n${empfehlung}`;

    // 1. Telegram Push an Raphael
    try {
      fetch(
        'https://api.telegram.org/bot8932370815:AAEfF_FRLC12FTFwoa9uRrizlARluM8KYxE/sendMessage',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '5942652345',
            text: message,
          }),
          keepalive: true,
        }
      ).catch(() => {});
    } catch (_) {}

    // 2. E-Mail Alarm via Formspree
    try {
      fetch('https://formspree.io/f/xbjnqkyv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          subject: `🔥 [LIVE-ALARM] ${company} (${durationText})`,
          message: message,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch (_) {}
  }

  setTimeout(() => {
    if (!pingSent) {
      pingSent = true;
      sendAlert('initial');
    }
  }, 5000);

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && !exitSent) {
      exitSent = true;
      sendAlert('exit');
    }
  });
}

// === TAGESZEIT-PERSONALISIERUNG ===
function initTimeGreeting() {
  const el = document.querySelector('[data-time-greeting]');
  if (!el) return;
  const h = new Date().getHours();
  let msg;
  if (h >= 6 && h < 12) {
    msg = 'Guten Morgen aus Augsburg';
  } else if (h >= 12 && h < 18) {
    msg = 'Guten Tag aus Augsburg';
  } else {
    msg = 'Guten Abend aus Augsburg';
  }
  const isOffHours = h < 8 || h >= 17;
  el.textContent =
    msg + (isOffHours ? ' &bull; Bürozeiten beendet (24h Online-Anfrage aktiv)' : ' &bull; Meisterbetrieb erreichbar');
}

// === HEADER SCROLL STATE ===
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}

// === MOBILE NAVIGATION ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.removeAttribute('hidden');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    setTimeout(() => {
      if (!menu.classList.contains('is-open')) {
        menu.setAttribute('hidden', '');
      }
    }, 280);
  };

  hamburger.addEventListener('click', () => {
    hamburger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });

  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      close();
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(target, { offset: -70, immediate: false });
            } else {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
  });
}

// === MODAL MANAGEMENT (Impressum & Datenschutz) ===
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
      const focusable = modal.querySelector(
        'button, [href], input, select, textarea'
      );
      if (focusable) focusable.focus();
    });
  });

  const closeModals = () => {
    document.querySelectorAll('.modal:not([hidden])').forEach((m) => {
      m.setAttribute('hidden', '');
      m.setAttribute('aria-hidden', 'true');
    });
    if (lenis) lenis.start();
  };

  document.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModals);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });
}

// === DSGVO CONSENT & TWO-CLICK MAPS ===
function initConsent() {
  const KEY = 'colormanufaktur_consent_v1';
  const banner = document.getElementById('consentBanner');
  const stored = localStorage.getItem(KEY);
  const mapsPlaceholder = document.getElementById('mapsPlaceholder');
  const mapsFrame = document.getElementById('googleMapsFrame');

  function activateMaps() {
    if (mapsFrame && mapsFrame.dataset.src) {
      mapsFrame.src = mapsFrame.dataset.src;
      delete mapsFrame.dataset.src;
    }
    if (mapsPlaceholder) {
      mapsPlaceholder.classList.add('hidden');
    }
  }

  function applyConsent(accepted) {
    if (accepted) {
      activateMaps();
    }
    if (banner) banner.hidden = true;
  }

  if (stored === 'accepted') {
    applyConsent(true);
  } else if (stored === 'rejected') {
    applyConsent(false);
  } else if (banner) {
    banner.hidden = false;
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'rejected');
    applyConsent(false);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(KEY);
    if (banner) banner.hidden = false;
  });

  document.getElementById('btnActivateMaps')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    activateMaps();
    if (banner) banner.hidden = true;
  });
}

// === SIGNATURE FEATURE: OBERFLÄCHEN-INSPEKTOR & RECHNER ===
function initInspectorAndCalculator() {
  const container = document.querySelector('[data-before-after]');
  const handle = document.getElementById('beforeAfterHandle');
  const afterWrap = document.getElementById('afterImageWrap');
  if (!container || !handle || !afterWrap) return;

  let isDragging = false;

  function updatePosition(clientX) {
    const rect = container.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const clamped = Math.max(0, Math.min(offsetX, rect.width));
    const pct = (clamped / rect.width) * 100;

    handle.style.left = `${pct}%`;
    afterWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  handle.addEventListener('mousedown', () => (isDragging = true));
  window.addEventListener('mouseup', () => (isDragging = false));
  window.addEventListener('mousemove', (e) => {
    if (isDragging) updatePosition(e.clientX);
  });

  // Touch Support
  container.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    },
    { passive: true }
  );

  // Keyboard Support für Barrierefreiheit
  handle.addEventListener('keydown', (e) => {
    let currentPct = parseFloat(handle.getAttribute('aria-valuenow') || '50');
    if (e.key === 'ArrowLeft') {
      currentPct = Math.max(0, currentPct - 5);
    } else if (e.key === 'ArrowRight') {
      currentPct = Math.min(100, currentPct + 5);
    }
    handle.style.left = `${currentPct}%`;
    afterWrap.style.clipPath = `inset(0 ${100 - currentPct}% 0 0)`;
    handle.setAttribute('aria-valuenow', currentPct);
  });

  // Material Data & Tabs
  const materialData = {
    stucco: {
      material: 'Italienischer Sumpfkalk & Carrara-Marmormehl',
      desc: 'Frei von Konservierungsstoffen, natürlich schimmelhemmend und diffusionsoffen.',
      haptic: 'Samtmatt poliert mit dezentem Marmorschimmer',
      duration: 'Typische Ausführungszeit: ca. 3–5 Werktage je nach Schichtanzahl.',
      minRate: 65,
      maxRate: 85,
      formValue: 'Stucco Veneziano & Exklusive Wandgestaltung',
    },
    silikat: {
      material: 'Mineralische Silikate & Siliconharz-Verkieselung',
      desc: 'Atmungsaktiver Fassadenschutz mit selbstreinigendem Lotuseffekt gegen Veralgung.',
      haptic: 'Wasserabweisend samtweich mit hoher Farbtonstabilität',
      duration: 'Fassadensanierung inkl. Gerüst & Vorbereitung: ca. 5–8 Werktage.',
      minRate: 40,
      maxRate: 58,
      formValue: 'Fassadengestaltung & Witterungsschutz',
    },
    epoxy: {
      material: '2K-Epoxidharz mit Einstreuchips oder Quarzsand',
      desc: 'Fugenlose, chemikalien- und ölbeständige Beschichtung nach DIN EN 1504-2.',
      haptic: 'Seidenglänzend oder rutschhemmend (R10–R12) versiegelt',
      duration: 'Ausführung & Aushärtung: 2–3 Tage bis zur vollen Belastbarkeit.',
      minRate: 50,
      maxRate: 72,
      formValue: 'Industrieböden & 2K-Epoxidharzbeschichtung',
    },
  };

  let currentMaterial = 'stucco';
  const slider = document.getElementById('flaecheSlider');
  const displaySqm = document.getElementById('flaecheDisplay');
  const displayPrice = document.getElementById('calcPriceDisplay');

  function calculatePrice() {
    if (!slider || !displayPrice) return;
    const sqm = parseInt(slider.value, 10);
    if (displaySqm) displaySqm.textContent = sqm;

    const data = materialData[currentMaterial];
    const minTotal = Math.round(sqm * data.minRate);
    const maxTotal = Math.round(sqm * data.maxRate);

    displayPrice.textContent = `ab ca. ${minTotal.toLocaleString('de-DE')} € – ${maxTotal.toLocaleString('de-DE')} €`;
  }

  // Material Tab Umschaltung
  document.querySelectorAll('.mat-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mat-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      currentMaterial = tab.dataset.material;
      const data = materialData[currentMaterial];

      const elMat = document.getElementById('specMaterial');
      const elDesc = document.getElementById('specDesc');
      const elHaptic = document.getElementById('specHaptic');
      const elDur = document.getElementById('specDuration');

      if (elMat) elMat.textContent = data.material;
      if (elDesc) elDesc.textContent = data.desc;
      if (elHaptic) elHaptic.textContent = data.haptic;
      if (elDur) elDur.textContent = data.duration;

      calculatePrice();
    });
  });

  if (slider) {
    slider.addEventListener('input', calculatePrice);
  }
  calculatePrice();

  // "Diesen Richtwert in Anfrage übernehmen" Button
  const btnTakeover = document.getElementById('btnTakeoverCalc');
  if (btnTakeover) {
    btnTakeover.addEventListener('click', (e) => {
      e.preventDefault();
      const data = materialData[currentMaterial];
      const sqm = slider ? slider.value : '45';

      // Passendes Radio im Formular auswählen
      const radio = document.querySelector(
        `input[name="leistung"][value="${data.formValue}"]`
      );
      if (radio) radio.checked = true;

      // Fläche eintragen
      const inputArea = document.getElementById('flaecheUmfang');
      if (inputArea) inputArea.value = `ca. ${sqm} m² (${data.material.split('&')[0].trim()})`;

      // Sanft zu #kontakt scrollen
      const target = document.getElementById('kontakt');
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -60 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Quicklinks aus Leistungs-Karten
  document.querySelectorAll('[data-service-select]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const val = btn.dataset.serviceSelect;
      const radio = document.querySelector(`input[name="leistung"][value*="${val.split('&')[0].trim()}"]`);
      if (radio) radio.checked = true;
    });
  });
}

// === ERLEBNIS-KONTAKTPUNKT & MULTI-STEP ENGINE ===
function initExperienceContact() {
  const container = document.querySelector('[data-experience-contact]');
  const form = document.getElementById('contactForm');
  if (!container || !form) return;

  const fallback = document.getElementById('formFallback');
  const status = document.getElementById('formStatus');
  const badges = container.querySelectorAll('.step-badge');
  const panels = container.querySelectorAll('.step-panel');

  function goToStep(stepNum) {
    panels.forEach((p) => {
      const isTarget = p.id === `stepPanel${stepNum}`;
      p.hidden = !isTarget;
      p.classList.toggle('active', isTarget);
    });
    badges.forEach((b) => {
      const isActive = parseInt(b.dataset.step, 10) === stepNum;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Fokus auf erstes Feld im aktiven Schritt setzen (Vercel Guidelines)
    const activePanel = container.querySelector(`.step-panel#stepPanel${stepNum}`);
    if (activePanel) {
      const firstField = activePanel.querySelector(
        'input:not([type="hidden"]), select, textarea, button'
      );
      if (firstField) firstField.focus();
    }
  }

  container.querySelectorAll('[data-goto-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.dataset.gotoStep, 10);
      goToStep(targetStep);
    });
  });

  badges.forEach((b) => {
    b.addEventListener('click', () => {
      const step = parseInt(b.dataset.step, 10);
      goToStep(step);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('btnSubmitContact');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Meister-Anfrage wird übertragen…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        if (status) {
          status.textContent =
            'Vielen Dank! Ihre Anfrage ist direkt bei Malermeister Oleg Rogalski eingegangen. Wir melden uns innerhalb von 24 Stunden bei Ihnen.';
          status.style.color = 'var(--sc-accent)';
        }
        form.reset();
        goToStep(1);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Meister-Anfrage jetzt absenden →';
        }
      } else {
        // Fallback aktivieren
        if (fallback) fallback.style.display = 'block';
        form.style.display = 'none';
      }
    } catch {
      // Netzwerkfehler / Offline
      if (fallback) fallback.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Meister-Anfrage jetzt absenden →';
      }
    }
  });
}

// === MOTION-PRIMITIVEN (GSAP & SplitType) ===

// 1. Kinetic Typography
function initKineticTypography() {
  if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const split = new SplitType(heroTitle, { types: 'words,chars' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      rotateX: -25,
      stagger: 0.018,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.15,
      clearProps: 'transform,opacity',
    });
  }

  document.querySelectorAll('.section-title').forEach((el) => {
    const s = new SplitType(el, { types: 'lines' });
    gsap.from(s.lines, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      clearProps: 'transform,opacity',
    });
  });
}

// 2. Scroll Fade-Up
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        clearProps: 'transform,opacity',
      }
    );
  });
}

// 3. Dynamic Counters
function initCounters() {
  if (typeof gsap === 'undefined') return;
  document.querySelectorAll('.stat-counter').forEach((el) => {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(el.dataset.target || '').includes('.');
    const duration = parseFloat(el.dataset.duration || '2.0');

    gsap.fromTo(
      { val: 0 },
      { val: target },
      {
        duration: duration,
        ease: 'power2.out',
        onUpdate: function () {
          const current = this.targets()[0].val;
          const formatted = isDecimal
            ? current.toFixed(1).replace('.', ',')
            : Math.round(current).toLocaleString('de-DE');
          el.textContent = formatted + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// 4. Native 3D Perspective Tilt (0 KB Payload)
function init3DTilt() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  document.querySelectorAll('.card-3d, [data-tilt-3d]').forEach((card) => {
    if (!isTouch) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 6;
        const rotateY = (x / (rect.width / 2)) * 6;
        gsap.to(card, {
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`,
          duration: 0.25,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          duration: 0.5,
          ease: 'elastic.out(1, 0.6)',
        });
      });
    } else {
      gsap.fromTo(
        card,
        { transform: 'perspective(1000px) rotateX(5deg) translateY(15px)' },
        {
          transform: 'perspective(1000px) rotateX(0deg) translateY(0px)',
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}

// 5. Editorial Text-Scrubbing (Dim-to-Reveal)
function initTextScrub() {
  if (typeof gsap === 'undefined') return;
  document.querySelectorAll('[data-text-scrub]').forEach((container) => {
    const text = container.textContent.trim();
    container.innerHTML = text
      .split(/\s+/)
      .map((w) => `<span class="text-scrub-word">${w}</span> `)
      .join('');
    const words = container.querySelectorAll('.text-scrub-word');

    gsap.to(words, {
      opacity: 1.0,
      stagger: 0.04,
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        end: 'bottom 48%',
        scrub: 0.5,
      },
    });
  });
}

// 6. Continuous Rotating Stamp
function initRotatingBadge() {
  if (typeof gsap === 'undefined') return;
  document.querySelectorAll('[data-rotating-seal]').forEach((badge) => {
    gsap.to(badge, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.2,
      },
    });
  });
}

// 7. Magnetic Buttons (Desktop)
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches || typeof gsap === 'undefined') return;
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.28,
        y: (e.clientY - r.top - r.height / 2) * 0.28,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// === DOM CONTENT LOADED INITIALISIERUNG ===
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

document.addEventListener('DOMContentLoaded', () => {
  // Immer aktive Basisfunktionen
  initDemoTracker();
  initTimeGreeting();
  initHeader();
  initMobileNav();
  initModals();
  initConsent();
  initInspectorAndCalculator();
  initExperienceContact();

  // Mindestens 5 aktive Motion-Primitiven (Kowalski Craft konform)
  if (!prefersReducedMotion) {
    initKineticTypography(); // 1. Kinetic Typography
    initScrollAnimations();  // 2. Scroll Fade-Up
    initCounters();          // 3. Dynamic Counters
    init3DTilt();            // 4. Native 3D Perspective Tilt
    initTextScrub();         // 5. Editorial Text Scrubbing
    initRotatingBadge();     // 6. Rotating Quality Seal
    initMagneticButtons();   // 7. Desktop Magnetic Buttons
  }
});
