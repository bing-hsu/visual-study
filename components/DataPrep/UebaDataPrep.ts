import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent, whiteSpace} from "../util";

// @staticMember<ComponentConstructor>()
export default class UebaDataPrep extends HTMLElement implements Component {
  static tagName = () => "ueba-data-prep"

  renderHtml(): string {
    return `
    <div class="col" id="${UebaDataPrep.tagName()}"> 
    
    <p class="section-title"> Data Preparation </p>
    <p class="content-card"> 
      <span>
        Methods used in data preprocessing:
      </span>
      <span class="content-card__list"> 
        <span class="content-card__list-item bulletin">Handling missing values</span>
        <span class="content-card__list-item bulletin">One-hot encoding categorical variables</span>
        <span class="content-card__list-item bulletin">Standardization</span>
      </span>
    </p>
    <p class="sub-section-title"> 
        NA Check
    </p>
    <p class="content-card flex-content"> 
        <span> 
            <span class="content-card__highlight">11</span>
            <span class="content-card__highlight--shout">variables still contain missing values</span>
            <span class="side-note">
                for details, see 
                <a href="#">Data Explorer</a>
            </span>
        </span>
    </p>
    <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span> 
            Double check whether those missing values are reasonable not.
        </span>
    </p>
    
    <p class="sub-section-title">Outlier Check</p>
    <p class="content-card flex-content"> 
        <span class="emphasize">1.5 * IQR Rule Check</span>
        <span>
          <span class="content-card__highlight">21</span>
          <span class="content-card__highlight--shout">variables contain outliers</span>
        </span>
    </p>
    <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span>
          Consider cropping variables based on business understanding 
        </span>
    </p>
    <p class="content-card flex-content"> 
        <span class="emphasize">Variable Combo Check</span>
        <span class="content-card__list"> 
          <span class="flex-content" style="margin-bottom: 2em;"> 
              <span>with <span class="content-card__highlight--shout both-margin">2</span> clusters</span>
              <span style="padding-left: 1em;"><span class="content-card__highlight small">5</span> instances</span> 
              <span style="padding-left: 1.5em;">are far away from cluster center</span>
          </span>
          <span class="flex-content" style="margin-bottom: 2em;"> 
              <span>with <span class="content-card__highlight--shout both-margin">3</span> clusters</span>
              <span style="padding-left: 1em;"><span class="content-card__highlight small">3</span> instances</span>
              <span style="padding-left: 1.5em;">are far away from cluster center</span>
          </span>
          <span class="flex-content" style="margin-bottom: 2em;"> 
              <span>with <span class="content-card__highlight--shout both-margin">4</span> clusters</span>
              <span style="padding-left: 1em;"><span class="content-card__highlight small">2</span> instances</span>
              <span style="padding-left: 1.5em;">are far away from cluster center</span>
          </span>
          <span class="flex-content" style="margin-bottom: 2em;"> 
              <span>with <span class="content-card__highlight--shout both-margin">5</span> clusters</span>
              <span style="padding-left: 1em;"><span class="content-card__highlight small">1</span> instances</span>
              <span style="padding-left: 1.5em;">are far away from cluster center</span>
          </span>
        </span>
    </p>
    <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span> 
            Evaluate the impact on forecast results caused by outliers 
            and remove outliers if necessary
        </span>
    </p>
    
    <p class="sub-section-title">Balance Check</p>
    <p class="content-card flex-content">
        <span class="emphasize" style="margin-bottom: 2.5em;">
            Ratio of 
            <span class="badge positive">label = positive</span> 
            to
            <span class="badge negative">label = negative</span> 
        </span> 
        <span class="flex-content"> 
          <span class="flex-content" style="margin-bottom: 1.5em;"> 
              <span>Model #1</span>
              <span> 
                  Positive
                  <span class="content-card__highlight small both-margin">83%</span>
                  :
                  <span class="content-card__highlight small both-margin">17%</span>
                  Negative
              </span>
          </span>
          <span class="flex-content" style="margin-bottom: 1.5em;"> 
              <span>Model #2</span>
              <span> 
                  Positive
                  <span class="content-card__highlight small both-margin">78%</span>
                  :
                  <span class="content-card__highlight small both-margin">22%</span>
                  Negative
              </span>
          </span>
          
          <span class="flex-content"> 
              <span>Model #3</span>
              <span> 
                  Positive
                  <span class="content-card__highlight small both-margin">73%</span>
                  :
                  <span class="content-card__highlight small both-margin">27%</span>
                  Negative
              </span>
          </span>
        </span>
    </p>
    <p class="content-card warn"> 
        <span class="warn__keyword">Heads Up</span>
        <span class="content-card__highlight--shout"> 
            Dataset used in training is considered imbalanced
        </span>
        <span> 
            Imbalanced dataset could be detrimental accuracy of the classifiers
        </span>
    </p>
    <p class="content-card suggestion"> 
        <span class="suggestion__keyword">Suggestion</span>
        <span class="bulletin"> 
            Collect more data to balance the datasets
        </span>
        <span class="bulletin"> 
            Use <span class="content-card__highlight--shout">precision, recall, F1-score, Kappa, ROC curve</span> as performance metric
        </span>
        <span class="bulletin"> 
            Resample data set
        </span>
        <span class="bulletin"> 
            Generate <span class="content-card__highlight--shout">synthetic samples</span>, for example, 
            Synthetic Minority Over-sampling Technique (SMOTE)
        </span>
        <span class="bulletin"> 
            Use algorithms that are specialized in imbalanced data set 
        </span>
        <span class="bulletin"> 
            Incorporate <span class="content-card__highlight--shout">penalized models</span>, for example, penalized-LDA, or penalized-SVM
        </span>
    </p>
    
    ${whiteSpace(10)}
    </div> `;
  }

  render() {
    this.innerHTML = this.renderHtml();
  }

  connectedCallback() {
    this.render()
  }

}

registerComponent(UebaDataPrep.tagName(), UebaDataPrep);