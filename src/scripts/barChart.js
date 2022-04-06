import * as d3 from "d3";

const width = 800; 
const height = 600; 
const margin = {top: 50, bottom: 100, left: 0, right: 50}; 
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
                    this.myLineChart.renderChart(ele.target.id);
                    let id = ele.target.id; 
                    let lineChartTitle = id.slice(0,1).toUpperCase() + id.slice(1).toLowerCase(); 
                    document.querySelector("#price-chart-header > span").innerHTML = "- " + lineChartTitle;
                })
            .exit().remove();

       // svg.selectAll('rect').data(port.sort((a, b) => d3.descending(a.usd, b.usd))).exit().remove(); 

        function xAxis(g){
            g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => port[i].id))
                .attr('font-size', '1.2em')
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.4em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-30)")
                .attr("color", "var(--green-3)"); 
                
        }

        function yAxis(g){
            g.attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, port.format))
                .attr('font-size', '1.2em');
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