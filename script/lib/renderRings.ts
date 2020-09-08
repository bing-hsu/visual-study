import {select, selectAll, pie, arc} from "d3";
import {HierarchyPointNode} from "d3-hierarchy";
import {TreeNode} from "./prepTreeData";
import {BaseType, PieArcDatum, Selection} from "d3";
import {defaultRadius} from "./renderNode";

export interface RingRenderOptions<NodeDatum extends TreeNode> {
  container: Selection<any, any, any, any>;
  groupClassName: string;
  root: HierarchyPointNode<NodeDatum>;
  radiusFn: (o: HierarchyPointNode<NodeDatum>) => number;
  keyFn: (o: PieArcDatum<HierarchyPointNode<NodeDatum>>[]) => string;
  fillColorFn: (o: PieArcDatum<HierarchyPointNode<NodeDatum>>) => string;
  onScrollingOpacityMap: { [k: number]: (n: number) => number };
}

export function renderRings<NodeDatum extends TreeNode>(opts: RingRenderOptions<NodeDatum>): void {
  const {container, groupClassName, root, radiusFn, keyFn, fillColorFn, onScrollingOpacityMap} = opts
  const {ringData, arcPathLookup} = cptArcsAndPath(root, radiusFn)

  container.append('g').classed(groupClassName, true)
      .selectAll('g.ring')
      .data<PieArcDatum<HierarchyPointNode<NodeDatum>>[]>(ringData, keyFn)
      .join('g').classed('ring', true)
      .selectAll('path')
      .data<PieArcDatum<HierarchyPointNode<NodeDatum>>>(d => d)
      .join('path')
      .attr('transform', d => {
        const {x, y} = d.data.parent;
        return `translate(${x},${y})`
      })
      .attr('d', d => arcPathLookup.get(d.data.id))
      .attr('fill', fillColorFn)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0);

  select(window).on('scroll.scrollRing', function () {
    selectAll<BaseType, PieArcDatum<HierarchyPointNode<TreeNode>>>(`g.${groupClassName} path`)
        .attr('opacity', d => onScrollingOpacityMap[d.data.depth](window.scrollY));
  })
}

function cptArcsAndPath<NodeDatum extends TreeNode>(
    rootPoint: HierarchyPointNode<NodeDatum>,
    radiusScale: (o: HierarchyPointNode<NodeDatum>) => number) {
  const cptAngles = pie<HierarchyPointNode<NodeDatum>>().value(d => +d.data.samples)
  const innerRadiusPortion = .5
  const arcPathGen = arc<PieArcDatum<HierarchyPointNode<NodeDatum>>>()
      // .innerRadius(d => radiusScale(d.data.parent) * innerRadiusPortion)
      // .outerRadius(d => radiusScale(d.data.parent))
      .innerRadius(defaultRadius * innerRadiusPortion)
      .outerRadius(defaultRadius)
      .cornerRadius(1);

  const groupNodesByParent = (ns: HierarchyPointNode<NodeDatum>[]): HierarchyPointNode<NodeDatum>[][] => {
    const out = [];
    for (const node of ns) node.children ? out.push(node.children) : null;
    return out;
  }

  const buildArcPath = (as: PieArcDatum<HierarchyPointNode<NodeDatum>>[][]) => {
    const out = new Map<string, string>();
    as.forEach(a => {
      a.forEach(d => {
        const id = d.data.id;
        const path = arcPathGen(d);
        out.set(id, path);
      })
    });
    return out;
  }

// comprises of all children HierarchyPointNode<TreeNode> information
// length of it represents num of rings to render
// length of each item represents how many shapes in a ring
  const ringDatumUnit = groupNodesByParent(rootPoint.descendants());

// PieArchDatum<HierarchyPointNode<TreeNode>>
// angle information
//  .data<HierarchyPointNode> -> x, y, parent, children...
//    .data<TreeNode> -> class, fillColor, id....
  const ringData = ringDatumUnit.map(cptAngles);

// Map<id, pathD>
  const arcPathLookup = buildArcPath(ringData);
  return {ringData, arcPathLookup}
}