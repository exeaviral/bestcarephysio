/* ============================================================
   BestCare Physio — Main JavaScript (Vanilla JS)
   ============================================================ */

(function () {
  'use strict';

  /* ---- Promo Popup ---- */
  var promoPopup = document.getElementById('promoPopup');
  if (promoPopup) {
    var popupShown = sessionStorage.getItem('promoShown');
    if (!popupShown) {
      setTimeout(function () {
        promoPopup.classList.add('visible');
        sessionStorage.setItem('promoShown', '1');
      }, 3000);
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
    var fadeEls = document.querySelectorAll('.fade-in-up');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback — show all
    document.querySelectorAll('.fade-in-up').forEach(function (el) {
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
        var nameVal = contactForm.querySelector('[name="name"]').value.trim();
        var phoneVal = contactForm.querySelector('[name="phone"]').value.trim();
        var emailEl = contactForm.querySelector('[name="email"]');
        var emailVal = emailEl ? emailEl.value.trim() : '';
        var conditionEl = contactForm.querySelector('[name="condition"]');
        var conditionVal = conditionEl ? conditionEl.value.trim() : '';
        var timeEl = contactForm.querySelector('[name="time"]');
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
