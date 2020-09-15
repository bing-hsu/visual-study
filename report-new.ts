// modules
import {select} from "d3-selection";
// component
import App from "./components/App";
// first level style
import "./report-new.css";
import "./menu.css"

// attach app to DOM
(() => {
  select('body').insert(App.tagName(), '#menu-container')
      .classed('container', true)
      .style('display', 'block');
})();

