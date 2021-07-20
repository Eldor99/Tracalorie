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
    logData: function(){
      return data;
    }
  }
})();
// UI Controller
const UICtrl = (function(){

  // Public methods
  return{
    
  }
})();
// App Controller
const App = (function(ItemCtrl, UICtrl){

  // Public methods
  return {
    init: function(){
      console.log('Initializng App...');
    }
  }

})(ItemCtrl, UICtrl);

// INitialize App
App.init();