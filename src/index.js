import dataUtils from './scripts/dataUtil.js';
import Portfolio from './scripts/portfolio.js';
import barChart from './scripts/barChart.js';
import lineChart from './scripts/lineChart.js';
import {sidebarListeners} from './scripts/sidebar.js'; 
import {instructionsModal} from './scripts/instructionsModal.js'
import {footer} from './scripts/footer.js'
import {header} from './scripts/header.js'


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
   
    let searchInput = document.querySelector("#search-input");

    searchInput.addEventListener("keyup", function (e) {
        debounceFilterSearchResults(e);
    }); 

    const debounceFilterSearchResults = debounce((e) => {
       filterSearchResults(e);
    })
    
    const filterSearchResults = (e) => {

      if(e.target.value === ''){
       resultList.innerHTML = ''; 
       return;
      }
      
      let results = [];
      let value = searchInput.value.toLowerCase(); 
   
      for(let item of coinsList){
        if(results.length > 49) break;
        // debugger;
        if(item.name.toLowerCase().includes(value.toLowerCase()) || item.symbol.toLowerCase().includes(value.toLowerCase())){
          results.push(item);
        }
      }

      displaySearchResults(results);
    };

    function debounce(cb, delay = 1000) {
      let timeout

      return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(...args)
        }, delay)
      }
    }

    

}); 




