import "../style/intro.css"
import "../style/data-understand.css"
import "./main-deprecate";

import 'regenerator-runtime/runtime'
import {d3} from "./depts";

// @ts-ignore
import * as echarts from "echarts";

// attach opacity transition to "keep-scroll"
const keepScroll = d3.select<HTMLElement, never>('.intro__scroll_background');
// const currentHeight = keepScroll.style('height');
// const keepScrollTop = keepScroll.node().getBoundingClientRect().top;
const visibleOffset = 400;
const opacityScale = d3.scaleLinear()
    .domain([0, visibleOffset])
    .range([1, 0])
    .clamp(true);


// keep scrolling fading effect
const windowSelection = d3.select<Window, never>(window);
windowSelection.on('scroll.keepScroll', function () {
  keepScroll.selectAll('*')
      .style('opacity', function () {
        return opacityScale(window.scrollY);
      })
});

// back-to-top
d3.select('.back-to-top').on('click', function () {
      window.location.href = "#home";
    });


// register vis block scrolling effects
const fullHeight = document.body.clientHeight;
const getRowHeightById = (id: string) => d3.select<HTMLElement, never>('#' + id).node().clientHeight;

export const titleMargin = 30;
export const subTitleMargin = 78;
export const headerHeight = getRowHeightById('home') + titleMargin;
export const introRowHeight = getRowHeightById("intro") + subTitleMargin + 400;
export const dataPrepRowHeight = getRowHeightById("data-prep");
export const modelingRowHeight = getRowHeightById('modeling');
export const evalRowHeight = getRowHeightById('eval') + subTitleMargin / 2;
export const deployRowHeight = getRowHeightById('deploy');

interface VisBlockLayoutOpts {
  visBlockId: string;
  isRight: boolean;
  preShowOffset: number;
  afterShowOffset: number;
  scrollEventClass: string;
}

const preShowPosition = (sel, preShowOffset: number, isRight: boolean = false) => {
  sel
      .style('position', 'absolute')
      .style('top', preShowOffset)
      .style(isRight ? 'right' : 'left', 0);
}
const inShowPosition = (sel) => {
  sel
      .style('position', 'fixed')
      .style('top', 0);
}
const afterShowPosition = (sel, afterShowOffset: number) => {
  sel
      .style('position', 'absolute')
      .style('top', afterShowOffset);
}
function positionVisBlock({visBlockId, isRight, preShowOffset, afterShowOffset, scrollEventClass}: VisBlockLayoutOpts) {
  const idSelector = "#" + visBlockId;
  const elemSel = d3.select<HTMLElement, never>(idSelector);
  // pre-show position
  // init with pre-show position
  preShowPosition(elemSel, preShowOffset, isRight);
  windowSelection.on(`scroll.${scrollEventClass}`, function () {
    if (window.pageYOffset > afterShowOffset) {
      // page now lower than exit offset, put elem back to doc flow
      // exit viewport when scrolling down
      afterShowPosition(elemSel, afterShowOffset);
    } else if (window.pageYOffset <= afterShowOffset && window.pageYOffset > preShowOffset) {
      // vis block in fixed phase
      inShowPosition(elemSel);
    } else {
      // page scroll higher than pre-show position
      // stay at pre show position
      preShowPosition(elemSel, preShowOffset, isRight);
    }
  })
}

// position individual vis block
function positionVisDataUnderstand() {
  const preShowOffset = fullHeight;
  const afterShowOffset = headerHeight + introRowHeight - fullHeight;
  const id = 'vis-data-understand';

  return positionVisBlock({
    visBlockId: id,
    isRight: true,
    preShowOffset,
    afterShowOffset,
    scrollEventClass: id
  });
}
function positionVisDataPrep() {
  const preShowOffset = headerHeight + introRowHeight;
  const afterShowOffset = preShowOffset + dataPrepRowHeight - fullHeight;
  const id = "vis-data-prep";
  return positionVisBlock({
    visBlockId: id,
    isRight: false,
    preShowOffset,
    afterShowOffset,
    scrollEventClass: id
  });
}
function positionVisModeling() {
  const id = 'vis-modeling';
  const preShowOffset = headerHeight + introRowHeight + dataPrepRowHeight;
  const afterShowOffset = preShowOffset + modelingRowHeight - fullHeight;
  return positionVisBlock({
    visBlockId: id,
    isRight: true,
    preShowOffset,
    afterShowOffset,
    scrollEventClass: id
  });
}
function positionVisEval() {
  const id = 'vis-eval';
  const preShowOffset = headerHeight + introRowHeight + dataPrepRowHeight + modelingRowHeight;
  const afterShowOffset = preShowOffset + evalRowHeight - fullHeight;
  return positionVisBlock({
    visBlockId: id,
    isRight: false,
    preShowOffset,
    afterShowOffset,
    scrollEventClass: id
  });
}
function positionVisDeploy() {
  const id = 'vis-deploy';
  const preShowOffset = headerHeight + introRowHeight + dataPrepRowHeight + modelingRowHeight + evalRowHeight;
  const afterShowOffset = preShowOffset + deployRowHeight - fullHeight;
  return positionVisBlock({
    visBlockId: id,
    isRight: true,
    preShowOffset,
    afterShowOffset,
    scrollEventClass: id
  });
}

positionVisDataUnderstand();
positionVisDataPrep();
positionVisModeling();
positionVisEval();
positionVisDeploy();


async function loadVis() {
  await import("./component/index")
}

loadVis();

window.d3 = d3;
// @ts-ignore
window.echarts = echarts;