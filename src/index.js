import dataUtils from './scripts/dataUtil.js';
import Portfolio from './scripts/portfolio.js';
import barChart from './scripts/barChart.js';
import lineChart from './scripts/lineChart.js';
import {sidebarListeners} from './scripts/sidebar.js'; 
import {instructionsModal} from './scripts/instructionsModal.js';
import {footer} from './scripts/footer.js';
import {header} from './scripts/header.js';
import {searchModule} from './scripts/search.js'


document.addEventListener("DOMContentLoaded", () => {
    
    let dataGrabber = new dataUtils(); 
    let myPortfolio = new Portfolio();
    let myLineChart = new lineChart(dataGrabber, "bitcoin"); 
    let myBarChart = new barChart(myLineChart);
    sidebarListeners();
    instructionsModal();
    header();
    footer();
    myPortfolio.barChart = myBarChart;
    
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
              let searchInput = document.querySelector("#search-input");
              searchInput.value = ""; 
              displaySearchResults([]); // make search results disappear after clicking add coin button
            }); 

        });
      });
    };

    if(!coinsList){
      dataGrabber.coinsList().then((data) => {
        coinsList = data;
        localStorage.setItem('coinsList', JSON.stringify(data));
        displaySearchResults(coinsList.slice(0,10));  
      });  
    }else{
      coinsList = JSON.parse(localStorage.getItem('coinsList')); 
      displaySearchResults(coinsList.slice(0, 10));
    }

    searchModule(resultList, coinsList, displaySearchResults); 
   
}); 




