const slider = document.getElementsByClassName('slider')[0];
let isDown = false;
let startX;
let scrollLeft;


// Toggle whether or not the mouse should be down
function toggleDown(makeDown) {
  if (makeDown) {
    isDown = true;
    slider.classList.add('active');
  } else {
    isDown = false;
    slider.classList.remove('active');
  }
}

// Slider mouse events
slider.addEventListener('mousedown', (e) => {
  toggleDown(true);
  // Determine starting position (X coordinate) of mouse
  startX = e.pageX - slider.offsetLeft;
  // Determine starting position (X coordinate) of slider
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  toggleDown();
});

slider.addEventListener('mouseup', () => {
  toggleDown();
});

slider.addEventListener('mousemove', (e) => {
  // If mouse isn't down, don't do anything
  if (!isDown) return;
  // Don't select text or trigger other events
  e.preventDefault();
  // Track X coordinate of mouse
  const x = e.pageX - slider.offsetLeft;
  // Track how far the mouse has scrolled left or right
  const walk = x - startX;
  // Scroll left
  slider.scrollLeft = scrollLeft - walk;
});

// Slider touchevents
slider.addEventListener('touchstart', (e) => {
  toggleDown(true);
  // Determine starting position (X coordinate) of touch
  startX = e.touches[0].pageX - slider.offsetLeft;
  // Determine starting position (X coordinate) of slider
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
  toggleDown();
});

slider.addEventListener('touchcancel', () => {
  toggleDown();
});

slider.addEventListener('touchmove', (e) => {
  // If mouse isn't down, don't do anything
  if (!isDown) return;
  // Don't select text or trigger other events
  e.preventDefault();
  // Track X coordinate of touch
  const x = e.touches[0].pageX - slider.offsetLeft;
  // Track how far the touch has scrolled left or right
  const walk = x - startX;
  // Scroll left
  slider.scrollLeft = scrollLeft - walk;
});

