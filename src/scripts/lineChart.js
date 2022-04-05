import * as d3 from "d3";
console.log(d3);
// const formatTime = d3.timeFormat("%B %d, %Y"); // "%Y-%m-%d" used in example 
// const myTime = formatTime(1617667200000); 
// console.log(myTime); // April 05, 2021

const width = 800; 
const height = 400; 
const margin = {top: 50, bottom: 50, left: 50, right: 50}; 
const port = JSON.parse(localStorage.getItem("portfolio")) || [];
const wrap = document.getElementById('chart-wrap');



class lineChart{
    
    constructor(){
        this.buildChart();
    }

    buildChart(){
        
    }

    reRenderChart() {
        this.buildChart();
    }

    renderChart(){
   
    }

}

export default lineChart;