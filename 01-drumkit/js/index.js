document.addEventListener('DOMContentLoaded', () => {
  // Play sound based on keyboard event
  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // Grab mp3 link from audio tag
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // Grab correct key to animate
    if (!audio) return; // If no audio w/associated keypress, exit
    key.classList.add('playing'); // Light the button
    audio.currentTime = 0; // Rewind to start of sample
    audio.play(); // Play the sound
    setTimeout(() => key.classList.remove('playing'), 150); // Prevent button from staying lit
  }
  // Play sound based on mouse event, using jQuery
  function playSound2() {
    const btn = $(this);
    btn.addClass('playing');
    const audio = document.querySelector(`audio[data-key="${btn.attr('data-key')}"]`);
    audio.currentTime = 0; // Rewind to start of sample
    audio.play(); // Play the sound
    setTimeout(() => {
      btn.removeClass('playing');
    }, 150);
  }

  window.addEventListener('keydown', playSound); // Listen for keypress
  $('.key').click(playSound2); // Listen for clicks
});
