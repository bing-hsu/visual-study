import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent, whiteSpace} from "../util";
// @ts-ignore
import worldPng from "../../script/static/img/world.png";
import "./UebaIntro.css"

@staticMember<ComponentConstructor>()
export default class UebaIntro extends HTMLElement implements Component {
  static tagName = () => 'ueba-intro'

  renderHtml(): string {
    return `
    <div class="col" id="${UebaIntro.tagName()}">
        ${IntroTitle()}
        ${IntroLangSelect({imgSrc: worldPng})}
        ${IntroParticipants()} 
        <p>
            This validation report is used to summarize and 
            visualize the model and the potential risk in the
            construction process. It can be used to help clients 
            better avoid potential problems.
            </p>
        ${IntroScrollBackground()}
        ${whiteSpace(10)}
    </div>
    `
  }

  render() {
    this.innerHTML = this.renderHtml();
  }

  connectedCallback() {
    this.render();
  }
}


registerComponent(UebaIntro.tagName(), UebaIntro);

// sub-functional-component
function IntroTitle() {
  return `
      <p class="__title">
        Model Validation Report for UEBA Risk Intelligence Project
      </p>
  `;
}

function IntroLangSelect(opts: { imgSrc: string }) {
  return ` 
      <div class="__language-select"> 
        <img src="${opts.imgSrc}" alt="language-selection" style="height: 1.2em; filter: contrast(1%);" />
        <select> 
            <option> English </option>
        </select>
      </div>
  `
}

function IntroParticipants() {
  return `
      <p class="__participants"> 
        <span>
            <span>Report participants: </span>
            <span>Bertram Gao, Yilun Luo</span> 
        </span>
        
        <span>
             <span>Date of completion:</span>
             <span>Sep 1, 2020</span>
        </span>
      </p>
  `;
}

function IntroScrollBackground() {
  return `
      <div class="scroll_background">
        <div class="keep-scroll">
            <p>Scroll</p>
            <svg height="40" width="40">
                <path d="M0,0L40,0L20,10Z" fill="#000" stroke="none"> 
                </path>
            </svg>
        </div> 
      </div>
 `
}