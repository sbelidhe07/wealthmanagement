import React, {Component} from 'react';
import * as d3 from "d3";
import {event as currentEvent} from 'd3-selection';
import  WealthHeldInfoService  from  './WealthHeldInfoService';
const  wealthHeldService  =  new  WealthHeldInfoService();

export default class LineChartTS extends Component {

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

    console.log(totals.length)
    console.log(typeof(totals))

    var key;
    data = [];

    var rawData = JSON.parse(JSON.stringify(totals));
    for(key in rawData){
        if(rawData.hasOwnProperty(key)){
        data.push({'year' : String(key), 'value' : rawData[key]});
    }
}


var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y"),
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
          d.year = parseTime(d.year);
        d.value = +d.value;
    });

    //console.log(data);

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
         .append("text")
        .attr("class", "axis-title")
        //.attr("transform", "rotate(-90)")
        .attr("x", width-80)
        .attr("y",-6)
        .attr("dx", ".91em")
        .style("text-anchor", "end")
        .style("font-size", "14px")
        .style("font-weight","bold")
        .attr("fill", "#5D6971")
        .text("Year");


    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "14px")
        .style("font-weight","bold")
        .attr("fill", "#5D6971")
        .text("Net Worth");

    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
      	.attr("dy", ".31em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() {
                     focus.style("display", "none");
                     d3.select("#tooltip")
                      .style("opacity", 0);
         })
        .on("mousemove", mousemove);

    function mousemove(event) {
      var x0 = x.invert(event.pageX),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1];
      var format = d3.timeFormat("%Y");
      focus.attr("transform", "translate(" + x(d0.year) + "," + y(d0.value) + ")");
      focus.select("text").text(function() {
                d3.select("#tooltip")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px")
                        .style("opacity", 1)
                        .select("#value")
                        .html("<span>Year: " + format(d0.year) + "</span>"+ "<br/>" +"<span>Total Net Worth: "+ d0.value + "</span>");
       });
      focus.select(".x-hover-line").attr("y2", height - y(d0.value));
      focus.select(".y-hover-line").attr("x2", width + width);
    }
 })
}

 render(){
     return (  <div>
               <svg width="960" height="500"></svg>
               <div id="tooltip" className="hidden">
              <p><span id="value"></span></p>
             </div>
             </div>);
  }

}
