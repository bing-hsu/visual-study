import * as d3 from "d3";
// @ts-ignore
import * as echarts from "echarts";
import {isLarge} from "../main-deprecate";
import {dataPrepRowHeight, headerHeight, introRowHeight, modelingRowHeight} from "../report-main";

// const chart = echarts.init(document.getElementById('vis-eval'));

const visBlock = d3.select<HTMLElement, never>('#vis-eval');
function addMainPlot() {
  return visBlock.append('div')
      .classed('full-plot', true)
      .style('height', visBlock.node().clientHeight)
      .style('width', visBlock.node().clientWidth)
      .node();
}
function addPlotArea() {
  const dummy = [1, 1, 1];
  const [p1, p2, p3] = visBlock
      .selectAll('div.subplot')
      .data(dummy)
      .join('div')
      .classed('subplot', true)
      .style('height', '33vh')
      .style('width', '80%')
      .style('padding-left', '5%')
      .nodes();
  return [p1, p2, p3]
}



const clearPlot = () => visBlock.selectAll('div').remove();

function render1() {
  clearPlot();
  const pp0 = echarts.init(addMainPlot());
  const opts = {
    legend: {
      data: ["positive", "negative"]
    },
    xAxis: [{
      type: "category",
      data: ["precision", "recall"]
    }],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "positive",
        type: "bar",
        data: [.95, .95],
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: true
          }
        },
        animationDuration: 1200
      },
      {
        name: "negative",
        type: "bar",
        data: [.85, .6],
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: true
          }
        }
        ,
        animationDuration: 1200
      }
    ]
  };

  pp0.setOption(opts);
}

function render2() {
  clearPlot();
  const [p1, p2, p3] = addPlotArea();
  const [pp1, pp2, pp3] = [p1, p2, p3].map(p => echarts.init(p));

  const opts1 = {
    title: {
      text: "web"
    },
    xAxis: {
      type: "value"
    },
    yAxis: {
      type: "category",
      data: ["internet_access_coun", "block_count", "outbound", "group_num", "gender"]
    },
    series: [
      {
        type: "bar",
        data: [.35, .2, .17, .1, .05],
        label: {
          show: true
        } ,
        animationDuration: 1200
      }
    ]
  };
  const opts2 = {
    title: {
      text: "business system"
    },
    xAxis: {
      type: "value"
    },
    yAxis: {
      type: "category",
      data: ["internet_access_count", "confidential_access_ability", "working_hour", "gender", "printer_access_ability"]
    },
    series: [
      {
        type: "bar",
        data: [.28, .18, .15, .08, .04],
        label: {
          show: true
        } ,
        animationDuration: 1200
      }
    ]
  };
  const opts3 = {
    title: {
      text: "login system"
    },
    xAxis: {
      type: "value"
    },
    yAxis: {
      type: "category",
      data: ["system_access_count", "Ip_abnormal", "internet_access_coun", "gender", "group_num"]
    },
    series: [
      {
        type: "bar",
        data: [.22, .18, .13, .08, .05],
        label: {
          show: true
        } ,
        animationDuration: 1200
      }
    ]
  }

  pp1.setOption(opts1);
  pp2.setOption(opts2);
  pp3.setOption(opts3);
}


let vis1Rendered = false,
    vis2Rendered = false;

const preShowHeight = headerHeight + introRowHeight + dataPrepRowHeight + modelingRowHeight;
const show1Height= 800;

d3.select(window).on('scroll.eval', function () {
  if (pageYOffset <= preShowHeight) {
    clearPlot();
    vis1Rendered = vis2Rendered = false;
  }
  if (!vis1Rendered && pageYOffset > preShowHeight && pageYOffset <= preShowHeight + show1Height) {
    render1();
    vis1Rendered = true;
    vis2Rendered = false;
  }
  if (!vis2Rendered && pageYOffset > preShowHeight + show1Height) {
    render2();
    vis2Rendered = true;
    vis1Rendered = false;
  }
})
