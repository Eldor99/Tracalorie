// Storage Controller
const StorageCtrl = (function(){
  // Public methods
  return {
    storeItem: function(item){
      let items;
      // Check if any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        // push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      }else{
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // Push to new item
        items.push(item);

        // Re set ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items = [];
      if(localStorage.getItem('items') === null){
        items = [];
      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    }
  }
})();

// Item Controller
const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    // items: [
    //   // {id: 0, name: 'Steak', calories: 400},
    //   // {id: 1, name: 'Burger', calories: 600},
    //   // {id: 2, name: 'Ice Cream', calories: 100},
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      let ID;
      // Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      }else{
        ID = 0;
      }

      // Callories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id){
      let found = null;

      // Lpp through items
      data.items.forEach(item => {
        if(item.id === id){
          found = item
        }
      });
      return found;
    },
    updateItem: function(name, calories){
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      // Get IDs
      const ids = data.items.map(item => {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Romove item
      data.items.splice(index, 1);
    },
    clearAllItems: function(){
      data.items = [];
    },
    logData: function(){
      return data;
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;

      // Loop through items and add calories
      data.items.forEach(item => {
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      return data.totalCalories;
    }

  }
})();
// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    listItems: '#item-list li',
    clearBtn: '.clear-btn'
  }

  // Public methods
  return{
    populateItemsList: function(items){
      let html = '';
      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Callories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i> </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: function(){
      return UISelectors;
    },
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Callories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i> </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) =>{
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Callories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i> </a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(item => {
        item.remove();
      });
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';

    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none  ';

    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    }
  }
})();
// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function(){
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enteer
    document.addEventListener("keypress", function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

     // Delete item event
     document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     // Clear item event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

  }

  // Add Item submit 
  const itemAddSubmit = (e) => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    
    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add itemm to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Click to edit
  const itemEditClick = (e) => {
    if(e.target.classList.contains('edit-item')){
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;
      
      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
  }
  // Update item submit
  const itemUpdateSubmit = function(e){
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }
  
  // Delete Button Event
  const itemDeleteSubmit = (e) => {
    // Get curren item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
    

    e.preventDefault();
  }

  // Clear items event
  const clearAllItemsClick = () => {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // hide ul
    UICtrl.hideList();
  }
  // Public methods
  return {
    init: function(){
      // Clear edit state/ set inital set
      UICtrl.clearEditState();

      // Fetch items from data strucure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      } else{
        // Populate list with items
        UICtrl.populateItemsList(items);
      }

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
 
      
      // Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, StorageCtrl,  UICtrl);

// INitialize App
App.init();