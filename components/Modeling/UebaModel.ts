import {Component, ComponentConstructor, staticMember} from "../types";
import {registerComponent} from "../util";

@staticMember<ComponentConstructor>()
export default class UebaModel extends HTMLElement implements Component {
  static tagName = () => "ueba-modeling";

  renderHtml(): string {
    return `
    <div id="${UebaModel.tagName()}" class="col"> 
        <p class="section-title">Modeling</p>
        
        <p class="sub-section-title">Random Forest Model</p>
        <p class="content-card insight"> 
            <span class="insight__keyword">Insight</span>
            <span class="emphasize" style="margin-bottom: .7em;">
                Advantages of Random Forest
            </span>
            <span class="content-card__list"> 
                <span class="content-card__list-item" style="margin-bottom: .7em; line-height: 1.2;"> 
                    Random Forest is based on the <a href="#">bagging algorithm</a> and 
                    uses <a href="#">Ensemble Learning technique</a>.
                    It creates as many trees on the subset of the data and combines 
                    the output of all the trees. In this way, it 
                    <span class="content-card__highlight--shout">
                        has fewer overfitting problems comparing to decision tree
                    </span> and also has lower the variance and better prediction accuracy.
                    <span class="side-note"><a href="#">see more</a></span>
                </span>
                <span class="content-card__list-item" style="margin-bottom: .7em; line-height: 1.2;"> 
                    <span class="content-card__highlight--shout">Random Forest algorithm is very stable</span>.
                    Even if a new data point is introduced in the dataset, the overall 
                    algorithm is not affected much since the new data may impact one one, 
                    but it is very hard for it to impact all trees.
                </span>
                <span class="content-card__list-item" style="line-height: 1.2em;" > 
                    Random Forest is comparatively <span class="content-card__highlight--shout">less impacted by noise</klspan>.
                </span>
            </span>
            
            <span class="emphasize" style="margin: 1em 0 .7em;"> 
                Disadvantages of Random Forest
            </span>
            <span class="content-card__list"> 
                <span class="content-card__list-item" style="margin-bottom: .5em; line-height: 1.2">  
                    <span class="content-card__highlight--shout">Complexity</span>. 
                    Random Forest creates a lot of trees, 
                    unlike only one tree in case of decision tree and combines their outputs. It creates 
                    100 trees in sklearn library by default. 
                    The increased complexity requires more computation power. 
                </span>
                <span class="content-card__list-item" style="line-height: 1.2;"> 
                    <span class="content-card__highlight--shout"> Longer model training</span>.
                    Random Forest require much more time to train as compared to decision
                    trees as it generates a lot of trees, instead of one tree in case of decision tree,
                    and makes decision on the majority of votes.
                </span>
            </span>
        </p>
        <p class="content-card suggestion"> 
            <span class="suggestion__keyword">Suggestion</span>
            <span class="content-card__list">
                <span class="content-card__list-item" style="margin-bottom: 1em;"> 
                    <span class="content-card__highlight--shout">
                        <a href="#">One-hot encoding</a> 
                        in the preprocessing is optional</span>.
                    Random Forest works well with both categorical and continuous variables.
                </span>
                <span class="content-card__list-item" style="margin-bottom: 1em;"> 
                    <span class="content-card__highlight--shout">
                        <a href="#">Standardization</a> in the preprocessing is optional</span>. 
                    No feature scaling (standardization and
                    normalization) required in case of Random Forest as it 
                    uses rule based approach instead of
                    distance calculation.
                </span>
                <span class="content-card__list-item" style="margin-bottom: 1em;"> 
                    Adjust the number of trees to be trained.
                </span>
                <span class="content-card__list-item" style="margin-bottom: 1em;"> 
                    Adjust the number of iteration of training process.
                </span>
                <span class="content-card__list-item"> 
                    Validate result using other algorithms, for example, Decision Tree, XGBOOST, SVM
                </span>
            </span>
        </p>
        <p class="content-card flex-content"> 
            Project divide data set as follows,
            <span> 
              <span class="content-card__highlight both-margin">80%</span>
              training set
            </span>
            <span> 
              <span class="content-card__highlight both-margin">20%</span>
              testing set
            </span>
        </p>
        <p class="content-card insight"> 
            <span class="insight__keyword">Insight</span>
            <span> 
                The following data partition is suggested in several <a href="#">literatures</a> 
                in the field of Machine learning/ Pattern recognition,
            </span>
            <span class="flex-content"> 
              <span style="margin-left: 20%;">
                <span class="content-card__highlight small both-margin">
                70%
                </span> 
                for training set
              </span>
              <span style="margin-left: 20%;">
                <span class="content-card__highlight small both-margin">
                15%
                </span> 
                for validation set
              </span>
              <span style="margin-left: 20%;">
                <span class="content-card__highlight small both-margin">
                15%
                </span> 
                for testing set
              </span>
            </span>
        </p>
        
        <p class="sub-section-title">Grow a tree</p>
        <p class="content-card">
            Additional forks will add new information that 
            can increase a tree's prediction accuracy. 
        </p>
        <p class="content-card">
            Splitting one layer deeper, the tree's accuracy improves to 
            <span class="content-card__highlight small both-margin">80%</span>. 
        </p>
        <p class="content-card">
            Adding several more layers, we get to
            <span class="content-card__highlight small both-margin">85%</span>. 
        </p>
        <p class="content-card">
            It is possible to continue to add branches until 
            the tree's predictions are
            <span class="content-card__highlight small both-margin">95%</span> 
        </p>
        
        <p class="sub-section-title">Making Prediction</p>
        <p class="content-card">
            The decision tree model determines whether a behavior is risky or not.
        </p>
        <p class="content-card">
            Here you can see the data that was used to train the tree flow through the tree.
        </p>
        <p class="content-card">
            This data is called training data because it was used to train the model.
        </p>
         
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

registerComponent(UebaModel.tagName(), UebaModel);