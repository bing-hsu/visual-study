import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent, whiteSpace} from "../util";

// @staticMember<ComponentConstructor>()
export default class UebaEval extends HTMLElement implements Component {
  static tagName = () => "ueba-eval"

  renderHtml(): string {
    return `
    <div class="col" id="${UebaEval.tagName()}"> 
    
      <p class="section-title">Evaluation</p>
      
      <p class="sub-section-title">Score</pc>
      <p class="content-card"> 
        Overall score is
        <span class="content-card__highlight both-margin">85%</span>
      </p>
      <p class="content-card insight"> 
        <span class="insight__keyword">Insight</span>
        <span> 
            Current model's score is higher than
            <span class="content-card__highlight--shout">92%</span>
            models used in financial service industry
        </span>
      </p>
      <p class="content-card"> 
        Recall of negative samples is
        <span class="content-card__highlight--shout"> 
            relatively low
        </span>
      </p>
      <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span class="content-card__list"> 
          <span style="margin-bottom: .7em;"> 
              Add more accurately tagged samples
          </span>
          <span style="margin-bottom: .7em;"> 
              Precision and recall are a tradeoff.
              Sometimes we can sacrifice a little accuracy if
              we really want a higher recall
          </span>
          <span> 
              Adjust the weight of training samples
          </span>
        
        </span>
      </p>
      
      <p class="sub-section-title">Feature Importance</p>
      <p class="content-card"> 
        Top <span class="content-card__highlight--shout both-margin">5</span>
        important features in each model
      </p>
      <p class="content-card warn"> 
        <span class="warn__keyword">Heads Up</span>
        <span class="emphasize" style="margin-bottom: .7em;">
            Risk 1
        </span>
        <span> 
            <span class="variable-name">internet_access_count</span>
            has too much importance compared to others
        </span>
        <span class="emphasize" style="margin-bottom: .7em;">
            Risk 2
        </span>
        <span> 
            <span class="variable-name">gender</span>
            might have violated 
            <span class="content-card__highlight--shout">ethical</span>
            principles
        </span>
        <span class="emphasize" style="margin-bottom: .7em;">
            Risk 3
        </span>
        <span> 
            <span class="variable-name">gender</span>
            might have violated 
            <span class="content-card__highlight--shout">fairness</span>
            principles
        </span>
      </p>
      <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span> 
            Consider <em>Equal Opportunity</em> while building and using the model
        </span>
      </p>
      
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

registerComponent(UebaEval.tagName(), UebaEval);