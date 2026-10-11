// Portfolio Hafsa Lamtalssi — interactions

// Mode sombre (mémorisé dans le navigateur du visiteur)
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-btn');
  if (!btn) return;
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function sync() {
    var dark = isDark();
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Mode clair' : 'Mode sombre');
  }
  btn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  sync();
})();

// Menu mobile
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  if (!btn || !nav) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setOpen(false); btn.focus(); }
  });
})();

// Copier l'adresse e-mail
(function () {
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      function done() { b.textContent = 'Copié'; setTimeout(function () { b.textContent = 'Copier'; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectEmail(); });
      } else { selectEmail(); }
    });
  });
  function selectEmail() {
    var el = document.getElementById('email');
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }
})();

// Formulaire de contact : envoi vers contact.php sans recharger la page
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var submit = form.querySelector('button[type="submit"]');

  function say(msg, ok) {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nom = form.nom.value.trim(), email = form.email.value.trim(), message = form.message.value.trim();
    if (!nom || !email || !message) return say('Merci de remplir le nom, l\'e-mail et le message.', false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say('L\'adresse e-mail ne semble pas valide.', false);
    if (!form.consentement.checked) return say('Merci de cocher la case de consentement.', false);
    if (form.action.indexOf('VOTRE-ID') !== -1) return say('Le formulaire n\'est pas encore activé. Écrivez-moi directement à hafsalamtalssi294@gmail.com.', false);

    submit.disabled = true;
    say('Envoi en cours…', true);
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (data) {
        if (data.ok) {
          form.reset();
          say('Merci, votre message a bien été envoyé. Je vous réponds au plus vite.', true);
        } else {
          say(data.error || 'Le message n\'a pas pu être envoyé. Écrivez-moi directement à hafsalamtalssi294@gmail.com.', false);
        }
      })
      .catch(function () {
        say('Le message n\'a pas pu être envoyé. Écrivez-moi directement à hafsalamtalssi294@gmail.com.', false);
      })
      .then(function () { submit.disabled = false; });
  });
})();

var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ouverture animée : retire l'écran H.L. à la fin (ou au clic)
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('intro-on')) return;
  var intro = document.querySelector('.intro');
  function fin() {
    if (!root.classList.contains('intro-on')) return;
    try { sessionStorage.setItem('intro-vue', '1'); } catch (e) {}
    if (intro) intro.style.display = 'none';
    root.classList.add('intro-done'); // garde les délais de l'entrée de la couverture
    root.classList.remove('intro-on');
  }
  if (intro) {
    intro.addEventListener('animationend', function (e) { if (e.animationName === 'intro-out') fin(); });
    intro.addEventListener('click', function () { root.classList.add('intro-skip'); fin(); });
  }
  setTimeout(fin, 3200); // sécurité
})();

// Titres de section qui apparaissent au défilement
(function () {
  if (calme || !('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('.sec-title, .pull, .spread blockquote');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  els.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.88) return; // déjà visible : on ne cache rien
    el.classList.add('reveal');
    io.observe(el);
  });
})();

// Curseur personnalisé : un point et un cercle qui grandit au survol des liens
(function () {
  if (calme || !window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
  var root = document.documentElement;
  var dot = document.createElement('div'); dot.className = 'cursor-dot';
  var ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.appendChild(ring); document.body.appendChild(dot);
  root.classList.add('has-cursor');

  var x = -100, y = -100, rx = -100, ry = -100, running = false;
  function loop() {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) requestAnimationFrame(loop); else running = false;
  }
  document.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    root.classList.add('cursor-on');
    var t = e.target;
    root.classList.toggle('cursor-hover', !!t.closest('a, button, label, .copy'));
    root.classList.toggle('cursor-text', !!t.closest('input, textarea'));
    if (!running) { running = true; requestAnimationFrame(loop); }
  });
  document.addEventListener('pointerdown', function () { root.classList.add('cursor-down'); });
  document.addEventListener('pointerup', function () { root.classList.remove('cursor-down'); });
  document.documentElement.addEventListener('mouseleave', function () { root.classList.remove('cursor-on'); });
})();

// Folio : indique la rubrique et la page du magazine en cours de lecture
(function () {
  var folio = document.querySelector('.folio');
  if (!folio || !('IntersectionObserver' in window)) return;
  var sec = folio.querySelector('.folio-sec'), pg = folio.querySelector('.folio-p');
  var sections = document.querySelectorAll('main section');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var spans = en.target.querySelectorAll('.sec-head span');
      if (spans.length === 2) { sec.textContent = spans[0].textContent; pg.textContent = spans[1].textContent; }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { io.observe(s); });
  var cover = document.querySelector('.cover');
  new IntersectionObserver(function (e) { folio.classList.toggle('show', !e[0].isIntersecting); }).observe(cover);
})();

// Un mot pour les recruteurs qui ouvrent la console du navigateur
try {
  console.log('%cH.L.', 'font:italic 32px Georgia,serif;color:#6b1e23');
  console.log('Vous inspectez le code ? C\'est bon signe.\nJe cherche un stage en développement web : hafsalamtalssi294@gmail.com');
} catch (e) {}
