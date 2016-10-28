const WIDTH = 900;
const HEIGHT = 400;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

// var date_Rang = [1990,2000,2006,2011,2014,2016]
var _data = [];

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

//generating random numbers......................
var generate_random_number = function(data1){
  var newData=[];
  	for(i = 0;i < 10;i++)
      newData.push(Math.floor((Math.random()*100)));
    return newData;
}

//update..line chart....................
 var createLineChart = function(svg,data,line) {

 	svg.append('path')
// 	    .transition().duration(2000).ease(d3.easeLinear)
        .attr('transform',  translate(MARGIN, MARGIN))
 		.attr('d', line(data))
 		.classed('line', true);
 }

var createBarChart = function(svg,data,xAxis,yAxis) {
    svg.selectAll('rect')
              .data(data)
              .enter()
              .append('rect')
              .classed('rect',true)
              .style('fill', 'steelblue')
              .attr('x', function(d,i) { return xScale(i); })
              .attr('width', 20)
              .attr('y', function(d) { return yScale(d); })
              .attr('height', function(d) { return INNER_HEIGHT - yScale(d); })
              .attr('transform',  translate(MARGIN, MARGIN));
}

var initializeChart = function(xAxis,yAxis,container){
	svg = d3.select(container)
	    .append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis)
		.classed('xAxis', true);

		svg.selectAll('.xAxis .tick')
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', -INNER_HEIGHT)
			.classed('grid', true);

		svg.append('g')
			.attr('transform', translate(MARGIN, MARGIN))
			.call(yAxis)
			.classed('yAxis', true);

		svg.selectAll('.yAxis .tick')
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', INNER_WIDTH)
			.attr('y2', 0)
			.classed('grid', true);
    return svg;

}
var loadChart = function(){
    xScale = d3.scaleLinear()
    		    .domain([0,10])
    		    .range([0, INNER_WIDTH]);

    yScale = d3.scaleLinear()
    		    .domain([0,100])
    		    .range([INNER_HEIGHT, 0]);


    var xAxis = d3.axisBottom(xScale).ticks(12);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    var line_chart = initializeChart(xAxis,yAxis,".lineContainer");
    var bar_chart = initializeChart(xAxis,yAxis,".barContainer");

    var line = d3.line()
        .x(function(q,i){
        return xScale(i)
        })
        .y(function(q){
        return yScale(q)
        });


    var data = generate_random_number();
    setInterval(function(){
        data.shift();
        data.push(Math.floor((Math.random()*100)));

        line_chart.selectAll('path').remove();
        bar_chart.selectAll('rect').remove();

        createLineChart(line_chart,data,line);
        createBarChart(bar_chart,data,xAxis,yAxis);


    },700)

}

window.onload = loadChart;
