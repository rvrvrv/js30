const nav = document.getElementsByTagName('nav')[0];
const topOfNav = nav.offsetTop;

function fixNav() {
  // When nav reaches top of window, make it fixed
  if (window.scrollY >= topOfNav) {
    // Offset body to prevent janky reflow
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    // Add fixed class
    document.body.classList.add('fixed-nav');
  } else {
    // Otherwise, restore regular position
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
