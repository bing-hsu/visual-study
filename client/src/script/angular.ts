import * as d3 from "d3";
import buildSvg from "./lib/buildSvg";
import "../style/main.css";

const margin = { top: 40, bottom: 20, left: 20, right: 20 };
const dimension = { x: 0, y: 0, width: 1280, height: 600 };
const { getContainer, chartHeight, chartWidth } = buildSvg(
  "main",
  "graph",
  dimension,
  margin,
);

const data = [1, 1, 2, 3, 5, 8, 13, 21];
const arcGen = d3.pie().padAngle(.3);
const arcs = arcGen(data);

const arcPathGen = d3.arc()
  .innerRadius(() => 60)
  .outerRadius(() => 100)
  .padRadius(20);

getContainer().append("g").attr("transform", "translate(400, 400)")
  .selectAll("path").data(arcs)
  .join("path")
  .classed("arc", true).data(arcs)
  .attr("d", (d) => arcPathGen(d))
  .attr("fill", "none")
  .attr("stroke", "black");

console.log(arcs);
