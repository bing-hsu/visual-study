// @ts-ignore
import echarts from "echarts";
import {select} from "d3-selection";
import {isElementAtCenterViewPort, once, throttle} from "./util";

export function visualsDataUnderstand(e: HTMLElement) {
  const container = select(e).append('div')
      .style('width', '100%')
      .style('height', '80vh')
      .style('margin', '10vh 0');

  const chart = echarts.init(container.node());

  // a render section

  // render state
  let isRender3Model = false;
  let isRender4Dimension = false;
  let isRender207Vars = false;
  // options
  const render3ModelOptions = {
    animationDuration: 1000,
    animationDurationUpdate: 1000,
    series: [
      {
        type: 'pie',
        id: 'model-1',
        label: {show: true, position: 'inside'},
        radius: ['0%', '20%'],
        center: ['35%', '35%'],
        data: [
          {value: 1, name: 'Model #1', itemStyle: {color: '#999'}},
        ],
      },
      {
        type: 'pie',
        id: 'model-2',
        label: {show: true, position: 'inside'},
        radius: ['0%', '20%'],
        center: ['65%', '35%'],
        data: [
          {value: 1, name: 'Model #2', itemStyle: {color: '#999'}},
        ],
      },
      {
        type: 'pie',
        id: 'model-3',
        label: {show: true, position: 'inside'},
        radius: ['0%', '20%'],
        center: ['50%', '50%'],
        data: [
          {value: 1, name: 'Model #3', itemStyle: {color: '#999'}},
        ],
      },
    ]
  };
  const render4DimensionOptions = {
    animationDuration: 1000,
    animationDurationUpdate: 1000,
    series: [
      {
        type: 'pie',
        id: 'model-1',
        label: {show: true, position: 'inside'},
        radius: ['0%', '20%'],
        center: ['10%', '30%'],
        data: [
          {value: 1, name: 'Model #1', itemStyle: {color: '#999'}},
        ],
        animationDuration: 0,
      },
      {
        type: 'pie',
        id: 'model-2',
        label: {show: true, position: 'inside'},
        radius: ['0%', '20%'],
        center: ['90%', '30%'],
        data: [
          {value: 1, name: 'Model #2', itemStyle: {color: '#999'}},
        ],
        animationDuration: 0,
      },
      {
        type: 'pie',
        id: 'model-3',
        label: {show: true, position: 'inside'},
        radius: ['0%', '20%'],
        center: ['50%', '83%'],
        data: [
          {value: 1, name: 'Model #3', itemStyle: {color: '#999'}},
        ],
        animationDuration: 0,
      },
      {
        type: 'pie',
        id: "dimensions",
        radius: ['40%', '60%'],
        center: ['50%', '50%'],
        label: {
          show: true,
          position: "inside"
        },
        itemStyle: {
          borderColor: "#fff",
        },
        data: [
          {value: 1, name: 'capability'},
          {value: 1, name: 'basic information'},
          {value: 1, name: 'willingness'},
          {value: 1, name: 'behavior'},
        ],
      }
    ]
  }
  const render207VarsOptions = {
    animationDuration: 1000,
    animationDurationUpdate: 1000,
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    series: [
      {
        type: 'pie',
        id: "dimensions",
        radius: ['00%', '60%'],
        center: ['50%', '50%'],
        // roseType: 'area',
        label: {
          show: true,
          position: "outside"
        },
        itemStyle: {
          borderColor: "#fff",
        },
        data: [
          {value: 21, name: 'capability'},
          {value: 23, name: 'basic information'},
          {value: 34, name: 'willingness'},
          {value: 129, name: 'behavior'},
        ],
      }
    ]
  }
  // the element
  const render3ModelElem = document.querySelector('#anchor-3-models');
  const render4DimensionElem = document.querySelector('#anchor-4-dimensions');
  const render207VarsElem = document.querySelector('#anchor-207-vars');
  // render action
  const render3Model = () => {
    if (!isRender3Model) {
      // chart.clear();
      chart.setOption(render3ModelOptions, true);
      isRender3Model = true;
      isRender4Dimension = false;
      isRender207Vars = false;
    }
  };
  const render4Dimension = () => {
    if (!isRender4Dimension) {
      chart.setOption(render4DimensionOptions, true);
      isRender4Dimension = true;
      isRender3Model = false;
      isRender207Vars = false;
    }
  }
  const render207Vars = () => {
    if (!isRender207Vars) {
      chart.setOption(render207VarsOptions, true);
      isRender4Dimension = false;
      isRender3Model = false;
      isRender207Vars = true;
    }
  }


  window.addEventListener('scroll',
      throttle(() => {
        const shouldShow3Models = isElementAtCenterViewPort(render3ModelElem, 100, 300);
        const shouldShow4Dimension = isElementAtCenterViewPort(render4DimensionElem, 100, 300);
        const shouldShow207Vars = isElementAtCenterViewPort(render207VarsElem, 300, 1250);
        if (shouldShow3Models) return render3Model();
        else if (shouldShow4Dimension) return render4Dimension();
        else if (shouldShow207Vars) return render207Vars();
        else {
          chart.clear();
          isRender4Dimension = false;
          isRender3Model = false;
          isRender207Vars = false;
        }
      }, 200))


}