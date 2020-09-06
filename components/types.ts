export interface Component {
  render(): void;
  renderHtml(): string;
  connectedCallback(): void;
}

export interface VisualBlockComponent extends Omit<Component, 'renderHtml' | 'render'> {
  preShowYOffset: number;
  afterShowYOffset: number;
}

export interface ComponentConstructor<T = Component> {
  new(): T;
  tagName(): string
}

export function staticMember<T>() {
  return <U extends T>(constructor: U) =>  constructor ;
}