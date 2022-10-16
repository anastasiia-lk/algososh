export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}