// scroller 
export const sidebarListeners = () => { 
    let addCoinLink = document.getElementById('add-coin-link');
    addCoinLink.addEventListener("click", () => {
      let ele = document.getElementById('add-coin-header');
      ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }); 
    let tableLink = document.getElementById('table-link');
    tableLink.addEventListener("click", () => {
      let ele = document.getElementById('port-header');
      ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }); 
    let portPieLink = document.getElementById('port-pie-link');
    portPieLink.addEventListener("click", () => {
      let ele = document.getElementById('port-pie-header');
      ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }); 
    let priceChartLink = document.getElementById('price-chart-link');
    priceChartLink.addEventListener("click", () => {
      let ele = document.getElementById('price-chart-header');
      ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }); 
}    

