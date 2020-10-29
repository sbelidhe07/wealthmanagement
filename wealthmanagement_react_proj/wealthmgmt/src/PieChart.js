import React, {Component} from 'react';
import * as d3 from "d3";
import  WealthHeldInfoService  from  './WealthHeldInfoService';
const  wealthHeldService  =  new  WealthHeldInfoService();

export default class BarChart extends Component {

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
 wealthHeldService.getAllData().then(function(result) {

   var labeldata = result.data.map(function(c) {
    return c.name + " (" + c.networth.replace("$","").replace("billion","") + ")";
  })


const svg = d3.select("body").append("svg")
  .attr("width",self.props.width)
  .attr("height", self.props.height);





    var radius = Math.min(self.props.width, self.props.height) / 2 ;
    var g = svg.append("g").attr("transform", "translate(" + self.props.width / 2 + "," + self.props.height / 2 + ")");

    var color = d3.scaleOrdinal(['green','yellow','pink','blue','red','purple','brown','orange','gray','cyan']);

    // Generate the pie
     var pie = d3.pie().value(function(d) {
                return d.substr(d.indexOf("(")+1,d.length-1).trim().replace(")","");
            });

     var path = d3.arc()
                     .outerRadius(radius - 5)
                     .innerRadius(0);

     var label = d3.arc()
                 .outerRadius(radius)
                 .innerRadius(radius - 50);

    //Generate groups
    var arcs = g.selectAll("arc")
                .data(pie(labeldata))
                .enter()
                .append("g")
                .attr("class", "arc");

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", path);


        arcs.append("text")
               .attr("transform", function(d) {
                        return "translate(" + label.centroid(d) + ") rotate(18)";
                })
                .style("font-size", 10)
                .style("font-weight", "bold")
                .style("text-anchor","middle")
                .attr("alignment-baseline", "middle")
               .text(function(d) { return d.data.substr(0,d.data.indexOf("("))+"-$"+d.data.substr(d.data.indexOf("(")+1,d.data.length-1).trim().replace(")","") });

      svg.append("g")
            .attr("transform", "translate(" + (self.props.width / 2 + 120) + "," +  20 + ")")
            .append("text")
            .text("Billionaire's Net Worth Ratio Graph")
            .attr("class", "title");



 })
}

 render(){
     return (<div id={"#" + this.props.pid}></div>);
  }

}
