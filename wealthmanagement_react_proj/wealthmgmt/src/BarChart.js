import React, {Component} from 'react';
import * as d3 from "d3";
import './App.css';
import  WealthHeldInfoService  from  './WealthHeldInfoService';
const  wealthHeldService  =  new  WealthHeldInfoService();

export default class BarChart extends Component {

   constructor(props) {
    super(props);

    this.state = {
      wealthHeld: []
    };

  }


componentDidMount() {
 this.drawChart();
}


drawChart() {
 wealthHeldService.getAllData().then(function(result) {

  var data = result.data;




        const width = 800;
        const height = 450;

        const svg = d3.select("body")
            .append('svg')
            .attr('id', 'chart')
            .attr('width', width)
            .attr('height', height);


        const margin = {
            top: 60,
            bottom: 100,
            left: 80,
            right: 40
        };







        const chart = svg.append('g')
            .classed('display', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom


        const xScale = d3.scaleBand()
            .domain(data.map(d => d.ranking))
            .range([1, chartWidth]);

         var ydata = data.map(function(c) {
                return c.networth.replace("$","").replace("billion","") ;
        })



        const yScale = d3.scaleLinear()
            .domain([0, ydata[0]])
            .range([chartHeight, 0]);
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', d => xScale(d.ranking) * 1.025)
            .attr('y', d => yScale(d.networth.replace("$","").replace("billion","")))
            .attr('height', d => (chartHeight - yScale(d.networth.replace("$","").replace("billion",""))))
            .attr('width', d => xScale.bandwidth())
            .style('fill', (d, i) => colorScale(i));

        chart.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .classed('bar-label', true)
            .attr('x', d => xScale(d.ranking) + xScale.bandwidth()/2)
            .attr('dx', 1)
            .attr('y', d => yScale(d.networth.replace("$","").replace("billion","")))
            .attr('dy', -6)
            .text(d => d.name);

        const xAxis = d3.axisBottom()
            .scale(xScale);



        chart.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${chartHeight})`)
            .call(xAxis);

        const yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);

        chart.append("text")
            .attr("x", (width/2))
            .attr("y", 0 - (margin.top/2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Billionaire's Ranking vs Net Worth Graph");

        chart.append('g')
            .classed('y axis', true)
            .attr('transform', 'translate(0,0)')
            .call(yAxis);

        chart.select('.x.axis')
            .append('text')
            .attr('x',  width/2)
            .attr('y', 80)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Ranking');

        chart.select('.y.axis')
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('transform', `translate(-50, ${chartHeight/2}) rotate(-90)`)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Net Worth');

        const yGridlines = d3.axisLeft()
            .scale(yScale)
            .ticks(5)
            .tickSize(-chartWidth,0,0)
            .tickFormat('')

        chart.append('g')
            .call(yGridlines)
            .classed('gridline', false);

 })
}

render(){
     return (<div id={"#" + this.props.bid}></div>);
  }

}
