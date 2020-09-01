import * as d3 from "d3";
// @ts-ignore
import * as echarts from "echarts";

const chart = echarts.init(document.getElementById('vis-deploy'));

const opts = {
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
function render() {
  chart.clear();
  chart.setOption(opts);
}

render();

