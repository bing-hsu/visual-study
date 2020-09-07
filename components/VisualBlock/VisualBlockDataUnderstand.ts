import {ComponentConstructor, VisualBlockComponent} from "../types";
import {registerComponent} from "../util";
import {setVisBlockPosition} from "./util";
import {visualsDataUnderstand} from "./visuals";

type TagNames =
    'visual-block-data-understand'
    | 'visual-block-data-prep'
    | 'visual-block-model'
    | 'visual-block-eval'
    | 'visual-block-deploy';

// @staticMember<ComponentConstructor<VisualBlockComponent>>()
export default function VisualBlockFactory(tagName: TagNames, isRight: boolean, boundRowElemTag: string): ComponentConstructor<VisualBlockComponent> {
  class VisualBlock extends HTMLElement implements VisualBlockComponent {
    static tagName = () => tagName;

    public preShowYOffset = 0;
    public afterShowYOffset = 0;

    connectedCallback() {
      this.preShowYOffset = +this.getAttribute('preShowYOffset');
      this.afterShowYOffset = +this.getAttribute('afterShowYOffset');
      this.setAttribute('bound-row', boundRowElemTag);

      setVisBlockPosition({
        elem: this,
        preShowYOffset: this.preShowYOffset,
        afterShowYOffset: this.afterShowYOffset,
        scrollEventClass: VisualBlock.tagName(),
        isRight
      });

      switch (tagName) {
        case "visual-block-data-understand":
          visualsDataUnderstand(this);
          break;
      }
    }
  }

  registerComponent(tagName, VisualBlock);

  return VisualBlock;
}




