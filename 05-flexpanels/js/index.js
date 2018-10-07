// Store all panels in array
const panels = document.querySelectorAll('.panel');

// Toggle 'open' class
function toggleOpen() {
  this.classList.toggle('open');
}

// Toggle back to normal properties
function toggleActive(e) {
  if (e.propertyName.includes('flex')) this.classList.toggle('open-active');
}

// After click, toggle 'open' class
panels.forEach(panel => panel.addEventListener('click', toggleOpen));

// After transition, toggle 'active' class
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
