/*jshint browser: true, esversion: 6*/
/* global $, alert, console */

//Get all elements (instead of using jQuery)
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const fullScrnBtn = player.querySelector("#fullScrnBtn");
const ranges = player.querySelectorAll(".player__slider");

//Play or pause video
function togglePlay() {
    video[video.paused ? "play" : "pause"]();
}

//Update play/pause button
function updateBtn() {
    let icon = this.paused ?
        '<i class="fa fa-play"></i>' :
        '<i class="fa fa-pause"></i>';
    toggle.innerHTML = icon;
}

//Skip video forward or backward
function skip() {
    video.currentTime += +this.dataset.skip;
}

//Handle volume and playback rate updates
function handleRangeUpdate() {
    //this.name = corresponding video property
    video[this.name] = this.value;
}

//Update progress bar
function updateProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//Scrub video
function scrub(e) {
    video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
}

//Toggle full-screen video
function toggleFullScreen() {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
    else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
    else alert('Sorry, but full-screen video is not supported in your browser.');
}

//Add event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", updateProgress);
toggle.addEventListener("click", togglePlay);
fullScrnBtn.addEventListener("click", toggleFullScreen);

skipBtns.forEach(btn => btn.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

//Progress bar scrubbing
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
