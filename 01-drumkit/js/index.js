$(document).ready(function() {
  //Pure JS for keyboard events
  window.addEventListener('keydown', playSound);

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //Grab mp3 link from audio tag
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //Grab correct key to animate
    if (!audio) return; //If no audio w/associated keypress, exit
    key.classList.add('playing'); //Light the button
    audio.currentTime = 0; //Rewind to start of sample
    audio.play(); //Play the sound
    setTimeout(function() {
      key.classList.remove('playing');
    }, 150); //Prevent button from staying lit
  }

  //jQuery for clicks
  $('.key').click(playSound2);

  function playSound2() {
    const btn = $(this);
    btn.addClass('playing');
    const audio = document.querySelector('audio[data-key="' + btn.attr('data-key') + '"]');
    audio.currentTime = 0; //Rewind to start of sample
    audio.play(); //Play the sound
    setTimeout(function() {
      btn.removeClass('playing');
    }, 150);
  }
});