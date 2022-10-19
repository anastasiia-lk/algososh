import React, { ChangeEvent, useRef, useState, useCallback } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './fibonacci-page.module.css';
import {getFibonacciMatrix} from '../../helpers/helpers'
import { SHORT_DELAY } from '../../helpers/constants';
import { Circle } from '../ui/circle/circle';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const onClick = useCallback(() => {
    const fibonacciMatrix = getFibonacciMatrix(+inputValue);
    let iteration = 0;
    const timerId = setInterval(() => {
      if (iteration < fibonacciMatrix.length) {
        console.log(fibonacciMatrix[iteration])
        setFibonacciArray(fibonacciMatrix[iteration]);
        iteration++;
      } else {
        clearInterval(timerId);
      }
    }, SHORT_DELAY);
  }, [inputValue]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles['flex-wrapper']} ${styles['wrapper']}`}>
      <Input
          type='number'
          value={inputValue}
          onChange={onChange}
          max={19}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          text='Расчитать'
          onClick={onClick}
          extraClass={styles.btn}
        />
        </div>
        <ul
        className={`${styles['container']} ${styles['flex-wrapper']} ${styles['list']}`}
      >
        {fibonacciArray &&
          fibonacciArray.map((item, index) => (
            <li key={index}>
              <Circle letter={item.toString()} index={index} extraClass={`${styles['item-container']}`}/>
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
