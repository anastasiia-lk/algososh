import { ElementStates, IStates } from "./types";
import { Queue } from "../components/queue-page/Queue";
import { FIBONACCI_INIT_ARRAY, FIBONACCI_INIT_MATRIX } from "./constants";

export const swapArrayItems = (
  array: any[],
  firstItemIndex: number,
  secondItemIndex: number
): void => {
  const buf = array[firstItemIndex];
  array[firstItemIndex] = array[secondItemIndex];
  array[secondItemIndex] = buf;
};

export const getArrayOfStringsToPrint = (str: string): string[][] | null => {
  if (!str) return null;

  const array = str.split('');
  const result: string[][] = [[...array]];

  let headIndex = 0;
  let tailIndex = array.length - 1;

  while (headIndex <= tailIndex) {
    swapArrayItems(array, headIndex, tailIndex);
    result.push([...array]);
    headIndex++;
    tailIndex--;
  }

  return result;
};

export const getCircleState = (
  idx: number,
  step: number,
  len: number
): ElementStates | undefined => {
  if (idx < step || idx > len - 1 - step) return ElementStates.Modified;
  if (idx === step || idx === len - 1 - step) return ElementStates.Changing;
  if (idx > step && idx < len - 1 - step) return ElementStates.Default;
};

export const getQueueCircleState = (list: Queue, idx: number, queueState: IStates) => {
  if (idx === list.tailIndex) {
    return queueState.tail;
  } else if (idx === list.headIndex) {
    return queueState.head;
  } else {
    return ElementStates.Default;
  }
};

export const getFibonacciMatrix = (num: number) => {
  const fibonacciArray = [0, 1];
  const fibonacciMatrix = [[0], [0, 1]];
  let i = 2;
    while (i <= num) {
    fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1]);
    fibonacciMatrix.push([...fibonacciArray]);
    i++;
    console.log(fibonacciMatrix);
    }
  return fibonacciMatrix;
};