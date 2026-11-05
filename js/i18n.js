// Portfolio Hafsa Lamtalssi — traductions FR / EN / NL
// Le français est écrit directement dans index.html.
// Pour modifier un texte anglais ou néerlandais : changer la ligne qui a la même clé
// que l'attribut data-i18n de l'élément dans index.html.
(function () {
  var ARROW_UP = ' <span aria-hidden="true">↗</span>';
  var ARROW_DOWN = ' <span aria-hidden="true">↓</span>';
  var EMAIL = 'hafsalamtalssi294@gmail.com';

  var DICT = {
    // Textes qui ne sont pas dans la page (titre, messages du formulaire…)
    fr: {
      'meta.title': 'Hafsa Lamtalssi — Développeuse Web à Bruxelles',
      'meta.desc': 'Portfolio de Hafsa Lamtalssi, développeuse web junior à Bruxelles : React, TypeScript, PHP, Node.js — avec un œil de graphiste.',
      'copy': 'Copier', 'copied': 'Copié',
      'theme.dark': 'Mode sombre', 'theme.light': 'Mode clair',
      'msg.fill': 'Merci de remplir le nom, l\'e-mail et le message.',
      'msg.email': 'L\'adresse e-mail ne semble pas valide.',
      'msg.consent': 'Merci de cocher la case de consentement.',
      'msg.off': 'Le formulaire n\'est pas encore activé. Écrivez-moi directement à ' + EMAIL + '.',
      'msg.sending': 'Envoi en cours…',
      'msg.ok': 'Merci, votre message a bien été envoyé. Je vous réponds au plus vite.',
      'msg.fail': 'Le message n\'a pas pu être envoyé. Écrivez-moi directement à ' + EMAIL + '.'
    },

    en: {
      'meta.title': 'Hafsa Lamtalssi — Web Developer in Brussels',
      'meta.desc': 'Portfolio of Hafsa Lamtalssi, junior web developer in Brussels: React, TypeScript, PHP, Node.js — with a graphic designer\'s eye.',
      'skip': 'Skip to content',
      'intro': 'Portfolio — 2026 Edition',
      'folio': 'N° 01 — Cover',
      'aria.top': 'Hafsa Lamtalssi, back to top',
      'aria.nav': 'Main navigation',
      'aria.lang': 'Language',
      'nav.about': 'About', 'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.path': 'Background', 'nav.contact': 'Contact',
      'issue.ed': '2026 Edition', 'issue.role': 'Web Developer — Brussels',
      'tagline': 'Looking for a web development internship.',
      'btn.contact': 'Contact me' + ARROW_UP,
      'btn.cv': 'Download my CV (PDF, in French)' + ARROW_DOWN,
      'btn.work': 'See my work' + ARROW_DOWN,
      'alt.cover': 'Portrait of Hafsa Lamtalssi smiling on a balcony at sunset, Brussels',
      'cap.cover': 'Hafsa Lamtalssi — Brussels, 2026',
      'h.about': 'N° 02 — About', 't.about': 'The <em>portrait</em>',
      'alt.about': 'Hafsa Lamtalssi in profile, leaning on a railing overlooking the city',
      'f.age': 'Age', 'f.city': 'City', 'f.status': 'Status',
      'v.age': '22 years old', 'v.city': 'Brussels', 'v.status': 'Final year — Web Dev',
      'about.p1': 'I\'m 22, I live in Brussels and I\'m in my final year of web development. Before writing code, I spent two years studying graphic design — learning grids, colour and typography.',
      'about.p2': 'That background makes me a developer who builds interfaces with real attention to detail, typography and user experience. <strong>I\'m currently looking for an internship or a first job in web development.</strong>',
      'about.pull': 'Good code reads like a beautiful page: every detail has its place.',
      'alt.spread': 'Hafsa Lamtalssi watching the sunset over the rooftops of Brussels',
      'quote': '“Code first, with a designer\'s eye.”',
      'h.skills': 'N° 03 — Skills', 't.skills': 'The <em>contents</em>',
      'sk.tools': 'Tools <span>03</span>', 'sk.rest': 'REST APIs <span>04</span>', 'sk.typo': 'Typography <span>03</span>',
      'h.projects': 'N° 04 — Projects — Development', 't.projects': 'The <em>work</em>',
      'p1': 'E-commerce shop for a perfume brand specialising in oud: catalogue, cart and checkout.',
      'p2': 'Task management app with authentication and a REST API.',
      'p3': 'Showcase website and booking system for a Brussels restaurant.',
      'p4': 'Real-time weather data visualisation using a public API.',
      'p.site': 'View site ↗',
      'h.graphic': 'N° 05 — Graphic work', 't.graphic': 'In the <em>margins</em> of code',
      'g1': 'Poster — Bau und Kunst', 'cap.g1': '01 · Poster — Bau und Kunst',
      'g2': 'Visual identity — Monogram', 'cap.g2': '02 · Visual identity — Monogram',
      'g3': 'Layout — Magazine', 'cap.g3': '03 · Layout — Magazine',
      'g4': 'Album cover', 'cap.g4': '04 · Album cover',
      'g5': 'Packaging — Artisan tea', 'cap.g5': '05 · Packaging — Artisan tea',
      'g6': 'Experimental typography', 'cap.g6': '06 · Experimental typography',
      'h.path': 'N° 06 — Background', 't.path': 'The <em>path</em>',
      'path.web': 'Web Development', 'path.final': 'Final year', 'path.graphic': 'Graphic Design', 'path.2y': '2 years',
      'h.contact': 'N° 07 — Contact', 't.contact': 'Let\'s work <em>together.</em>',
      'c.email': 'Email', 'c.phone': 'Phone', 'c.place': 'Location', 'c.where': 'Based in Brussels, Belgium',
      'copy': 'Copy', 'copied': 'Copied',
      'btn.cv2': 'Download my CV (PDF, in French) ↓',
      'form.name': 'Name', 'form.email': 'Email', 'form.msg': 'Message',
      'form.consent': 'I agree that my data will only be used to reply to my message.',
      'form.send': 'Send <span aria-hidden="true">→</span>',
      'footer': '© 2026 Hafsa Lamtalssi — Designed by Hafsa Lamtalssi.',
      'end': 'End — p. 28',
      'theme.dark': 'Dark mode', 'theme.light': 'Light mode',
      'msg.fill': 'Please fill in your name, email and message.',
      'msg.email': 'This email address doesn\'t look valid.',
      'msg.consent': 'Please tick the consent box.',
      'msg.off': 'The form isn\'t active yet. Email me directly at ' + EMAIL + '.',
      'msg.sending': 'Sending…',
      'msg.ok': 'Thank you, your message has been sent. I\'ll get back to you soon.',
      'msg.fail': 'Your message couldn\'t be sent. Email me directly at ' + EMAIL + '.'
    },

    nl: {
      'meta.title': 'Hafsa Lamtalssi — Webontwikkelaar in Brussel',
      'meta.desc': 'Portfolio van Hafsa Lamtalssi, junior webontwikkelaar in Brussel: React, TypeScript, PHP, Node.js — met het oog van een grafisch ontwerper.',
      'skip': 'Naar de inhoud',
      'intro': 'Portfolio — Editie 2026',
      'folio': 'N° 01 — Cover',
      'aria.top': 'Hafsa Lamtalssi, naar boven',
      'aria.nav': 'Hoofdnavigatie',
      'aria.lang': 'Taal',
      'nav.about': 'Over mij', 'nav.skills': 'Vaardigheden', 'nav.projects': 'Projecten', 'nav.path': 'Traject', 'nav.contact': 'Contact',
      'issue.ed': 'Editie 2026', 'issue.role': 'Webontwikkelaar — Brussel',
      'tagline': 'Op zoek naar een stage in webontwikkeling.',
      'btn.contact': 'Contacteer mij' + ARROW_UP,
      'btn.cv': 'Download mijn cv (pdf, in het Frans)' + ARROW_DOWN,
      'btn.work': 'Bekijk mijn werk' + ARROW_DOWN,
      'alt.cover': 'Portret van Hafsa Lamtalssi, glimlachend op een balkon bij zonsondergang, Brussel',
      'cap.cover': 'Hafsa Lamtalssi — Brussel, 2026',
      'h.about': 'N° 02 — Over mij', 't.about': 'Het <em>portret</em>',
      'alt.about': 'Hafsa Lamtalssi van opzij, leunend op een balustrade met uitzicht op de stad',
      'f.age': 'Leeftijd', 'f.city': 'Stad', 'f.status': 'Status',
      'v.age': '22 jaar', 'v.city': 'Brussel', 'v.status': 'Laatste jaar — Webontwikkeling',
      'about.p1': 'Ik ben 22, woon in Brussel en zit in mijn laatste jaar webontwikkeling. Voor ik begon te programmeren, studeerde ik twee jaar grafische vormgeving — waar ik leerde werken met grid, kleur en typografie.',
      'about.p2': 'Door die achtergrond bouw ik interfaces met echte aandacht voor detail, typografie en gebruikerservaring. <strong>Ik ben momenteel op zoek naar een stage of een eerste job in webontwikkeling.</strong>',
      'about.pull': 'Goede code leest als een mooie pagina: elk detail heeft zijn plaats.',
      'alt.spread': 'Hafsa Lamtalssi kijkt naar de zonsondergang boven de daken van Brussel',
      'quote': '„Eerst de code, met het oog van een ontwerper.”',
      'h.skills': 'N° 03 — Vaardigheden', 't.skills': 'De <em>inhoud</em>',
      'sk.tools': 'Tools <span>03</span>', 'sk.rest': 'REST-API <span>04</span>', 'sk.typo': 'Typografie <span>03</span>',
      'h.projects': 'N° 04 — Projecten — Ontwikkeling', 't.projects': 'Het <em>werk</em>',
      'p1': 'Webshop voor een parfummerk gespecialiseerd in oud: catalogus, winkelmandje en betaling.',
      'p2': 'Takenbeheer-app met authenticatie en een REST-API.',
      'p3': 'Bedrijfswebsite en reservatiesysteem voor een Brussels restaurant.',
      'p4': 'Realtime visualisatie van weergegevens via een publieke API.',
      'p.site': 'Bekijk de site ↗',
      'h.graphic': 'N° 05 — Grafisch werk', 't.graphic': 'In de <em>marge</em> van de code',
      'g1': 'Affiche — Bau und Kunst', 'cap.g1': '01 · Affiche — Bau und Kunst',
      'g2': 'Visuele identiteit — Monogram', 'cap.g2': '02 · Visuele identiteit — Monogram',
      'g3': 'Lay-out — Magazine', 'cap.g3': '03 · Lay-out — Magazine',
      'g4': 'Albumhoes', 'cap.g4': '04 · Albumhoes',
      'g5': 'Verpakking — Ambachtelijke thee', 'cap.g5': '05 · Verpakking — Ambachtelijke thee',
      'g6': 'Experimentele typografie', 'cap.g6': '06 · Experimentele typografie',
      'h.path': 'N° 06 — Traject', 't.path': 'De <em>weg</em>',
      'path.web': 'Webontwikkeling', 'path.final': 'Laatste jaar', 'path.graphic': 'Grafische vormgeving', 'path.2y': '2 jaar',
      'h.contact': 'N° 07 — Contact', 't.contact': 'Laten we <em>samenwerken.</em>',
      'c.email': 'E-mail', 'c.phone': 'Telefoon', 'c.place': 'Locatie', 'c.where': 'Gevestigd in Brussel, België',
      'copy': 'Kopiëren', 'copied': 'Gekopieerd',
      'btn.cv2': 'Download mijn cv (pdf, in het Frans) ↓',
      'form.name': 'Naam', 'form.email': 'E-mail', 'form.msg': 'Bericht',
      'form.consent': 'Ik ga ermee akkoord dat mijn gegevens enkel gebruikt worden om op mijn bericht te antwoorden.',
      'form.send': 'Verzenden <span aria-hidden="true">→</span>',
      'footer': '© 2026 Hafsa Lamtalssi — Ontworpen door Hafsa Lamtalssi.',
      'end': 'Einde — p. 28',
      'theme.dark': 'Donkere modus', 'theme.light': 'Lichte modus',
      'msg.fill': 'Vul uw naam, e-mailadres en bericht in.',
      'msg.email': 'Dit e-mailadres lijkt niet geldig.',
      'msg.consent': 'Vink het vakje voor toestemming aan.',
      'msg.off': 'Het formulier is nog niet actief. Mail me rechtstreeks op ' + EMAIL + '.',
      'msg.sending': 'Bezig met verzenden…',
      'msg.ok': 'Bedankt, uw bericht is verzonden. Ik antwoord u zo snel mogelijk.',
      'msg.fail': 'Uw bericht kon niet worden verzonden. Mail me rechtstreeks op ' + EMAIL + '.'
    }
  };

  var LANGS = ['fr', 'en', 'nl'];
  var OG = { fr: 'fr_BE', en: 'en_GB', nl: 'nl_BE' };
  var current = 'fr';
  var NAMES = { fr: 'français', en: 'English', nl: 'Nederlands' };

  // Texte d'une clé dans la langue active (repli : français)
  window.T = function (key, fallback) {
    var d = DICT[current];
    if (d && d[key] != null) return d[key];
    if (DICT.fr[key] != null) return DICT.fr[key];
    return fallback != null ? fallback : key;
  };
  window.getLang = function () { return current; };

  function setMeta(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'fr';
    current = lang;
    var d = DICT[lang];

    // Le français d'origine est gardé la première fois, pour pouvoir y revenir
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.fr == null) el.dataset.fr = el.innerHTML;
      var k = el.getAttribute('data-i18n');
      el.innerHTML = lang === 'fr' || d[k] == null ? el.dataset.fr : d[k];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      if (el.dataset.frAlt == null) el.dataset.frAlt = el.getAttribute('alt') || '';
      var k = el.getAttribute('data-i18n-alt');
      el.setAttribute('alt', lang === 'fr' || d[k] == null ? el.dataset.frAlt : d[k]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      if (el.dataset.frAria == null) el.dataset.frAria = el.getAttribute('aria-label') || '';
      var k = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', lang === 'fr' || d[k] == null ? el.dataset.frAria : d[k]);
    });

    document.documentElement.setAttribute('lang', lang);
    document.title = T('meta.title');
    setMeta('meta[name="description"]', 'content', T('meta.desc'));
    setMeta('meta[property="og:title"]', 'content', T('meta.title'));
    setMeta('meta[property="og:locale"]', 'content', OG[lang]);

    document.querySelectorAll('.lang-menu button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    var cur = document.querySelector('.lang-cur');
    if (cur) cur.textContent = lang.toUpperCase();
    var lb = document.querySelector('.lang-btn');
    if (lb) lb.setAttribute('aria-label', T('aria.lang') + ' : ' + NAMES[lang]);
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  // Langue de départ : français, sauf lien ?lang=en / ?lang=nl ou choix déjà fait par le visiteur
  function initial() {
    var m = /[?&]lang=(fr|en|nl)\b/.exec(location.search);
    if (m) return m[1];
    try { var saved = localStorage.getItem('lang'); if (LANGS.indexOf(saved) !== -1) return saved; } catch (e) {}
    return 'fr';
  }

  // Bouton de langue : un clic ouvre la liste FR / EN / NL
  var box = document.querySelector('.lang');
  var btn = document.querySelector('.lang-btn');
  var menu = document.getElementById('lang-menu');
  function setOpen(open) {
    if (!btn || !menu) return;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.hidden;
      setOpen(open);
      if (open) { var on = menu.querySelector('[aria-pressed="true"]'); if (on) on.focus(); }
    });
    menu.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var lang = b.getAttribute('data-lang');
        try { localStorage.setItem('lang', lang); } catch (e) {}
        apply(lang);
        setOpen(false);
        btn.focus();
      });
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
  }

  apply(initial());
})();
