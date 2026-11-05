/* Maison Oud — script.js
   Fichier JavaScript externe partagé par les 3 pages du site. */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Année du copyright mise à jour automatiquement dans le pied de page */
  var footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    var annee = new Date().getFullYear();
    footerCopy.textContent = '© ' + annee + ' — Maison Oud';
  }

  /* 2. Curseur "Intensité souhaitée" (formulaire.html) :
        affiche la valeur choisie à côté du champ. */
  var intensite = document.getElementById('intensite');
  if (intensite) {
    var affichage = document.createElement('span');
    affichage.id = 'intensite-valeur';
    affichage.style.marginLeft = '12px';
    affichage.style.color = 'var(--or)';
    affichage.style.fontSize = '11px';
    affichage.textContent = intensite.value;
    intensite.insertAdjacentElement('afterend', affichage);

    intensite.addEventListener('input', function () {
      affichage.textContent = intensite.value;
    });
  }

  /* 3. Validation simple du formulaire de commande avant envoi */
  var form = document.getElementById('main-form');
  if (form) {
    form.addEventListener('submit', function (evt) {
      var erreurs = [];

      var prenom = document.getElementById('prenom');
      var nom = document.getElementById('nom');
      var email = document.getElementById('email');
      var fragrance = document.getElementById('fragrance');

      if (prenom && prenom.value.trim() === '') erreurs.push('Le prénom est requis.');
      if (nom && nom.value.trim() === '') erreurs.push('Le nom est requis.');
      if (email && email.value.trim() === '') erreurs.push('L\'adresse e-mail est requise.');
      if (fragrance && fragrance.value === '') erreurs.push('Merci de choisir une fragrance.');

      var zoneMessage = document.getElementById('form-message');
      if (!zoneMessage) {
        zoneMessage = document.createElement('p');
        zoneMessage.id = 'form-message';
        zoneMessage.style.gridColumn = '1 / -1';
        zoneMessage.style.fontSize = '11px';
        zoneMessage.style.marginTop = '10px';
        form.appendChild(zoneMessage);
      }

      if (erreurs.length > 0) {
        evt.preventDefault();
        zoneMessage.style.color = '#d98c8c';
        zoneMessage.textContent = erreurs.join(' ');
      } else {
        zoneMessage.style.color = 'var(--or)';
        zoneMessage.textContent = 'Merci ! Votre commande est prête à être envoyée.';
      }
    });
  }

  /* 4. Ouverture du sous-menu "Collection" au clic (utile sur écran tactile,
        en plus du survol déjà géré en CSS). */
  var hasSub = document.querySelector('#main-nav li.has-sub > a');
  if (hasSub) {
    hasSub.addEventListener('click', function (evt) {
      var submenu = hasSub.parentElement.querySelector('.submenu');
      if (submenu && window.matchMedia('(hover: none)').matches) {
        evt.preventDefault();
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

});
