import React, {Component} from 'react';
import * as d3 from "d3";
import {event as currentEvent} from 'd3-selection';
import  WealthHeldInfoService  from  './WealthHeldInfoService';
const  wealthHeldService  =  new  WealthHeldInfoService();

export default class PieChartTS extends Component {

   constructor(props) {
    super(props);

    this.state = {
      wealthHeld: []
    };
  }


componentWillMount() {
    this.drawChart();
}



drawChart() {
var self=this;
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

const svg = d3.select("body").append("svg")
  .attr("width",self.props.width)
  .attr("height", self.props.height);





    var radius = Math.min(self.props.width, self.props.height) / 2 ;
    var g = svg.append("g").attr("transform", "translate(" + self.props.width / 2 + "," + self.props.height / 2 + ")");

    var color = d3.scaleOrdinal([ "#2484c1","#65a620","#7b6888","#a05d56","#961a1a","#d8d23a","#e98125","#d0743c","#635222","#6ada6a","#0c6197","#7d9058","#207f33","#44b9b0","#bca44a","#e4a14b","#a3acb2","#8cc3e9","#69a6f9","#5b388f"]);

    // Generate the pie
     var pie = d3.pie().value(function(d) {
                return d.value;
            });

     var path = d3.arc()
                     .outerRadius(radius - 5)
                     .innerRadius(0);

     var label = d3.arc()
                 .outerRadius(radius)
                 .innerRadius(radius - 50);

    //Generate groups
    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc")
                .on("mouseover", function (d,i) {
                    //console.log(d);
                    d3.select("#tooltip")
                        .style("left", d.pageX + "px")
                        .style("top", d.pageY + "px")
                        .style("opacity", 1)
                        .select("#value")
                        .text('Year: ' + i.data.key);
                })
                .on("mouseout", function () {
                    // Hide the tooltip
                    d3.select("#tooltip")
                        .style("opacity", 0);;
                })
                .on("click", function(d,i){

                   //var newWindow = window.open('');
                   //var newWindowRoot = d3.select(newWindow.document.body)
                   //.attr("width","1060px")
                   //.attr("margin","50px auto");

                  //drawChart(newWindowRoot);

                console.log(d,i);
               let data = []
               wealthHeldService.getAllTSDataByYear(i.data.key).then(function(result) {

               data = result.data;



        const width = 800;
        const height = 450;
        d3.select('#sub-chart').remove()

        //var sampleSVG = newWindowRoot;

        const svg = d3.select('body')
            .append('svg')
            .attr('id', 'sub-chart')
            .attr('width', width)
            .attr('height', height)
            .on("click",function(d){
                console.log(d)
            });


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
            .style('fill', (d, i) => colorScale(i+1))
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
                        .style("opacity", 0);;
                })
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
            .text("Billionaire's Ranking vs Net Worth Graph For Year-"+i.data.key);

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


    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", path);


        arcs.append("text")
               .attr("transform", function(d) {
                        return "translate(" + label.centroid(d) + ") rotate(45)";
                })
                .style("font-size", 10)
                .style("font-weight", "bold")
                .style("text-anchor","middle")
                .attr("alignment-baseline", "middle")
               .text(function(d) { return d.data.value});

      svg.append("g")
            .attr("transform", "translate(" + (self.props.width / 2 + 140) + "," +  20 + ")")
            .append("text")
            .append("tspan")
            .text("Billionaire's Year Wise Total")
            .attr("class", "title");

      svg.append("g")
            .attr("transform", "translate(" + (self.props.width / 2  + 160) + "," +  40 + ")")
            .append("text")
            .append("tspan")
            .text("Net Worth Ratio Graph")
            .attr("class", "title");


 })
}

 render(){
     return (
     <div>
     <div id={"#" + this.props.pid}></div>
     <div id="tooltip" className="hidden">
      <p><span id="value"></span></p>
     </div>
     <div id="bar-tooltip" className="hidden">
      <p><span id="bar-value"></span></p>
     </div>

    </div>
);
  }

}
