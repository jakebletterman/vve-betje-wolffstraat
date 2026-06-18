/* =====================================================
   VvE Betje Wolffstraat 12 t/m 70 — JavaScript
   ===================================================== */

/* ----- Google Form links -----
   Vervang de drie PLACEHOLDER-waarden hieronder met de echte Google Form URLs
   zodra de formulieren aangemaakt zijn.
   ---------------------------------------------------------- */
const FORM_EB = "https://docs.google.com/forms/PLACEHOLDER_EB"; // Eigenaar + zelf bewoner
const FORM_EV = "https://docs.google.com/forms/PLACEHOLDER_EV"; // Eigenaar + verhuurder
const FORM_HB = "https://docs.google.com/forms/PLACEHOLDER_HB"; // Huurder + bewoner

/* ----- Aankondigingen -----
   Voeg nieuwe aankondigingen toe aan het BEGIN van deze array.
   De eerste in de array verschijnt bovenaan de pagina (nieuwste eerst).

   Structuur van een aankondiging:
   {
     title:     "Titel van de aankondiging",
     date:      "maand jaar",
     category:  "Evenement",   // badge: "Evenement" | "Enquête" | "Onderhoud" | "Algemeen"
     excerpt:   "",            // optionele korte samenvatting (leeg = auto)
     body:      `Volledige tekst...`,
     signatory: "Groningen, [datum]\n[Naam]\n[Functie]"
   }
   ---------------------------------------------------------- */
const ANNOUNCEMENTS = [
  {
    title: "Nationale Burendag",
    date: "juni 2026",
    category: "Evenement",
    excerpt: "Op 26 september is het weer Nationale Burendag. Wij zoeken enthousiaste bewoners die willen helpen organiseren op ons binnenterrein.",
    body: `Verder hebben we de volgende vraag: jaarlijks promoot Douwe Egberts de "Nationale Burendag". Een gelegenheid om onder genot van een kop koffie of thee en fris elkaar in ons geval op het binnenterrein te ontmoeten en voor velen kennis te maken met elkaar.

Dit jaar staat deze dag gepland op 26 september.

In 2024 heeft een van de bewoners van het rijtje woonhuizen aan de noordzijde van onze flat dit op eigen initiatief georganiseerd. De pech was dat het de betreffende dag bijzonder slecht weer was.

De betreffende bewoonster heeft aangegeven dat zij het dit jaar wel in samenwerking met 1 of 2 van de bewoners van onze flat zou willen organiseren. Ik roep bij deze op om je kandidaat te stellen en het dit jaar met haar te organiseren. Het kost niet veel tijd en wij kunnen een bescheiden budget ter beschikking stellen.

Mocht je bereid zijn dit op te pakken, meld je dan bij mij (no.12).`,
    signatory: "Groningen, juni 2026\nHenny Kik\nvoorzitter"
  },
  {
    title: "Enquête aankondiging",
    date: "juni 2026",
    category: "Enquête",
    excerpt: "Het bestuur heeft besloten een uitgebreide bewonersquête te houden over verduurzaming en woonbeleving. Deelname wordt door iedereen op prijs gesteld.",
    body: `Beste bewoners van de flat Betje Wolffstraat.

Tijdens de afgelopen jaarvergadering is besloten om, mede ten behoeve van de aankomende verduurzaming van het gebouw, een uitgebreide enquete te houden. Er zal een breed scala aan onderwerpen de revue passeren. Zaken die het eigendom en/of direct gebruik van de appartementen betreffen, maar ook in meer algemene zin hoe het bevalt om in onze flat te wonen en wat er in het algemeen veranderd of verbeterd zou kunnen worden.

Ook de mening tedienaangaande van de huurders zal op waarde worden geschat.

De enquete bestaat uit 2 delen: deel I meer specifiek aangaande de verduurzaming en deel II meer algemeen over wonen in een appartement aan de Betje Wolffstraat.

Voor zover mogelijk is deelname aan de enquete "verplicht". Wij kunnen natuurlijk niemand dwingen, maar alle input is voor ons erg belangrijk.`,
    signatory: "Groningen, juni 2026\nHenny Kik\nvoorzitter"
  }
];

/* =====================================================
   Aankondigingen renderen (alleen op index.html)
   ===================================================== */

/* Kleurpalet voor artikel-afbeeldingsgebieden (varieert per kaart) */
var CARD_GRADIENTS = [
  "linear-gradient(135deg, #1E3851 0%, #2B4C6F 50%, #3a6491 100%)",
  "linear-gradient(135deg, #316049 0%, #3F7A5E 50%, #4e9874 100%)",
  "linear-gradient(135deg, #7a3e28 0%, #9C5B3E 50%, #b87355 100%)",
  "linear-gradient(135deg, #2B4C6F 0%, #3F7A5E 100%)",
  "linear-gradient(135deg, #3F7A5E 0%, #2B4C6F 100%)",
  "linear-gradient(135deg, #1E3851 0%, #9C5B3E 100%)"
];

function getExcerpt(item) {
  if (item.excerpt && item.excerpt.trim()) return item.excerpt.trim();
  var text = item.body.replace(/\n+/g, " ").trim();
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

function renderAnnouncements() {
  var container = document.getElementById("announcements-container");
  if (!container) return;

  ANNOUNCEMENTS.forEach(function (item, index) {
    var article = document.createElement("article");
    article.className = "article-card anim-item" + (index === 0 ? " article-card--featured" : "");
    article.style.transitionDelay = (0.08 + index * 0.1) + "s";

    var gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
    var isNewest = index === 0;
    var excerpt  = escapeHtml(getExcerpt(item));

    article.innerHTML =
      '<div class="article-card-image" style="background:' + gradient + '" aria-hidden="true">' +
        '<div class="article-card-image-pattern"></div>' +
      '</div>' +
      '<div class="article-card-body">' +
        '<div class="article-card-meta">' +
          (isNewest ? '<span class="article-badge article-badge--new">Nieuwste</span>' : '') +
          (item.category ? '<span class="article-badge article-badge--cat">' + escapeHtml(item.category) + '</span>' : '') +
          '<span class="article-card-date">' + escapeHtml(item.date) + '</span>' +
        '</div>' +
        '<h3 class="article-card-title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="article-card-excerpt">' + excerpt + '</p>' +
        '<button class="btn-read-more" data-index="' + index + '" aria-label="Lees volledig artikel: ' + escapeHtml(item.title) + '">' +
          'Lees meer' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9 4 13 8 9 12"/></svg>' +
        '</button>' +
      '</div>';

    container.appendChild(article);
  });

  container.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-read-more");
    if (btn) openArticleModal(parseInt(btn.dataset.index, 10));
  });
}

/* =====================================================
   Artikel modal
   ===================================================== */
function openArticleModal(index) {
  var item  = ANNOUNCEMENTS[index];
  var modal = document.getElementById("article-modal");
  if (!modal || !item) return;

  document.getElementById("modal-category").textContent  = item.category || "";
  document.getElementById("modal-title").textContent     = item.title;
  document.getElementById("modal-date").textContent      = item.date;
  document.getElementById("modal-body").textContent      = item.body;
  document.getElementById("modal-signatory").textContent = item.signatory;

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  modal.querySelector(".article-modal-close").focus();
}

function closeArticleModal() {
  var modal = document.getElementById("article-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initModal() {
  var modal = document.getElementById("article-modal");
  if (!modal) return;

  modal.querySelector(".article-modal-close").addEventListener("click", closeArticleModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeArticleModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeArticleModal();
  });
}

/* =====================================================
   Scroll-effecten (nav zweeft, hero scroll-hint verdwijnt)
   ===================================================== */
function initScrollEffects() {
  var nav  = document.querySelector(".site-nav");
  var hero = document.querySelector(".hero");

  function onScroll() {
    var isScrolled = window.scrollY > 10;
    if (nav)  nav.classList.toggle("scrolled", isScrolled);
    if (hero) hero.classList.toggle("scrolled", isScrolled);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* =====================================================
   Intersection Observer voor anim-items buiten viewport
   ===================================================== */
function initScrollAnimations() {
  var items = document.querySelectorAll(".anim-item");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("anim-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = parseFloat(el.style.transitionDelay || 0);
        el.classList.add("anim-visible");
        setTimeout(function () { el.style.transitionDelay = ""; }, (delay + 0.65) * 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(function (el) {
    if (el.dataset.animDelay) {
      el.style.transitionDelay = el.dataset.animDelay + "s";
    }
    observer.observe(el);
  });
}

/* =====================================================
   Enquête wizard (alleen op enquete.html)
   ===================================================== */
var wizardState = {
  huisnummer: null,
  type: null,
  gebruik: null
};

function setProgressStep(n) {
  var steps      = document.querySelectorAll(".wp-step");
  var connectors = document.querySelectorAll(".wp-connector");

  steps.forEach(function (step, i) {
    step.classList.remove("is-active", "is-done");
    step.removeAttribute("aria-current");
    if (i + 1 < n) {
      step.classList.add("is-done");
    } else if (i + 1 === n) {
      step.classList.add("is-active");
      step.setAttribute("aria-current", "step");
    }
  });

  connectors.forEach(function (conn, i) {
    conn.classList.toggle("is-done", i + 1 < n);
  });
}

function goToStep(fromEl, toEl, progressStep) {
  fromEl.style.opacity = "0";
  setTimeout(function () {
    hide(fromEl);
    fromEl.style.opacity = "";
    show(toEl);
    setProgressStep(progressStep);
  }, 180);
}

function initWizard() {
  var step1 = document.getElementById("step-1");
  if (!step1) return;

  var step2    = document.getElementById("step-2");
  var step3    = document.getElementById("step-3");
  var result   = document.getElementById("result");
  var numInput = document.getElementById("huisnummer-input");
  var numError = document.getElementById("huisnummer-error");

  setProgressStep(1);

  document.getElementById("btn-next-1").addEventListener("click", function () {
    var val = numInput.value.trim();
    if (!val || isNaN(parseInt(val, 10))) {
      numError.classList.add("visible");
      numInput.classList.add("input-error");
      numInput.focus();
      return;
    }
    numError.classList.remove("visible");
    numInput.classList.remove("input-error");
    wizardState.huisnummer = parseInt(val, 10);
    goToStep(step1, step2, 2);
  });

  document.getElementById("btn-eigenaar").addEventListener("click", function () {
    wizardState.type = "eigenaar";
    goToStep(step2, step3, 3);
  });

  document.getElementById("btn-huurder").addEventListener("click", function () {
    wizardState.type = "huurder";
    wizardState.gebruik = null;
    step2.style.opacity = "0";
    setTimeout(function () {
      hide(step2);
      step2.style.opacity = "";
      showResult("huurder-bewoner", FORM_HB);
      setProgressStep(4);
    }, 180);
  });

  document.getElementById("btn-bewoner").addEventListener("click", function () {
    wizardState.gebruik = "bewoner";
    step3.style.opacity = "0";
    setTimeout(function () {
      hide(step3);
      step3.style.opacity = "";
      showResult("eigenaar-bewoner", FORM_EB);
      setProgressStep(4);
    }, 180);
  });

  document.getElementById("btn-verhuurder").addEventListener("click", function () {
    wizardState.gebruik = "verhuurder";
    step3.style.opacity = "0";
    setTimeout(function () {
      hide(step3);
      step3.style.opacity = "";
      showResult("eigenaar-verhuurder", FORM_EV);
      setProgressStep(4);
    }, 180);
  });

  document.getElementById("btn-reset").addEventListener("click", function () {
    wizardState = { huisnummer: null, type: null, gebruik: null };
    numInput.value = "";
    numError.classList.remove("visible");
    numInput.classList.remove("input-error");
    result.style.opacity = "0";
    setTimeout(function () {
      hide(result);
      result.style.opacity = "";
      hide(step2);
      hide(step3);
      show(step1);
      setProgressStep(1);
      numInput.focus();
    }, 180);
  });

  function showResult(type, formUrl) {
    var labels = {
      "eigenaar-bewoner":    "Eigenaar / Zelf bewoond — Enquête E/B",
      "eigenaar-verhuurder": "Eigenaar / Verhuurd — Enquête E/V",
      "huurder-bewoner":     "Huurder / Bewoner — Enquête H/B"
    };

    document.getElementById("result-title").textContent  = labels[type] || "Enquête";
    document.getElementById("result-detail").textContent = "Huisnummer " + wizardState.huisnummer;

    var url = formUrl + "?huisnummer=" + encodeURIComponent(wizardState.huisnummer);
    document.getElementById("btn-start-form").href = url;

    show(result);
  }

  function show(el) { el.classList.remove("hidden"); }
  function hide(el) { el.classList.add("hidden"); }
}

/* =====================================================
   Mobiel navigatie hamburger
   ===================================================== */
function initNav() {
  var toggle = document.querySelector(".nav-toggle");
  var links  = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =====================================================
   HTML escapen
   ===================================================== */
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* =====================================================
   Initialisatie
   ===================================================== */
document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initScrollEffects();
  renderAnnouncements();
  initScrollAnimations();
  initModal();
  initWizard();
});
