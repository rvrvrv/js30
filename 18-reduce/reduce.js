document.addEventListener('DOMContentLoaded', () => {
  // Display data-time attribute after each video listing
  const vidItems = document.querySelectorAll('[data-time]');
  vidItems.forEach(vid => vid.innerHTML += `:  <b>${vid.dataset.time}</b>`);
  // Store all times from video listings
  const timeNodes = Array.from(vidItems);
  // Get time value (in seconds) from node array
  const seconds = timeNodes
    .map(node => node.dataset.time) // Get time values
    .map((time) => {
      // Store mins and secs as separate numbers
      const [mins, secs] = time.split(':').map(parseFloat);
      // Return total number of seconds
      return (mins * 60) + secs;
    })
    .reduce((total, nextSec) => total + nextSec); // Tally all seconds

  let secondsLeft = seconds;
  const hours = Math.floor(secondsLeft / 3600); // Round down total hours
  secondsLeft %= 3600; // Update how many seconds are left 
  const mins = Math.floor(secondsLeft / 60); // Round down total minutes left
  secondsLeft %= 60; // Update how many seconds are left
  // Store and display results
  const totalTime = `${hours}:${mins}:${secondsLeft}`;
  document.getElementById('total').innerHTML = `Total time: <b>${totalTime}</b>`;
});
