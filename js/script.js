/* ======================================================================
   script.js
   Bevat GEEN persoonlijke gegevens, alleen gedrag (interactie).
   Je hoeft dit bestand normaal niet aan te passen.
   ====================================================================== */

// --- 1. Menu op de telefoon open/dicht --------------------------------
const menuToggle = document.getElementById("menuToggle");
const tabnav = document.getElementById("tabnav");

function setMenu(open) {
  tabnav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

// menu sluiten na het kiezen van een link, of met Escape
tabnav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

// --- 2. Actieve tab markeren tijdens het scrollen ---------------------
const sections = document.querySelectorAll("main .section[id]");
const tabs = document.querySelectorAll(".tab");

function markTab(id) {
  tabs.forEach((tab) => {
    const href = tab.getAttribute("href");
    // alleen tabs die naar een stuk van DEZE pagina wijzen (#...).
    // Zo blijft de tab van school.html (aria-current="page") met rust.
    if (!href.startsWith("#")) return;
    if (href === `#${id}`) tab.setAttribute("aria-current", "location");
    else tab.removeAttribute("aria-current");
  });
}

const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) markTab(entry.target.id);
      });
    },
    { rootMargin: "-35% 0px -60% 0px" } // actief zodra de sectie rond het midden van het scherm staat
);
sections.forEach((section) => observer.observe(section));

// --- 3. Jaartal in de footer ------------------------------------------
document.getElementById("jaar").textContent = String(new Date().getFullYear());

// --- 4. Donkere modus aan/uit, met onthouden voorkeur ------------------
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

function showTheme() {
  const dark = htmlEl.classList.contains("dark");
  themeToggle.setAttribute("aria-pressed", String(dark));
}
showTheme();

themeToggle.addEventListener("click", () => {
  const dark = htmlEl.classList.toggle("dark");
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) { /* niet erg */ }
  showTheme();
});