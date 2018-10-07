document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('.clock');
  const secondHand = document.querySelector('.second-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const hourHand = document.querySelector('.hour-hand');
  // Displays current time on clock
  function setTime() {
    // Retrieve current date (and time)
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours();
    // Determine and store correct angle for each value
    const secDeg = ((sec / 60) * 360) + 90;
    const minDeg = ((min / 60) * 360) + ((sec / 60) * 6) + 90;
    const hrDeg = ((hr / 12) * 360) + ((min / 60) * 30) + 90;
    if (secDeg === 90) { // Prevent jittery hand reset
      secondHand.style.transition = 'none';
      secondHand.style.transform = `rotate(${secDeg}deg)`;
    } else {
      secondHand.style.transition = 'transform 0.05s';
    }
    // Rotation operations
    secondHand.style.transform = `rotate(${secDeg}deg)`;
    minuteHand.style.transform = `rotate(${minDeg}deg)`;
    hourHand.style.transform = `rotate(${hrDeg}deg)`;
    // If clock isn't visible yet (first time), show it
    if (!clock.style.opacity) clock.style.opacity = 1;
  }
  setInterval(setTime, 1000);
});
