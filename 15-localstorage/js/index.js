const addItems = document.querySelector('.add-items');
const allBtns = document.querySelectorAll('.all-btn');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

// Generate HTML for list of items
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map(
      (plate, i) => `
            <li>
                <input type='checkbox' data-index=${i} id="item-${i}"
                    ${plate.done ? 'checked' : ''} />
                <label for='item-${i}'>${plate.text}</label>
            </li>
            `,
    )
    .join(''); // Return mapped array as string (HTML)
}

// Add new item to items array
function addItem(e) {
  e.preventDefault();
  // Get and store user's item
  const text = this.querySelector('[name=item]').value;
  const item = {
    text, // Shorthand to store 'const text' as 'item.text'
    done: false,
  };
  // Clear add-item field
  this.reset();
  // Add user's item to overall array
  items.push(item);
  // Generate HTML
  populateList(items, itemsList);
  // Store list in localStorage
  localStorage.setItem('items', JSON.stringify(items));
}

// Change item's done (checked) status
function toggleDone(e) {
  // Ignore non-checkbox clicks
  if (!e.target.matches('input')) return;
  // Get index of clicked item
  const { index } = e.target.dataset;
  // Toggle done property of clicked item
  items[index].done = !items[index].done;
  // Update localStorage and list
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

// Clear, check, or uncheck all items
function affectAll(e) {
  const { task } = e.target.dataset;
  // Clear all items
  if (task === 'clear') {
    if (confirm('Are you sure you want to clear all of the items?')) {
      localStorage.removeItem('items');
      items.length = 0;
      itemsList.innerHTML = '';
    }
  }
  // Check or uncheck all items
  if (task.includes('check')) {
    items.forEach(item => item.done = (task === 'check'));
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
allBtns.forEach(btn => btn.addEventListener('click', affectAll));

// Upon page load, populate list from localStorage
populateList(items, itemsList);
