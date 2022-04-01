import dataUtils from './scripts/dataUtil.js';


// the event listener's callback will be called AFTER the DOM is fully loaded.
// The anonymous function **is not** called right at this point.
document.addEventListener("DOMContentLoaded", () => {
  // const dataUtils = require("./scripts/dataUtil.js"); 
    let my_data = new dataUtils(); 
  

    let coinsList;  
    // my_data.coinsList().then((data) => {
    //   coinsList = data; 
    //   console.log(coinsList);
    // });
    
    let simplePrice; 
    
    my_data.simplePrice().then((data) => {
      coinsList = data; 
      console.log(coinsList);
    });
    
    

    // let wrapper  = document.getElementById("main"); 
    // wrapper.innerHTML = "<p>Tester</p>"; 
    

  }); 




