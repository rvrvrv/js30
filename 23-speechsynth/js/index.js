// Initialize Web Speech API
const spokenMsg = new SpeechSynthesisUtterance();
let voices = []; // Will store voices from Web Speech API
// Store user's choices in options object
const voiceSelect = document.getElementsByTagName('select')[0];
const options = [
  document.getElementsByName('rate')[0],
  document.getElementsByName('pitch')[0],
  document.getElementsByName('text')[0]
];
// Access speak and stop buttons
const speakBtn = document.getElementById('speak');
const stopBtn = document.getElementById('stop');
// Store user's text in spokenMsg
spokenMsg.text = options[2].value;

// Retrieve and display available voices
function populateVoices() {
  // Retrieve voices from Web Speech API
  voices = this.getVoices();
  // Generate HTML for voiceSelect dropdown box
  voiceSelect.innerHTML = voices
    .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
    .join('');
  // Set default value to English, if possible
  for (let i = 0; i < voiceSelect.options.length; i++) {
    if (voiceSelect.options[i].value === 'Google US English') {
      voiceSelect.value = 'Google US English';
      return;
    }
  }
}

// Stop speech, and optionally restart after brief delay
function toggleSpeech(restart = true) {
  speechSynthesis.cancel();
  if (restart) setTimeout(() => speechSynthesis.speak(spokenMsg), 500);
}

// Update the user's voice selection
function setVoice() {
  // Set spokenMsg voice to dropdown value
  spokenMsg.voice = voices.find(v => v.name === this.value);
  toggleSpeech();
}

// Update an option based on user's selection
function setOption() {
  spokenMsg[this.name] = this.value;
  toggleSpeech();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voiceSelect.addEventListener('change', setVoice);
options.forEach(o => o.addEventListener('change', setOption));
speakBtn.addEventListener('click', toggleSpeech);
stopBtn.addEventListener('click', () => toggleSpeech(false));
