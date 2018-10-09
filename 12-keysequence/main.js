const pressed = [];
const secretCode = 'rainbow';

window.addEventListener('keyup', (e) => {
  // Log last key pressed
  pressed.push(e.key);
  // Trim pressed array to correct code length
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  // Check for matching code
  if (pressed.join('').includes(secretCode)) {
    console.log('Matched!');
    cornify_add(); // Display surprise via cornify.js
  }
});
