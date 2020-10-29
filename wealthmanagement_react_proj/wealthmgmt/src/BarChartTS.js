import React, {Component} from 'react';
import ClearCache from "react-clear-cache";
import * as d3 from "d3";
import './App.css';
import  WealthHeldInfoService  from  './WealthHeldInfoService';
import $ from 'jquery';
const  wealthHeldService  =  new  WealthHeldInfoService();

export default class BarChartTS extends Component {

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

 var data = []
 wealthHeldService.getAllTSData().then(function(result) {

  data = result.data;
  var totals = data.reduce(function (r, o) {
    var x = o.networth.replace(/[^0-9.]/g, "");
    (r[o.year])? r[o.year] += parseInt(x) : r[o.year] = parseInt(x);
    return r;
  }, {});

    var key;
    data = [];

    var rawData = JSON.parse(JSON.stringify(totals));
    for(key in rawData){
        if(rawData.hasOwnProperty(key)){
        data.push({'key' : key, 'value' : rawData[key]});
    }
}


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
            .domain(data.map(d => d.key))
            .range([1, chartWidth]);

        var ydata = data.map(function(c) {
                return c.value ;
        })



        const yScale = d3.scaleLinear()
            .domain([0, d3.max(ydata)])
            .range([chartHeight, 0]);
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', d => xScale(d.key) * 1.035)
            .attr('y', d => yScale(d.value))
            .attr('height', d => (chartHeight - yScale(d.value)))
            .attr('width', d => xScale.bandwidth())
            .style('fill', (d, i) => colorScale(2))
            .on("mouseover", function (d,i) {
                    console.log(d,i);
                    d3.select("#tooltip")
                        .style("left", d.pageX + "px")
                        .style("top", d.pageY + "px")
                        .style("opacity", 1)
                        .select("#value")
                        .html("<span>Year: " + i.key + "</span>"+ "<br/>" +"<span>Total Net Worth: "+ i.value + "</span>");
                })
                .on("mouseout", function () {
                    // Hide the tooltip
                    d3.select("#tooltip")
                        .style("opacity", 0);;
                })
            .on("click", function(d,i){
             let data = []
             wealthHeldService.getAllTSDataByYear(i.key).then(function(result) {

             data = result.data;




        const width = 800;
        const height = 450;
        d3.select('#sub-chart').remove()

        const svg = d3.select('body')
            .insert('svg')
            .attr('id', 'sub-chart')
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
            .style('fill', (d, i) => colorScale(i))
             .on("mouseover", function (d,i) {
                    console.log(d,i);
                    d3.select("#bar-tooltip")
                        .style("left", d.pageX + "px")
                        .style("top", d.pageY + "px")
                        .style("opacity", 1)
                        .select("#bar-value")
                        .html("<span>Name:" + i.name + "</span>"+ "<br/>" +"<span>Net Worth:"+ i.networth + "</span>");

                               })
                .on("mouseout", function () {
                    // Hide the tooltip
                    d3.select("#bar-tooltip")
                        .style("opacity", 0);
                });


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
            .text("Billionaire's Ranking vs Net Worth Graph For Year-"+i.key);

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


 });


            });


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
            .text("Billionaire's Year vs Total Net Worth Graph");

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
            .text('Year');

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
     return (  <div>
     <div id={"#" + this.props.bid}></div>
     <div id="tooltip" className="hidden">
      <p><span id="value"></span></p>
     </div>
     <div id="bar-tooltip" className="hidden">
      <p><span id="bar-value"></span></p>
     </div>
    </div>);
  }

}
