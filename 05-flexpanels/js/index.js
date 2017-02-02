/*jshint browser: true, esversion: 6*/
/* global $*/


//Store all panels in array
const panels = document.querySelectorAll('.panel');

//Toggle 'open' class
	function toggleOpen() {
		this.classList.toggle('open');
	}

//Toggle back to normal properties
function toggleActive(e) {
	if (e.propertyName.includes('flex')) {
		this.classList.toggle('open-active');
	}
}
//Listen for clicks on each panel
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
//Listen for end of transition on each panel
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

