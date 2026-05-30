import { select, pointer } from 'https://esm.sh/d3-selection';
import { scaleLinear } from 'https://esm.sh/d3-scale';
import {line, curveCardinal} from 'https://esm.sh/d3-shape';
import { min, max } from 'https://esm.sh/d3-array';
import { axisBottom, axisLeft } from 'https://esm.sh/d3-axis';

const dimensions = {
    width: 700,
    height: 700,
    marginTop: 130,
    marginRight: 60,
    marginBottom: 30,
    marginLeft: 60,
}

select('#scatterFrame').
    attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)

const data = [
    {
        Country: "Luxembourg",
        GDPCapita: 103909,
        HomeOwnershipRate: 64.1
    },
    {
        Country: "Ireland",
        GDPCapita: 91514,
        HomeOwnershipRate: 70.9
    },
    {
        Country: "Switzerland",
        GDPCapita: 89783,
        HomeOwnershipRate: 42.0
    },
    {
        Country: "Norway",
        GDPCapita: 79670,
        HomeOwnershipRate: 80.0
    },
    {
        Country: "Denmark",
        GDPCapita: 63230,
        HomeOwnershipRate: 58.4
    },
    {
        Country: "Sweden",
        GDPCapita: 54916,
        HomeOwnershipRate: 64.6
    },
    {
        Country: "Netherlands",
        GDPCapita: 51471,
        HomeOwnershipRate: 68.8
    },
    {
        Country: "United Kingdom",
        GDPCapita: 47265,
        HomeOwnershipRate: 64.5
    },
    {
        Country: "Austria",
        GDPCapita: 45562,
        HomeOwnershipRate: 54.2
    },
    {
        Country: "Finland",
        GDPCapita: 44855,
        HomeOwnershipRate: 66.9
    },
    {
        Country: "Belgium",
        GDPCapita: 44838,
        HomeOwnershipRate: 70.9
    },
    {
        Country: "Germany",
        GDPCapita: 44109,
        HomeOwnershipRate: 47.2
    },
    {
        Country: "France",
        GDPCapita: 39441,
        HomeOwnershipRate: 61.4
    },
    {
        Country: "Euro Area",
        GDPCapita: 38145,
        HomeOwnershipRate: 64.7
    },
    {
        Country: "European Union",
        GDPCapita: 34860,
        HomeOwnershipRate: 68.5
    },
    {
        Country: "Italy",
        GDPCapita: 34398,
        HomeOwnershipRate: 77.1
    },
    {
        Country: "Malta",
        GDPCapita: 33467,
        HomeOwnershipRate: 70.9
    },
    {
        Country: "Cyprus",
        GDPCapita: 32999,
        HomeOwnershipRate: 69.2
    },
    {
        Country: "Spain",
        GDPCapita: 29193,
        HomeOwnershipRate: 73.6
    },
    {
        Country: "Slovenia",
        GDPCapita: 26046,
        HomeOwnershipRate: 74.2
    },
    {
        Country: "Portugal",
        GDPCapita: 22479,
        HomeOwnershipRate: 71.2
    },
    {
        Country: "Greece",
        GDPCapita: 21654,
        HomeOwnershipRate: 69.4
    },
    {
        Country: "Czech Republic",
        GDPCapita: 20445,
        HomeOwnershipRate: 75.1
    },
    {
        Country: "Estonia",
        GDPCapita: 20046,
        HomeOwnershipRate: 79.7
    },
    {
        Country: "Slovakia",
        GDPCapita: 19798,
        HomeOwnershipRate: 93.8
    },
    {
        Country: "Lithuania",
        GDPCapita: 19094,
        HomeOwnershipRate: 86.5
    },
    {
        Country: "Poland",
        GDPCapita: 17984,
        HomeOwnershipRate: 87.2
    },
    {
        Country: "Croatia",
        GDPCapita: 17771,
        HomeOwnershipRate: 91.4
    },
    {
        Country: "Latvia",
        GDPCapita: 16951,
        HomeOwnershipRate: 82.2
    },
    {
        Country: "Hungary",
        GDPCapita: 16525,
        HomeOwnershipRate: 89.8
    },
    {
        Country: "Turkey",
        GDPCapita: 15148,
        HomeOwnershipRate: 56.9
    },
    {
        Country: "Romania",
        GDPCapita: 12493,
        HomeOwnershipRate: 93.2
    },
    {
        Country: "Russia",
        GDPCapita: 11043,
        HomeOwnershipRate: 92.6
    },
    {
        Country: "Bulgaria",
        GDPCapita: 10090,
        HomeOwnershipRate: 86.1
    },
    {
        Country: "Serbia",
        GDPCapita: 8576,
        HomeOwnershipRate: 88.9
    },
    {
        Country: "Montenegro",
        GDPCapita: 8553,
        HomeOwnershipRate: 90.3
    },
    {
        Country: "Macedonia",
        GDPCapita: 6701,
        HomeOwnershipRate: 87.0
    }
]
const trendLineData = [
    [6701, 92.58],
    [8553, 91.07],
    [8576, 91.05],
    [10090, 89.81],
    [11043, 89.02],
    [12493, 87.82],
    [15148, 85.63],
    [16525, 84.49],
    [16951, 84.14],
    [17771, 83.47],
    [17984, 83.3],
    [19094, 82.39],
    [19798, 81.82],
    [20046, 81.62],
    [20445, 81.29],
    [21654, 80.31],
    [22479, 79.62],
    [26046, 76.44],
    [29193, 73.67],
    [32999, 70.91],
    [33467, 70.64],
    [34398, 70.15],
    [34860, 69.91],
    [38145, 68.24],
    [39441, 67.67],
    [44109, 65.66],
    [44838, 65.35],
    [44855, 65.34],
    [45562, 65.04],
    [47265, 64.38],
    [51471, 63.86],
    [54916, 64.21],
    [63230, 66.08],
    [79670, 66.32],
    [89783, 66.57],
    [91514, 66.63],
    [103909, 67.04]
]

// Scales
let x = scaleLinear()
    .domain([min(data, d => d.GDPCapita), max(data, d => d.GDPCapita)])
    .range([dimensions.marginLeft, dimensions.width - dimensions.marginRight]).nice()

let y = scaleLinear()
    .domain([min(data, d => d.HomeOwnershipRate), 100])
    .range([dimensions.height - dimensions.marginBottom * 2, dimensions.marginTop * 2])
    .nice()

// Axes
let xAxis = axisBottom(x)
    .tickFormat((d, i) => [10000, 50000, 90000].includes(d) ? `€${d / 1000}k` : "")
    .tickSizeInner(5)
    .tickSizeOuter(0)

const xAxisElement = select('#xAxis')
    .attr('transform', `translate(0,${y(40)})`)
    .call(xAxis);

xAxisElement.selectAll('.tick text')
    .style('font-size', '16px')
    .append('text')
    .attr('x', dimensions.width - dimensions.marginRight - dimensions.marginLeft)
    .attr('y', dimensions.height - dimensions.marginBottom)
    .text('GDP per capita')
    .style('font-size', '16px')

xAxisElement.selectAll('.tick line')
    .filter((d, i, nodes) => i === 0 || i === nodes.length - 1)
    .style('display', 'none');


let yAxis = axisLeft(y)
    .tickValues([40, 50, 60, 70, 80, 90, 100])
    .tickFormat((d, i) => i === 6 ? `${d}%` : `${d}`)
    .tickSize(dimensions.width - dimensions.marginLeft - dimensions.marginRight)
    .tickSizeOuter(0)


let yAxisElement = select('#yAxis').
    attr('transform', `translate(${dimensions.width - dimensions.marginRight},0)`).
    call(yAxis)

yAxisElement.selectAll('.tick text')
    .attr('dy', '-5px') // vertical offset
    .attr('dx', '5px') // horizontal offset
    .attr('text-anchor', 'start') // align text to the end of the tick
    .style('font-size', '16px')

// Tooltip
var tooltip = select('#scatterOutterFrame')
    .append('div')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '10px')
    .style('font-size', '15px')
    .style('line-height', '1.5')
    .style('font-family', 'monospace')
    .style('background-color', '#fbfaf5')


let annotatedCountries = ["Norway", "Ireland", "European Union", "Luxembourg"]
// Point annotations
select('#scatterFrame').
    selectAll('circle.annotation').
    data(data.filter(d => annotatedCountries.includes(d.Country))).
    join('circle').
    classed('annotation', true).
    attr('cx', d => x(d.GDPCapita)).
    attr('cy', d => y(d.HomeOwnershipRate)).
    attr('r', 6).
    attr('fill', 'none').
    attr('stroke', 'black').
    attr('stroke-width', 2)

// Define target points for each annotation (in data space)
function annotationTargets(d) {
    if (d.Country === "Norway") {
        return { x: x(data.filter(d=>d.Country === "Ireland")[0].GDPCapita), y: y(90) }; // Example: right and up
    } else if (d.Country === "Ireland") {
        return { x: x(d.GDPCapita), y: y(90) }; // Example: right and down
    } else if (d.Country === "Luxembourg") {
        return { x: x(data.filter(d=>d.Country === "Ireland")[0].GDPCapita), y: y(90) }; // Example: left and down
    }
     else if (d.Country === "European Union") {
        return { x: x(d.GDPCapita), y: y(50) }; // Example: left and up
    }
};

// Draw lines from each annotation to its target
select('#scatterFrame')
    .selectAll('line.annotation-line')
    .data(data.filter(d => annotatedCountries.includes(d.Country)))
    .join('line')
    .classed('annotation-line', true)
    .attr('x1', d => x(d.GDPCapita))
    .attr('y1', d => y(d.HomeOwnershipRate))
    .attr('x2', d => annotationTargets(d).x)
    .attr('y2', d => annotationTargets(d).y)
    .attr('stroke', 'black')
    .attr('stroke-width', 1.5)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    

// Data points
select('#scatterFrame').
    selectAll('circle.data-point').
    data(data).
    join('circle').
    classed('data-point', true).
    attr('cx', d => x(d.GDPCapita)).
    attr('cy', d => y(d.HomeOwnershipRate)).
    attr('r', 5).
    attr('fill', '#01d6ad').
    attr('opacity', 0.8).
    on('mouseover', function (event, d) {
        select(this).attr('r', 8).attr('opacity', 1);
        tooltip.html(`<strong>${d.Country}</strong><br>GDP/capita: €${d.GDPCapita.toLocaleString('en-GB')}<br>Home ownership: ${d.HomeOwnershipRate}%`);
        tooltip.style('visibility', 'visible');
    }).
    on('mousemove', (event) => {
        const [x, y] = pointer(event, document.getElementById('scatterOutterFrame'));
        tooltip.style('left', (x - 90) + 'px').style('top', (y + 30) + 'px');
    }).
    on('mouseout', function () {
        select(this).attr('r', 5).attr('opacity', 0.7);
        tooltip.style('visibility', 'hidden');
    })

// Trend line
let lineGenerator = line()
    .x(d => x(d[0]))
    .y(d => y(d[1]))
    .curve(curveCardinal)

let trendLinePoints = lineGenerator(trendLineData)

select('#scatterFrame').
    append('path').
    attr('id', 'outerTrendLine').
    attr('d', trendLinePoints).
    attr('fill', 'none').
    attr('stroke', ' #efeee8').
    attr('stroke-width', 5).
    style("opacity",1)

select('#scatterFrame').
    append('path').
    attr('id', 'trendLine').
    attr('d', trendLinePoints).
    attr('fill', 'none').
    attr('stroke', '#01d6ad').
    attr('stroke-width', 3).
    style("opacity",1)
    

// Annotations
select('#scatterFrame').
    append('text').
    attr('x', x(92000)).
    attr('y', y(96)).
    style('font-weight', 'bold').
    attr('text-anchor', 'middle')
    .text("Ireland, Norway and")


select('#scatterFrame').
    append('text').
    attr('x', x(92000)).
    attr('y', y(93.5)).
    style('font-weight', 'bold').
    attr('text-anchor', 'middle')
    .text("Luxembourg don't ")


select('#scatterFrame').
    append('text').
    attr('x', x(92000)).
    attr('y', y(91)).
    style('font-weight', 'bold').
    attr('text-anchor', 'middle').
    text("follow the pattern")


select('#scatterFrame').
    append('text').
    attr('x', x(35000)).
    attr('y', y(48)).
    style('font-weight', 'bold').
    attr('text-anchor', 'middle').
    text("EU average")

// Title and description
let titleFrame = select("#scatterFrame").
    append("foreignObject").
    attr("x", dimensions.marginLeft).
    attr("y", dimensions.marginTop*1/3).
    attr("width", (dimensions.width - dimensions.marginLeft - dimensions.marginRight) / 1.2).
    attr("height", dimensions.marginTop * 1.8).
    append("xhtml:div").
    attr("xmlns", "http://www.w3.org/1999/xhtml")

titleFrame.append("p").
    classed("title", true).
    html("<strong>Poor owner, rich renter</strong>")
    .style("font-size", "40px")

titleFrame.append("p").
    html("<strong>% people who own their home</strong> compared to <strong>GDP per capita</strong> for selected european countries ").
    style("margin-top", "20px").
    style("font-size", "20px").
    style("line-height", "1.3")

titleFrame.append("p").
    html("Hover for details").
    style("font-size", "15px").
    style("margin-top", "10px").
    style("font-style", "italic")

// // Footnote
let footerFrame = select("#scatterFrame").
    append("foreignObject").
    attr("x", dimensions.marginLeft+2).
    attr("y", dimensions.height - dimensions.marginBottom/2).
    attr("width", dimensions.width - dimensions.marginLeft - dimensions.marginRight).
    attr("height", dimensions.height / 4).
    append("xhtml:div").
    attr("xmlns", "http://www.w3.org/1999/xhtml")

footerFrame.append("p").
    classed("footer", true).
    html("Sources: Eurostat (2026) ilc_lvho02 | TradingEconomics (2026) GDP per capita Europe")