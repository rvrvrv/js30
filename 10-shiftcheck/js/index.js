const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      // Check all boxes in between currently and previously clicked
      if (inBetween) checkbox.checked = true;
    });
  }
  lastChecked = this;
}

// Listen for checks on all boxes
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
