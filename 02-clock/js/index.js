/*jshint browser: true, esversion: 6*/
/* global $*/
//$(document).ready(function () {
const allHands = document.querySelector('.hand');
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
//Displays current time on clock
function setDate() {
	//Retrieve current date (and time)
	const now = new Date();
	const sec = now.getSeconds();
	const min = now.getMinutes();
	const hr = now.getHours();
	//Determine and store correct angle for each value
	const secDeg = ((sec / 60) * 360) + 90;
	const minDeg = ((min / 60) * 360) + ((sec / 60) * 6) + 90;
	const hrDeg = ((hr / 12) * 360) + ((min / 60) * 30) + 90;
	if (secDeg == 90) { //Prevent jittery hand reset
		allHands.style.transition = 'none';
	}
	else {
		allHands.style.transition = 'all 0.05s';
	}
	//Rotation operations
	secondHand.style.transform = `rotate(${secDeg}deg)`;
	minuteHand.style.transform = `rotate(${minDeg}deg)`;
	hourHand.style.transform = `rotate(${hrDeg}deg)`;
}
setInterval(setDate, 1000);