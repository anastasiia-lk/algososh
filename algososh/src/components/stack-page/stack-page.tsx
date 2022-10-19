import React, { ChangeEvent, useRef, useState } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './stack-page.module.css';
import { ElementStates } from '../../types/element-states';
import {DELAY} from '../../helpers/constants'
import { Stack } from './Stack';
import { Circle } from '../ui/circle/circle';

export const StackPage: React.FC = () => {
  const stack = useRef(new Stack());
  const [inputValue, setInputValue] = useState('');
  const [lastStackItemState, setLastStackItemState] = useState(
    ElementStates.Changing
  );
  const [stackItems, setStackItems] = useState<string[]>(stack.current.items);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearStack = () => {
    stack.current.clear();
    setStackItems(stack.current.items);
  };

  const deleteItem = () => {
    setLastStackItemState(ElementStates.Changing);
    setTimeout(() => {
      stack.current.pop();
      setStackItems([...stack.current.items]);
      setLastStackItemState(ElementStates.Default);
    }, DELAY);
  };

  const addItem = (item: string) => {
    setLastStackItemState(ElementStates.Changing);
    stack.current.push(item);
    console.log(stack);
    setStackItems([...stack.current.items]);
    setInputValue('');
    setTimeout(() => {
      setLastStackItemState(ElementStates.Default);
    }, DELAY);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles['flex-wrapper']} ${styles['wrapper']}`}>
      <div className={`${styles['flex-wrapper']} ${styles['container']}`}>
        <Input
          value={inputValue}
          onChange={onChange}
          maxLength={4}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          text='Добавить'
          onClick={() => addItem(inputValue)}
        />
        <Button
          text='Удалить'
          onClick={deleteItem}
        />
        </div>
        <Button
          text='Очистить'
          onClick={clearStack}
        />
      </div>
      <ul className={`${styles['flex-wrapper']} ${styles['stack-items-container']} ${styles['list']}`}>
        {stackItems &&
          stackItems.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item}
                index={index}
                head={stack.current.lastIndex === index ? 'top' : null}
                state={
                  stack.current.lastIndex === index
                    ? lastStackItemState
                    : ElementStates.Default
                }
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
