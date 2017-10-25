// Get notebook div on page
const notebook = document.getElementsByClassName('notebook')[0];

// Initialize with maximum browser compatibility
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Capture results during speech
recognition.interimResults = true;

// Create paragraph element to display captured speech
let p = document.createElement('p');
notebook.appendChild(p);

// Listen to and process results
recognition.addEventListener('result', (e) => {
  console.log(e.results);
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
    document.body.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 20%)`;
  }

  // Secret phrase to flash the background
  if (transcript.includes('magic')) {
    for (let i = 0; i < 20; i++) {
      document.body.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    }
  }
});

// At end of detected speech, begin recognition again
recognition.addEventListener('end', recognition.start);

// Begin speech recognition
recognition.start();

