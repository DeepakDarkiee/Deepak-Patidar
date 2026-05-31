/* ============================================================
   DARK MODE — restores saved preference on load + registers click listener
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
   SCROLL SPY — active nav link via IntersectionObserver
   ============================================================ */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.navbar ul li a');
  if (!sections.length || !links.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        var a = document.querySelector('.navbar ul li a[href="#' + e.target.id + '"]');
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(function (s) { io.observe(s); });
})();

/* ============================================================
   CONTACT FORM — EmailJS, no jQuery
   ============================================================ */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (typeof emailjs === 'undefined') { alert('Email service not ready. Please try again.'); return; }
    emailjs.init('22putUZ4PdAeLyu2H');
    emailjs.sendForm('service_pfbgoqo', 'template_2ktcivf', '#contact-form')
      .then(function () {
        form.reset();
        alert('Form Submitted Successfully');
      }, function (err) {
        console.error(err);
        alert('Form Submission Failed! Try Again');
      });
  });
})();

/* ============================================================
   TAB TITLE ON VISIBILITY CHANGE
   ============================================================ */
document.addEventListener('visibilitychange', function () {
  var favicon = document.getElementById('favicon');
  if (document.visibilityState === 'visible') {
    document.title = 'Deepak Patidar - Python Developer & AI Engineer';
    if (favicon) favicon.href = 'assets/images/favicon.png';
  } else {
    document.title = 'Come Back To Portfolio';
    if (favicon) favicon.href = 'assets/images/favhand.png';
  }
});

/* ============================================================
   TYPED.JS
   ============================================================ */
(function () {
  if (typeof Typed === 'undefined') return;
  new Typed('.typing-text', {
    strings: ['Agentic AI Systems', 'LLM Engineering', 'Python Backend Development', 'AWS Cloud Solutions', 'Data Engineering', 'MLOps & DevOps'],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
  });
})();

/* ============================================================
   SKILLS — fetch & render from skills.json
   ============================================================ */
(function () {
  fetch('/skills.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (skills) {
      var container = document.getElementById('skillsContainer');
      if (!container) return;
      container.innerHTML = skills.map(function (s) {
        return '<div class="bar"><div class="info"><img src="' + s.icon + '" alt="' + s.name + '" loading="lazy"><span>' + s.name + '</span></div></div>';
      }).join('');
      setTimeout(function () {
        container.querySelectorAll('.bar').forEach(function (bar, i) {
          setTimeout(function () { bar.classList.add('animate'); }, i * 80);
        });
      }, 300);

      if (typeof sr !== 'undefined') {
        sr.reveal('.skills .container .bar', { origin: 'bottom', distance: '40px', duration: 500, interval: 50, delay: 100 });
      }
    })
    .catch(function (e) { console.error('Skills fetch failed:', e); });
})();

/* ============================================================
   VANILLA TILT
   ============================================================ */
(function () {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 15 });
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
var sr;
(function () {
  if (typeof ScrollReveal === 'undefined') return;
  sr = ScrollReveal({ origin: 'bottom', distance: '60px', duration: 800, delay: 100, easing: 'ease-in-out', reset: false, viewFactor: 0.2, mobile: true });

  sr.reveal('.home .content h2',                      { origin: 'left',   distance: '100px', duration: 1000, delay: 200 });
  sr.reveal('.home .content p',                       { origin: 'left',   distance: '80px',  duration: 800,  delay: 400 });
  sr.reveal('.home .content .btn',                    { origin: 'bottom', distance: '50px',  duration: 600,  delay: 600 });
  sr.reveal('.home .image',                           { origin: 'right',  distance: '100px', duration: 1000, delay: 300 });
  sr.reveal('.home .socials .social-icons li',        { origin: 'bottom', distance: '30px',  duration: 600,  interval: 100, delay: 800 });
  sr.reveal('.about .heading',                        { origin: 'top',    distance: '50px',  duration: 800 });
  sr.reveal('.about .row .image',                     { origin: 'left',   distance: '80px',  duration: 800,  delay: 200 });
  sr.reveal('.about .row .content h3',                { origin: 'right',  distance: '60px',  duration: 600,  delay: 300 });
  sr.reveal('.about .row .content .tag',              { origin: 'right',  distance: '40px',  duration: 600,  delay: 400 });
  sr.reveal('.about .row .content p',                 { origin: 'right',  distance: '60px',  duration: 800,  delay: 500 });
  sr.reveal('.expertise-highlights .highlight-item',  { origin: 'bottom', distance: '50px',  duration: 600,  interval: 150, delay: 600 });
  sr.reveal('.aws-certifications-section',            { origin: 'bottom', distance: '80px',  duration: 1000, delay: 300 });
  sr.reveal('.certifications-container h3',           { origin: 'top',    distance: '40px',  duration: 600,  delay: 500 });
  sr.reveal('.contact-info-section',                  { origin: 'bottom', distance: '60px',  duration: 800,  delay: 400 });
  sr.reveal('.contact-info-section .info-item',       { origin: 'bottom', distance: '40px',  duration: 600,  interval: 150, delay: 600 });
  sr.reveal('.about .resumebtn',                      { origin: 'bottom', distance: '40px',  duration: 600,  delay: 800 });
  sr.reveal('.skills .heading',                       { origin: 'top',    distance: '50px',  duration: 800 });
  sr.reveal('.skills .container',                     { origin: 'bottom', distance: '60px',  duration: 800,  delay: 200 });
  sr.reveal('.articles .heading',                     { origin: 'top',    distance: '50px',  duration: 800 });
  sr.reveal('.articles-description',                  { origin: 'bottom', distance: '40px',  duration: 600,  delay: 200 });
  sr.reveal('.medium-cta',                            { origin: 'bottom', distance: '60px',  duration: 800,  delay: 400 });
  sr.reveal('.experience .heading',                   { origin: 'top',    distance: '50px',  duration: 800 });
  sr.reveal('.experience .timeline .container.right', { origin: 'right',  distance: '80px',  duration: 800,  interval: 200, delay: 200 });
  sr.reveal('.experience .timeline .container.left',  { origin: 'left',   distance: '80px',  duration: 800,  interval: 200, delay: 200 });
  sr.reveal('.contact .heading',                      { origin: 'top',    distance: '50px',  duration: 800 });
  sr.reveal('.contact .container .image-box',         { origin: 'left',   distance: '80px',  duration: 800,  delay: 200 });
  sr.reveal('.contact .container form .field',        { origin: 'right',  distance: '60px',  duration: 600,  interval: 100, delay: 300 });
  sr.reveal('.contact .container form .message',      { origin: 'right',  distance: '60px',  duration: 600,  delay: 500 });
  sr.reveal('.contact .container form .button-area',  { origin: 'bottom', distance: '40px',  duration: 600,  delay: 700 });
  sr.reveal('.footer .box-container .box',            { origin: 'bottom', distance: '50px',  duration: 600,  interval: 200, delay: 200 });
  sr.reveal('.footer .credit',                        { origin: 'bottom', distance: '30px',  duration: 600,  delay: 600 });
})();

/* ============================================================
   CERT TILE ANIMATION — IntersectionObserver
   ============================================================ */
(function () {
  var tiles = document.querySelectorAll('.cert-tile');
  if (!tiles.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('animate'); }, i * 150);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
  tiles.forEach(function (t) { io.observe(t); });
})();

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
