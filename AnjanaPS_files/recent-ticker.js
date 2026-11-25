// recent-ticker.js
// Makes the "Recent!" list scroll slowly upward and loop back from the bottom.
// The list is duplicated so the loop is seamless; the copy is hidden from
// screen readers and keyboard. Pauses on hover/focus (CSS). With reduced
// motion, or if the list fits, it stays a normal (scrollable) box.

document.addEventListener("DOMContentLoaded", function () {
  var box = document.getElementById("recentTicker");
  if (!box) return;
  var track = box.querySelector(".recent-track");
  var list = track && track.querySelector("ul");
  if (!list) return;

  var SPEED = 18; // pixels per second

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    box.classList.add("is-static");
    return;
  }

  var copy = list.cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  copy.querySelectorAll("a, button").forEach(function (el) { el.tabIndex = -1; });
  track.appendChild(copy);

  // The box may be on a hidden tab, so measure whenever it can be seen.
  function update() {
    var h = list.offsetHeight;
    if (!h) return; // not visible right now
    if (h <= box.clientHeight) {
      box.classList.remove("is-moving");
      box.classList.add("is-static");
      copy.hidden = true;
      return;
    }
    box.classList.remove("is-static");
    copy.hidden = false;
    box.style.setProperty("--recent-dur", h / SPEED + "s");
    box.classList.add("is-moving");
  }
  update();
  window.addEventListener("resize", update);
  document.addEventListener("tabchange", update);
});
