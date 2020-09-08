export const randomPoint = (n: number): [number, number][] => {
  let pts = [];
  for (let k = 0; k < n; k++) {
    pts.push([Math.random(), Math.random()])
  }
  return pts;
};
export const selectN = (n: number, set: [number, number][]): [number, number][] => {
  let l = set.length;
  let s = [];
  for (let k = 0; k < n; k++) {
    s.push(set[Math.floor(Math.random() * l)]);
  }
  return s;
}
