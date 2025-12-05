// tnav.js

// Toggle the top navigation bar on small screens
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (!x) return;

  var hasResponsive = x.className.indexOf("responsive") !== -1;

  if (!hasResponsive) {
    // Open the mobile menu
    x.className += " responsive";

    // Scroll to the very top so the dropdown is visible
    // when user taps the hamburger at the bottom of the page.
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } else {
    // Close the mobile menu
    x.className = "topnav";
  }
}

// Close the mobile menu after clicking any link
function closeMenu() {
  var x = document.getElementById("myTopnav");
  if (!x) return;

  if (x.className.indexOf("responsive") !== -1) {
    x.className = "topnav";
  }
}
