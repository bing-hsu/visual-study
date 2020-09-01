// modules
import {select} from "d3-selection";
// component
import App from "./components/App";
// first level style
import "./report-new.css"


// attach app to DOM
(() => {
  select('body').insert(App.tagName(), 'script')
      .classed('container', true)
      .style('display', 'block');
})();

