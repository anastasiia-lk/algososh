import {ElementStates, TElement} from '../helpers/types'
export const DELAY = 1000;
export const SHORT_DELAY = 500;
export const HEAD = "head";
export const TAIL = "tail";
export const CIRCLE = "circle";

export const elementTemplate: TElement = {
  value: '',
  head: {
    type: '',
    value: '',
    state: ElementStates.Changing,
  },
  tail: {
    type: '',
    value: '',
    state: ElementStates.Changing,
  },
  state: ElementStates.Default,
};

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}

export const MIN_ARR_LENGTH = 3;
export const MAX_ARR_LENGTH = 17;
export const MIN_ARR_ITEM_VALUE = 0;
export const MAX_ARR_ITEM_VALUE = 100;