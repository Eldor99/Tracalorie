// Storage Controller

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
    items: [
      {id: 0, name: 'Steak', calories: 400},
      {id: 1, name: 'Burger', calories: 600},
      {id: 2, name: 'Ice Cream', calories: 100},
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    }
  }
})();
// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list'
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
    }
  }
})();
// App Controller
const App = (function(ItemCtrl, UICtrl){

  // Public methods
  return {
    init: function(){
      // Fetch items from data strucure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemsList(items);
      
    }
  }

})(ItemCtrl, UICtrl);

// INitialize App
App.init();