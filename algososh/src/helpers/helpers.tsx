import { ElementStates, IStates, Step, TElement, TCircle } from "./types";
import { Queue } from "../components/queue-page/Queue";
import { elementTemplate, CIRCLE, TAIL, HEAD } from "./constants";
import {List} from '../components/list-page/List'

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

export function getInitState(list: string[]): TElement[] {
  const listToRender = list.map((el, idx) => {
    return {
      ...elementTemplate,
      value: el,
      head: {
        ...elementTemplate.head,
        value: idx === 0 ? HEAD : '',
      },
      tail: {
        ...elementTemplate.tail,
        value: idx === list.length - 1 ? TAIL : '',
      }
    };
  });
  return listToRender;
}

export function getAddToHeadMatrix<T extends string>(
  linkedList: List<T>,
  item: T
): Step<TElement> {
  const matrix = [];

  const list: TElement[] = getInitState(linkedList.toArray());
  if (!list.length)
    list.push({
      ...elementTemplate,
      head: { ...elementTemplate.head },
      tail: { ...elementTemplate.tail },
    });

  const firstStep = [];
  let firstElement = { ...list[0] };
  let firstElementHead = { ...firstElement.head };
  firstElementHead.type = CIRCLE;
  firstElementHead.value = item;
  firstElement.head = firstElementHead;

  firstStep.push(firstElement, ...list.slice(1));

  linkedList.prepend(item);

  const secondStep = getInitState(linkedList.toArray());
  firstElement = { ...secondStep[0] };
  firstElement.state = ElementStates.Modified;
  secondStep[0] = firstElement;

  const thirdStep = [...secondStep];
  firstElement = { ...thirdStep[0] };
  firstElement.state = ElementStates.Default;
  thirdStep[0] = firstElement;

  matrix.push(firstStep, secondStep, thirdStep);

  return matrix;
}

export function getAddToTailMatrix<T extends string>(
  linkedList: List<T>,
  item: T
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  if (!list.length)
  list.push({
    ...elementTemplate,
    head: { ...elementTemplate.head },
    tail: { ...elementTemplate.tail },
  });

  const firstStep = list.map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        head: {
          ...el.head,
          type: CIRCLE,
          value: item,
        },
      };
    }
    return el;
  });

  linkedList.append(item);

  const secondStep = getInitState(linkedList.toArray()).map(
    (el, idx, array) => {
      if (idx === array.length - 1) {
        return {
          ...el,
          state: ElementStates.Modified,
        };
      }
      return el;
    }
  );

  const thirdStep = secondStep.map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        state: ElementStates.Default,
      };
    }
    return el;
  });

  matrix.push(firstStep, secondStep, thirdStep);

  return matrix;
}

export function getDeleteHeadMatrix<T extends string>(
  linkedList: List<T>
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  const firstStep = list.map((el, idx) => {
    if (idx === 0) {
      return {
        ...el,
        value: '',
        tail: {
          ...el.tail,
          type: CIRCLE,
          value: el.value,
        },
      };
    }
    return el;
  });

  linkedList.deleteHead();

  const secondStep = getInitState(linkedList.toArray());
  matrix.push(firstStep, secondStep);

  return matrix;
}

export function getDeleteTailMatrix<T extends string>(
  linkedList: List<T>
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  const firstStep = list.map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        value: '',
        tail: {
          ...el.tail,
          type: CIRCLE,
          value: el.value,
        },
      };
    }
    return el;
  });

  linkedList.deleteTail();

  const secondStep = getInitState(linkedList.toArray());
  matrix.push(firstStep, secondStep);

  return matrix;
}

export function getAddByIndexMatrix<T extends string>(
  linkedList: List<T>,
  item: T,
  index: number
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  for (let i = 0; i <= index; i++) {
    const step = list.map((el, idx) => {
      if (i === idx) {
        return {
          ...el,
          head: {
            ...el.head,
            type: CIRCLE,
            value: item,
          },
        };
      } else if (idx < i) {
        return {
          ...el,
          state: ElementStates.Changing,
        };
      }
      return el;
    });
    matrix.push(step);
  }

  linkedList.addByIndex(item, index);

  const preLastStep = getInitState(linkedList.toArray());
  const insertedEl = { ...preLastStep[index] };
  insertedEl.state = ElementStates.Modified;
  preLastStep[index] = { ...insertedEl };

  const lastStep = [...preLastStep];
  insertedEl.state = ElementStates.Default;
  lastStep[index] = { ...insertedEl };

  matrix.push(preLastStep, lastStep);

  return matrix;
}

export function getDeleteByIndexMatrix<T extends string>(
  linkedList: List<T>,
  index: number
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  for (let i = 0; i <= index; i++) {
    const step = list.map((el, idx) => {
      if (idx === i) {
        return {
          ...el,
          state: ElementStates.Changing,
        };
      }
      return el;
    });
    matrix.push(step);
  }

  const preLastStep = [...matrix[matrix.length - 1]];
  const deletedEl = { ...preLastStep[index] };
  deletedEl.tail = {
    ...deletedEl.tail,
    value: deletedEl.value,
    type: CIRCLE,
  };
  deletedEl.value = '';
  deletedEl.state = ElementStates.Default;
  preLastStep[index] = deletedEl;

  linkedList.deleteByIndex(index);

  const lastStep = getInitState(linkedList.toArray());

  matrix.push(preLastStep, lastStep);

  return matrix;
}