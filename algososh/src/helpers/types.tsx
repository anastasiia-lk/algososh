export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export interface IDataStorage<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}

export interface IStates {
head: ElementStates,
tail: ElementStates,
}

export interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
}

export type Step<T> = T[][];

export type TCircle = Pick<TElement, 'value' | 'state'> & { type: string };

export type TElement = {
  value: string;
  head: TCircle;
  tail: TCircle;
  state: ElementStates;
};