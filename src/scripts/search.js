import {debounce} from './debounce.js'
export const searchModule = (resultList, coinsList, displaySearchResults, myPortfolio, myBarChart) => {
    
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
    
      displaySearchResults(results, resultList, myPortfolio, myBarChart);
    };
    
}