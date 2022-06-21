import dataUtils from './scripts/dataUtil.js';
import Portfolio from './scripts/portfolio.js';
import barChart from './scripts/barChart.js';
import lineChart from './scripts/lineChart.js';
import {sidebarListeners} from './scripts/sidebar.js'; 
import {instructionsModal} from './scripts/instructionsModal.js';
import {footer} from './scripts/footer.js';
import {header} from './scripts/header.js';
import {searchModule} from './scripts/search.js';
import {displaySearchResults} from './scripts/displaySearch.js';

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
    
    if(!coinsList){
      dataGrabber.coinsList().then((data) => {
        coinsList = data;
        localStorage.setItem('coinsList', JSON.stringify(data));
        displaySearchResults(coinsList.slice(0,10), resultList, myPortfolio, myBarChart);  
      });  
    }else{
      coinsList = JSON.parse(localStorage.getItem('coinsList')); 
      displaySearchResults(coinsList.slice(0,10), resultList, myPortfolio, myBarChart);  
    }

    searchModule(resultList, coinsList, displaySearchResults, myPortfolio, myBarChart); 
   
}); 




