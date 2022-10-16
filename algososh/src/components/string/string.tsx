import React, { ChangeEvent, useCallback, useState } from 'react';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { getArrayOfStringsToPrint } from '../../helpers/helpers'; 
import { DELAY } from '../../helpers/constants';
import { getCircleState } from '../../helpers/helpers';

import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [stringToPrint, setStringToPrint] = useState<{
    array: string[];
    iterationNumber: number;
  } | null>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    const arrayOfStrings = getArrayOfStringsToPrint(inputValue);

    let iterationNumber = 0;
    
    if (!arrayOfStrings) {
      return;
    } else {
      setStringToPrint({ array: arrayOfStrings[iterationNumber], iterationNumber: -1 })
    }

    const timerId = setInterval(() => {
      if (iterationNumber < arrayOfStrings.length) {
        setStringToPrint({ array: arrayOfStrings[iterationNumber], iterationNumber });
        iterationNumber++;
      } else {
        clearInterval(timerId);
      }
    }, DELAY);
  }, [inputValue]);

  console.log(inputValue)

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles['flex-wrapper']} ${styles['container']}`}>
      <Input
        isLimitText
        maxLength={11}
        value={inputValue}
        onChange={onChange}
        />
      <Button
        text='Развернуть'
        linkedList='small'
        onClick={onClick}
      />
    </div>
    <ul className={`${styles['flex-wrapper']} ${styles['letters-wrapper']} ${styles['list']}`}>
        {stringToPrint?.array &&
          stringToPrint.array.map((letter, index) => (
            <li key={index}>
              <Circle
                letter={letter}
                state={getCircleState(index, stringToPrint.iterationNumber, stringToPrint.array.length)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
