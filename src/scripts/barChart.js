import * as d3 from "d3";

// const testData = [
//     {name: 'Simon', score: 80}, 
//     {name: 'Mary', score: 90}, 
//     {name: 'John', score: 60}
// ]


const width = 800; 
const height = 400; 
const margin = {top: 50, bottom: 50, left: 50, right: 50}; 
const port = JSON.parse(localStorage.getItem("portfolio")) || [];
const wrap = document.getElementById('port-pie-wrap');



class barChart{
    
    constructor(myLineChart){
        this.myLineChart = myLineChart; 
        this.buildChart();
    }

    buildChart(){
        let port = JSON.parse(localStorage.getItem("portfolio")) || [];
        let wrap = document.getElementById('port-pie-wrap');
        wrap.innerHTML = ''; 
        const svg = d3.select('#port-pie-wrap')
            .append('svg')
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.left - margin.right)
            .attr('viewBox', [0, 0, width, height]);

        const x  = d3.scaleBand()
            .domain(d3.range(port.length))
            .range([margin.left, width - margin.right]) // change margin.left to 0 to move scale back to left so chart isn't indented.  do this in yAxis definition too 
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, Math.floor(d3.max(port, (d) => d.usd)) + 10])
            .range([height - margin.bottom, margin.top]);
        svg
            .append('g')
            .attr('fill', 'black')
            .selectAll('rect')
            .data(port.sort((a, b) => d3.descending(a.usd, b.usd)))
            .enter()
            .append('rect')
                .attr('x', (d, i) => x(i))
                .attr('y', (d) => y(d.usd))
                .attr('height', d => y(0) - y(d.usd))
                .attr('width', x.bandwidth())
                .attr('class', 'bar') 
                .attr('id', d => d.id)
                .on('click', (ele) => {
                    console.log(`This is ele - ${ele.target}`); 
                    this.myLineChart.renderChart(ele.target.id);
                })
            .exit().remove();

       // svg.selectAll('rect').data(port.sort((a, b) => d3.descending(a.usd, b.usd))).exit().remove(); 

        function xAxis(g){
            g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => port[i].id))
                .attr('font-size', '1.2em')
        }

        function yAxis(g){
            g.attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, port.format))
                .attr('font-size', '1.2em')
        }    
        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        svg.node(); 
    }

    reRenderChart() {
        this.buildChart();
    }

    renderChart(){
   
    }

}

export default barChart;