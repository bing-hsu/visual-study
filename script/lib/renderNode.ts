import {select, selectAll} from "d3";
import {HierarchyPointNode} from "d3-hierarchy";
import {BaseType, Selection} from "d3";
import {TreeNode} from "./prepTreeData";
import {heightPerShow} from "./util";
import {isLarge} from "../main";

export interface NodeRenderOptions<NodeDatum> {
  container: Selection<any, any, any, any>;
  groupClassName: string;
  root: HierarchyPointNode<NodeDatum>;
  keyFn: (o: HierarchyPointNode<NodeDatum>) => string;
  radiusFn: (o: HierarchyPointNode<NodeDatum>) => number;
  fillColorFn: (o: HierarchyPointNode<NodeDatum>) => string;
  strokeColorFn: (o: HierarchyPointNode<NodeDatum>) => string;
  onScrollingOpacityMap: {[k: number]: (n: number) => number};
}

enum RadiusStatus {
  dynamic,
  default
}

export const defaultRadius = isLarge ? 25 : 20;

export function renderNode<NodeDatum>(opts: NodeRenderOptions<NodeDatum> ): void {
  const {container, groupClassName, root, keyFn, radiusFn, strokeColorFn, fillColorFn, onScrollingOpacityMap} = opts;
  container.append("g").classed(groupClassName, true)
      .selectAll('circle')
      .data<HierarchyPointNode<NodeDatum>>(root.descendants(), keyFn)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => radiusFn(d))
      .attr('data-radius-dynamic', d => radiusFn(d))
      .attr('data-radius-default', d => d.children ? defaultRadius : 10)
      .attr('stroke', d => strokeColorFn(d))
      .attr('fill', d => fillColorFn(d))
      .attr('opacity', 0)

  const allCircles = selectAll<BaseType, HierarchyPointNode<TreeNode>>(`g.${groupClassName} circle`);
  let radiusStatus: RadiusStatus = RadiusStatus.dynamic;
  select(window).on('scroll.scrollNode', function (){
        allCircles.attr('opacity', d => onScrollingOpacityMap[d.depth](window.scrollY));
        if (window.scrollY > heightPerShow && radiusStatus === RadiusStatus.dynamic) {
          allCircles
              .transition().duration(1500)
              .attr('r', function () {return select(this).attr('data-radius-default')});
          radiusStatus = RadiusStatus.default;
        } else if (window.scrollY <= heightPerShow && radiusStatus === RadiusStatus.default) {
          allCircles
              .transition().duration(500)
              .attr('r', function () {return select(this).attr('data-radius-dynamic')});
          radiusStatus = RadiusStatus.dynamic;
        }
  });

}

