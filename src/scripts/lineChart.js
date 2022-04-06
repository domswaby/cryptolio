import * as d3 from "d3";

const parseDate = d3.timeParse("%Q");




// const myTime2 = parseDate("1617667200000"); 
// console.log(myTime2); // April 05, 2021
// console.log(typeof myTime2);

const width = 800; 
const height = 400; 
const margin = {top: 50, bottom: 50, left: 50, right: 50}; 
const wrap = document.getElementById('chart-wrap');



class lineChart{
    
    constructor(dataGrabber, coin_id){
        const chartTitle = document.querySelector("#price-chart-title"); 
        chartTitle.innerHTML = " - Bitcoin"; 
        this.dataGrabber = dataGrabber;

        this.dataGrabber.coinHistory(coin_id).then((res) => {
          // console.log(`This is the data inside line Chart constructor: ${res.prices}`); 
          this.buildChart(res.prices);
        }); 
    }

    buildChart(data){
          let wrap = document.getElementById('chart-wrap');
          wrap.innerHTML = ''; 
          data = data.map((ele, idx) => {
            let eleDate = parseDate(`${ele[0]}`);
            let elePrice = Math.round(ele[1] * 100) / 100;
            // console.log(elePrice); 
            // console.log(typeof elePrice + ` and index is ${idx}`);   
            // console.log(`eleDate is a ${typeof eleDate}`); 
            return {
              date: eleDate, 
              price: elePrice 
            };
          });

          console.log(data[0]); 

          // console.log(`Data formatted: ${data[0].price}`); // data is formatted correctly

          var svg = d3.select("#chart-wrap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
             // Add X axis --> it is a date format
            var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
            
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return + d.price; })])
              .range([ height, 0 ]);
            
            svg.append("g")
              .call(d3.axisLeft(y));

            // Add the line
            svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.price) })
                );

        }

    renderChart(coin_id){
      this.dataGrabber.coinHistory(coin_id).then((res) => {
        // console.log(`This is the data inside line Chart constructor: ${res.prices}`); 
        this.buildChart(res.prices);
      }); 
    }

}

export default lineChart;