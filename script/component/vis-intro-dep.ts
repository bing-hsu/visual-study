import * as d3 from "d3";
import {margin} from "./setting";

const containerId = "vis-data-understand";
const {clientHeight, clientWidth } = d3.select<HTMLElement, never>("#" + containerId).node();
const container = d3.select("#" + containerId);
const mainGroup = container.append('svg')
    .attr('width', clientWidth)
    .attr('height', clientHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);


const threeModelsDatum = new Array(4).fill(1);
const gap = 10;
const hMargin = 120;
const vMargin = 80;
const rectWidth = (clientWidth - 2 * hMargin - gap) / 2;
const rectHeight = (clientHeight - 2 * vMargin - gap) / 2;
const positionMap = {
  0: {x: hMargin, y: vMargin},
  1: {x: hMargin + gap + rectWidth, y: vMargin},
  3: {x: hMargin + gap + rectWidth, y: vMargin},
  2: {x: hMargin, y: vMargin + gap + rectHeight}
}
const modelRectsGroup = mainGroup.append('g').classed('three-model-rects-group', true)

const rects = modelRectsGroup.selectAll('rect')
    .data(threeModelsDatum)
    .join('rect')
    .attr('x', (_, idx) => positionMap[idx].x)
    .attr('y', (_, idx) => positionMap[idx].y)
    .classed('drop', (d, idx) => idx === 3)
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    // .attr('fill', '#ddd')
    .attr('stroke', '#333')
    .attr('opacity', 0)

// model block opacity
const OpacityScale_0_1100 = d3.scalePow()
    .clamp(true)
    .exponent(2)
    .domain([0, 1100])
    .range([0, 1]);
const DropYScale_1100_1480 = d3.scaleLinear()
    .clamp(true)
    .domain([1200, 1500])
    .range([vMargin, vMargin + gap + rectHeight]);

const toDrop = modelRectsGroup.select('.drop');
d3.select(window).on('scroll', function () {
  if (pageYOffset < 1100) {
    rects.attr('opacity', () => OpacityScale_0_1100(pageYOffset));
  }
  if (pageYOffset >= 1100 && pageYOffset < 1550) {
        toDrop.attr('y', () => DropYScale_1100_1480(pageYOffset));
  }
});

