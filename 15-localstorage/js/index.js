const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const allBtns = document.querySelectorAll('.all-btn');


//Add new item to items array
function addItem(e) {
    e.preventDefault();
    //Get and store user's item
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, //Shorthand to store 'const text' as 'item.text'
        done: false
    };
    //Clear add-item field
    this.reset();
    //Add user's item to overall array
    items.push(item);
    //Generate HTML
    populateList(items, itemsList);
    //Store list in localStorage
    localStorage.setItem('items', JSON.stringify(items));
}

//Generate HTML for list of items
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item-${i}"
                    ${plate.done ? 'checked' : ''} />
                <label for="item-${i}">${plate.text}</label>
            </li>
            `;
    }).join(''); //Return mapped array as string (HTML)
}

//Change item's done (checked) status
function toggleDone(e) {
    if (!e.target.matches('input')) return; //Ignore non-checkbox clicks
    //Get index of clicked item
    let index = e.target.dataset.index;
    //Toggle done property of clicked item
    items[index].done = !items[index].done;
    //Update localStorage and list
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    console.table(items);
}

//Clear, check, or uncheck all items
function affectAll(e) {
    let task = e.target.dataset.task;
    console.log(task);
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
allBtns.forEach(btn => btn.addEventListener('click', affectAll));

//Upon page load, populate list from localStorage
populateList(items, itemsList);