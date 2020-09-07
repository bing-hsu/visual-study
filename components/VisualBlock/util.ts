import {select} from "d3-selection";
import UebaHeader from "../Header/UebaHeader";
import UebaIntro from "../Intro/UebaIntro";
import UebaDataUnderstand from "../DataUnderstand/UebaDataUnderstand";
import UebaDataPrep from "../DataPrep/UebaDataPrep";
import UebaModel from "../Modeling/UebaModel";
import UebaEval from "../Eval/UebaEval";
import UebaDeploy from "../Deploy/UebaDeploy";
import {windowSelection} from "../util";
import UebaApp from "../App";

/*************************************
 * compute row outer height
 * (client height + top/bottom margin)
 ***********************************/
type MarginProp = 'margin-top' | 'margin-bottom';
const getMargin = (elem: HTMLElement, marginProp: MarginProp) => {
  return parseFloat(window.getComputedStyle(elem)[marginProp]) || 0;
}
const getTopMargin = (element: HTMLElement) => getMargin(element, 'margin-top');
const getBottomMargin = (element: HTMLElement) => getMargin(element, 'margin-bottom');
const getVerticalMargin = (firstElem: HTMLElement, bottomElem: HTMLElement) => getTopMargin(firstElem) + getBottomMargin(bottomElem);
const getRowOuterHeightByTag = (tag: string) => {
  const selection = select<HTMLElement, never>(tag)
  const node = selection.node();
  if (!node) throw `${tag} doesn't exist`;
  const innerHeight = node.clientHeight;

  // only apply to the first elem & last elem inside a top div.col
  const firstElem = selection.select<HTMLElement>(`#${tag} > :first-child`).node();
  if (!firstElem) throw `${tag} #${tag} > :first-child doesn't exist`;
  const lastElem = selection.select<HTMLElement>(`#${tag} > :last-child`).node();
  if (!lastElem) throw `${tag} #${tag} > :last-child doesn't exist`;

  return innerHeight + getVerticalMargin(firstElem, lastElem);
}

export function computeHeightOfRows() {
  // should be called after window 'load'
  // to get accurate height
  const uebaHeaderHeight = getRowOuterHeightByTag(UebaHeader.tagName());
  const uebaIntroHeight = getRowOuterHeightByTag(UebaIntro.tagName());
  const uebaDataUnderstandHeight = getRowOuterHeightByTag(UebaDataUnderstand.tagName());
  const uebaDataPrepHeight = getRowOuterHeightByTag(UebaDataPrep.tagName());
  const uebaModelHeight = getRowOuterHeightByTag(UebaModel.tagName());
  const uebaEvalHeight = getRowOuterHeightByTag(UebaEval.tagName());
  const uebaDeployHeight = getRowOuterHeightByTag(UebaDeploy.tagName());
  return {
    uebaHeaderHeight,
    uebaIntroHeight,
    uebaDataUnderstandHeight,
    uebaDataPrepHeight,
    uebaModelHeight,
    uebaEvalHeight,
    uebaDeployHeight
  }
}

/*******************************
 * Pre-show / In-show / Off-show
 * predicates & position
 ******************************/
interface VisBlockPositionSetOpts {
  elem: HTMLElement;
  preShowYOffset: number;
  afterShowYOffset: number;
  isRight: boolean;
  scrollEventClass: string
}

function makeShowStatusPredicates(opts: Pick<VisBlockPositionSetOpts, 'preShowYOffset' | 'afterShowYOffset'>) {
  const {preShowYOffset, afterShowYOffset} = opts;
  return {
    isPreShow: () => scrollY < preShowYOffset,
    isInShow: () => scrollY >= preShowYOffset && scrollY <= afterShowYOffset,
    isAfterShow: () => scrollY > afterShowYOffset
  }
}

// TODO: why this doesn't work?
// type PositionStatus = 'in-show' | 'pre-show' | 'after-show';
// function positionStateMachine() {
//   let isInPreShowPosition = false;
//   let isInInShowPosition = false;
//   let isInAfterShowPosition = false;
//   const reset = () => {
//     isInPreShowPosition = false;
//     isInPreShowPosition = false;
//     isInAfterShowPosition = false;
//   }
//   return {
//     set(status: PositionStatus) {
//       reset();
//       switch (status) {
//         case "after-show":
//           isInAfterShowPosition = true;
//           break;
//         case "in-show":
//           isInInShowPosition = true;
//           break;
//         case "pre-show":
//           isInPreShowPosition = true;
//           break;
//       }
//     },
//     get(status: PositionStatus) {
//       switch (status) {
//         case "after-show":
//           return isInAfterShowPosition;
//         case "in-show":
//           return isInInShowPosition;
//         case "pre-show":
//           return isInPreShowPosition
//       }
//     }
//   }
// }
//

const once = (fn: () => any) => {
  let n = 0;
  return function () {
    if (n == 0) {
      fn();
      n += 1;
    }
  }
}

function makePositionSetter(opts: Omit<VisBlockPositionSetOpts, 'scrollEventClass'>) {
  // const statusMachine = positionStateMachine();
  const {elem, afterShowYOffset, preShowYOffset, isRight} = opts;
  const selection = select(elem);
  let visBlockWidth = 0;
  let visBlockRight = 0;
  let visBlockLeft = 0;
  const setDimensionOnce = once(() => {
    const elem = selection.node();
    const boundBox = elem.getBoundingClientRect();
    visBlockWidth = elem.clientWidth;
    visBlockRight = boundBox.right;
    visBlockLeft = innerWidth - visBlockRight;
    console.log('Compute dimensions for visual block')
  });

  return {
    setPreShowPosition: () => {
      selection
          .style('position', 'absolute')
          .style('top', preShowYOffset)
          .style(isRight ? 'right' : 'left', 0);
      setDimensionOnce();
    },
    setInShowPosition: () => {
      selection
          .style('position', 'fixed')
          .style('top', 0)
          .style('width', visBlockWidth)
          .style(isRight ? 'right' : 'left', isRight ? visBlockLeft : visBlockRight - visBlockWidth);
    },
    setAfterShowPosition: () => {
      selection
          .style('position', 'absolute')
          .style('top', afterShowYOffset)
          .style(isRight ? 'right' : 'left', 0);
    }
  }
}

export function setVisBlockPosition(opts: VisBlockPositionSetOpts) {
  const {elem, preShowYOffset, afterShowYOffset, isRight, scrollEventClass} = opts;
  const {isPreShow, isInShow, isAfterShow} = makeShowStatusPredicates({preShowYOffset, afterShowYOffset});
  const {setAfterShowPosition, setInShowPosition, setPreShowPosition} = makePositionSetter({
    elem, afterShowYOffset, isRight, preShowYOffset
  });

  // init position
  setPreShowPosition();

  function setPosition() {
    // console.log('isAfterShow %s, isInShow %s, isPreShow %s', isAfterShow(), isInShow(), isPreShow())
    if (isAfterShow()) setAfterShowPosition();
    else if (isInShow()) setInShowPosition();
    else if (isPreShow()) setPreShowPosition();
  }

  // listen to scroll event
  windowSelection.on(`scroll.${scrollEventClass}`, setPosition);
}

