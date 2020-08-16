import data from "../data/tree.js";
import {stratify} from "d3-hierarchy";

interface Edge {
  parent: string | null;
  id: string;
}
const nodes = data.nodes,
    edges = data.edges;


// node id -> node object
const nodeLookup = nodes.map(o => ({[o.id]: o})).reduce((acc, next) => ({...acc, ...next}), {});
const rootBuilder = stratify<Edge>().id(d => d.id).parentId(d => d.parent)

export interface Label {
  gini: number;
  samples: number;
  value: [number, number];
  class: string;
}
const parseLabel = (label: string): Label => {
  const labelOfInterest = ["gini", "samples", "class", "value"];
  return label.split('\\n')
      .filter(term => labelOfInterest.some(k => term.startsWith(k)))
      .map(term => term.split("").filter(d => d).join('').split(' = '))
      .map(t => ({[t[0]]: t[1].startsWith('[') ? JSON.parse(t[1]) : /\d+/.test(t[1]) ? parseFloat(t[1]) : t[1]}))
      .reduce((acc, next) => ({...acc, ...next}), {}) as Label;
}

const parseNodeMeta = (id) => {
  const node = nodeLookup[id];
  const {fillcolor, label} = node;
  return {fillColor: fillcolor, label: parseLabel(label)}
}
const edgeWithMeta = edges.map(o => ({...o, ...parseNodeMeta(o.id)}));

export const root = rootBuilder(edgeWithMeta);

