import buildSvg, {SvgBuilderOptions} from "./lib/buildSvg";
import 'regenerator-runtime/runtime'
import {TreeNode} from "./lib/prepTreeData";
import {prop} from "./lib/util";
import * as d3 from "d3";

import "../style/main.css"
import {cptTreeLayout, TreeOpts} from "./lib/cptTreeLayout";
import {NodeRenderOptions, renderNode} from "./lib/renderNode";
import {HierarchyPointNode} from "d3";

(async function main() {
  // establish plotting area

  const margin = { top: 60, bottom: 60, left: 20, right: 20 };
  const dimension = { x: 0, y: 0, width: 1280, height: 800 };
  const plotContainerSelector = "#main";
  const svgId = "tree";
  const svgOptions: SvgBuilderOptions = { containerSelector: plotContainerSelector, margin, dim: dimension, svgId: svgId };
  const {getSvg, getContainer, chartHeight, chartWidth} = buildSvg(svgOptions);

  // import data
  const {root, nodes} = await import("./lib/prepTreeData");

  // compute tree layout (x, y) of each node
  const treeLayoutOpts: TreeOpts<TreeNode> = {
    size: [chartWidth, chartHeight],
    separation: (a, b) => a.parent === b.parent ? 1 : 2
  }
  const rootPoint = cptTreeLayout<TreeNode>(root, treeLayoutOpts);

  // attributes to be represented in visuals
  // what values are to be represented by visual attributes
  const propGini = prop("gini");
  const propSamples = prop("samples");
  const propClass = prop("class");

  const giniExtent = d3.extent(nodes.map(propGini).map(parseFloat));
  const samplesExtent = d3.extent(nodes.map(propSamples).map(parseFloat));
  const classInstances = nodes.map(propClass);

  // scales
  // node radius scales
  const samplesRadiusNumScale = d3.scaleLinear().domain(samplesExtent).range([5, 30]);
  const samplesRadiusNodeScale = (n: HierarchyPointNode<TreeNode>) => samplesRadiusNumScale(+propSamples(n.data));
  const giniRadiusNumScale = d3.scaleLinear().domain(giniExtent).range([5,30]);
  const giniRadiusNodeScale = (n: HierarchyPointNode<TreeNode>) => giniRadiusNumScale(+propGini(n.data));
  // color scale



  // render node
  const renderNodeOptions: NodeRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-nodes',
    root: rootPoint,
    keyFn: o => o.id,
    radiusScale: samplesRadiusNodeScale,
    fillColorFn: o => o.data.fillColor,
    strokeColorFn: o => o.children ? "#999" : "#222"
  }
  renderNode(renderNodeOptions);


  window.nodes = nodes;
  window.rootPoint = rootPoint;
})();

