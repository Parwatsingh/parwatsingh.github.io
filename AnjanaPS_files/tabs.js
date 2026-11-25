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

  // Small screens: the tab links sit in a strip that scrolls sideways.
  var strip = document.querySelector(".topnav-tabs");

  var more = document.querySelector(".nav-more");

  function updateFades() {
    if (!strip) return;
    var max = strip.scrollWidth - strip.clientWidth;
    var atEnd = strip.scrollLeft >= max - 2;
    strip.classList.toggle("scrolled", strip.scrollLeft > 2);
    strip.classList.toggle("at-end", atEnd);
    if (more) {
      more.hidden = max <= 2;                       // everything fits: no arrow
      more.innerHTML = atEnd ? "&#8249;" : "&#8250;"; // ‹ back / › more
      more.setAttribute("aria-label", atEnd ? "Back to first sections" : "More sections");
    }
  }

  if (more && strip) {
    more.addEventListener("click", function () {
      var max = strip.scrollWidth - strip.clientWidth;
      var to = strip.scrollLeft >= max - 2 ? 0 : Math.min(max, strip.scrollLeft + strip.clientWidth * 0.7);
      strip.scrollTo({ left: to, behavior: "smooth" });
    });
  }

  // Slide the strip (only the strip, not the page) so the current tab is fully visible.
  function revealCurrent() {
    if (!strip || strip.scrollWidth <= strip.clientWidth) return updateFades();
    var a = strip.querySelector("a.current");
    if (!a) return updateFades(); // HOME lives outside the strip
    var left = a.offsetLeft - strip.offsetLeft;
    var right = left + a.offsetWidth;
    var pad = 32; // clear the faded edge
    if (left - pad < strip.scrollLeft) strip.scrollLeft = Math.max(0, left - pad);
    else if (right + pad > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = right + pad - strip.clientWidth;
    updateFades();
  }

  if (strip) {
    strip.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", revealCurrent);
    // tab widths change once the web font arrives; measure again then
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(revealCurrent);
    window.addEventListener("load", revealCurrent);
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

    revealCurrent();
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
