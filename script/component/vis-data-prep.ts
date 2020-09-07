import * as d3 from "d3";
// @ts-ignore
import boxPlotPng from "url:../static/img/boxplot.png";
// @ts-ignore
import clusterPng from "url:../static/img/cluster.png";
// @ts-ignore
import "./vis-data-prep.css";

// 4000 - 5800
const visBlock = d3.select('#vis-data-prep');

const noShowAt = 3600;
const fullShowAt = 4600;
const changeSrcAt = 5500;
const exitShowAt = 5600;
const reappearOffset = 1000;
const imgOpacityScale = d3.scaleLinear().clamp(true).domain([noShowAt, fullShowAt]).range([0, 1]);
const imgOpacityScaleExit = d3.scaleLinear().clamp(true).domain([fullShowAt, exitShowAt]).range([1, 0]);
const imgOpacityScaleReappear = d3.scaleLinear().clamp(true).domain([exitShowAt, exitShowAt + reappearOffset]).range([0, 1]);

const imgSel = visBlock.append('img')
    .attr('src', boxPlotPng)
    .attr('alt', 'boxplot')
    .style('opacity', 0);

let png = 'boxplot';
d3.select(window).on('scroll.data-prep-s', function () {
  if (pageYOffset > noShowAt - 200 && pageYOffset < fullShowAt + 300) {
    imgSel.style('opacity', () => imgOpacityScale(pageYOffset));
  } else if (pageYOffset > fullShowAt && pageYOffset < exitShowAt+300) {
    imgSel.style('opacity', () => imgOpacityScaleExit(pageYOffset));
  } else if (pageYOffset > exitShowAt && pageYOffset < exitShowAt + reappearOffset) {
    imgSel.style('opacity', () => imgOpacityScaleReappear(pageYOffset))
  }

  if (png !== 'cluster' && pageYOffset > changeSrcAt) {
    imgSel.attr('src', clusterPng);
    png = 'cluster';
  } else if (png !== 'boxplot' && pageYOffset <= changeSrcAt) {
    imgSel.attr('src', boxPlotPng);
    png = 'boxplot';
  }
})