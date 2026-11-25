// scholar-card.js
// Renders the "Cited by" card (Google Scholar style) from window.SCHOLAR_STATS,
// which scholar.js provides. scholar.js is refreshed by the GitHub Pages
// workflow (.github/scripts/update_scholar.py). If it is missing, the card stays hidden.

document.addEventListener("DOMContentLoaded", function () {
  var card = document.getElementById("scholarCard");
  var d = window.SCHOLAR_STATS;
  if (!card || !d || !d.byYear || !d.byYear.length) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // Round the axis up to a "nice" number (e.g. 78 -> 80 with steps of 20),
  // so every bar is drawn on the same linear scale.
  function niceScale(max) {
    if (max <= 0) return { top: 1, step: 1 };
    var raw = max / 4;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var norm = raw / mag;
    var step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    step = Math.max(1, Math.round(step));
    return { top: Math.ceil(max / step) * step, step: step };
  }

  // Header: "Cited by" + Google Scholar logo link
  var head = el("div", "gs-head");
  head.appendChild(el("span", "gs-title", "Cited by"));
  var link = el("a", "gs-link");
  link.href = d.profile;
  link.target = "_blank";
  link.rel = "noopener";
  link.title = "Google Scholar Profile of Anjana Parwat Singh";
  var logo = el("img");
  logo.src = "./AnjanaPS_files/gs.png";
  logo.alt = "";
  link.appendChild(logo);
  link.appendChild(document.createTextNode("Google Scholar"));
  head.appendChild(link);
  card.appendChild(head);

  // Stats table: All / Since YYYY
  var table = el("table", "gs-table");
  var tr = el("tr");
  tr.appendChild(el("th", "", ""));
  tr.appendChild(el("th", "", "All"));
  tr.appendChild(el("th", "", d.sinceLabel));
  table.appendChild(tr);
  [["Citations", d.citations], ["h-index", d.hIndex], ["i10-index", d.i10Index]].forEach(function (row) {
    var r = el("tr");
    r.appendChild(el("td", "gs-label", row[0]));
    r.appendChild(el("td", "", String(row[1].all)));
    r.appendChild(el("td", "", String(row[1].since)));
    table.appendChild(r);
  });
  card.appendChild(table);

  // Citations-per-year bar chart
  var max = Math.max.apply(null, d.byYear.map(function (y) { return y.count; }));
  var scale = niceScale(max);

  var chart = el("div", "gs-chart");
  chart.setAttribute("role", "img");
  chart.setAttribute(
    "aria-label",
    "Citations per year: " + d.byYear.map(function (y) { return y.year + ": " + y.count; }).join(", ")
  );

  var plot = el("div", "gs-plot");
  for (var t = scale.step; t <= scale.top; t += scale.step) {
    var grid = el("div", "gs-grid");
    grid.style.bottom = (t / scale.top) * 100 + "%";
    plot.appendChild(grid);
  }

  var years = el("div", "gs-years");
  d.byYear.forEach(function (y) {
    // Heights are % of the plot, which stretches to fill the card
    var h = (y.count / scale.top) * 100;
    var col = el("div", "gs-col");
    col.title = y.year + ": " + y.count + " citations";
    var bar = el("div", "gs-bar");
    bar.style.height = h + "%";
    if (y.count > 0) bar.style.minHeight = "1px";
    col.appendChild(bar);
    var val = el("span", "gs-val", String(y.count));
    val.style.bottom = "calc(" + h + "% + 2px)";
    col.appendChild(val);
    plot.appendChild(col);
    years.appendChild(el("span", "", String(y.year)));
  });

  chart.appendChild(plot);
  chart.appendChild(years);
  card.appendChild(chart);

  if (d.updated) {
    card.appendChild(el("div", "gs-updated", "Updated " + d.updated));
  }

  card.hidden = false;
});
