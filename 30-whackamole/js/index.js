const root = document.getElementsByTagName('html')[0];
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreboard = document.getElementsByClassName('score')[0];
const startBtn = document.getElementsByTagName('button')[0];
let score = 0;
let lastHoleIdx;
let timeDone = false;

// Generate a random amount of time within range
function randomTime(min, max) {
  return Math.round((Math.random() * (max - min)) + min);
}

// Select a new random hole on the page
function randomHole() {
  // Generate random index within range
  const randomIdx = Math.floor(Math.random() * holes.length);
  // If random index matches last hole index, generate another
  if (randomIdx === lastHoleIdx) return randomHole();
  // Otherwise, store and return the new random hole
  lastHoleIdx = randomIdx;
  return holes[randomIdx];
}

// Show moles until no time remains
function showMoles() {
  // Select random time and hole
  const time = randomTime(300, 1500);
  const hole = randomHole(holes);
  // Show the mole
  hole.classList.add('up');
  // Hide the mole after a certain amount of time
  setTimeout(() => {
    hole.classList.remove('up');
    // If not out of time, show another mole
    if (!timeDone) showMoles();
  }, time);
}

// Start the game
function startGame() {
  // Reset score and begin the game
  score = 0;
  scoreboard.textContent = score;
  timeDone = false;
  startBtn.disabled = true;
  root.classList.add('active-game');
  showMoles();
  // Stop the game after 10 seconds
  setTimeout(() => {
    timeDone = true;
    startBtn.disabled = false;
    root.classList.remove('active-game');
  }, 10000);
}

// Handle when user hits a mole
function hitMole(e) {
  if (!e.isTrusted) return; // Don't allow cheating (synthetic clicks)
  // Hide the hit mole
  this.parentElement.classList.remove('up');
  // Increment the score
  score++;
  scoreboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', hitMole));
startBtn.addEventListener('click', startGame);
