/* Maison Oud — script.js
   Fichier JavaScript externe partagé par les 3 pages du site. */

document.addEventListener('DOMContentLoaded', function () {

  /* Affiche un message sous un formulaire (vert doré si tout va bien, rouge sinon) */
  function afficher(zone, texte, ok) {
    if (!zone) return;
    zone.textContent = texte;
    zone.className = 'form-message ' + (ok ? 'ok' : 'err');
  }

  var emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* 1. Année du copyright mise à jour automatiquement dans le pied de page */
  var footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    footerCopy.textContent = '© ' + new Date().getFullYear() + ' — Maison Oud';
  }

  /* 2. Curseur "Intensité souhaitée" (formulaire.html) :
        affiche la valeur choisie à côté du champ. */
  var intensite = document.getElementById('intensite');
  if (intensite) {
    var noms = ['', 'Légère', 'Douce', 'Équilibrée', 'Intense', 'Absolue'];
    var affichage = document.createElement('output');
    affichage.id = 'intensite-valeur';
    affichage.setAttribute('for', 'intensite');
    intensite.insertAdjacentElement('afterend', affichage);

    function majIntensite() {
      affichage.textContent = intensite.value + ' / 5 — ' + noms[intensite.value];
      intensite.setAttribute('aria-valuetext', noms[intensite.value]);
    }
    intensite.addEventListener('input', majIntensite);
    majIntensite();
  }

  /* 3. Formulaire de commande : vérification des champs avant envoi.
        Site de démonstration : rien n'est envoyé, on affiche une confirmation. */
  var form = document.getElementById('main-form');
  if (form) {
    var zoneMessage = document.getElementById('form-message');

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var erreurs = [];
      var premierChampFaux = null;

      function verifier(id, condition, message) {
        var champ = document.getElementById(id);
        if (!champ) return;
        var faux = !condition(champ);
        champ.setAttribute('aria-invalid', faux ? 'true' : 'false');
        if (faux) {
          erreurs.push(message);
          if (!premierChampFaux) premierChampFaux = champ;
        }
      }

      verifier('prenom', function (c) { return c.value.trim() !== ''; }, 'Le prénom est requis.');
      verifier('nom', function (c) { return c.value.trim() !== ''; }, 'Le nom est requis.');
      verifier('email', function (c) { return emailValide.test(c.value.trim()); }, 'Une adresse e-mail valide est requise.');
      verifier('password', function (c) { return c.value === '' || c.value.length >= 8; }, 'Le mot de passe doit contenir au moins 8 caractères.');
      verifier('fragrance', function (c) { return c.value !== ''; }, 'Merci de choisir une fragrance.');
      verifier('quantite', function (c) { return c.value === '' || (+c.value >= 1 && +c.value <= 10); }, 'La quantité doit être comprise entre 1 et 10.');

      if (erreurs.length > 0) {
        afficher(zoneMessage, erreurs.join(' '), false);
        premierChampFaux.focus();
        return;
      }

      var prenom = document.getElementById('prenom').value.trim();
      afficher(zoneMessage, 'Merci ' + prenom + ', votre commande est bien prise en compte. (Site de démonstration : rien n\'a été envoyé.)', true);
      form.reset();
      if (intensite) intensite.dispatchEvent(new Event('input'));
    });

    form.addEventListener('reset', function () {
      setTimeout(function () {
        form.querySelectorAll('[aria-invalid]').forEach(function (c) { c.removeAttribute('aria-invalid'); });
      }, 0);
    });
  }

  /* 4. Connexion (index.html) : vérification et message de démonstration */
  var login = document.getElementById('login-form');
  if (login) {
    var zoneLogin = document.getElementById('login-message');
    login.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var email = document.getElementById('lg-email');
      var pass = document.getElementById('lg-pass');
      if (!emailValide.test(email.value.trim())) {
        afficher(zoneLogin, 'Adresse e-mail invalide.', false);
        email.focus();
      } else if (pass.value === '') {
        afficher(zoneLogin, 'Mot de passe requis.', false);
        pass.focus();
      } else {
        afficher(zoneLogin, 'Connexion simulée : site de démonstration.', true);
        login.reset();
      }
    });

    var oubli = login.querySelector('.forgot');
    if (oubli) {
      oubli.addEventListener('click', function (evt) {
        evt.preventDefault();
        afficher(zoneLogin, 'Site de démonstration : la récupération du mot de passe n\'est pas active.', true);
      });
    }
  }

  /* 5. Sous-menu "Collection" : ouverture au toucher sur écran tactile
        (le survol et le clavier sont gérés en CSS). */
  var parent = document.querySelector('#main-nav li.has-sub');
  if (parent) {
    var lien = parent.querySelector('a');
    lien.setAttribute('aria-haspopup', 'true');
    lien.setAttribute('aria-expanded', 'false');

    function ouvrir(etat) {
      parent.classList.toggle('open', etat);
      lien.setAttribute('aria-expanded', etat ? 'true' : 'false');
    }

    lien.addEventListener('click', function (evt) {
      if (window.matchMedia('(hover: none)').matches && !parent.classList.contains('open')) {
        evt.preventDefault();
        ouvrir(true);
      }
    });
    document.addEventListener('click', function (evt) {
      if (!parent.contains(evt.target)) ouvrir(false);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') ouvrir(false);
    });
  }

});
