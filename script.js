/* ============================================
   The Rebuilder's Encyclopedia — Landing Page JS
   Minimal, no dependencies
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Scroll-triggered fade-in animations ---
  function initFadeAnimations() {
    const elements = document.querySelectorAll(
      '.stage-card, .stat-card, .product-card, .sample-excerpt, .intro-content, .about-content, .signup-content'
    );

    elements.forEach(function (el) {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Stagger animation for grid items ---
  function initStaggerAnimations() {
    const grids = document.querySelectorAll('.stages-grid, .stats-grid, .products-grid');

    grids.forEach(function (grid) {
      const children = grid.children;
      Array.from(children).forEach(function (child, index) {
        child.style.transitionDelay = (index * 0.08) + 's';
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // The email form is submitted natively. Its data-netlify attribute enables
  // submission collection automatically when the site is deployed on Netlify.
  // For Cloudflare Pages, point this form at the preferred email form provider.

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initStaggerAnimations();
  });

  // Run immediately if DOM already loaded
  if (document.readyState !== 'loading') {
    initFadeAnimations();
    initStaggerAnimations();
  }
})();
