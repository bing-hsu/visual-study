import {
  buildSvg,
  cptTreeLayout,
  heightPerShow,
  prop,
  renderLinks,
  renderNode,
  renderRings,
  renderText,
  segment,
} from "./lib/index";

// import "../style/main.css"
import 'regenerator-runtime/runtime'
import {extent, scaleLinear, select} from "d3";

import type {TreeNode} from "./lib/prepTreeData";
import type {HierarchyPointLink, HierarchyPointNode} from "d3";
import type {
  SvgBuilderOptions,
  TextRenderOptions,
  TreeOpts,
  RingRenderOptions,
  NodeRenderOptions,
  LinkRenderOptions
} from "./lib/index";
import {computeHeightOfRows} from "../components/VisualBlock/util";

const {width} = document.body.getBoundingClientRect();
export const isLarge = width > 1440;

(async function main() {
  // establish plotting area
  const plotContainerSelector = "#visual-block-model";
  const containerSel = select<HTMLElement, never>(plotContainerSelector);
  const w = containerSel.node().clientWidth * (isLarge ? 1.4 : 1.15);
  const h = containerSel.node().clientHeight;

  const margin = {top: 60, bottom: 60, left: 0, right: 0};
  const dimension = {x: 0, y: 120, width: w, height: h};
  // const plotContainerSelector = "#main";
  const svgId = "tree";
  const svgOptions: SvgBuilderOptions = {
    containerSelector: plotContainerSelector,
    margin,
    dim: dimension,
    svgId: svgId
  };
  const {getContainer, chartHeight, chartWidth} = buildSvg(svgOptions);

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

  const giniExtent = extent(nodes.map(propGini).map(parseFloat));
  const samplesExtent = extent(nodes.map(propSamples).map(parseFloat));
  const classInstances = nodes.map(propClass);

  // scales
  // radius scales
  const samplesRadiusNumScale = scaleLinear().domain(samplesExtent).range(isLarge ? [3, 30] : [3, 20]);
  const samplesRadiusNodeScale = (n: HierarchyPointNode<TreeNode>) => samplesRadiusNumScale(+propSamples(n.data));
  // line width scale
  const samplesLineWidthNumScale = scaleLinear().domain(samplesExtent).range([.5, 20]);
  const samplesLineWidthLinkScale = (l: HierarchyPointLink<TreeNode>) => samplesLineWidthNumScale(+targetSamples(l));

  // scrolling scale
  const scrollingExtents = new Array(6).fill(0).map((_, idx) => [idx * segment, (idx + 1) * segment]);
  const opacityScrollingNumScaleMap = (offset: number) => scrollingExtents.map(d => scaleLinear().clamp(true).domain([d[0] + offset, d[1] + offset]).range([0, 1]));
  const lineWidthScrollingNumScaleMap = (offset: number) => scrollingExtents.map(d => scaleLinear().clamp(true).domain([d[0] + offset, d[1] + offset]).range([0, 1]))
  // render node
  // const showDelayHeight = 12288;
  const {uebaHeaderHeight, uebaIntroHeight, uebaDataUnderstandHeight, uebaDataPrepHeight,} = computeHeightOfRows();
  const showDelayHeight = (document.querySelector<HTMLElement>("#anchor-grow-tree").offsetTop - innerHeight / 1.5)
      + uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight
  console.log(showDelayHeight);

  const renderNodeOptions: NodeRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-nodes',
    root: rootPoint,
    keyFn: o => o.id,
    radiusFn: samplesRadiusNodeScale,
    fillColorFn: o => o.data.fillColor,
    strokeColorFn: o => o.children ? "#999" : "#222",
    onScrollingOpacityMap: opacityScrollingNumScaleMap(showDelayHeight)
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
    onScrollingOpacityMap: opacityScrollingNumScaleMap(showDelayHeight),
    onScrollingLineWidthMap: lineWidthScrollingNumScaleMap(heightPerShow * 2 + showDelayHeight)
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
    onScrollingOpacityMap: opacityScrollingNumScaleMap(heightPerShow + 10 + showDelayHeight)
  };
  renderRings(renderRingOptions);

  // render text
  const renderTextOptions: TextRenderOptions<TreeNode> = {
    container: getContainer(),
    groupClassName: 'tree-rings',
    root: rootPoint,
    keyFn: o => o.id,
    onScrollingOpacityMap: opacityScrollingNumScaleMap(showDelayHeight)
  };
  renderText(renderTextOptions);


  // window.nodes = nodes;
  // window.rootPoint = rootPoint;
  // window.d3 = d3;
})();

