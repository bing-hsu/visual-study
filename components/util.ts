// @ts-ignore

export function registerComponent(n: string, e: CustomElementConstructor) {
  if (!customElements.get(n)) {
    customElements.define(n, e);
  }
}

interface AttrOptions {
  className?: string[];
  attrs?: { [k: string]: string }
}

const attrOptionsString = (opts: AttrOptions) => {
  const {className, attrs} = opts;
  let s = "";
  if (className) s += `class="${className.join(' ')}"` + ' ';
  if (attrs) s += Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
  return s;
}

export function loadTag(tagName: string, opts?: AttrOptions) {
  return `<${tagName} ${opts ? attrOptionsString(opts) : ""}></${tagName}>`
}

export function whiteSpace(height: number) {
  return `<hr class="whitespace" style="height: ${height}vh;"/>`
}