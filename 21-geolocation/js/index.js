const arrow = document.getElementsByClassName('arrow')[0];
const speed = document.getElementsByClassName('speed')[0];
const loc = document.getElementsByClassName('location')[0];

// Monitor accelerometer data
navigator.geolocation.watchPosition((d) => {
  // Point compass after entrance animation
  setTimeout(() => { arrow.style.transform = `rotate(${d.coords.heading}deg)`; }, 3000);
  // Display speed
  speed.textContent = d.coords.speed ? `${d.coords.speed} km/h` : '';
  // Display location
  loc.innerHTML = `Current Location:<br>${d.coords.latitude.toFixed(4)}, ${d.coords.longitude.toFixed(4)}`;
}, (err) => {
  // If error, notify user
  document.body.innerHTML = '<h3>An error has occurred.</h3>';
  if (err.message) document.body.innerHTML += `<h3 style="color:#faa;">${err.message}</h3>`;
});

