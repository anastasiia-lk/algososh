import { IStack } from "../../helpers/types";

export class Stack<T = string> implements IStack<T> {
  private stack: T[] = [];
  // private maxSize: number;

  // constructor(maxSize?: number) {
  //   this.maxSize = maxSize === undefined ? Infinity : maxSize;
  // }

  push = (item: T) => {
    // if (this.stack.length >= this.stackLimit) return this;
    this.stack.push(item);
    return this;
  }

  pop = () => {
    return this.stack.pop();
  }

  clear = () => {
    this.stack = [];
  }

  get elements() {
    return this.stack;
  }

  get size() {
    return this.stack.length;
  }

  get lastIndex() {
    return this.stack.length - 1;
  }

  // get stackLimit() {
  //   return this.maxSize;
  // }
}