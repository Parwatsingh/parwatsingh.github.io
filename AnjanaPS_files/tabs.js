// tabs.js
// Shows one section of the page at a time, like separate pages.
// The menu links (#home, #publications, ...) pick the tab; any other
// #anchor opens the tab that contains it and scrolls to it.
// Without JavaScript the whole page shows as one long page.

(function () {
  var pages = Array.prototype.slice.call(document.querySelectorAll(".tab-page"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".topnav a[data-tab]"));
  if (!pages.length) return;

  function pageByName(name) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].getAttribute("data-page") === name) return pages[i];
    }
    return null;
  }

  function show(hash, scroll) {
    var name = (hash || "").replace(/^#/, "");
    var page = pageByName(name);
    var target = null;

    if (!page && name) {
      // an anchor inside some tab, e.g. #recent
      target = document.getElementById(name) || document.getElementsByName(name)[0];
      page = target ? target.closest(".tab-page") : null;
    }
    if (!page) page = pages[0];

    var current = page.getAttribute("data-page");
    pages.forEach(function (p) { p.classList.toggle("is-active", p === page); });
    links.forEach(function (a) {
      a.classList.toggle("current", a.getAttribute("data-tab") === current);
    });

    document.dispatchEvent(new CustomEvent("tabchange", { detail: current }));

    if (scroll) {
      if (target) target.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  show(location.hash, false);
  // A tab link (#services) should open at the top of that tab, not jump
  // to the heading the way a plain anchor would.
  window.addEventListener("load", function () {
    if (pageByName(location.hash.replace(/^#/, ""))) window.scrollTo({ top: 0, behavior: "instant" });
  });
  window.addEventListener("hashchange", function () { show(location.hash, true); });
})();
