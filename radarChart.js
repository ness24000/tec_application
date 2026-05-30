// imports
import { select, selectAll, pointer } from 'https://esm.sh/d3-selection';
import { scaleLinear } from 'https://esm.sh/d3-scale';
import { radialLine } from 'https://esm.sh/d3-shape';

// setup svg container
const dimensions = {
    width: 500,
    height: 700,
    marginTop: 30,
    marginRight: 50,
    marginBottom: 40,
    marginLeft: 50,
}


// define data
const data = {
    sp: {
        km: 3827,
        eurkm: 14,
        eueur: 14071,
        pass: 13.4,
        km_norm: 1,
        eurkm_norm: 0.428,
        eueur_norm: 1,
        pass_norm: 0.273
    },
    fr: {
        km: 2628,
        eurkm: 15.4,
        eueur: 1406,
        pass: 49,
        km_norm: 0.687,
        eurkm_norm: 0.471,
        eueur_norm: 0.1,
        pass_norm: 1
    },
    it: {
        km: 1280,
        eurkm: 32.7,
        eueur: 724,
        pass: 20,
        km_norm: 0.334,
        eurkm_norm: 1,
        eueur_norm: 0.051,
        pass_norm: 0.408
    },
    gr: {
        km: 2331,
        eurkm: 14.6,
        eueur: 2694,
        pass: 27.2,
        km_norm: 0.609,
        eurkm_norm: 0.446,
        eueur_norm: 0.191,
        pass_norm: 0.555
    }
}

function getAxesLabels(key) {
    switch (key) {
        case "km": return "Size";
        case "eurkm": return "€/Km";
        case "eueur": return "EU €";
        case "pass": return "Use";
    }
}

function makeSpiderChart(data, width, gId, drawLabels = false) {

    let g = select(gId);

    g.data(data)

    // draw the axes
    g.append("line").
        attr("x1", -width / 2).
        attr("y1", 0).
        attr("x2", width / 2).
        attr("y2", 0).
        attr("stroke", "black").
        attr("stroke-width", 1).
        style("opacity", "0.4")

    g.append("line").
        attr("x1", 0).
        attr("y1", -width / 2).
        attr("x2", 0).
        attr("y2", width / 2).
        attr("stroke", "black").
        attr("stroke-width", 1)
        .style("opacity", "0.4")

    let ticks = [0.25, 0.5, 0.75, 1]
    g.selectAll(".tick").
        data(ticks).
        join("circle").
        attr("class", "tick").
        attr("cx", 0).
        attr("dy", 0).
        attr("r", d => d * width / 2).
        attr("fill", "none").
        attr("stroke", "black").
        attr("stroke-width", 1).
        attr("stroke-opacity", 0.5).
        style('fill', '#d3d3d2').
        attr('fill-opacity', "0.3")

    // draw the inner shape
    let line = scaleLinear().domain([0, 1]).range([0, width / 2])

    function makePoints(data) {
        let points = Object.values(data).slice(-4).map((d, i) => [
            (Math.PI / 2) + (2 * Math.PI * i / 4),
            line(d)])
        points.push(points[0])
        return points
    }

    let points = makePoints(data)

    let pathData = radialLine()(points)
    g.append("path").
        attr("d", pathData).
        attr("fill", "none").
        attr("stroke", "#ea7575").
        attr("stroke-width", 2.5).
        style("fill", 'transparent')
        .style("stroke-linecap", "round")
        .style("stroke-linejoin", "round")

    // define tooltip
    // adapted from: https://d3-graph-gallery.com/graph/interactivity_tooltip.html
    var tooltip2 = select("#radarOutterChartFrame")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "12px")
        .style("line-height", "1.5")
        .style("font-family", "monospace")
        .style("background-color", "#fbfaf5")


    g
        .select("path")
        .on("mouseover", function () {
            select(this).style("fill", "#ea9e9e").
                attr("fill-opacity", 0.3)
            tooltip2.html((d, i) => `<strong>Use</strong> ${data.pass}(bill) passenger-Km* <br> <strong>Size</strong> ${data.km.toLocaleString("en-GB")} Km <br> <strong>€/Km</strong> ${data.eurkm}(mill) € <br> <strong>EU €</strong> ${data.eueur.toLocaleString("en-GB")}(mill) €<br>`)
            tooltip2.style("visibility", "visible")
        })
        .on("mousemove", (event) => {
        const [x, y] = pointer(event, document.getElementById('radarOutterChartFrame'));
        tooltip2.style("left", (x - 90) + "px").style("top", (y + 30) + "px");
        })
        .on("mouseout", function () {
            select(this).style("fill", "transparent").style("opacity", 1)
            tooltip2.style("visibility", "hidden")
        })

    g.append('text').
        attr('x', 0).
        attr('y', ["#Spain", "#Italy"].includes(gId) ? width / 2 + 20 : -width / 2 - 10).
        attr("dy", gId === "#France" ? -15 : 0).
        attr('text-anchor', 'middle').
        text(gId.replace("#", "")).
        style("font-size", "17px")

    if (!drawLabels) return;

    // draw axes labels
    g.selectAll("axis-label").
        data(Object.keys(data).slice(0, 4)).
        join("text").
        classed("axis-label", true).
        attr("x", 0).
        attr("y", 0).
        attr("text-anchor", "middle").
        attr("dominant-baseline", "middle").
        attr("transform", (d, i) => {
            const angle = 2 * Math.PI * i / 4;
            const x = (width * 1.15) / 2 * Math.cos(angle);
            const y = (width * 1.15) / 2 * Math.sin(angle);
            let rot = 0;
            if (i === 0) rot = 90;
            else if (i === 2) rot = -90;
            return `translate(${x},${y}) rotate(${rot})`;
        }).
        text(d => getAxesLabels(d)).
        style("font-family", "monospace").
        style("font-size", "14px")


}

let titleFrame = select("#radarFrame").
    append("foreignObject").
    attr("x", dimensions.marginLeft).
    attr("y", dimensions.marginTop).
    attr("width", (dimensions.width - dimensions.marginLeft - dimensions.marginRight) / 1.2).
    attr("height", dimensions.height / 4).
    append("xhtml:div").
    attr("xmlns", "http://www.w3.org/1999/xhtml")

titleFrame.append("p").
    classed("title", true).
    html("<strong>Beyond network size</strong>")

titleFrame.append("p").
    html("Use, size, cost and EU funding statistics for High-Speed Train networks of selected EU countries").
    style("font-weight", "400").
    style("margin-top", "10px").
    style("font-size", "17px").
    style("line-height", "1.3")

titleFrame.append("p").
    html("Hover for details").
    style("font-size", "11px").
    style("margin-top", "3px").
    style("font-style", "italic")


let footerFrame = select("#radarFrame").
    append("foreignObject").
    attr("x", dimensions.marginLeft).
    attr("y", dimensions.height - dimensions.marginBottom).
    attr("width", dimensions.width - dimensions.marginLeft - dimensions.marginRight).
    attr("height", dimensions.height / 4).
    append("xhtml:div").
    attr("xmlns", "http://www.w3.org/1999/xhtml")

footerFrame.append("p").
    classed("footer", true).
    html("Source: ECA Special report n° 19/2018 ")

footerFrame.append("p").
    classed("footer", true).
    html("* Passenger-Km: number of passengers multiplied by the distance they traveled")


const chartDimensions = 135;
makeSpiderChart(data.sp, chartDimensions, "#Spain");
makeSpiderChart(data.fr, chartDimensions, "#France", true);
makeSpiderChart(data.gr, chartDimensions, "#Germany");
makeSpiderChart(data.it, chartDimensions, "#Italy");
