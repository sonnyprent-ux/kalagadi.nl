/* Kgalagadi.nl: route (lijst <-> kaart) en aanmeldformulier */
(function () {
  'use strict';

  // ---- route: lijst <-> kaart ----
  var days = [].slice.call(document.querySelectorAll('.day'));
  var pins = [].slice.call(document.querySelectorAll('.pin'));
  var segs = [].slice.call(document.querySelectorAll('.seg'));
  var capDay = document.getElementById('cap-day');
  var capTitle = document.getElementById('cap-title');

  function setDay(el) {
    days.forEach(function (d) { d.classList.toggle('on', d === el); });
    pins.forEach(function (p) { p.classList.toggle('on', p.id === 'pin-' + el.dataset.place); });
    segs.forEach(function (s) { s.classList.toggle('on', s.id === 'seg' + el.dataset.day); });
    if (capDay) capDay.textContent = 'Dag ' + el.dataset.day;
    if (capTitle) capTitle.textContent = el.querySelector('h4').textContent;
  }

  days.forEach(function (el) {
    el.addEventListener('click', function () { setDay(el); });
    el.addEventListener('focus', function () { setDay(el); });
    el.addEventListener('mouseenter', function () { setDay(el); });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setDay(e.target); });
    }, { rootMargin: '-40% 0px -52% 0px' });
    days.forEach(function (d) { io.observe(d); });
  }
  if (days.length) setDay(days[0]);

  // ---- aanmeldformulier ----
  // GitHub Pages heeft geen server. Standaard opent dit formulier daarom het
  // e-mailprogramma van de bezoeker met een ingevulde aanvraag. Wil je dat de
  // aanvragen direct binnenkomen? Zet hieronder een Formspree-adres neer,
  // zie README.md, stap "Formulier".
  var FORM_ENDPOINT = ''; // bijvoorbeeld: 'https://formspree.io/f/abcdwxyz'
  var MAIL_TO = 'hallo@kgalagadi.nl'; // vervang door jullie echte adres

  var form = document.getElementById('aanmelden');
  if (form) {
    var thanks = document.getElementById('thanks');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var naam = document.getElementById('f-naam').value.trim();
      var mail = document.getElementById('f-mail').value.trim();
      var aantal = document.getElementById('f-aantal').value;
      var msg = document.getElementById('f-msg').value;
      if (!naam || !mail) {
        (naam ? document.getElementById('f-mail') : document.getElementById('f-naam')).focus();
        return;
      }

      if (FORM_ENDPOINT) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ naam: naam, email: mail, reisgezelschap: aantal, bericht: msg })
        }).then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          thanks.textContent = 'Bedankt! We hebben je aanvraag ontvangen en reageren zo snel mogelijk.';
          thanks.classList.add('show');
          form.reset();
        }).catch(function () {
          thanks.textContent = 'Er ging iets mis met versturen. Stuur ons gerust een e-mail via ' + MAIL_TO + '.';
          thanks.classList.add('show');
        }).then(function () { if (btn) btn.disabled = false; });
        return;
      }

      var body = 'Naam: ' + naam + '\nE-mail: ' + mail + '\nReisgezelschap: ' + aantal + '\n\n' + msg;
      thanks.classList.add('show');
      window.location.href = 'mailto:' + MAIL_TO +
        '?subject=' + encodeURIComponent('Aanmelding groepsreis Kgalagadi') +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
