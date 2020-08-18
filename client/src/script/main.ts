import { root, Label } from "./getData";
import { HierarchyPointNode, tree } from "d3-hierarchy";
import * as d3 from "d3";

import "../style/main.css";
import buildSvg from "./lib/buildSvg";

const margin = { top: 60, bottom: 60, left: 20, right: 20 };
const dimension = { x: 0, y: 0, width: 1280, height: 800 };
const { getContainer, chartHeight, chartWidth } = buildSvg(
  "main",
  "graph",
  dimension,
  margin,
);

const treeLayout = tree()
  .size([chartWidth, chartHeight])
  .separation((a, b) => a.parent === b.parent ? 2 : 1);
treeLayout(root);

// @ts-ignore
const nodes = root.descendants();

const sampleExtent = d3.extent(nodes.map((n) => n.data.label.samples));
const radiiScale = d3.scaleLinear().domain(sampleExtent).rangeRound([5, 30]);

type NodeDatum = HierarchyPointNode<any> & {
  parent: string;
  id: string;
  data: { fillColor: string; label: Label };
};
getContainer().append("g").classed("tree-nodes", true)
  .selectAll("circle")
  .data<NodeDatum>(nodes, (d) => d.id)
  .join("circle")
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  // .attr("r", (d) => d.children ? radiiScale(d.data.label.samples) : 5)
    .attr('r', d => radiiScale(d.data.label.samples))
  // .attr("stroke", (d) => d.children ? "#aaa" : "#555")
  // .attr("stroke-dasharray", (d) => d.children ? "3 1" : "")
  .attr("fill", "#fff")
    .attr("fill", d => d.parent? d.data.fillColor : "#999")
  .attr(
    "data-parent-size",
    (d) => d.parent ? d.parent.data.label.samples : null,
  )
  .attr("data-this-size", (d) => d.data.label.samples);
// .transition().duration(1000).delay((d, idx) => d.depth * 1000)
// .attr('fill', d => d.data.fillColor)


const getSize = (n) => n.data.label.samples;
const getClass = (n) => n.data.label.class;
const getFillColor = (n) => n.data.fillColor;
const getX = (n) => n.x;
const getY = (n) => n.y;
const getChildren = (n) => n.children;
const extractNode = (n) => ({ size: getSize(n), fillColor: getFillColor(n), class: getClass(n), x: getX(n.parent), y: getY(n.parent), parentSize: getSize(n.parent)});
const hasChildren = (n) => !!n.children;
const prepNodesForArch = (nodes) => nodes.map((n) => hasChildren(n) ? getChildren(n).map(extractNode) : null ).filter(n => n);

console.log(prepNodesForArch(nodes));

const nodesForArch: {size: number; class:string; data: any}[] = prepNodesForArch(nodes);
const calAngle = d3.pie<typeof nodesForArch[0]>().value(d => d.size);
const arcPathGen = d3.arc<typeof nodesForArch[0]>()
  .innerRadius(d =>  radiiScale(d.data.parentSize) * .6)
  .outerRadius(d => radiiScale(d.data.parentSize))
    .cornerRadius(1)

const setOfAngles = nodesForArch.map(calAngle); // each item contains n spheres of ring
const setOfPaths = setOfAngles.map(rings => rings.map(r => ({pathStr: arcPathGen(r), fillColor: r.data.fillColor, class: r.data.class, radius: radiiScale(r.data.size), x: r.data.x, y: r.data.y}))); // each item contains strings of path
console.log(setOfAngles);
// console.log(setOfPaths)

// @ts-ignore
getContainer().append('g').classed('tree-rings', true)
    .selectAll('g.ring')
    .data<typeof nodesForArch[0]>(setOfPaths)
    .join('g') // each [path, path] map to a <g>
    .classed('ring', true)
    .selectAll('path')
    .data(d => d)
    .join('path')
    .attr('transform', d => {
      const {x, y} = d;
      return `translate(${x},${y})`
    })
    .attr('data-class', d => d.class)
    .attr('d', d => d.pathStr)
    .attr('fill', d => d.fillColor)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    // .style('display', 'none')

const links = root.links();
const pathD = (
  source: NodeDatum,
  target: NodeDatum,
  tickPortion: number = .5,
) => {
  const parentX = source.x, parentY = source.y;
  const childX = target.x, childY = target.y;
  const deltaSum = Math.abs(childY - parentY) / 2;
  const delta2 = deltaSum * tickPortion;
  const delta1 = deltaSum * (1 - tickPortion);
  return `M ${parentX},${parentY + delta1} v ${delta2} L ${childX},${parentY +
    delta1 + delta2} v ${delta2}`;
};
const linkWidthScale = radiiScale.rangeRound([.5, 10]);
getContainer().append("g").classed("tree-links", true)
  .selectAll("path")
  .data<{ source: NodeDatum; target: NodeDatum }>(links as any)
  .join("path")
  .attr("d", (d) => pathD(d.source, d.target, .2))
  .attr("stroke", (d) => d.target.data.fillColor)
  .attr("stroke-linejoin", "round")
  .attr("fill", "none")
  .attr("stroke-width", 1)
  // .transition().duration(1000).delay(2000)
  .attr("stroke-width", (d) => linkWidthScale(d.target.data.label.samples));

const textPos = (
  source: NodeDatum,
  target: NodeDatum,
  fontSize: number = 16,
) => {
  const parentX = source.x, parentY = source.y;
  const childY = target.y;
  const deltaSum = Math.abs(childY - parentY) / 2;
  const textDelta = deltaSum - fontSize - 5;
  return { x: parentX, y: parentY + textDelta };
};
getContainer().append("g").classed("tree-condTexts", true)
  .selectAll("div.text")
  .data<{ source: NodeDatum; target: NodeDatum }>(links as any)
  // .join('div')
  // .classed('.text', true)
  .join("text")
  .attr("text-anchor", "middle")
  .style("font-size", "12px")
  .style("font-family", "sans-serif")
  .attr("x", (d) => textPos(d.source, d.target).x)
  .attr("y", (d) => textPos(d.source, d.target, 16).y)
  .text((d) => d.source.data.cond);

window.rootNode = root;
window.d3 = d3;
