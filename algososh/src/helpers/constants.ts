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