const slider = document.getElementsByClassName('slider')[0];
let isDown = false;
let startX;
let scrollLeft;

// Toggle isDown and slider 'active' class
function toggleDown(makeDown) {
  if (makeDown) {
    isDown = true;
    slider.classList.add('active');
  } else {
    isDown = false;
    slider.classList.remove('active');
  }
}

// Called from mousedown/touchstart events
function startDrag(e, touch) {
  toggleDown(true);
  // Determine starting position (X coordinate) of touch or mouse
  startX = touch
    ? e.touches[0].pageX - slider.offsetLeft
    : e.pageX - slider.offsetLeft;
  // Determine starting position (X coordinate) of slider
  scrollLeft = slider.scrollLeft;
}

// Called from mousemove/touchmove events
function drag(e, touch) {
  // If mouse/touch isn't active on the slider, don't do anything
  if (!isDown) return;
  // Don't select text or trigger other events
  e.preventDefault();
  // Track X coordinate of touch or mouse
  const x = touch
    ? e.touches[0].pageX - slider.offsetLeft
    : e.pageX - slider.offsetLeft;
  // Track how far the user has scrolled left or right
  const walk = x - startX;
  // Scroll slider the correct amount
  slider.scrollLeft = scrollLeft - walk;
}

// Mouse events
slider.addEventListener('mousedown', e => startDrag(e));
slider.addEventListener('mousemove', e => drag(e));
slider.addEventListener('mouseleave', () => toggleDown());
slider.addEventListener('mouseup', () => toggleDown());
// Touch events (for mobile devices)
slider.addEventListener('touchstart', e => startDrag(e, true));
slider.addEventListener('touchmove', e => drag(e, true));
slider.addEventListener('touchend', () => toggleDown());
slider.addEventListener('touchcancel', () => toggleDown());
