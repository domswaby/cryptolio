import dataUtils from './scripts/dataUtil.js';
import Portfolio from './scripts/portfolio.js';
import barChart from './scripts/barChart.js';
import lineChart from './scripts/lineChart.js';


document.addEventListener("DOMContentLoaded", () => {
    
    let dataGrabber = new dataUtils(); 
    let myPortfolio = new Portfolio();
    let myBarChart = new barChart();
    let mylineChart = new lineChart(); 

    myPortfolio.barChart = myBarChart;
    
    console.log(myPortfolio.portfolio);
    
    // page load header transition animations
    let headerTitle = document.querySelector("#header > h1");
    headerTitle.classList.add('header-shown');
    let headerImage = document.querySelector("#cyberfrog");
    headerImage.classList.add('moved');

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
      console.log("made it here"); 
      dataGrabber.coinsList().then((data) => {
        coinsList = data;
        localStorage.setItem('coinsList', JSON.stringify(data));
        console.log("Got coinsList from API");
        displaySearchResults(coinsList.slice(0,10));  
      });  
    }else{
     
      coinsList = JSON.parse(localStorage.getItem('coinsList')); 
      console.log("Got coinsList from localStorage");
      displaySearchResults(coinsList.slice(0, 10));
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




