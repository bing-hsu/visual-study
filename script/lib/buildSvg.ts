import {select, selectAll} from "d3";
import {idSelector} from "./util";
import type {Dimension, Margin} from "../types";


export interface SvgBuilderOptions {
  containerSelector: string;
  svgId: string;
  dim: Dimension;
  margin: Margin;
}

export default function buildSvg({containerSelector, svgId, dim, margin}: SvgBuilderOptions) {
  const containerGroupId = `${svgId}__container`;

  select(containerSelector)
      .append("svg")
      .attr("id", svgId)
      .attr("width", dim.width)
      .attr("height", dim.height)
      // .attr("transform", `translate(${dim.x},${dim.y})`)
      .append("g")
      .attr("id", containerGroupId)
      .attr("transform", `translate(${margin.left},${margin.top})`);

  return {
    getSvg: () => select(idSelector(svgId)),
    getContainer: () => select(idSelector(containerGroupId)),
    chartWidth: dim.width - margin.left - margin.right,
    chartHeight: dim.height - margin.top - margin.bottom,
  };
}
