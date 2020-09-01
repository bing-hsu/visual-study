import * as d3 from "d3";
// @ts-ignore
import * as echarts from "echarts";

const chart = echarts.init(document.getElementById('vis-data-understand'));

const opts = {
  series: [{
    type: 'pie',
    radius: ['20%', '60%'],
    center: ['50%', '50%'],
    roseType: 'area',
    label: {
      show: true
    },
    emphasis: {
      label: {
        show: true
      }
    },
    data: [
      {value: 1, name: 'capability'},
      {value: 1, name: 'basic information'},
      {value: 1, name: 'willingness'},
      {value: 1, name: 'behavior'},
    ]
  }]
};
function render() {
  chart.clear();
  chart.setOption(opts);
}
function render2() {
  const opts = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: ['5%', '55%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      label: {
        show: true
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        {value: 21, name: 'capability'},
        {value: 23, name: 'basic information'},
        {value: 34, name: 'willingness 34'},
        {value: 129, name: 'behavior 129'},
      ]
    }]
  };
  chart.clear();
  chart.setOption(opts);
}

let vis1Rendered = false,
    vis2Rendered = false;

d3.select(window).on('scroll.intro', function () {
  if (pageYOffset <= 300) {
    chart.clear();
    vis1Rendered = vis2Rendered = false;
  }
  if (!vis1Rendered && pageYOffset >= 860 && pageYOffset < 2400) {
    render();
    vis1Rendered = true;
    vis2Rendered = false;
  }
  if (!vis2Rendered && pageYOffset >= 2480) {
    render2();
    vis2Rendered = true;
    vis1Rendered = false;
  }
})



