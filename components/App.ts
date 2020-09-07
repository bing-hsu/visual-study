import {Component} from "./types";
import {loadTag, registerComponent, windowSelection} from "./util";
import UebaHeader from "./Header/UebaHeader";
import UebaIntro from "./Intro/UebaIntro";
import UebaDataUnderstand from "./DataUnderstand/UebaDataUnderstand";
import UebaDataPrep from "./DataPrep/UebaDataPrep";
import UebaModel from "./Modeling/UebaModel";
import UebaEval from "./Eval/UebaEval";
import UebaDeploy from "./Deploy/UebaDeploy";
import VisualBlockFactory from "./VisualBlock/VisualBlockDataUnderstand";
import {computeHeightOfRows} from "./VisualBlock/util";


const Tags = {
  UebaHeader: UebaHeader.tagName(),
  UebaIntro: UebaIntro.tagName(),
  UebaDataUnderstand: UebaDataUnderstand.tagName(),
  UebaDataPrep: UebaDataPrep.tagName(),
  UebaModel: UebaModel.tagName(),
  UebaEval: UebaEval.tagName(),
  UebaDeploy: UebaDeploy.tagName(),
  VisualBlockDataUnderstand: VisualBlockFactory('visual-block-data-understand', true).tagName(),
  VisualBlockDataPrep: VisualBlockFactory('visual-block-data-prep', false).tagName(),
  VisualBlockModel: VisualBlockFactory('visual-block-model', true).tagName(),
  VisualBlockEval: VisualBlockFactory('visual-block-eval', false).tagName(),
  VisualBlockDeploy: VisualBlockFactory('visual-block-deploy', true).tagName()
}

// @staticMember<ComponentConstructor>()
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
      // load visual block elements after page is loaded, row height calculable
      const {
        uebaHeaderHeight, uebaIntroHeight, uebaDataUnderstandHeight,
        uebaDataPrepHeight, uebaModelHeight, uebaEvalHeight,
        uebaDeployHeight
      } = computeHeightOfRows();

      const visBlockHtml = (tagName: string, preShowYOffset: number, afterShowYOffset: number): string => {
        return `
          ${loadTag(tagName, {
          className: ['vis-block'],
          attrs: {
            preShowYOffset: preShowYOffset + '',
            afterShowYOffset: afterShowYOffset + ''
          }
        })}
        `.trim();
      }

      const visBlockDataUnderstandHtml = visBlockHtml(
          Tags.VisualBlockDataUnderstand,
          uebaHeaderHeight + uebaIntroHeight,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight - innerHeight
      );
      const visBlockDataPrepHtml = visBlockHtml(
          Tags.VisualBlockDataPrep,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight - innerHeight
      );
      const visBlockModelHtml = visBlockHtml(
          Tags.VisualBlockModel,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight + uebaModelHeight - innerHeight
      );
      const visBlockEvalHtml = visBlockHtml(
          Tags.VisualBlockEval,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight + uebaModelHeight,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight + uebaModelHeight + uebaEvalHeight - innerHeight
      );
      const visBlockDeployHtml = visBlockHtml(
          Tags.VisualBlockDeploy,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight + uebaModelHeight + uebaEvalHeight,
          uebaHeaderHeight + uebaIntroHeight + uebaDataUnderstandHeight + uebaDataPrepHeight + uebaModelHeight + uebaEvalHeight + uebaDeployHeight - innerHeight
      );

      self.innerHTML += visBlockDataUnderstandHtml + visBlockDataPrepHtml + visBlockModelHtml + visBlockEvalHtml + visBlockDeployHtml;
    })
  }
}

registerComponent(UebaApp.tagName(), UebaApp);

