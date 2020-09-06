import {ComponentConstructor, staticMember, VisualBlockComponent} from "../types";
import {registerComponent, windowSelection} from "../util";
import {setVisBlockPosition} from "./util";

@staticMember<ComponentConstructor<VisualBlockComponent>>()
export default class VisualBlockDataUnderstand extends HTMLElement implements VisualBlockComponent {
  static tagName = () => 'visualblock-data-understand';

  public preShowYOffset = 0;
  public afterShowYOffset = 0;

  constructor() {
    super();
  }

  connectedCallback() {
    this.preShowYOffset = +this.getAttribute('preShowYOffset');
    this.afterShowYOffset = +this.getAttribute('afterShowYOffset');
    setVisBlockPosition({
      elem: this,
      preShowYOffset: this.preShowYOffset,
      afterShowYOffset: this.afterShowYOffset,
      scrollEventClass: VisualBlockDataUnderstand.tagName(),
      isRight: true
    })
  }

}


registerComponent(VisualBlockDataUnderstand.tagName(), VisualBlockDataUnderstand);