import * as d3 from "d3";
import {HierarchyPointNode} from "d3-hierarchy";

export interface NodeRenderOptions<NodeDatum> {
  container: d3.Selection<any, any, any, any>;
  groupClassName: string;
  root: HierarchyPointNode<NodeDatum>;
  keyFn: (o: NodeDatum) => string;
  radiusScale: (o: HierarchyPointNode<NodeDatum>) => number;
  fillColorFn: (o: HierarchyPointNode<NodeDatum>) => string;
  strokeColorFn: (o: HierarchyPointNode<NodeDatum>) => string;
}

export function renderNode<NodeDatum>(opts: NodeRenderOptions<NodeDatum> ): void {
  const {container, groupClassName, root, keyFn, radiusScale, strokeColorFn, fillColorFn} = opts;
  container.append("g").classed(groupClassName, true)
      .selectAll('circle')
      .data<HierarchyPointNode<NodeDatum>>(root.descendants(), keyFn)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('stroke', d => strokeColorFn(d))
      .attr('fill', d => fillColorFn(d))
      // .attr('opacity', 0)
      .attr('r', d => 0)
      .transition().duration(1000)
      .attr('r', d => radiusScale(d))
      // .attr('opacity', 1)
}

