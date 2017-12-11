// Get all anchors to trigger highlight
const triggers = document.querySelectorAll('a');

// Create and append highlight span (white background)
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

// Show highlight on hovered link
function highlightLink() {
  // Get coordinates of link to be highlighted
  const linkCoords = this.getBoundingClientRect();
  // Calculate and set style of highlight span
  Object.assign(highlight.style, {
    width: `${linkCoords.width + 6}px`,
    height: `${linkCoords.height + 6}px`,
    transform: `translate(${linkCoords.left - 3}px, ${(linkCoords.top + window.scrollY) - 3}px)`,
    opacity: 1
  });
}

// Hide highlight (called during window resize)
function hideHighlight() {
  highlight.style.opacity = 0;
}

// Event listeners
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
window.onresize = hideHighlight;
