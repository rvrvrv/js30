// Original band array
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// Sort bands after stripping opening article ('a', 'an', or 'the')
const sortedBands = bands.slice().sort((a, b) => ((strip(a) > strip(b)) ? 1 : -1));

// Remove article from beginning of string
function strip(name) {
  return name.replace(/^((a|an|the)\s)/gi, '');
}

document.addEventListener('DOMContentLoaded', () => {
  const bandList = document.getElementById('bands');
  const btn = document.getElementById('sortBtn');
  const title = document.getElementById('title');

  // Allow user to switch between original and sorted array
  btn.addEventListener('click', () => {
    if (btn.innerText === 'See Original') {
      bandList.innerHTML = bands.map(band => `<li>${band}</li>`).join('');
      title.innerText = 'Original Array';
      btn.innerText = 'See Sorted';
    } else {
      bandList.innerHTML = sortedBands.map(band => `<li>${band}</li>`).join('');
      title.innerText = 'Sorted Array';
      btn.innerText = 'See Original';
    }
  });

  // Click sort button upon page load
  btn.click();
});
