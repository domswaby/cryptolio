import dataUtils from './scripts/dataUtil.js';
import Portfolio from './scripts/portfolio.js';
// import searchUtils from './scripts/search.js';


// the event listener's callback will be called AFTER the DOM is fully loaded.
// The anonymous function **is not** called right at this point.
document.addEventListener("DOMContentLoaded", () => {
  // const dataUtils = require("./scripts/dataUtil.js"); 
    let dataGrabber = new dataUtils(); 
    let myPortfolio = new Portfolio();
    console.log(myPortfolio.portfolio);

    let coinsList = localStorage.getItem('coinsList');   
    let resultList = document.querySelector("#search-results");

    const displaySearchResults = function (results) {
      resultList.innerHTML = ''; 
      results.forEach(function (result) {
        let child = document.createElement('li')
        child.innerHTML = result.name;
        resultList.appendChild(child);

        let button = document.createElement('button')
        button.innerHTML = "add coin"
        child.appendChild(button);

        button.addEventListener("click", (e) => {
            myPortfolio.addCoin(result);
            console.log(myPortfolio.portfolio); 
        });
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

    let searchInput = document.querySelector("#search-input");
    let searchButton = document.querySelector("#search-wrap > button")
    searchInput.addEventListener("keyup", function (e) {
      if(e.target.value === ''){
       resultList.innerHTML = ''; 
       return;
      }
      
      filterSearchResults();
    }); 
    
    const filterSearchResults = () => {
      let results = []
      let value = searchInput.value.toLowerCase(); 
   
      for(let item of coinsList){
        if(results.length > 49) break;
        if(item.symbol.toLowerCase().includes(value.toLowerCase()) || item.name.toLowerCase().includes(value.toLowerCase())){
          results.push(item);
        }
      }

      displaySearchResults(results);
    }

    // footer stuff
    let footer = document.querySelector("footer");
    let date = new Date();
    let year = date.getFullYear();
    footer.innerHTML = `All rights reserved ©${year}`

  }); 




