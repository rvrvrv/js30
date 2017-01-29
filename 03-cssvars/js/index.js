/*jshint browser: true, esversion: 6*/
/* global document */

//Called when any input is changed
function handleUpdate() {
	//Get 'px' or nothing (if color);
	const suffix = this.dataset.sizing || '';
	//Update the picture with new CSS property
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

//Variable for all input controls
const inputs = document.querySelectorAll('.controls input');

//Listen for input field change
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
