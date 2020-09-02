import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent, whiteSpace} from "../util";

@staticMember<ComponentConstructor>()
export default class UebaDeploy extends HTMLElement implements Component {
  static tagName = () => "ueba-deploy"

  renderHtml(): string {
    return `
    <div id="${UebaDeploy.tagName()}" class="col"> 
        <p class="section-title">Deployment</p>
        
        <p class="sub-section-title">Production Performance</p>
        <p class="content-card"> 
            Currently, each prediction costs
            <span class="content-card__highlight--shout">800ms</span>
            on average
        </p>
        <p class="content-card insight"> 
            <span class="insight__keyword">Insight</span>
            <span> 
                Current production performance is 
                <span class="content-card__highlight--shout"> 
                    20%
                </span>
                faster than the average time cost of a predictive
                model in financial service industry
            </span>
        </p>
        <p class="content-card">
            <a href="#"> 
                System log analysis
            </a> 
            detects a pattern of high usage demand occurred between
            <span class="content-card__highlight--shout"> 2 pm - 6 pm </span> 
            with 
            <span class="content-card__highlight--shout"> 300 
                <span style="font-size: 1em;"> &#177; </span>
                150
            </span>
            predictions per second.
        </p>
        <p class="content-card warn"> 
            <span class="warn__keyword">Heads Up</span>
            <span> 
                Current computation resource does not suffice peak usage demand 
            </span>
        </p>
        <p class="content-card suggestion"> 
            <span class="suggestion__keyword">Suggestion</span>
            <span style="margin-bottom: .7em;"> 
                Expand network bandwidth to avoid 
                congestion at peak time 
            </span>
            <span> 
                Consider an <a href="#">elastic cloud solution</a> for 
                the production environment
            </span>
        </p>
        ${scrollBackToTop()}
        ${whiteSpace(10)}
    </div>
    `
  }

  render() {
    this.innerHTML = this.renderHtml();
  }

  connectedCallback() {
    this.render();
    const elem = document.getElementsByClassName('back-to-top')[0];
    if (elem) elem.addEventListener('click', function () {
      location.href = "/#";
    })
  }
}

registerComponent(UebaDeploy.tagName(), UebaDeploy);

function scrollBackToTop() {
  return `
   <div class="scroll_background back-to-top" style="z-index: 100;">
        <div class="keep-scroll">
            <p style="margin-bottom: 5px;">Back to Top</p>
            <svg height="40" width="40">
                <path d="M0,20L40,20L20,0Z" fill="#000" stroke="none"></path>
            </svg>
        </div>
    </div> 
  `;
}