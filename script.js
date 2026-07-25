/* =========================================================
   Aaron Timothy Navarro — VA Portfolio
   script.js — no dependencies, no frameworks
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("site-header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var navLinksEl = document.getElementById("nav-links");
  var menuIconUse = menuToggle ? menuToggle.querySelector("use") : null;

  function setMenu(open) {
    if (!navLinksEl || !menuToggle) return;
    navLinksEl.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (menuIconUse) menuIconUse.setAttribute("href", open ? "#icon-close" : "#icon-menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navLinksEl.classList.contains("open");
      setMenu(!isOpen);
    });
  }

  if (navLinksEl) {
    navLinksEl.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Theme toggle (dark by default, session only) ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  var themeIconUse = themeToggle ? themeToggle.querySelector("use") : null;
  var htmlEl = document.documentElement;

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    if (themeToggle) {
      var isLight = theme === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
    if (themeIconUse) themeIconUse.setAttribute("href", theme === "light" ? "#icon-sun" : "#icon-moon");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = htmlEl.getAttribute("data-theme") === "light" ? "light" : "dark";
      applyTheme(current === "light" ? "dark" : "light");
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active nav link highlighting ---------- */
  var sections = document.querySelectorAll("main section[id], .hero[id]");
  var navLinkMap = {};
  document.querySelectorAll(".nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.startsWith("#")) navLinkMap[href.slice(1)] = link;
  });

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinkMap[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            document.querySelectorAll(".nav-link.active").forEach(function (a) { a.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("back-to-top");
  function onScrollBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 480);
  }
  onScrollBackToTop();
  window.addEventListener("scroll", onScrollBackToTop, { passive: true });
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(fieldId, message) {
    var row = document.getElementById(fieldId).closest(".form-row");
    var errorEl = document.getElementById(fieldId + "-error");
    if (row) row.classList.toggle("invalid", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function validateForm(data) {
    var valid = true;

    if (!data.name.trim()) { showFieldError("name", "Please enter your name."); valid = false; }
    else showFieldError("name", "");

    if (!data.email.trim()) { showFieldError("email", "Please enter your email."); valid = false; }
    else if (!emailPattern.test(data.email.trim())) { showFieldError("email", "Please enter a valid email address."); valid = false; }
    else showFieldError("email", "");

    if (!data.subject.trim()) { showFieldError("subject", "Please add a subject."); valid = false; }
    else showFieldError("subject", "");

    if (!data.message.trim()) { showFieldError("message", "Please add a short message."); valid = false; }
    else showFieldError("message", "");

    return valid;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
      };

      if (!validateForm(data)) {
        if (formStatus) formStatus.textContent = "Please fix the fields highlighted above.";
        return;
      }

      /* No backend is connected yet, so this opens a pre-filled email as a
         reliable default. To send messages without opening the visitor's
         email app, connect a form service such as Formspree or EmailJS —
         see README.md for a drop-in snippet. */
      var body = "Name: " + data.name + "\nEmail: " + data.email + "\n\n" + data.message;
      var mailtoUrl =
        "mailto:aaronsupports@gmail.com" +
        "?subject=" + encodeURIComponent(data.subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailtoUrl;

      if (formStatus) formStatus.textContent = "Opening your email app to send this message…";
      form.reset();
    });
  }
})();
