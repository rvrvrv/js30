const triggers = document.querySelectorAll('.links > li');
const bg = document.getElementsByClassName('dropdown-bg')[0];
const nav = document.getElementsByClassName('top')[0];

function handleEnter() {
  // Trigger entrance animation of dropdown
  this.classList.add('trigger-enter');
  // If trigger-enter class still exists, add trigger-enter-active
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  bg.classList.add('open');
  // Display dropdown background with correct size
  const dropdown = this.getElementsByClassName('dropdown')[0];
  // Get coordinates of dropdown and nav
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  // Assign correct style to dropdown background
  Object.assign(bg.style, {
    height: `${dropdownCoords.height}px`,
    width: `${dropdownCoords.width}px`,
    transform: `translate(${dropdownCoords.left - navCoords.left}px, ${dropdownCoords.top - navCoords.top}px)`
  });
}

function handleLeave() {
  // Remove trigger-enter classes to hide dropdown
  this.classList.remove('trigger-enter-active', 'trigger-enter');
  // Hide dropdown background
  bg.classList.remove('open');
}

// Listen for mouseenter and mouseleave on all triggers
triggers.forEach((t) => {
  t.addEventListener('mouseenter', handleEnter);
  t.addEventListener('mouseleave', handleLeave);
});

// Upon orientation change, hide dropdown
window.addEventListener('orientationchange', () => {
  triggers.forEach(t => handleLeave.bind(t)());
});
