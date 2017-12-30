const divs = document.querySelectorAll('div');
const btn = document.getElementsByTagName('button')[0];

// Log div class to the console
function logDivClass(e) {
  console.log(this.classList.value);
  // e.stopPropagation(); // Prevent bubbling
}

divs.forEach(d => d.addEventListener('click', logDivClass, {
  capture: false // Default value (goes from inside out)
}));

btn.addEventListener('click', () => {
  console.log('Button clicked');
}, { once: true }); // Only fire event listener once
