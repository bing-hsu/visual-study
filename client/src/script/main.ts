import {root, Label} from "./getData";
import {HierarchyPointNode, tree} from "d3-hierarchy";
import * as d3 from "d3";

import "../style/main.css"
import buildSvg from "./lib/buildSvg";

const margin = {top: 20, bottom: 20, left: 20, right: 20};
const dimension = {x: 0, y: 0, width: 960, height: 300};
const {getContainer, chartHeight, chartWidth} = buildSvg('main', 'graph', dimension, margin);



const treeLayout = tree()
    .size([chartWidth, chartHeight])
    .separation((a, b) => a.parent === b.parent ? 2 : 2);
treeLayout(root);


// @ts-ignore
const nodes = root.descendants();
console.log(nodes);

type NodeDatum = HierarchyPointNode<any> & {parent: string; id: string, data: {fillColor: string, label: Label}}
getContainer().append('g').classed('tree-nodes', true)
    .selectAll('circle')
    .data<NodeDatum>(nodes, d => d.id)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.data.label.samples / 20)
    .attr('stroke', d => d.children ? '#999' : '#222')
    .attr('fill', d => d.data.fillColor)
    .attr('data-parent-size', d => d.parent ? d.parent.data.label.samples : null)
    .attr('data-this-size', d => d.data.label.samples);

const links = root.links();
const pathD = (source: NodeDatum, target: NodeDatum, tickPortion: number = .5) => {
  const parentX = source.x, parentY = source.y;
  const childX = target.x, childY = target.y;
  const deltaSum = Math.abs(childY - parentY) / 2;
  const delta2 = deltaSum * tickPortion;
  const delta1 = deltaSum * (1 - tickPortion);
  return `M ${parentX},${parentY + delta1} v ${delta2} L ${childX},${parentY + delta1 + delta2} v ${delta2}`
}
getContainer().append('g').classed('tree-links', true)
    .selectAll('path')
    .data<{source: NodeDatum, target: NodeDatum}>(links as any)
    .join('path')
    .attr('d', d => pathD(d.source, d.target, .2))
    .attr('stroke', '#555')
    .attr('stroke-width', .5)
    .attr('fill', 'none')



window.rootNode = root;
window.d3 = d3;