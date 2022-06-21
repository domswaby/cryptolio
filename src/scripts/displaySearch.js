export const displaySearchResults = function (results, resultList, myPortfolio, myBarChart) {
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
                displaySearchResults([], resultList, myPortfolio, myBarChart); // make search results disappear after clicking add coin button
            }); 

        });
    });
};