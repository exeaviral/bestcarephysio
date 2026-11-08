/* ============================================================
   BestCare Physio — Main JavaScript (Vanilla JS)
   ============================================================ */

(function () {
  'use strict';

  /* ---- Diwali Week Offer ---- */
  var whatsappUrl = 'https://wa.me/918383040436?text=Hi%20BestCare%20Physio%2C%20I%20would%20like%20to%20avail%20the%20Diwali%20week%20offer%20on%20physiotherapy%20or%20diagnostic%20services.';
  var diwaliBanner = document.createElement('aside');
  diwaliBanner.className = 'diwali-banner';
  diwaliBanner.setAttribute('aria-label', 'Diwali week offer');
  diwaliBanner.innerHTML =
    '<div class="diwali-banner-inner">'
    + '<div class="diwali-banner-copy">'
    + '<span class="diwali-banner-kicker">Diwali Week Offer</span>'
    + '<strong>Up to 50% off</strong>'
    + '<small>Physiotherapy &amp; diagnostic services · Valid till 15 November</small>'
    + '</div>'
    + '<a class="diwali-banner-cta" href="' + whatsappUrl + '" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Contact now</a>'
    + '</div>'
    + '<button class="diwali-banner-close" type="button" aria-label="Close Diwali offer">&times;</button>';
  document.body.insertBefore(diwaliBanner, document.body.firstChild);

  diwaliBanner.querySelector('.diwali-banner-close').addEventListener('click', function () {
    diwaliBanner.remove();
  });

  var diwaliWhatsapp = document.createElement('a');
  diwaliWhatsapp.className = 'diwali-whatsapp';
  diwaliWhatsapp.href = whatsappUrl;
  diwaliWhatsapp.target = '_blank';
  diwaliWhatsapp.rel = 'noopener';
  diwaliWhatsapp.setAttribute('aria-label', 'Contact BestCare Physio on WhatsApp');
  diwaliWhatsapp.innerHTML = '<i class="fab fa-whatsapp"></i><span>Contact on WhatsApp</span>';
  document.body.appendChild(diwaliWhatsapp);

  var promoOffer = document.querySelector('.promo-offer');
  var promoHeadline = document.querySelector('.promo-headline');
  var promoSubtext = document.querySelector('.promo-subtext');
  var promoLink = document.querySelector('.btn-promo-wa');
  if (promoHeadline) promoHeadline.textContent = '🪔 Diwali Week Offer';
  if (promoOffer) promoOffer.innerHTML = '<strong>UP TO 50% OFF</strong><br><span>Physiotherapy &amp; diagnostic services</span>';
  if (promoSubtext) promoSubtext.textContent = 'Celebrate with better health. Offer valid till 15 November.';
  if (promoLink) {
    promoLink.href = whatsappUrl;
    promoLink.innerHTML = '<i class="fab fa-whatsapp"></i> Contact now on WhatsApp';
  }

  /* ---- Loading Screen ---- */
  var loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hide');
      }, 400);
    });
    // Fallback: hide after 2s even if load event is slow
    setTimeout(function () {
      if (loader) loader.classList.add('hide');
    }, 2000);
  }

  /* ---- Promo Popup ---- */
  var promoPopup = document.getElementById('promoPopup');
  if (promoPopup) {
    var popupShown = sessionStorage.getItem('promoShown');
    if (!popupShown) {
      setTimeout(function () {
        promoPopup.classList.add('visible');
        sessionStorage.setItem('promoShown', '1');
      }, 2500);
    }

    function closePromo() {
      promoPopup.classList.remove('visible');
    }

    var promoClose = document.getElementById('promoClose');
    if (promoClose) promoClose.addEventListener('click', closePromo);

    var promoOverlay = promoPopup.querySelector('.promo-overlay');
    if (promoOverlay) promoOverlay.addEventListener('click', closePromo);
  }

  /* ---- Sticky Header ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---- Mobile Navigation Toggle ---- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 70;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Scroll Animations (Intersection Observer) ---- */
  if ('IntersectionObserver' in window) {
    var animEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-up, .card, .testimonial, .location-card, .blog-card, .feature-item, .process-step');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });

    animEls.forEach(function (el) {
      // Stagger siblings inside grids / process-steps
      var parent = el.parentElement;
      if (parent && (
        parent.classList.contains('grid-3') ||
        parent.classList.contains('grid-4') ||
        parent.classList.contains('badges-grid') ||
        parent.classList.contains('process-steps')
      )) {
        var siblings = Array.prototype.slice.call(parent.children);
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.07) + 's';
      }
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-up, .card, .testimonial, .location-card, .blog-card, .feature-item, .process-step').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // Close all others in the same group
      var group = item.closest('.faq-list');
      if (group) {
        group.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          if (openItem !== item) openItem.classList.remove('open');
        });
      }

      item.classList.toggle('open', !isOpen);
    });
  });

  /* ---- Back to Top ---- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Contact Form Validation ---- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      contactForm.querySelectorAll('[required]').forEach(function (field) {
        var group = field.closest('.form-group');
        var errEl = group ? group.querySelector('.form-error') : null;
        if (!field.value.trim()) {
          valid = false;
          if (group) group.classList.add('error');
          if (errEl) errEl.textContent = 'This field is required.';
        } else {
          if (group) group.classList.remove('error');
          if (errEl) errEl.textContent = '';
        }
      });

      // Phone validation
      var phoneField = contactForm.querySelector('[name="phone"]');
      if (phoneField && phoneField.value.trim()) {
        var ph = phoneField.value.replace(/\D/g, '');
        if (ph.length < 10) {
          valid = false;
          var pg = phoneField.closest('.form-group');
          if (pg) pg.classList.add('error');
          var pe = pg ? pg.querySelector('.form-error') : null;
          if (pe) pe.textContent = 'Enter a valid 10-digit phone number.';
        }
      }

      if (valid) {
        var nameEl = contactForm.querySelector('[name="name"]');
        var phoneEl = contactForm.querySelector('[name="phone"]');
        var emailEl = contactForm.querySelector('[name="email"]');
        var conditionEl = contactForm.querySelector('[name="condition"]');
        var timeEl = contactForm.querySelector('[name="time"]');
        var nameVal = nameEl ? nameEl.value.trim() : '';
        var phoneVal = phoneEl ? phoneEl.value.trim() : '';
        var emailVal = emailEl ? emailEl.value.trim() : '';
        var conditionVal = conditionEl ? conditionEl.value.trim() : '';
        var timeVal = timeEl ? timeEl.value.trim() : '';
        var msg = 'Hi BestCare Physio, my name is ' + nameVal + '.'
          + ' Phone: ' + phoneVal
          + (emailVal ? '. Email: ' + emailVal : '')
          + (conditionVal ? '. Condition/Query: ' + conditionVal : '')
          + (timeVal ? '. Preferred time: ' + timeVal : '')
          + '. Please help me book a session.';
        window.open('https://wa.me/918383040436?text=' + encodeURIComponent(msg), '_blank');

        var successMsg = contactForm.querySelector('.form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(function () { successMsg.style.display = 'none'; }, 6000);
        }
        contactForm.reset();
      }
    });

    // Live validation clear
    contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var group = this.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });
  }

  /* ---- Custom Cursor ---- */
  if (window.matchMedia('(pointer: fine)').matches) {
    var cursorDot = document.createElement('div');
    var cursorRing = document.createElement('div');
    cursorDot.className = 'cursor-dot cursor-hidden';
    cursorRing.className = 'cursor-ring cursor-hidden';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    // Initial off-screen position so cursor is never visible at 0,0 before first mousemove
    var mouseX = -200, mouseY = -200;
    var ringX = -200, ringY = -200;
    // Half-widths: dot is 8px → 4px, ring is 36px → 18px (see cursor CSS)
    var halfDot = 4, halfRing = 18;
    var cursorActive = false;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorActive) {
        cursorActive = true;
        cursorDot.classList.remove('cursor-hidden');
        cursorRing.classList.remove('cursor-hidden');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      cursorDot.classList.add('cursor-hidden');
      cursorRing.classList.add('cursor-hidden');
    });

    document.addEventListener('mouseenter', function () {
      if (cursorActive) {
        cursorDot.classList.remove('cursor-hidden');
        cursorRing.classList.remove('cursor-hidden');
      }
    });

    function animateCursor() {
      // Dot snaps instantly — GPU-optimised via transform
      cursorDot.style.transform = 'translate(' + (mouseX - halfDot) + 'px,' + (mouseY - halfDot) + 'px)';
      // Ring follows with smooth interpolation (lerp factor: 0.14 = smooth but responsive)
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.transform = 'translate(' + (ringX - halfRing) + 'px,' + (ringY - halfRing) + 'px)';
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover state
    function addHoverListeners(el) {
      el.addEventListener('mouseenter', function () {
        cursorDot.classList.add('cursor-hover');
        cursorRing.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        cursorDot.classList.remove('cursor-hover');
        cursorRing.classList.remove('cursor-hover');
      });
    }
    document.querySelectorAll('a, button, .btn, .card, .location-card, .blog-card, input, select, textarea, .faq-question, [role="button"], .process-step').forEach(addHoverListeners);
  }

  /* ---- Animated Counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 1400; // ms — smooth enough without being slow
          var startTime = null;

          function countUp(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
              requestAnimationFrame(countUp);
            }
          }
          requestAnimationFrame(countUp);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ---- Active nav link ---- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

})();
