// Get notebook div on page
const notebook = document.getElementsByClassName('notebook')[0];
// Get button on page
const btn = document.getElementsByTagName('button')[0];
// Create paragraph element to display captured speech
let p = document.createElement('p');
notebook.appendChild(p);
// Initialize recognition with maximum browser compatibility
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Change the background to a random color
function randomBgColor() {
  document.body.style.backgroundColor = `hsl(${Math.floor(
    Math.random() * 360
  )}, 100%, 20%)`;
}

// Capture and display speech
function captureSpeech() {
  // Capture results during speech
  recognition.interimResults = true;

  // Listen to and process results
  recognition.addEventListener('result', (e) => {
    // First, convert array-like results to array
    const transcript = Array.from(e.results)
      // Store current speech
      .map(result => result[0])
      // Store transcript
      .map(result => result.transcript)
      // Combine both results into one string
      .join('');

    // Display transcript in notebook paragraph
    p.textContent = transcript;

    // At end of detected speech, create a new paragraph and change the background color
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      notebook.appendChild(p);
      randomBgColor();
    }

    // Secret word to flash the background
    if (transcript.match(/magic/i)) {
      // 'magic' class triggers animation
      document.body.classList.add('magic');
      // Remove class after animation completes
      setTimeout(() => document.body.classList.remove('magic'), 3000);
    }
  });

  // At end of detected speech, begin recognition again
  recognition.addEventListener('end', recognition.start);

  // Begin speech recognition
  recognition.start();
}

// Toggle speech recognition
function toggleSpeech() {
  // Start capturing speech and update UI
  if (btn.textContent.includes('Begin')) {
    captureSpeech();
    randomBgColor();
    btn.textContent = 'Click to Stop';
  } else {
    // Stop capturing speech and update UI
    recognition.stop();
    document.body.style.backgroundColor = 'hsl(60, 100%, 8%)';
    recognition.removeEventListener('end', recognition.start);
    btn.textContent = 'Click to Begin';
  }
}
