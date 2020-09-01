import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent} from "../util";

@staticMember<ComponentConstructor>()
export default class UebaDataUnderstand extends HTMLElement implements Component {
  static tagName = () => 'ueba-data-understand'

  renderHtml(): string {
    return `
    <div class="col" id="${UebaDataUnderstand.tagName()}"> 
      <p class="section-title">
        First, business & data understanding
      </p>
      
      <p class="sub-section-title">Task Overview</p>
      <p class="content-card"> 
        This project is to detect the risky behavior 
        of employees so as to reduce the risk of confidential 
        data leakage. 
      </p>
      <p class="content-card"> 
      <span>
          <span class="content-card__highlight right-margin">3</span>
          models 
      </span>
      </p>
      <p class="content-card">
          <span> 
            <span class="content-card__highlight right-margin">4</span>
            dimensions
          </span>
      <span class="content-card__list"> 
          <span class="content-card__list-item variable-name" style="width: 12em;">Basic Information</span>
          <span class="content-card__list-item variable-name" style="width: 12em;">Willingness</span>
          <span class="content-card__list-item variable-name" style="width: 12em;">Capability</span>
          <span class="content-card__list-item variable-name" style="width: 12em;">Behavior</span>
      </span>
      </p>
      <p class="content-card">
        <span class="content-card__highlight right-margin">207</span>
        Variables
      </p>
      <p class="content-card"> 
        Among these variables,
        <span class="content-card__highlight both-margin">16</span>
        variables are
        <span class="content-card__highlight--shout">risky</span>
        <span class="variable-block">
            ${variables()}
        </span>
      </p>
      <p class="content-card warn"> 
        <span class="warn__keyword">Heads Up</span>
        <span> 
         The risky variables are not stable and will be
         greatly affected by the environment.
        </span>
        <span class="content-card__highlight--shout">
          They are likely to cause large 
          deviations in the model predictions.
        </span>
      </p>
      <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span> 
            Reduce the importance of such variables 
            to improve the stability of the model
        </span>
      </p>
      
      <p class="sub-section-title">Regarding data labels</p>
      <p class="content-card flex-content">
        <span> 
            Model 1: 
            <span class="content-card__highlight small both-margin">1259</span>
            samples
        </span> 
        <span> 
            Model 2:
            <span class="content-card__highlight small both-margin">1320</span>
            samples
        </span>
        <span> 
            Model 3:
            <span class="content-card__highlight small both-margin">1277</span>
            samples
        </span>
      </p>
      <p class="content-card insight"> 
        <span class="insight__keyword">Insight</span>
        <span> 
          Sample size used in this project is less than
          <span class="content-card__highlight small both-margin">78%</span>
          than models that are usually used in financial service industry 
        </span>
      </p>
      <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span> 
            Increase the number of training samples as 
            much as possible or use incremental training
        </span>
      </p>
      <p class="content-card"> 
        <a href="#">Correlation analysis</a> shows <span class="content-card__highlight small both-margin">40%</span> of the variables 
        display high correlation with the label and
        <span class="content-card__highlight small both-margin">12%</span> of them are strongly
        correlated with the label
      </p>
      <p class="content-card warn">
        <span class="warn__keyword">Heads Up</span> 
        <span class="content-card__highlight--shout">Current feature relevance might be biased</span>
        <span> 
            The weights of the features belonging to groups of correlated 
            features decrease as the sizes of the groups increase, 
            which might lead to incorrect model interpretation and 
            misleading feature ranking 
        </span>
      </p>
      <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span>
            Highly correlated features can mask these interactions 
            between different features. 
            Try to remove redundant features and check their contribution 
            to the performance.
        </span>
      </p>
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

registerComponent(UebaDataUnderstand.tagName(), UebaDataUnderstand);

function variables() {
  const vars = `
    email_count_p_deviation, email_count_g_eviation,
    email_p_count, email_count_g_count,confidential_access_p_deviation, 
    confidential_access_g_deviation, confidential_p_count, 
    confidential_access_g_count, system_access_p_deviation, 
    system_access_g_deviation, system_access_p_count,
    system_access_p_count, pc_login_count p_deviation, 
    pc_login_count g_deviation, pc_p_count_deviation, 
    pc_g_count_deviation`;
  return vars.split(',')
      .map(t => `<span class="variable-name">${t.trim()}</span>`)
      .join(' ');
}