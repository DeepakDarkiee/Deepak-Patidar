/* ============================================================
   DARK MODE — restores saved preference + registers click listener
   ============================================================ */
(function () {
  var h = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');
  var KEY = 'dp-theme';

  function applyTheme(t) {
    h.setAttribute('data-theme', t);
    if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    try { localStorage.setItem(KEY, t); } catch (e) {}
  }

  var saved = localStorage.getItem(KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      applyTheme(h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.pageYOffset / max) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ============================================================
   NAVBAR SCROLL GLASS EFFECT
   ============================================================ */
(function () {
  var header = document.querySelector('header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
(function () {
  var menu = document.getElementById('menu');
  var navbar = document.querySelector('.navbar');
  if (!menu || !navbar) return;

  menu.addEventListener('click', function () {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
  });

  window.addEventListener('scroll', function () {
    menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
  }, { passive: true });
})();

/* ============================================================
   SCROLL TOP BUTTON
   ============================================================ */
(function () {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('active', window.scrollY > 60);
  }, { passive: true });
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  if (typeof ScrollReveal === 'undefined') return;
  var sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: false, mobile: true });
  sr.reveal('.experience .timeline', { delay: 400 });
  sr.reveal('.experience .timeline .container', { interval: 400 });
})();

/* ============================================================
   TAB TITLE ON VISIBILITY CHANGE
   ============================================================ */
document.addEventListener('visibilitychange', function () {
  var favicon = document.getElementById('favicon');
  if (document.visibilityState === 'visible') {
    document.title = 'Experience | Deepak Patidar';
    if (favicon) favicon.href = '/assets/images/favicon.png';
  } else {
    document.title = 'Come Back To Portfolio';
    if (favicon) favicon.href = '/assets/images/favhand.png';
  }
});

/* ============================================================
   TAWK.TO LIVE CHAT
   ============================================================ */
(function () {
  window.Tawk_API = window.Tawk_API || {};
  var s1 = document.createElement('script');
  var s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/65fd2532a0c6737bd1238caf/1hpidijtn';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();
