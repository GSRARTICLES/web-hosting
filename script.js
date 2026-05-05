(function () {
  "use strict";

  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.getElementById("primary-navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  var overlay = document.getElementById("search-overlay");
  var openButton = document.querySelector(".search-open");
  var closeButton = document.querySelector(".close-search");
  var input = document.getElementById("search-input");
  var form = document.getElementById("site-search");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".searchable-card"));

  function setSearch(open) {
    if (!overlay) return;
    overlay.classList.toggle("is-open", open);
    if (open && input) input.focus();
  }

  if (openButton) {
    openButton.addEventListener("click", function () {
      setSearch(true);
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      setSearch(false);
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) setSearch(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setSearch(false);
  });

  if (form && input) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = input.value.trim().toLowerCase();

      cards.forEach(function (card) {
        var text = (card.textContent + " " + (card.dataset.search || "")).toLowerCase();
        card.classList.toggle("is-hidden", Boolean(query) && text.indexOf(query) === -1);
      });

      setSearch(false);
      document.getElementById("main-content").scrollIntoView({ behavior: "smooth" });
    });
  }

  var topButton = document.querySelector(".back-to-top");

  if (topButton) {
    window.addEventListener("scroll", function () {
      topButton.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });

    topButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll("img:not([loading])").forEach(function (image) {
    image.setAttribute("loading", "lazy");
  });
}());
