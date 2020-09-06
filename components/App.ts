import {Component, ComponentConstructor, staticMember} from "./types";
import {loadTag, registerComponent, windowSelection} from "./util";
import {select} from "d3-selection";
import UebaHeader from "./Header/UebaHeader";
import UebaIntro from "./Intro/UebaIntro";
import UebaDataUnderstand from "./DataUnderstand/UebaDataUnderstand";
import UebaDataPrep from "./DataPrep/UebaDataPrep";
import UebaModel from "./Modeling/UebaModel";
import UebaEval from "./Eval/UebaEval";
import UebaDeploy from "./Deploy/UebaDeploy";
import VisualBlockDataUnderstand from "./VisualBlock/VisualBlockDataUnderstand";
import {computeHeightOfRows} from "./VisualBlock/util";


const Tags = {
  UebaHeader: UebaHeader.tagName(),
  UebaIntro: UebaIntro.tagName(),
  UebaDataUnderstand: UebaDataUnderstand.tagName(),
  UebaDataPrep: UebaDataPrep.tagName(),
  UebaModel: UebaModel.tagName(),
  UebaEval: UebaEval.tagName(),
  UebaDeploy: UebaDeploy.tagName(),
  VisualBlockDataUnderstand: VisualBlockDataUnderstand.tagName(),
}

@staticMember<ComponentConstructor>()
export default class UebaApp extends HTMLElement implements Component {

  static tagName = () => "ueba-app"

  renderHtml(): string {
    return `
        ${loadTag(Tags.UebaHeader, {className: ['row'],})}
        ${loadTag(Tags.UebaIntro, {className: ['row']})}
        ${loadTag(Tags.UebaDataUnderstand, {className: ['row']})}
        ${loadTag(Tags.UebaDataPrep, {className: ['row', 'right-align']})}
        ${loadTag(Tags.UebaModel, {className: ['row']})}
        ${loadTag(Tags.UebaEval, {className: ['row', 'right-align']})}
        ${loadTag(Tags.UebaDeploy, {className: ['row']})}
    `;
  }

  render() {
    this.innerHTML = this.renderHtml();
  }

  connectedCallback() {
    this.render();
    const self = this;
    windowSelection.on('load.vis-block', function () {
      const {
        uebaHeaderHeight, uebaIntroHeight, uebaDataUnderstandHeight,
        uebaDataPrepHeight, uebaModelHeight, uebaEvalHeight,
        uebaDeployHeight
      } = computeHeightOfRows();
      self.innerHTML += ""
          // ` ${loadTag(Tags.VisualBlockDataUnderstand, {
          //   className: ['vis-block'],
          //   attrs: {
          //     'preShowYOffset': uebaHeaderHeight + uebaIntroHeight + '',
          //     'afterShowYOffset': uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight - innerHeight + ''
          //   }
          // })} `
    })
  }
}

registerComponent(UebaApp.tagName(), UebaApp);

