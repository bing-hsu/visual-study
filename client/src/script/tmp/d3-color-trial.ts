import * as d3 from "d3";

const data = d3.range(0,1, .1).map(d3.interpolateSinebow)

const l = 20;
d3.select('#main').append('svg').attr('width', 600).attr('height', 600)
    .append('g')
    .attr('transform', 'translate(40, 40)')
    .selectAll('rect').data(data)
    .join('rect')
    .attr('x', (d, idx) => idx * l)
    .attr('y', 20)
    .attr('width', l)
    .attr('height', l)
    .attr('fill', d => d);


