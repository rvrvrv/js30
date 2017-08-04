const hero = document.querySelector('.hero');
const text = document.querySelector('h1');
const walk = 300; // 300px (shadow movement range)

function shadow(e) {
  // Hero position
  const { offsetWidth: width, offsetHeight: height } = hero;
  // Mouse location
  let { offsetX: x, offsetY: y } = e;
  // If mouse is over inner element, adjust coordinates
  if (this !== e.target) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }
  // Determine shadow coordinates within 'walk' range
  const xWalk = Math.round(((x / width) * walk) - (walk / 2));
  const yWalk = Math.round(((y / height) * walk) - (walk / 2));
  // Adjust text shadow accordingly
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 2px #b00,
    ${xWalk}px ${yWalk}px 15px #c50,
    ${xWalk * 1.5}px ${yWalk * 1.5}px 40px #ff0,
    ${xWalk * 0.9}px ${yWalk * 0.7}px 25px #521b04,
    ${xWalk * -1.5}px ${yWalk}px 15px rgba(150,50,0,.4),
    ${xWalk * -1.2}px ${yWalk * -1.8}px 15px rgba(200,100,0,.2)
  `;
}

hero.addEventListener('mousemove', shadow);
