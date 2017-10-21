const video = document.querySelector('.video-orig');
const canvas = document.querySelector('.video-canvas');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.photo-roll');
const snap = document.getElementById('shutterSound');
let vidWidth;
let vidHeight;

// Make all pixels more red
function redEffect(pixels) {
  // Iterate over every pixel (stored as rgba in pixels array)
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] *= 2; // r
    pixels.data[i + 1] /= 2; // g
    pixels.data[i + 2] /= 2; // b
  }
  return pixels;
}

// Split pixels for rainbow effect
function rgbSplit(pixels) {
  // Iterate over every pixel (stored as rgba in pixels array)
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i]; // r
    pixels.data[i + 500] = pixels.data[i + 1]; // g
    pixels.data[i - 550] = pixels.data[i + 2]; // b
  }
  return pixels;
}

// Green screen (chroma key) effect
function greenScreen(pixels) {
  const levels = {};
  // Get value from each slider
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value; // Store in levels object
  });
  // Iterate over every pixel (stored as rgba in pixels array)
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Store rgb values
    const r = pixels.data[i];
    const g = pixels.data[i + 1];
    const b = pixels.data[i + 2];
    // If the pixel's rgb values are within every slider range, make it transparent
    if (r >= levels.rmin
      && g >= levels.gmin
      && b >= levels.bmin
      && r <= levels.rmax
      && g <= levels.gmax
      && b <= levels.bmax) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

// Paint video stream on canvas
function paintToCanvas(effect) {
  // Paint on canvas every 16 ms
  const painting = setInterval(() => {
    // If an effect is called, clear current setInterval
    if (effect) clearInterval(painting);
    ctx.drawImage(video, 0, 0, vidWidth, vidHeight);
    let pixels = ctx.getImageData(0, 0, vidWidth, vidHeight);
    if (effect === 'red') pixels = redEffect(pixels);
    else if (effect === 'rgb') pixels = rgbSplit(pixels);
    else pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
    console.log('running...');
  }, 1000);
}

// Choose an effect
function chooseEffect(effect) {
  paintToCanvas(effect);
}

// Retrieve video feed and eventually send to canvas
function getVideo() {
  // Ask for webcam permission
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      // Send stream to video player
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
      // When fully loaded, store dimensions and send to canvas
      video.onloadedmetadata = () => {
        vidWidth = video.videoWidth;
        vidHeight = video.videoHeight;
        paintToCanvas();
      };
    })
    .catch((err) => {
      console.error(err);
      strip.innerHTML = 'Webcam permission required.';
    });
}

// Take snapshot of video stream
function takePhoto() {
  // Play shutter sound
  snap.currentTime = 0;
  snap.play();

  // Get visual data from canvas
  const data = canvas.toDataURL('image/jpeg');
  // Create snapshot download link
  const link = document.createElement('a');
  link.href = data;
  // Name file 'snapshot'
  link.setAttribute('download', 'snapshot');
  // Set link to snapshot thumbnail
  link.innerHTML = `<img src='${data}' alt='Snapshot' />`;
  // Place link at beginning of photo strip
  strip.insertBefore(link, strip.firstChild);
}

// Load video upon page startup
document.addEventListener('DOMContentLoaded', getVideo);
