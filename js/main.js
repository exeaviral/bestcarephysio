/* ============================================================
   BestCare Physio — Main JavaScript (Vanilla JS)
   ============================================================ */

(function () {
  'use strict';

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
    var animEls = document.querySelectorAll('.fade-in-up, .card, .testimonial, .location-card, .blog-card, .feature-item');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    animEls.forEach(function (el, i) {
      // Stagger siblings inside grids
      var parent = el.parentElement;
      if (parent && (parent.classList.contains('grid-3') || parent.classList.contains('grid-4') || parent.classList.contains('badges-grid'))) {
        var siblings = Array.prototype.slice.call(parent.children);
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.08) + 's';
      }
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in-up, .card, .testimonial, .location-card, .blog-card, .feature-item').forEach(function (el) {
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

})();
