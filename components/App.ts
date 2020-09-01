import {Component, ComponentConstructor, staticMember} from "./types";
import UebaHeader from "./Header/UebaHeader";
import {loadTag, registerComponent} from "./util";
import UebaIntro from "./Intro/UebaIntro";
import UebaDataUnderstand from "./DataUnderstand/UebaDataUnderstand";
import UebaDataPrep from "./DataPrep/UebaDataPrep";
import UebaModel from "./Modeling/UebaModel";


const Tags = {
  UebaHeader: UebaHeader.tagName(),
  UebaIntro: UebaIntro.tagName(),
  UebaDataUnderstand: UebaDataUnderstand.tagName(),
  UebaDataPrep: UebaDataPrep.tagName(),
  UebaModel: UebaModel.tagName(),
}

@staticMember<ComponentConstructor>()
export default class UebaApp extends HTMLElement implements Component {

  static tagName = () => "ueba-app"

  renderHtml(): string {
    return `
        ${loadTag(Tags.UebaHeader, {className: ['row'],})}
        ${loadTag(Tags.UebaIntro, {className: ['row']})}
        ${loadTag(Tags.UebaDataUnderstand, {className: ['row']})}
        ${loadTag(Tags.UebaDataPrep, {className: ['row right-align']})}
        ${loadTag(Tags.UebaModel, {className: ['row']})}
    `;
  }

  render() {
    this.innerHTML = this.renderHtml();
  }

  connectedCallback() {
    this.render();
  }
}

registerComponent(UebaApp.tagName(), UebaApp);