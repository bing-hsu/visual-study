import {select, selectAll, max} from "d3";
import {HierarchyPointNode} from "d3-hierarchy";
import {BaseType, HierarchyPointLink, Selection} from "d3";
import {TreeNode} from "./prepTreeData";

export interface LinkRenderOptions<NodeDatum> {
  container: Selection<any, any, any, any>;
  groupClassName: string;
  root: HierarchyPointNode<NodeDatum>;
  keyFn: (o: HierarchyPointLink<NodeDatum>) => string;
  strokeWidthFn: (o: HierarchyPointLink<NodeDatum>) => number;
  strokeColorFn: (o: HierarchyPointLink<NodeDatum>) => string;
  onScrollingOpacityMap: { [k: number]: (n: number) => number };
  onScrollingLineWidthMap: { [k: number]: (n: number) => number };
}

const cptPath = <NodeDatum>(o: HierarchyPointLink<NodeDatum>, offsetPortion: number = .2) => {
  const {source, target} = o;
  const {x: sourceX, y: sourceY} = source;
  const {x: targetX, y: targetY} = target;
  const deltaSum = Math.abs(sourceY - targetY) / 2;
  const delta2 = deltaSum * offsetPortion;
  const delta1 = deltaSum * (1 - offsetPortion);
  return `M ${sourceX},${sourceY + delta1} v ${delta2} L ${targetX},${sourceY + deltaSum} v ${delta2}`;

}

export function renderLinks<NodeDatum>(opts: LinkRenderOptions<NodeDatum>): void {
  const {container, groupClassName, root, keyFn, strokeColorFn, strokeWidthFn, onScrollingOpacityMap, onScrollingLineWidthMap} = opts;
  container.append('g').classed(groupClassName, true)
      .selectAll('path')
      .data<HierarchyPointLink<NodeDatum>>(root.links(), keyFn)
      .join('path')
      .attr("d", d => cptPath(d))
      .attr('stroke', strokeColorFn)
      .attr('stroke-width', 1)
      .attr('data-max-stroke-width', strokeWidthFn)
      .attr('fill', 'none')
      .attr('opacity', 0);

  select(window).on('scroll.scrollLink', function () {
    selectAll<BaseType, HierarchyPointLink<TreeNode>>(`g.${groupClassName} path`)
        .attr('opacity', d => onScrollingOpacityMap[d.target.depth](window.scrollY))
        .attr('stroke-width', function (d) {
          const maxWidth = +select(this).attr('data-max-stroke-width');
          const score = onScrollingLineWidthMap[d.target.depth](window.scrollY);
          return max([1, score * maxWidth]);
        })
  })
}

