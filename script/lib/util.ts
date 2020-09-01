export const idSelector = (id: string): string => `#${id}`;
export const classSelector = (clx: string): string => `.${clx}`;
export const prop = <P extends string>(s: P) => <T>(o: { [p in P]: T }): T => o[s];
export const heightPerShow = 1500;
export const segment = heightPerShow / 6;
