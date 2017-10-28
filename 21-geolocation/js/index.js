const arrow = document.getElementsByClassName('arrow')[0];
const speed = document.getElementsByClassName('speed')[0];

// Monitor accelerometer data
navigator.geolocation.watchPosition((d) => {
  // Display speed
  speed.textContent = d.coords.speed ? `${d.coords.speed} km/h` : '';
  // Point compass
  arrow.style.transform = `rotate(${d.coords.heading}deg)`;
}, (err) => {
  // If error, notify user
  document.body.innerHTML = `<h3>The following error has occurred:<br><br>${err.message}</h3>`;
});

