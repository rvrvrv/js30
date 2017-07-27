/*jshint browser: true, esversion: 6*/
/* global console */

//Arrays

const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

//Copy methods (new array, not reference to original)

//Slice
const team2 = players.slice();


//Concat
const team3 = [].concat(players);

//ES6 spread
const team4 = [...players];

//Array.from
const team5 = Array.from(players);


console.log('players:', players);
console.log('team2:', team2);
console.log('team3:', team3);
console.log('team4:', team4);
console.log('team5:', team5);


//Objects

const person = {
	name: 'Rich V.',
	age: 29,
	social: {
		github: 'rvrvrv'
	}
};

//Copy method (new object, not reference to original)

//Object.assign
const person2 = Object.assign({}, person);
//^^Only one level deep. Nested person2 changes also affect person.


console.log('person:', person);
console.log('person2:', person2);
