const dogs = [
	{ name: 'Snickers', age: 2 },
	{ name: 'Hugo', age: 8 },
	{ name: 'Rambo', age: 4 }
];

function makeGreen() {
	const p = document.querySelector('p');
	p.style.color = '#0a4';
	p.style.fontSize = '48px';
}

// Regular
console.log('Hello');

// Interpolated
console.log('Hello, %s', 'John Doe');

let name = 'Jane Smith';
console.log(`Hello, ${name}`);

// Styled
console.log('%c Styled log ', 'background:#050; color: #fff; font-weight:900; font-size:2em;');

// Warning!
console.warn('Potential issue');

// Error :|
console.error('Error!');

// Info
console.info('Fun fact here');

// Testing
setTimeout(() => {
	const p = document.querySelector('p');
	console.assert(p.style.color === '', 'Not black');
}, 3000);

// Clearing
setTimeout(() => {
	console.clear();
}, 20000);

// Viewing DOM Elements
const p = document.querySelector('p');
console.log(p);
console.dir(p);

// Grouping together
console.group('dogs');
dogs.forEach(dog => {
	console.groupCollapsed(`${dog.name}`);
	console.log(`${dog.name} is ${dog.age} years old.`);
	console.log(`${dog.name} is ${dog.age * 7} in dog years!`);
	console.groupEnd(`${dog.name}`);
});
console.groupEnd('dogs');

// Counting
console.count('Mike');
console.count('Frank');
console.count('Mike');

// Timing
console.time('fetch');
fetch('https://api.github.com/users/rvrvrv')
	.then(data => data.json())
	.then(data => {
		console.timeEnd('fetch');
		console.log(data);
	});
