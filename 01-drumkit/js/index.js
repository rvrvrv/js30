document.addEventListener('DOMContentLoaded', () => {
  // Play sound based on keyboard event
  function playSound(e, clicked) {
    if (!e.keyCode) e.keyCode = clicked;
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // Grab mp3 link from audio tag
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // Grab correct key to animate
    if (!audio) return; // If no audio w/associated keypress, exit
    key.classList.add('playing'); // Light the button
    audio.currentTime = 0; // Rewind to start of sample
    audio.play(); // Play the sound
    setTimeout(() => key.classList.remove('playing'), 150); // Prevent button from staying lit
  }
  // Trigger playSound from button click
  function handleClick(e) {
    // Always select the button div, not an inner element
    const btn = (e.target.tagName === 'DIV')
      ? e.target
      : e.target.parentElement;
    // Call playSound with correct keycode
    playSound(e, btn.getAttribute('data-key'));
  }

  // Listen for keypress
  window.addEventListener('keydown', playSound);
  // Listen for clicks
  const btns = document.getElementsByClassName('key');
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', handleClick);
  }
});
