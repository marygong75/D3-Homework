// @TODO: YOUR CODE HERE!

var svgWitdth = 950;
var svgHeight = 600;

var margin = {
    top: 40,
    right: 50,
    bottom: 40,
    left: 50
};

var width = svgWitdth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
.select("#scatter")
    .append("svg")
    .attr("width", svgWitdth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


url = "https://raw.githubusercontent.com/marygong75/D3-Homework/master/data.csv"
d3.csv(url).then(function(newData) {

    newData.forEach(function(data) {
        data.abbr = data.abbr;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
        console.log(data.abbr)
    });

    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(newData, d=> d.obesity)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(newData, d => d.smokes)])
        .range([height, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(newData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "18")
    .attr("fill", "blue")
    .attr("opacity", "0.2")
    .attr("stroke-width", "1");

    var textGroup = chartGroup.selectAll(".states")
    .data(newData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.obesity))
    .attr("y", d => yLinearScale(d.smokes))
    .text(d => d.abbr)
    .attr("color", "black")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight+15})`)

    var povertyLabel = chartGroup.append("text")
    .attr("x", chartWidth/2)
    .attr("y", chartHeight+35)
    .text("In Poverty %")

    var healthcareLabel =  chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-chartMargin.left)
        .attr("x", 0-(chartHeight/2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Lacks Healthcare %")

});