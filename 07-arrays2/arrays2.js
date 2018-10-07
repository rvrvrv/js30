// Array Cardio Day 2

const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good.', id: 823423 },
  { text: 'You are the best!', id: 2039842 },
  { text: 'Ravioli is my favorite food.', id: 123523 },
  { text: 'Nice, nice, nice!', id: 542328 }
];

// Store current year for use in isAdult and allAdults
const thisYear = (new Date()).getFullYear();

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const isAdult = people.some(person => thisYear - person.year >= 19);

console.log({ isAdult });


// Array.prototype.every() // is everyone 19 or older?
const allAdults = people.every(person => thisYear - person.year >= 19);

console.log({ allAdults });


// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const quote = comments.find(comment => comment.id === 123523);

console.log(quote);


// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
console.table(comments);

const quoteIndex = comments.findIndex(comment => comment.id === 823423);
comments.splice(quoteIndex, 1);

console.table(comments);
