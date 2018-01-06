let counter;
const timeLeftDisplay = document.getElementsByClassName('display__time-left')[0];
const endTimeDisplay = document.getElementsByClassName('display__end-time')[0];
const buttons = document.querySelectorAll('button');

function displayEndTime(timestamp) {
  // Calculate end time
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  // Convert 24-hr to 12-hr (when applicable)
  let convertedHour = false;
  if (hour > 12) convertedHour = hour - 12;
  else if (hour === 0) convertedHour = 12;
  // Format time
  const formattedTime = `${convertedHour || hour}:${min < 10 ? '0' : ''}${min} ${hour > 12 ? 'PM' : 'AM'}`;
  endTimeDisplay.textContent = `Done at ${formattedTime}`;
}

function stopTimer() {
  // End counter
  clearInterval(counter);
  // Update UI
  timeLeftDisplay.textContent = 'Done!';
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
}

function timer(sec) {
  // Clear running counter (when applicable)
  clearInterval(counter);
  // Get current time and future time
  const now = Date.now();
  const then = now + (sec * 1000);
  // Display initial time remaining and end time
  displayTimeLeft(sec);
  displayEndTime(then);
  // Begin counter
  counter = setInterval(() => {
    // Get remaining time in seconds
    const remaining = Math.round((then - Date.now()) / 1000);
    // Display updated time remaining
    displayTimeLeft(remaining);
    // When no time is left, stop the timer
    if (remaining < 1) stopTimer();
  }, 1000);
}

function startTimer() {
  // Get number of seconds from data-time attribute
  const seconds = parseInt(this.dataset.time, 10);
  timer(seconds);
}

// Handle customForm submissions
document.customForm.addEventListener('submit', (e) => {
  // Don't refresh page
  e.preventDefault();
  // Store user input
  const minutes = parseInt(document.customForm.minutes.value.trim(), 10);
  // Validate input, convert minutes to seconds, and start timer
  if (!isNaN(minutes) && minutes > 0) timer(minutes * 60);
  else if (minutes === 0) stopTimer();
  // If invalid input, clear the form
  else document.customForm.minutes.value = '';
});

buttons.forEach(btn => btn.addEventListener('click', startTimer));
