import {ComponentConstructor, VisualBlockComponent} from "../types";
import {registerComponent} from "../util";
import {setVisBlockPosition} from "./util";

// @staticMember<ComponentConstructor<VisualBlockComponent>>()
export default function VisualBlockFactory(tagName: string, isRight: boolean): ComponentConstructor<VisualBlockComponent> {
  class VisualBlock extends HTMLElement implements VisualBlockComponent {
    static tagName = () => tagName;

    public preShowYOffset = 0;
    public afterShowYOffset = 0;

    connectedCallback() {
      this.preShowYOffset = +this.getAttribute('preShowYOffset');
      this.afterShowYOffset = +this.getAttribute('afterShowYOffset');

      setVisBlockPosition({
        elem: this,
        preShowYOffset: this.preShowYOffset,
        afterShowYOffset: this.afterShowYOffset,
        scrollEventClass: VisualBlock.tagName(),
        isRight
      })
    }
  }

  registerComponent(tagName, VisualBlock);

  return VisualBlock;
}




