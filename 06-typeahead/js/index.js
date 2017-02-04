/*jshint browser: true, esversion: 6*/
/* global $,console*/

$(document).ready(function() {

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint).then(resp => resp.json()) //Get JSON from response
	.then(data => cities.push(...data)); //Store JSON data in cities array

//Search for matching cities
function findMatches(word) {
	return cities.filter(place => {
		const regEx = new RegExp(word, 'gi');
		return place.city.match(regEx) || place.state.match(regEx);
	});
}

//Display matching cities
function displayMatches() {
	//Auto-capitalize user's entry

	$('.suggestions').css('text-transform', 'capitalize');
	//Store results in array
	const matchArr = findMatches(this.value);
	//Append results to suggestions list
	const newHtml = matchArr.map(place => {
		//Find and highlight matching word
		const reg2 = new RegExp(this.value, 'gi');
		const hlCity = place.city.replace(reg2, `<span class="hl">${this.value}</span>`);
		const hlState = place.state.replace(reg2, `<span class="hl">${this.value}</span>`);
		//Format population with commas
		const prettyPop = parseInt(place.population, 10).toLocaleString();
		//Return formatted result
		return `<li class="result">
	<a href="http://www.google.com/search?q=${place.city},%20${place.state}" target=_blank>
	<span class="name">${hlCity}, ${hlState}</span></a>
    <span class="population">${prettyPop}</span>
</li>`;
	}).join('');
	suggestions.innerHTML = newHtml;
}

//Listen for typing in search field
searchInput.addEventListener('keyup', displayMatches);
	});
