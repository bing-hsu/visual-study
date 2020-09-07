import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent} from "../util";
// @ts-ignore
import logo from "url:../../script/static/pwc-logo.png";
import "./UebaHeader.css"


// @staticMember<ComponentConstructor>()
export default class UebaHeader extends HTMLElement implements Component {
  static tagName = () => 'ueba-header';

  renderHtml(): string {
    return `
        <div id="ueba-header"> 
            <img src="${logo}" alt="logo" width="80" height="80" /> 
        </div>
        `;
  }

  render() {
    this.innerHTML = this.renderHtml();
  }

  connectedCallback() {
    this.render();
  }
}

registerComponent(UebaHeader.tagName(), UebaHeader);