/* Poster interaktif — klik/tap mana-mana kawasan => buka Google Form (tab sama). */
(function () {
  "use strict";
  var GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdIWbQHpjLlvTuCH0X7gv6DH2ZARXH3KQwr7KA5pZM1qn3JqA/viewform";

  var go = false;
  function openForm(e) {
    if (go) return;
    go = true;
    if (e && e.preventDefault) e.preventDefault();
    window.location.href = GOOGLE_FORM_URL;
    // benarkan cuba semula jika pengguna tekan "back" (bfcache)
    setTimeout(function () { go = false; }, 1500);
  }

  var poster = document.getElementById("poster");
  if (poster) poster.addEventListener("click", openForm);

  // Ruang kosong di luar poster (desktop / skrin lebar) pun boleh diklik.
  document.body.addEventListener("click", openForm);

  // Papar semula dengan betul bila kembali dari Google Form.
  window.addEventListener("pageshow", function () { go = false; });

  // Tekan papan kekunci (Enter / Space) pada poster.
  if (poster) poster.addEventListener("keydown", function (e) {
    if (e.key === " ") openForm(e);
  });
})();
