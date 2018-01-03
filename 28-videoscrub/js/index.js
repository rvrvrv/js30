const speed = document.getElementsByClassName('speed')[0];
const bar = speed.getElementsByClassName('speed-bar')[0];
const video = document.getElementsByTagName('video')[0];
const [min, max] = [0.51, 3.01]; // Speed range of video player

function handleMove(e) {
  // Get Y coordinate of mouse
  const y = e.pageY - speed.offsetTop;
  // Convert Y coordinate to percentage
  let percent = y / speed.offsetHeight;
  // Determine playback speed from percentage and min/max
  let playback = ((percent * (max - min)) + min);
  // If playback is close to 100%, snap to 100%
  if (playback > 0.95 && playback < 1.05) {
    playback = 1;
    percent = 0.2;
  }
  // Change video playback speed
  video.playbackRate = playback;
  // Change height and text of bar to reflect playback
  bar.style.height = `${Math.round(percent * 100)}%`;
  bar.textContent = `${playback.toFixed(2)}x`;
}

speed.addEventListener('mousemove', handleMove);
