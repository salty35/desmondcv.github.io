/* ======================================================================
   script.js
   Bevat GEEN persoonlijke gegevens — alleen gedrag (interactie).
   Je hoeft dit bestand normaal niet aan te passen.
   ====================================================================== */

// --- 1. Mobiel klapmenu open/dicht ---------------------------------
const menuToggle = document.getElementById("menuToggle");
const tabnav = document.getElementById("tabnav");

menuToggle.addEventListener("click", () => {
  const isOpen = tabnav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// menu sluiten na het kiezen van een link (fijn op mobiel)
tabnav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    tabnav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// --- 2. Actieve tab markeren tijdens het scrollen -------------------
const sections = document.querySelectorAll(".section[id]");
const tabs = document.querySelectorAll(".tab");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        tabs.forEach((tab) => {
          tab.classList.toggle("is-active", tab.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // "actief" telt zodra sectie rond het midden van het scherm staat
);

sections.forEach((section) => observer.observe(section));

// --- 3. Jaartal in de footer automatisch bijwerken ------------------
document.getElementById("jaar").textContent = new Date().getFullYear();

// --- 4. Dark mode aan/uit, met onthouden voorkeur ------------------
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

// eerder gekozen voorkeur ophalen (indien aanwezig)
if (localStorage.getItem("theme") === "dark") {
  htmlEl.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = htmlEl.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
