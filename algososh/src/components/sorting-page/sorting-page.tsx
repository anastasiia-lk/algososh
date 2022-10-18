import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import {Direction} from '../../helpers/constants'
import styles from './sorting-page.module.css';
import {TSortElement} from '../../helpers/types'
import {getArr, selectionSort, bubbleSort} from '../../helpers/helpers'
import {Column} from '../ui/column/column'

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TSortElement[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  const onChange = () => {
    setIsChecked((prev) => !prev);
  };
  useEffect(() => {
    getRandomArray();
  }, []);

  const getRandomArray = () => {
    const randomArr = getArr();
    setArr(randomArr);
  };

  const ascSort = async () => {
    if (isChecked) {
      await selectionSort(arr, Direction.Ascending, setArr);
    } else {
      await bubbleSort(arr, Direction.Ascending, setArr);
    }
  };

  const descSort = async () => {
    if (isChecked) {
      await selectionSort(arr, Direction.Descending, setArr);
    } else {
      await bubbleSort(arr, Direction.Descending, setArr);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles['flex-wrapper']} ${styles['wrapper']}`}>
        <div className={`${styles['flex-wrapper']} ${styles['actions-wrapper']}`}>
          <div className={`${styles['flex-wrapper']} ${styles['input-wrapper']}`}>
            <RadioInput
              name='sort'
              label='Выбор'
              checked={isChecked}
              onChange={onChange}
            />
            <RadioInput
              name='sort'
              label='Пузырёк'
              checked={!isChecked}
              onChange={onChange}
            />
          </div>
          <div className={`${styles['flex-wrapper']} ${styles['button-container']}`}>
            <Button
              sorting={Direction.Ascending}
              text='По возрастанию'
              extraClass={styles.button}
              onClick={ascSort}
            />
            <Button
              sorting={Direction.Descending}
              text='По убыванию'
              extraClass={styles.button}
              onClick={descSort}
            />
          </div>
          <Button
              text='Новый массив'
              extraClass={styles.button}
              onClick={getRandomArray}
            />
        </div>
        <ul className={`${styles['flex-wrapper']} ${styles['sort_img']} ${styles['list']}`}>
          {arr &&
            arr.map((el, index) => (
              <li key={index}>
                <Column index={el.value} state={el.state} />
              </li>
            ))}
        </ul>
        </div>
    </SolutionLayout>
  );
};
