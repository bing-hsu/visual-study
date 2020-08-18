import * as d3 from "d3";
import {HierarchyPointNode} from "d3-hierarchy";
import {BaseType, HierarchyPointLink} from "d3";
import {TreeNode} from "./prepTreeData";

export interface TextRenderOptions<NodeDatum> {
  container: d3.Selection<any, any, any, any>;
  groupClassName: string;
  root: HierarchyPointNode<NodeDatum>;
  keyFn: (o: HierarchyPointNode<NodeDatum>) => string;
  onScrollingOpacityMap: {[k: number]: (n: number) => number};
}

export function renderText<NodeDatum extends TreeNode>(opts: TextRenderOptions<NodeDatum>): void {
  const {container, groupClassName, root, keyFn, onScrollingOpacityMap} = opts;

  container.append('g').classed(groupClassName, true)
      .selectAll("text")
      .data<HierarchyPointLink<NodeDatum>>(root.links(), keyFn)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-family', '"Helvetica Neue", Helvetica, sans-serif')
      .attr('x', d => cptTextPos(d).x)
      .attr('y', d => cptTextPos(d).y)
      .attr('opacity', 0)
      .text(d => d.source.data.condition);

  d3.select(window).on('scroll.scrollText', function (){
    d3.selectAll<BaseType, HierarchyPointLink<TreeNode>>(`g.${groupClassName} text`)
        .attr('opacity', d => onScrollingOpacityMap[d.target.depth](window.scrollY));
  })
}

function cptTextPos<NodeDatum>(l: HierarchyPointLink<NodeDatum>, liftHeight: number = 30): {x: number, y: number} {
  const {x: sourceX, y: sourceY} = l.source;
  const targetY = l.target.y;
  const deltaSum = Math.abs(targetY - sourceY) / 2;
  const textDelta = deltaSum - liftHeight;
  return {x: sourceX, y: sourceY + textDelta}
}