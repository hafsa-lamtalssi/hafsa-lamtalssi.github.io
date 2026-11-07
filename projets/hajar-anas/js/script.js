/* Hajar & Anas — script.js
   Fichier partagé par les 3 pages : menu, compteurs, configurateur,
   filtres de la galerie, récapitulatif et vérification du formulaire. */

document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────────────────
     Catalogue : une seule source pour les prix et les noms
  ────────────────────────────────────────── */
  var CATALOGUE = {
    rose:       { prix: 2.50, un: 'rose',             plusieurs: 'roses' },
    tulipe:     { prix: 1.80, un: 'tulipe',           plusieurs: 'tulipes' },
    pivoine:    { prix: 3.20, un: 'pivoine',          plusieurs: 'pivoines' },
    lys:        { prix: 2.90, un: 'lys',              plusieurs: 'lys' },
    tournesol:  { prix: 1.60, un: 'tournesol',        plusieurs: 'tournesols' },
    orchidee:   { prix: 4.50, un: 'orchidée',         plusieurs: 'orchidées' },
    marguerite: { prix: 1.20, un: 'marguerite',       plusieurs: 'marguerites' },
    hibiscus:   { prix: 2.10, un: 'hibiscus',         plusieurs: 'hibiscus' },
    feuillage:  { prix: 0.80, un: 'tige de feuillage', plusieurs: 'tiges de feuillage' }
  };
  var LIVRAISON_OFFERTE = 30;
  var MAX_TIGES = 50;

  function prix(euros) {
    return euros.toFixed(2).replace('.', ',') + ' €';
  }

  function nomFleur(fleur, quantite) {
    var f = CATALOGUE[fleur];
    return quantite > 1 ? f.plusieurs : f.un;
  }

  // « 5 roses, 2 tulipes et 1 lys »
  function phrase(bouquet) {
    var morceaux = bouquet.map(function (l) { return l.quantite + ' ' + nomFleur(l.fleur, l.quantite); });
    if (morceaux.length <= 1) return morceaux.join('');
    return morceaux.slice(0, -1).join(', ') + ' et ' + morceaux[morceaux.length - 1];
  }

  /* ──────────────────────────────────────────
     1. Menu burger (mobile)
  ────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    function ouvrirMenu(ouvert) {
      navLinks.classList.toggle('ouvert', ouvert);
      burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    }
    burger.addEventListener('click', function () {
      ouvrirMenu(!navLinks.classList.contains('ouvert'));
    });
    navLinks.addEventListener('click', function (evt) {
      if (evt.target.closest('a')) ouvrirMenu(false);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' && navLinks.classList.contains('ouvert')) {
        ouvrirMenu(false);
        burger.focus();
      }
    });
  }

  /* ──────────────────────────────────────────
     2. Compteurs de tiges (boutons − et +)
  ────────────────────────────────────────── */
  var compteurs = Array.prototype.slice.call(document.querySelectorAll('.compteur-item'));

  function champ(item) { return item.querySelector('.compteur-val'); }

  function borner(input) {
    var v = parseInt(input.value, 10);
    if (isNaN(v) || v < 0) v = 0;
    if (v > MAX_TIGES) v = MAX_TIGES;
    input.value = v;
    return v;
  }

  function changer(input, valeur) {
    input.value = valeur;
    borner(input);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  compteurs.forEach(function (item) {
    var input = champ(item);
    item.querySelectorAll('[data-delta]').forEach(function (bouton) {
      bouton.addEventListener('click', function () {
        changer(input, (parseInt(input.value, 10) || 0) + parseInt(bouton.dataset.delta, 10));
      });
    });
    // Valeur tapée au clavier : on la ramène entre 0 et 50
    input.addEventListener('change', function () { changer(input, input.value); });
  });

  // Liste des fleurs choisies : [{ fleur: 'rose', quantite: 5 }, …]
  function lireBouquet() {
    var bouquet = [];
    compteurs.forEach(function (item) {
      var q = parseInt(champ(item).value, 10) || 0;
      if (q > 0) bouquet.push({ fleur: item.dataset.fleur, quantite: q });
    });
    return bouquet;
  }

  function totalBouquet(bouquet) {
    return bouquet.reduce(function (somme, l) { return somme + l.quantite * CATALOGUE[l.fleur].prix; }, 0);
  }

  function nombreTiges(bouquet) {
    return bouquet.reduce(function (somme, l) { return somme + l.quantite; }, 0);
  }

  /* ──────────────────────────────────────────
     3. Curseur « taille du bouquet » : affiche la valeur choisie
  ────────────────────────────────────────── */
  function categorie(tiges) {
    if (tiges < 20) return 'Petit';
    if (tiges < 40) return 'Moyen';
    if (tiges < 60) return 'Grand';
    return 'Luxe';
  }

  var curseurs = Array.prototype.slice.call(document.querySelectorAll('input[type="range"]'));
  function majCurseur(curseur) {
    var sortie = document.getElementById(curseur.id + '-valeur');
    var texte = curseur.value + ' tiges — ' + categorie(+curseur.value);
    curseur.setAttribute('aria-valuetext', texte);
    if (sortie) sortie.innerHTML = curseur.value + ' tiges — <em>' + categorie(+curseur.value) + '</em>';
  }
  curseurs.forEach(function (c) {
    c.addEventListener('input', function () { majCurseur(c); });
    majCurseur(c);
  });

  /* ──────────────────────────────────────────
     4. Configurateur de l'accueil
  ────────────────────────────────────────── */
  var configBoutons = document.querySelectorAll('.config-fleur');
  var recapTexte = document.getElementById('recap-text');
  var btnCommander = document.getElementById('btn-commander');
  var tailleAccueil = document.getElementById('total-tiges');

  function compteurDe(fleur) {
    return document.querySelector('.compteur-item[data-fleur="' + fleur + '"]');
  }

  function majConfigurateur() {
    var bouquet = lireBouquet();

    // Chaque fleur n'affiche son compteur que si elle est choisie
    configBoutons.forEach(function (b) {
      var item = compteurDe(b.dataset.fleur);
      var choisie = (parseInt(champ(item).value, 10) || 0) > 0;
      b.setAttribute('aria-pressed', choisie ? 'true' : 'false');
      item.hidden = !choisie;
    });
    var vide = document.querySelector('.compteur-vide');
    if (vide) vide.hidden = bouquet.length > 0;

    if (bouquet.length === 0) {
      recapTexte.innerHTML = 'Choisissez au moins une <em>fleur</em>';
      btnCommander.setAttribute('aria-disabled', 'true');
      btnCommander.setAttribute('href', 'formulaire.html');
      return;
    }

    recapTexte.innerHTML = phrase(bouquet) + ' — <em>' + prix(totalBouquet(bouquet)) + '</em>';

    // Le bouquet est transmis au formulaire dans l'adresse : formulaire.html?rose=5&tulipe=2&taille=20
    var params = bouquet.map(function (l) { return l.fleur + '=' + l.quantite; });
    if (tailleAccueil) params.push('taille=' + tailleAccueil.value);
    btnCommander.setAttribute('href', 'formulaire.html?' + params.join('&'));
    btnCommander.removeAttribute('aria-disabled');
  }

  if (configBoutons.length && recapTexte && btnCommander) {
    configBoutons.forEach(function (b) {
      b.addEventListener('click', function () {
        var item = compteurDe(b.dataset.fleur);
        var input = champ(item);
        var dejaChoisie = (parseInt(input.value, 10) || 0) > 0;
        changer(input, dejaChoisie ? 0 : 1);
        if (!dejaChoisie) input.focus();
      });
    });
    document.querySelector('.compteur-row').addEventListener('input', majConfigurateur);
    if (tailleAccueil) tailleAccueil.addEventListener('input', majConfigurateur);
    majConfigurateur();
  }

  /* ──────────────────────────────────────────
     5. Filtres de la galerie
  ────────────────────────────────────────── */
  var filtres = document.querySelectorAll('.filtre-btn');
  if (filtres.length) {
    var cartes = document.querySelectorAll('.galerie-grid .fleur-card');
    var compte = document.getElementById('filtre-compte');
    var vide = document.querySelector('.galerie-vide');

    function filtrer(categorieChoisie) {
      var visibles = 0;
      cartes.forEach(function (carte) {
        var categories = (carte.dataset.categories || '').split(' ');
        var montrer = categorieChoisie === 'toutes' || categories.indexOf(categorieChoisie) !== -1;
        carte.hidden = !montrer;
        if (montrer) visibles++;
      });
      filtres.forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset.filtre === categorieChoisie ? 'true' : 'false');
      });
      if (compte) compte.textContent = visibles + (visibles > 1 ? ' fleurs' : ' fleur');
      if (vide) vide.hidden = visibles > 0;
    }

    filtres.forEach(function (b) {
      b.addEventListener('click', function () { filtrer(b.dataset.filtre); });
    });
  }

  /* ──────────────────────────────────────────
     6. Formulaire de commande
  ────────────────────────────────────────── */
  var form = document.getElementById('commande');
  if (form) {
    var lignes = document.getElementById('recap-lignes');
    var totalEl = document.getElementById('recap-total');
    var tigesEl = document.getElementById('recap-tiges');
    var livraisonEl = document.getElementById('recap-livraison');
    var jauge = document.getElementById('recap-jauge');
    var tailleForm = document.getElementById('taille-bouquet');
    var zoneMessage = document.getElementById('form-message');

    // a) Bouquet reçu depuis l'accueil ou la galerie (?rose=5&tulipe=2&taille=20)
    var params = new URLSearchParams(window.location.search);
    var fleursRecues = Object.keys(CATALOGUE).filter(function (f) { return params.has(f); });
    if (fleursRecues.length) {
      compteurs.forEach(function (item) {
        champ(item).value = params.has(item.dataset.fleur) ? params.get(item.dataset.fleur) : 0;
        borner(champ(item));
      });
    }
    if (params.has('taille') && tailleForm) {
      tailleForm.value = params.get('taille');
      majCurseur(tailleForm);
    }

    // b) Récapitulatif en direct
    function majRecap() {
      var bouquet = lireBouquet();
      var total = totalBouquet(bouquet);

      lignes.innerHTML = '';
      if (bouquet.length === 0) {
        var li = document.createElement('li');
        li.className = 'recap-vide';
        li.textContent = 'Aucune fleur pour l\'instant : ajoutez des tiges avec les boutons +.';
        lignes.appendChild(li);
      }
      bouquet.forEach(function (l) {
        var li = document.createElement('li');
        li.className = 'recap-ligne';
        var nom = CATALOGUE[l.fleur].un;
        li.innerHTML = '<span class="recap-fleur"><em>' + nom.charAt(0).toUpperCase() + nom.slice(1) + '</em> × ' + l.quantite + '</span>' +
                       '<span class="recap-prix">' + prix(l.quantite * CATALOGUE[l.fleur].prix) + '</span>';
        lignes.appendChild(li);
      });

      totalEl.textContent = prix(total);
      tigesEl.textContent = nombreTiges(bouquet);

      if (total >= LIVRAISON_OFFERTE) {
        livraisonEl.innerHTML = '<strong>✓ Livraison offerte</strong>';
      } else {
        livraisonEl.textContent = 'Encore ' + prix(LIVRAISON_OFFERTE - total) + ' pour la livraison offerte (dès 30 €).';
      }
      jauge.style.width = Math.min(100, total / LIVRAISON_OFFERTE * 100) + '%';

      compteurs.forEach(function (item) {
        item.classList.toggle('actif', (parseInt(champ(item).value, 10) || 0) > 0);
      });
    }

    document.querySelector('.compteurs-grid').addEventListener('input', majRecap);
    majRecap();

    // c) Vérification avant envoi
    function afficher(texte, ok) {
      zoneMessage.textContent = texte;
      zoneMessage.className = 'form-message ' + (ok ? 'ok' : 'err');
    }

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var erreurs = [];
      var premier = null;

      function verifier(el, valide, message) {
        if (!el) return;
        el.setAttribute('aria-invalid', valide ? 'false' : 'true');
        if (!valide) {
          erreurs.push(message);
          if (!premier) premier = el;
        }
      }

      var $ = function (id) { return document.getElementById(id); };
      verifier($('prenom'), $('prenom').value.trim() !== '', 'Le prénom est requis.');
      verifier($('nom'), $('nom').value.trim() !== '', 'Le nom est requis.');
      verifier($('email'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('email').value.trim()), 'Une adresse e-mail valide est requise.');
      verifier($('password'), $('password').value === '' || $('password').value.length >= 8, 'Le mot de passe doit contenir au moins 8 caractères.');
      verifier($('adresse'), $('adresse').value.trim() !== '', 'L\'adresse de livraison est requise.');
      verifier($('cp'), $('cp').value.trim() === '' || /^\d{4}$/.test($('cp').value.trim()), 'Le code postal belge contient 4 chiffres.');

      var bouquet = lireBouquet();
      if (bouquet.length === 0) {
        erreurs.push('Ajoutez au moins une fleur à votre bouquet.');
        if (!premier) premier = champ(compteurs[0]);
      }

      if (erreurs.length) {
        afficher(erreurs.join(' '), false);
        premier.focus();
        return;
      }

      afficher('Merci ' + $('prenom').value.trim() + ' ! Votre bouquet (' + phrase(bouquet) + ', ' +
               prix(totalBouquet(bouquet)) + ') est bien pris en compte. Site de démonstration : rien n\'a été envoyé.', true);
      form.reset();
    });

    // d) Après « Réinitialiser » : on remet le récap et le curseur à jour
    form.addEventListener('reset', function () {
      setTimeout(function () {
        form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
        if (tailleForm) majCurseur(tailleForm);
        majRecap();
      }, 0);
    });
  }

  /* ──────────────────────────────────────────
     7. Année du copyright mise à jour automatiquement
  ────────────────────────────────────────── */
  var footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    footerCopy.textContent = footerCopy.textContent.replace(/\d{4}/, new Date().getFullYear());
  }

});
