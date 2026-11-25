/* theme.js: draait in de <head>, vóór de pagina getekend wordt.
   Zet html.dark als de bezoeker eerder donker koos (anders blijft de site licht),
   en html.js zodat de CSS weet dat JavaScript werkt. */
(function () {
  var html = document.documentElement;
  html.classList.remove("no-js");
  html.classList.add("js");
  try {
    if (localStorage.getItem("theme") === "dark") html.classList.add("dark");
  } catch (e) { /* opslag geblokkeerd: dan gewoon licht */ }
})();
