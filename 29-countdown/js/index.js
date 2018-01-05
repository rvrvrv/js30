let counter;
const timeLeftDisplay = document.getElementsByClassName('display__time-left')[0];
const endTimeDisplay = document.getElementsByClassName('display__end-time')[0];

function displayEndTime(timestamp) {
  // Calculate end time
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  // Format time
  const formattedTime = `${hour > 12 ? hour - 12 : hour}:${min < 10 ? '0' : ''}${min} ${hour > 12 ? 'PM' : 'AM'}`;
  endTimeDisplay.textContent = `Be back at ${formattedTime}`;
}

function displayTimeLeft(sec) {
  // Convert seconds to minutes
  const min = Math.floor(sec / 60);
  // Calculate remaining seconds (after minutes)
  const remainingSec = sec % 60;
  // Format time
  const formattedTime = `${min}:${remainingSec < 10 ? '0' : ''}${remainingSec}`;
  // Display time on page and in window title
  timeLeftDisplay.textContent = formattedTime;
  document.title = formattedTime;
  // Display end time
  displayEndTime(sec);
}

function timer(sec) {
  // Get current time and future time
  const now = Date.now();
  const then = now + (sec * 1000);
  // Display initial time remaining
  displayTimeLeft(sec);
  // Begin counter
  counter = setInterval(() => {
    // Get remaining time in seconds
    const remaining = Math.round((then - Date.now()) / 1000);
    // When no time is left, stop the counter
    if (remaining < 0) return clearInterval(counter);
    // Display updated time remaining
    displayTimeLeft(remaining);
  }, 1000);
}

