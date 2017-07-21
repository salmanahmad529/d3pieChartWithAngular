import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  ngOnInit() {
  var width = 600,
  height = 350,
  radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#00FF00", "#808000","#ffff00", "#ff0000", "#42A5F5", "#00FFFF", "#999999", "#1976D2"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 60)
    .innerRadius(radius - 60);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.rating; });

var svg = d3.select("#chartID").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("assets/data1.csv", function(error, data) {
  if (error) throw error;

    data.forEach(function(d) {
        d.rating = d.rating;
        d.technologies = d.technologies;
    })

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
 
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.technologies); }) 
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", animatePie);
        
  g.append("text")
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.technologies; });
});

function animatePie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

 }
 }
