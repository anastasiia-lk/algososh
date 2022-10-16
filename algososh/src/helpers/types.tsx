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