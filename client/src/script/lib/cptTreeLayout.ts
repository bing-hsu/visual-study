import {HierarchyNode, HierarchyPointNode, tree} from "d3-hierarchy";

export interface TreeOpts<T> {
  size: [number, number];
  separation: (a: HierarchyPointNode<T>, b: HierarchyPointNode<T>) => number;
}

export function cptTreeLayout<T>(ns: HierarchyNode<T>, treeOpts: TreeOpts<T>) {
  const gen = tree<T>().size(treeOpts.size).separation(treeOpts.separation);
  return gen(ns);
}

