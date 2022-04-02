import dataUtils from './scripts/dataUtil.js';


// the event listener's callback will be called AFTER the DOM is fully loaded.
// The anonymous function **is not** called right at this point.
document.addEventListener("DOMContentLoaded", () => {
  // const dataUtils = require("./scripts/dataUtil.js"); 
    let dataGrabber = new dataUtils(); 
    let coinsList = localStorage.getItem('coinsList');   

    const displaySearchResults = function (results) {
      let resultList = document.querySelector("#search-results");
      results.forEach(function (result) {
        let child = document.createElement('li')
        child.innerHTML = result.name;
        resultList.appendChild(child);
      })
    }

    if(!coinsList){
      dataGrabber.coinsList().then((data) => {
        coinsList = data;
        localStorage.setItem('coinsList', JSON.stringify(data));
        console.log("Got coinsList from API")
        displaySearchResults(coinsList.slice(0,10))  
      });  
    }else{
      coinsList = JSON.parse(localStorage.getItem('coinsList')); 
      console.log("Got coinsList from localStorage")
      displaySearchResults(coinsList.slice(0, 10))
    }
    

  
  
    // let simplePrice; 
    
    // dataGrabber.simplePrice().then((data) => {
    //   simplePrice = data; 
    //   console.log(simplePrice);
    // });
    
    

    // let wrapper  = document.getElementById("main"); 
    // wrapper.innerHTML = "<p>Tester</p>"; 
    

  }); 




