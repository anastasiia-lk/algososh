import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import {Direction, DELAY} from '../../helpers/constants'
import styles from './sorting-page.module.css';
import {TSortElement} from '../../helpers/types'
import {getArr, selectionSort, bubbleSort} from '../../helpers/helpers'
import {Column} from '../ui/column/column'

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TSortElement[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  const [isDescLoading, setIsDescLoading] = useState(false);
  const [isAscLoading, setIsAscLoading] = useState(false);
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
    setIsAscLoading(true);

    const matrix = isChecked
      ? selectionSort(arr, Direction.Ascending)
      : bubbleSort(arr, Direction.Ascending);

    if (!matrix) return setIsAscLoading(false);

    let step = 0;
    setArr(matrix[step]);

    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setArr(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsAscLoading(false);
      }
    }, DELAY);
  };

  // const descSort = async () => {
  //   if (isChecked) {
  //     await selectionSort(arr, Direction.Descending, setArr);
  //   } else {
  //     await bubbleSort(arr, Direction.Descending, setArr);
  //   }
  // };

  const descSort = () => {
    setIsDescLoading(true);

    const matrix = isChecked
      ? selectionSort(arr, Direction.Descending)
      : bubbleSort(arr, Direction.Descending);

    if (!matrix) return setIsDescLoading(false);

    let step = 0;
    setArr(matrix[step]);

    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setArr(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsDescLoading(false);
      }
    }, DELAY);
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
