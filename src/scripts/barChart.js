import * as d3 from "d3";
console.log(d3);

const testData = [
    {name: 'Simon', score: 80}, 
    {name: 'Mary', score: 90}, 
    {name: 'John', score: 60}
]
const width = 800; 
const height = 400; 
const margin = {top: 50, bottom: 50, left: 50, right: 50}



class barChart{
    
    constructor(){
        this.renderChart();
    }

    renderChart(){
        const svg = d3.select('#port-pie-wrap')
            .append('svg')
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.left - margin.right)
            .attr('viewBox', [0, 0, width, height]);

        const x  = d3.scaleBand()
            .domain(d3.range(testData.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])
        svg
            .append('g')
            .attr('fill', 'black')
            .selectAll('rect')
            .data(testData.sort((a, b) => d3.descending(a.score, b.score)))
            .join('rect')
                .attr('x', (d, i) => x(i))
                .attr('y', (d) => y(d.score))
                .attr('height', d => y(0) - y(d.score))
                .attr('width', x.bandwidth())
                .attr('class', 'bar')

        function xAxis(g){
            g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => testData[i].name))
                .attr('font-size', '1.2em')
        }

        function yAxis(g){
            g.attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, testData.format))
                .attr('font-size', '1.2em')
        }    
        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        svg.node()
    }

}

export default barChart;