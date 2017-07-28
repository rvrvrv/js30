const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

//Add new item to items array
function addItem(e) {
    e.preventDefault();
    //Get and store user's item
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, //Shorthand to store 'text' as 'text'
        done: false
    };
    //Clear add-item field
    this.reset();
    //Add user's item to overall array
    items.push(item);
    //Generate HTML
    populateList(items, itemsList);
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

addItems.addEventListener('submit', addItem);