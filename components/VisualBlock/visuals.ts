// @ts-ignore
import echarts from "echarts";
import {select} from "d3-selection";
import {isElementAtCenterViewPort, throttle} from "./util";
import {randomPoint, selectN} from "./misc";

// @ts-ignore
import clusterPng from "url:../../static/img/cluster.png"

export function visualDeploy(e: HTMLElement) {
  const container = select(e).append('div')
      .style('width', '100%')
      .style('height', '80vh')
      .style('margin', '10vh 0');
  const chart = echarts.init(container.node());

  type State = 'Deploy';
  const stateManager = () => {
    const _state: { [k in State]: boolean } = {
      "Deploy": false,
    };
    const reset = () => Object.keys(_state).forEach(k => (_state[k] = false));
    return {
      set: function (s: State) {
        reset();
        _state[s] = true;
      },
      get: function (s: State) {
        return _state[s];
      },
      reset
    }
  }
  // render state management
  const {set: setRenderState, get: getRenderState, reset: resetRenderState} = stateManager();

  const renderDeployElem = document.querySelector('#visual-deploy');
  const renderDeployOptions = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: 'line',
        data: [...[10, 12, 10, 16, 21, 30, 35, 30, 40, 39, 38, 39].map(d => d * 5), 310, 280, 300, 75, 60, 70, 60, 40],
        label: {
          show: true
        }
      }
    ]
  };
  const renderDeploy = () => {
    if (!getRenderState("Deploy")) {
      chart.setOption(renderDeployOptions);
      setRenderState("Deploy");
    }
  }

  window.addEventListener('scroll', throttle(() => {
    const shouldShowDeploy = isElementAtCenterViewPort(renderDeployElem, 400, 500);
    if (shouldShowDeploy) return renderDeploy();
    else {
      chart.clear();
      resetRenderState();
    }
  }, 200))

}

export function visualEval(e: HTMLElement) {
  const container = select(e).append('div')
      .style('width', '100%')
      .style('height', '80vh')
      .style('margin', '10vh 0');
  const chart = echarts.init(container.node());

  type State = 'FeatureImportance' | 'Score';
  const stateManager = () => {
    const _state: { [k in State]: boolean } = {
      "FeatureImportance": false,
      "Score": false
    };
    const reset = () => Object.keys(_state).forEach(k => (_state[k] = false));
    return {
      set: function (s: State) {
        reset();
        _state[s] = true;
      },
      get: function (s: State) {
        return _state[s];
      },
      reset
    }
  }
  // render state management
  const {set: setRenderState, get: getRenderState, reset: resetRenderState} = stateManager();

  const renderScoreElem = document.querySelector("#visual-score");
  const renderFeatImportanceElem = document.querySelector('#visual-feat-importance');

  const renderScoreOptions = {
    legend: {
      data: ["positive", "negative"],
      top: "10%"
    },
    grid: {
      top: '25%',
      height: "50%"
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
  const renderFeatImportanceOptions = {
    animationDuration: 1200,
    grid: [
      {top: "5%", height: "20%", left: 100},
      {top: "36%", height: '20%', left: 100},
      {top: '67%', height: '20%', left: 100}
    ],
    xAxis: [
      {type: "value"},
      {type: "value", gridIndex: 1},
      {type: "value", gridIndex: 2},
    ],
    yAxis: [
      {
        type: "category",
        name: "Web",
        nameTextStyle: {
          fontWeight: "bold"
        },
        axisLabel: {
          rotate: 45,
          fontSize: 10,
        },
        data: ["internet_access_count", "block_count", "outbound", "group_num", "gender"]
      },
      {
        type: "category",
        name: "business system",
        nameTextStyle: {
          fontWeight: "bold"
        },
        axisLabel: {
          rotate: 45,
          fontSize: 10
        },
        data: ["internet_access_count", "confidential_access_ability", "working_hour", "gender", "printer_access_ability"],
        gridIndex: 1
      },
      {
        type: "category",
        name: "login system",
        nameTextStyle: {
          fontWeight: "bold"
        },
        axisLabel: {
          rotate: 45,
          fontSize: 10
        },
        data: ["system_access_count", "Ip_abnormal", "internet_access_coun", "gender", "group_num"],
        gridIndex: 2
      }
    ],
    series: [
      {
        type: "bar",
        data: [.35, .2, .17, .1, .05],
        label: {show: true}
      },
      {
        type: "bar",
        data: [.28, .18, .15, .08, .04],
        label: {show: true},
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        type: "bar",
        data: [.22, .18, .13, .08, .05],
        label: {show: true},
        xAxisIndex: 2,
        yAxisIndex: 2
      }
    ],
  };

  const renderScore = () => {
    if (!getRenderState("Score")) {
      chart.setOption(renderScoreOptions, true);
      setRenderState("Score");
    }
  }
  const renderFeatImportance = () => {
    if (!getRenderState("FeatureImportance")) {
      chart.setOption(renderFeatImportanceOptions, true);
      setRenderState('FeatureImportance');
    }
  };

  // main logic
  window.addEventListener('scroll',
      throttle(() => {
        // render check
        const shouldShowScore = isElementAtCenterViewPort(renderScoreElem, 500, 400);
        const shouldShowFeatImportance = isElementAtCenterViewPort(renderFeatImportanceElem, 100, 1000);

        if (shouldShowScore) return renderScore();
        if (shouldShowFeatImportance) return renderFeatImportance();
        else {
          chart.clear();
          resetRenderState();
        }
      }, 200));


}

export function visualsDataPrep(e: HTMLElement) {
  const container = select(e).append('div')
      .style('width', '100%')
      .style('height', '80vh')
      .style('margin', '10vh 0');
  const chart = echarts.init(container.node());

  type State = 'NACheck' | "IQRCheck" | "ComboCheck" | "BalanceCheck";
  const stateManager = () => {
    const _state: { [k in State]: boolean } = {
      'NACheck': false,
      'IQRCheck': false,
      'ComboCheck': false,
      "BalanceCheck": false,
    };
    const reset = () => Object.keys(_state).forEach(k => (_state[k] = false));
    return {
      set: function (s: State) {
        reset();
        _state[s] = true;
      },
      get: function (s: State) {
        return _state[s];
      },
      reset
    }
  }
  // render state management
  const {set: setRenderState, get: getRenderState, reset: resetRenderState} = stateManager();

  // options
  const renderNACheckOptions = {
    first: {
      title: {
        text: "207 Variables",
        textAlign: "center",
        top: '50%',
        left: '50%',
        textStyle: {
          fontSize: 24
        }
      },
      series: [
        {
          type: "pie",
          stillShowZeroSum: false,
          label: {
            position: "inside"
          },
          radius: ['50%', '70%'],
          data: [
            {value: 207, id: '1', name: "variables"},
            {value: 0, id: '2', name: ""},
          ]
        }
      ]
    },
    second: {
      series: [
        {
          type: "pie",
          label: {
            position: "inside"
          },
          radius: ['50%', '70%'],
          data: [
            {value: 196, id: '1', name: "196 variables without NA"},
            {value: 11, id: '2', name: "11 variables with NA", itemStyle: {color: "hsl(0, 0%, 30%)"}},
          ]
        }
      ]
    }
  };
  const renderIQRCheckOptions = {
    grid: [
      {bottom: '60%'},
      {top: '60%'}
    ],
    xAxis: [
      {
        type: "category",
        data: [
          'email_count_g_count',
          'system_access_p_deviation',
          'system_access_p_count',
          'confidential_p_count'
        ]
      },
      {gridIndex: 1, scale: true}
    ],
    yAxis: [
      {type: "value", name: 'std (σ)'},
      {gridIndex: 1, scale: true}
    ],
    series: [
      {
        type: "boxplot",
        // silent: true,
        id: 'boxplot-item',
        name: 'boxplot-item',
        data: [
          {value: [-0.75, -0.2, 0.1, 0.6, 1], name: 'a'},
          {value: [-1.6, -0.5, 0.15, 0.65, 1.2], name: 'b'},
          {value: [-1.1, 0.05, 0.15, 0.35, 0.45], name: 'c'},
          {value: [-.1, 0.1, 0.3, 0.5, 1.2], name: 'd'},
        ]
      },
      {
        type: "scatter",
        name: 'whisker',
        itemStyle: {
          color: "#fff",
          borderColor: "#801919"
        },
        data: [
          {value: [0, -2.5]},
          {value: [0, 2.9]},
          {value: [0, -2.1]},
          {value: [1, 2.1]},
          {value: [1, 2.3]},
          {value: [1, 3.1]},
          {value: [2, 2.35]},
          {value: [2, 2.3]},
          {value: [2, 2.1]},
          {value: [3, -2.35]},
          {value: [3, -2.3]},
        ],
      },
      {
        type: 'effectScatter',
        id: 'data-point-effect',
        symbolSize: 10,
        data: [
          [172.7, 105.2],
          [153.4, 42]
        ],
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        type: 'scatter',
        id: 'data-point',
        symbolSize: 6,
        itemStyle: {
          color: "hsla(0, 0%, 10%, .1)",
          borderColor: "#000"
        },
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
          [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
          [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
          [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
          [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
          [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
          [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
          [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
          [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
          [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
          [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
          [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
          [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
          [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
          [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
          [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
          [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
          [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
          [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
          [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
          [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
          [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
          [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
          [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
          [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
          [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
          [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
          [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
          [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
          [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
          [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
          [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
          [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
          [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
          [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
          [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
          [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
          [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
          [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
          [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
          [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
          [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
          [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
          [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
          [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
          [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
          [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
          [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
          [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
          [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
          [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
          [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
        ],
      }

    ]
  };
  const renderBalanceCheckOptions = {
    title: [
      {
        text: "Model 1",
        top: '15%',
        left: '15%',
        textStyle: {
          fontSize: 14
        }
      },
      {
        text: "Model 2",
        top: '45%',
        left: '15%',
        textStyle: {
          fontSize: 14
        }
      },
      {
        text: "Model 3",
        top: '75%',
        left: '15%',
        textStyle: {
          fontSize: 14
        }
      }
    ],
    animationDuration: 1000,
    animationDurationUpdate: 1000,
    tooltip: {},
    itemStyle: {
      borderColor: "#fff"
    },
    series: [
      {
        type: 'pie',
        id: 'model-1',
        name: "Model 1",
        label: {show: true, position: 'inside'},
        radius: ['0%', '30%'],
        center: ['50%', '15%'],
        data: [
          {value: 0.78, name: 'Positive',},
          {value: 0.22, name: 'Negative',},
        ],
      },
      {
        type: 'pie',
        id: 'model-2',
        label: {show: true, position: 'inside'},
        radius: ['0%', '30%'],
        center: ['50%', '45%'],
        data: [
          {value: 0.83, name: 'Positive',},
          {value: 0.17, name: 'Negative',},
        ],
      },
      {
        type: 'pie',
        id: 'model-3',
        label: {show: true, position: 'inside'},
        radius: ['0%', '30%'],
        center: ['50%', '75%'],
        data: [
          {value: 0.73, name: 'Positive',},
          {value: 0.27, name: 'Negative',},
        ],
      },
    ]
  };

  // element
  const renderNACheckElem = document.querySelector('#visual-na-check');
  const renderIQRCheckElem = document.querySelector('#visual-iqr-check');
  const renderComboCheckElem = document.querySelector('#visual-combo-check');
  const renderBalanceCheckElem = document.querySelector('#visual-balance-check');

  // renderer
  const renderNACheck = () => {
    function _renderNACheck() {
      chart.setOption(renderNACheckOptions.first);
      setTimeout(() => {
        chart.setOption(renderNACheckOptions.second)
      }, 1600)
    }

    if (!getRenderState('NACheck')) {
      _renderNACheck()
      setRenderState('NACheck')
    }
  };
  const renderIQRCheck = () => {
    if (!getRenderState('IQRCheck')) {
      clearImage();
      chart.setOption(renderIQRCheckOptions);
      chart.on('click', e => {
        if (e.seriesId === 'boxplot-item') {
          const points = randomPoint(100);
          chart.setOption({
            series: [
              {
                type: 'scatter',
                id: 'data-point',
                symbolSize: 6,
                itemStyle: {
                  color: "hsla(0, 0%, 10%, .1)",
                  borderColor: "#000"
                },
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: points,
              },
              {
                type: 'effectScatter',
                id: 'data-point-effect',
                symbolSize: 10,
                data: selectN(3, points),
                xAxisIndex: 1,
                yAxisIndex: 1
              }
            ]
          })
        }
      });
      setRenderState('IQRCheck');
    }
  };
  const renderComboCheck = () => {
    if (!getRenderState('ComboCheck')) {
      chart.clear();
      container.append('img')
          .attr('src', clusterPng)
          .attr('alt', 'cluster-png')
          .style('position', 'absolute')
          .style('top', '20%')
          .style('width', '100%')
          .style('opacity', 1)
      setRenderState('ComboCheck');
    }
  };
  const renderBalanceCheck = () => {
    if (!getRenderState("BalanceCheck")) {
      clearImage();
      chart.setOption(renderBalanceCheckOptions);
      setRenderState("BalanceCheck");
    }
  }

  // util
  const clearImage = () => container.selectAll('img').remove();


  // main logic
  window.addEventListener('scroll',
      throttle(() => {
        // render check
        const shouldShowNACheck = isElementAtCenterViewPort(renderNACheckElem, 0, 300);
        const shouldShowIQRCheck = isElementAtCenterViewPort(renderIQRCheckElem, 150, 500);
        const shouldShowComboCheck = isElementAtCenterViewPort(renderComboCheckElem, 100, 700);
        const shouldShowBalanceCheck = isElementAtCenterViewPort(renderBalanceCheckElem, 100, 900);

        if (shouldShowNACheck) return renderNACheck();
        if (shouldShowIQRCheck) return renderIQRCheck();
        if (shouldShowComboCheck) return renderComboCheck();
        if (shouldShowBalanceCheck) return renderBalanceCheck();
        else {
          chart.clear();
          clearImage();
          resetRenderState();
        }
      }, 200));
}

export function visualsDataUnderstand(e: HTMLElement) {
  const container = select(e).append('div')
      .style('width', '100%')
      .style('height', '80vh')
      .style('margin', '10vh 0');
  const chart = echarts.init(container.node());

  type State = '3Model' | '4Dim' | '207Var' | 'Samples' | 'Correlation';
  const stateManager = () => {
    const _state: { [k in State]: boolean } = {
      '3Model': false,
      '4Dim': false,
      '207Var': false,
      'Samples': false,
      'Correlation': false,
    };
    const reset = () => Object.keys(_state).forEach(k => (_state[k] = false));
    return {
      set: function (s: State) {
        reset();
        _state[s] = true;
      },
      get: function (s: State) {
        return _state[s];
      },
      reset
    }
  }

  // render state management
  const {set: setRenderState, get: getRenderState, reset: resetRenderState} = stateManager();

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
  };
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
  };
  const renderSamplesOptions = {
    animationDuration: 1000,
    grid: {
      height: "50%",
      top: "25%"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['Model Variable count', "Industry Model Variable Avg count"],
      top: "10%"
    },
    xAxis: {
      type: "category",
      data: ['Model #1', "Model #2", "Model #3"],
      axisPointer: {
        type: "shadow"
      }
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: "bar",
        name: 'Model Variable count',
        barWidth: 30,
        data: [1259, 1320, 1277]
      },
      {
        type: "line",
        name: "Industry Model Variable Avg count",
        data: [[0, 1615]],
        symbol: "none",
        markLine: {
          data: [
            {
              xAxis: 0,
              yAxis: 1615
            }
          ],
          animationDelay: 800,
          animationDuration: 800,
        },
      }
    ]
  };
  const renderCorrelationOptions = {
    tooltip: {},
    series: [
      {
        type: "treemap",
        label: {
          show: true,
          formatter: '{b} {c}%'
        },
        data: [
          {
            name: "Uncorrelated Variables",
            value: 60,
            label: {
              color: "hsl(0,0%,80%)",
              fontSize: 16,
            },
            itemStyle: {
              color: "hsl(0,0%,40%)"
            }
          },
          {
            name: "Correlated Variables",
            value: 40 - 4.8,
            label: {
              color: "hsl(161,50%,90%)",
              fontSize: 16,
            },
            itemStyle: {
              color: "hsl(161,50%,60%)",
            }
          },
          {
            name: "Strong Correlated Variables",
            value: 4.8,
            label: {
              color: "hsl(186,71%,85%)",
              fontSize: 11,
            },
            itemStyle: {
              color: "hsl(185,70%,45%)"
            }
          },
        ],
        levels: [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5
            },
          }
        ],
        breadcrumb: {
          height: 20,
        }
      }
    ]
  };

  // the element
  const render3ModelElem = document.querySelector('#anchor-3-models');
  const render4DimensionElem = document.querySelector('#anchor-4-dimensions');
  const render207VarsElem = document.querySelector('#anchor-207-vars');
  const renderSamplesElem = document.querySelector('#visual-model-samples');
  const renderCorrelationElem = document.querySelector('#visual-correlation-analysis');

  // render action
  const render3Model = () => {
    if (!getRenderState('3Model')) {
      chart.setOption(render3ModelOptions, true);
      setRenderState('3Model')
    }
  };
  const render4Dimension = () => {
    if (!getRenderState('4Dim')) {
      chart.setOption(render4DimensionOptions, true);
      setRenderState('4Dim');
    }
  }
  const render207Vars = () => {
    if (!getRenderState('207Var')) {
      chart.setOption(render207VarsOptions, true);
      setRenderState('207Var');
    }
  }
  const renderSamples = () => {
    if (!getRenderState('Samples')) {
      chart.setOption(renderSamplesOptions, true);
      setRenderState('Samples')
    }
  }
  const renderCorrelation = () => {
    if (!getRenderState('Correlation')) {
      chart.setOption(renderCorrelationOptions, true);
      setRenderState('Correlation');
    }
  }


  window.addEventListener('scroll',
      throttle(() => {
        const shouldShow3Models = isElementAtCenterViewPort(render3ModelElem, 100, 300);
        const shouldShow4Dimension = isElementAtCenterViewPort(render4DimensionElem, 100, 300);
        const shouldShow207Vars = isElementAtCenterViewPort(render207VarsElem, 300, 1250);
        const shouldShowSamples = isElementAtCenterViewPort(renderSamplesElem, 100, 800);
        const shouldShowCorrelation = isElementAtCenterViewPort(renderCorrelationElem, 50, 1000);

        if (shouldShow3Models) return render3Model();
        else if (shouldShow4Dimension) return render4Dimension();
        else if (shouldShow207Vars) return render207Vars();
        else if (shouldShowSamples) return renderSamples();
        else if (shouldShowCorrelation) return renderCorrelation();
        else {
          chart.clear();
          resetRenderState();
        }
      }, 200))
}