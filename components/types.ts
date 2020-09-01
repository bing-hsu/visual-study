export interface Component {
  render(): void;
  renderHtml(): string;
  connectedCallback(): void;
}

export interface ComponentConstructor {
  new(): Component;
  tagName(): string
}

export function staticMember<T>() {
  return <U extends T>(constructor: U) =>  constructor ;
}