// @ts-ignore
import echarts from "echarts";

const randomPoint = (n: number) => {
  let pts = [];
  for (let k = 0; k < n; k++) {
    pts.push([Math.random(), Math.random()])
  }
  return pts;
};

const selectN = (n: number, set: [number, number][]): [number, number][] => {
  let l = set.length;
  let s = [];
  for (let k = 0; k < l; k++) {
    s.push(set[Math.floor(Math.random() * l)]);
  }
  return s;
}

const container = document.querySelector("main");
const chart = echarts.init(container);

// element
// const modelSamplesElem = document.querySelector('#visual-model-samples');
// const correlationAnalysisElem = document.querySelector('#visual-correlation-analysis');
// const naCheckElem = document.querySelector('#visual-na-check');
const iquCheckElem = document.querySelector('#visual-iqr-check');


// render options
const modelSamplesOptions = {
  animationDuration: 1000,
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
    data: ['Model Variable#', "Industry Model Variable Avg#"]
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
      name: 'Model Variable#',
      data: [1259, 1320, 1277]
    },
    {
      type: "line",
      name: "Industry Model Variable Avg#",
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
const correlationAnalysisOptions = {
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
            fontSize: 16,
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
        itemStyle: {
          color: "#eee"
        }
      }
    }
  ]
};
const naCheckOptions = {
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
const options = {
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
    {type: "value", name: 'standard deviation (σ)'},
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
        color: "#fffff",
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

// render
// chart.setOption(modelSamplesOptions);
// chart.setOption(correlationAnalysisOptions, true);
function renderNACheck() {
  chart.setOption(naCheckOptions.first);
  setTimeout(() => {
    chart.setOption(naCheckOptions.second)
  }, 1600)
}

// renderNACheck();
function renderIqrCheck() {

}

// chart.setOption(iqrCheckOptions);
chart.setOption(options);
chart.on('click', e => {
  if (e.seriesId === 'boxplot-id') {}
});

