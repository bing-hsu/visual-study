import * as d3 from "d3";

export interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface Dimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function buildSvg(
  parent: string,
  id: string,
  dim: Dimension,
  margin: Margin,
) {
  const containerId = `${id}__container`;
  d3.select(parent).append("svg")
    .attr("id", id)
    .attr("width", dim.width)
    .attr("height", dim.height)
    .attr("transform", `translate(${dim.x},${dim.y})`)
    .append("g")
    .attr("id", containerId)
    .attr("transform", `translate(${margin.left},${margin.top})`);
  return {
    getSvg: () => d3.select("#" + id),
    getContainer: () => d3.select("#" + containerId),
    chartWidth: dim.width - margin.left - margin.right,
    chartHeight: dim.height - margin.top - margin.bottom,
  };
}
