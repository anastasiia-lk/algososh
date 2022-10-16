import { IStack } from "../../helpers/types";

export class Stack<T = string> implements IStack<T> {
  private stack: T[] = [];

  push = (item: T) => {
    this.stack.push(item);
    return this;
  }

  pop = () => {
    return this.stack.pop();
  }

  clear = () => {
    this.stack = [];
  }

  get items() {
    return this.stack;
  }

  get lastIndex() {
    return this.stack.length - 1;
  }
}