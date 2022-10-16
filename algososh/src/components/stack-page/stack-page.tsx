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
  const [lastElementState, setLastElementState] = useState(
    ElementStates.Changing
  );
  const [stackList, setStackList] = useState<string[]>(stack.current.elements);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addItem = (item: string) => {
    // setIsLoading((prev) => ({ ...prev, add: true }));
    setLastElementState(ElementStates.Changing);
    stack.current.push(item);
    console.log(stack);
    setStackList([...stack.current.elements]);
    setInputValue('');
    setTimeout(() => {
      setLastElementState(ElementStates.Default);
      // setIsLoading((prev) => ({ ...prev, add: false }));
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
          // disabled={
          //   !inputValue || stack.current.size >= stack.current.stackLimit
          // }
          // isLoader={isLoading.add}
        />
        <Button
          text='Удалить'
          // onClick={deleteFromStack}
          // disabled={isEmpty || isLoading.add}
          // isLoader={isLoading.delete}
        />
        </div>
        <Button
          text='Очистить'
          // onClick={clearStack}
          // disabled={isEmpty || isLoading.add || isLoading.delete}
        />
        </div>
        <ul className={`${styles['flex-wrapper']} ${styles['stack-items-container']} ${styles['list']}`}>
        {stackList &&
          stackList.map((el, idx) => (
            <li key={idx}>
              <Circle
                letter={el}
                index={idx}
                head={stack.current.lastIndex === idx ? 'top' : null}
                state={
                  stack.current.lastIndex === idx
                    ? lastElementState
                    : ElementStates.Default
                }
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
