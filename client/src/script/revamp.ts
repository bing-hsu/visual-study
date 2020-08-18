import buildSvg, {SvgBuilderOptions} from "./lib/buildSvg";
import 'regenerator-runtime/runtime'
import {TreeNode} from "./lib/prepTreeData";
import {heightPerShow, prop, segment} from "./lib/util";
import * as d3 from "d3";
import {group} from "d3-array";

import "../style/main.css"
import {cptTreeLayout, TreeOpts} from "./lib/cptTreeLayout";
import {NodeRenderOptions, renderNode} from "./lib/renderNode";
import {HierarchyPointLink, HierarchyPointNode, PieArcDatum} from "d3";
import {LinkRenderOptions, renderLinks} from "./lib/renderLinks";
import {renderRings, RingRenderOptions} from "./lib/renderRings";
import {renderText, TextRenderOptions} from "./lib/renderText";

(async function main() {
  window.scrollTo(0, 0);
  // establish plotting area

  const margin = { top: 60, bottom: 60, left: 20, right: 20 };
  const dimension = { x: 0, y: 120, width: 1280, height: 960 };
  const plotContainerSelector = "#main";
  const svgId = "tree";
  const svgOptions: SvgBuilderOptions = { containerSelector: plotContainerSelector, margin, dim: dimension, svgId: svgId };
  const {getSvg, getContainer, chartHeight, chartWidth} = buildSvg(svgOptions);

  // import data
  const {root, nodes} = await import("./lib/prepTreeData");

  // compute tree layout (x, y) of each node
  const treeLayoutOpts: TreeOpts<TreeNode> = {
    size: [chartWidth, chartHeight],
    separation: (a, b) => a.parent === b.parent ? 2 : 1
  }
  const rootPoint = cptTreeLayout<TreeNode>(root, treeLayoutOpts);

  // attributes to be represented in visuals
  // what values are to be represented by visual attributes
  const propGini = prop("gini");
  const propSamples = prop("samples");
  const propClass = prop("class");
  const targetSamples = (l: HierarchyPointLink<TreeNode>) => l.target.data.samples;

  const giniExtent = d3.extent(nodes.map(propGini).map(parseFloat));
  const samplesExtent = d3.extent(nodes.map(propSamples).map(parseFloat));
  const classInstances = nodes.map(propClass);

  // scales
  // radius scales
  const samplesRadiusNumScale = d3.scaleLinear().domain(samplesExtent).range([3, 30]);
  const samplesRadiusNodeScale = (n: HierarchyPointNode<TreeNode>) => samplesRadiusNumScale(+propSamples(n.data));
  const giniRadiusNumScale = d3.scaleLinear().domain(giniExtent).range([5,30]);
  const giniRadiusNodeScale = (n: HierarchyPointNode<TreeNode>) => giniRadiusNumScale(+propGini(n.data));
  // color scale
  const giniColorNumScale = d3.scaleSequential(d3.interpolateBlues).domain(giniExtent);
  const giniColorNodeScale = (n: HierarchyPointNode<TreeNode>) => giniColorNumScale(+propGini(n.data));
  const samplesColorNumScale = d3.scaleSequential(d3.interpolateReds).domain(samplesExtent);
  const samplesColorNodeScale = (n: HierarchyPointNode<TreeNode>) => samplesColorNumScale(+propSamples(n.data));
  // line width scale
  const samplesLineWidthNumScale = d3.scaleLinear().domain(samplesExtent).range([.5, 20]);
  const samplesLineWidthLinkScale = (l: HierarchyPointLink<TreeNode>) => samplesLineWidthNumScale(+targetSamples(l));

  // scrolling scale
  const scrollingExtents = new Array(6).fill(0).map((_, idx) => [idx * segment , (idx + 1) * segment]);
  const opacityScrollingNumScaleMap = (offset:number) => scrollingExtents.map(d => d3.scaleLinear().clamp(true).domain([d[0] + offset, d[1] + offset]).range([0, 1]));
  const lineWidthScrollingNumScaleMap = (offset: number) => scrollingExtents.map(d => d3.scaleLinear().clamp(true).domain([d[0] + offset, d[1] + offset]).range([0, 1]))
  // render node
  const renderNodeOptions: NodeRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-nodes',
    root: rootPoint,
    keyFn: o => o.id ,
    radiusFn: samplesRadiusNodeScale,
    fillColorFn: o => o.data.fillColor,
    strokeColorFn: o => o.children ? "#999" : "#222",
    onScrollingOpacityMap: opacityScrollingNumScaleMap(0)
  }
  renderNode(renderNodeOptions);


  // render links
  const renderLinkOptions: LinkRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-links',
    root: rootPoint,
    keyFn: o => o.source.id + "-" + o.target.id,
    strokeColorFn: o => o.target.data.fillColor,
    strokeWidthFn: samplesLineWidthLinkScale,
    onScrollingOpacityMap: opacityScrollingNumScaleMap(0),
    onScrollingLineWidthMap: lineWidthScrollingNumScaleMap(heightPerShow * 2)
  }
  renderLinks(renderLinkOptions);

  // render rings
  const renderRingOptions: RingRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-rings',
    root: rootPoint,
    keyFn: o => o.map(n => n.data.id).join('-'),
    radiusFn: samplesRadiusNodeScale,
    fillColorFn: o => o.data.data.fillColor,
    onScrollingOpacityMap: opacityScrollingNumScaleMap(heightPerShow + 10)
  };
  renderRings(renderRingOptions);

  // render text
  const renderTextOptions: TextRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-rings',
    root: rootPoint,
    keyFn: o => o.id,
    onScrollingOpacityMap: opacityScrollingNumScaleMap(0)
  };
  renderText(renderTextOptions);



  window.nodes = nodes;
  window.rootPoint = rootPoint;
  window.d3 = d3;
})();

