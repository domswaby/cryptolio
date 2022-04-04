import dataUtils from './scripts/dataUtil.js';
import Portfolio from './scripts/portfolio.js';
import barChart from './scripts/barChart.js';

document.addEventListener("DOMContentLoaded", () => {
  
    let dataGrabber = new dataUtils(); 
    let myPortfolio = new Portfolio();
    let myBarChart = new barChart();
    console.log(myPortfolio.portfolio);

    let coinsList = localStorage.getItem('coinsList');   
    let resultList = document.querySelector("#search-results");
    
    const displaySearchResults = function (results) {
      resultList.innerHTML = ''; 
      results.forEach(function (result) {
        let child = document.createElement('li')
        let button = document.createElement('button')
        let span = document.createElement('span')
                
        resultList.appendChild(child);
        span.innerHTML = result.name;
        button.innerHTML = "add coin";
        child.appendChild(span);
        child.appendChild(button);

        button.addEventListener("click", (e) => {
            myPortfolio.addCoin(result).then((res) => {
              myBarChart.reRenderChart();
            }); 
        });
      });
    };

    if(!coinsList){
      console.log("made it here"); 
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
    searchInput.addEventListener("keyup", function (e) {
      console.log("triggered keyup"); 
      if(e.target.value === ''){
       resultList.innerHTML = ''; 
       return;
      }
      
      filterSearchResults();
    }); 
    
    const filterSearchResults = () => {
      
      let results = [];
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




