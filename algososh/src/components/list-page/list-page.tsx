import React, { ChangeEvent, useRef, useState } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './list-page.module.css';
import {List} from './List'
import {getAddToHeadMatrix, getInitState} from '../../helpers/helpers'
import {TElement} from '../../helpers/types'
import {DELAY, CIRCLE} from '../../helpers/constants'
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

export const ListPage: React.FC = () => {
  const linkedList = useRef(new List<string>(['0', '34', '8', '1'], 7));
  console.log(linkedList)
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
    const [list, setList] = useState<TElement[]>(
    getInitState(linkedList.current.toArray())
  );

  const inputValueOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addToHead = (item: string) => {
    // setIsLoading((prev) => ({ ...prev, addHead: true }));
    const matrix = getAddToHeadMatrix(linkedList.current, item);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        // setIsLoading((prev) => ({ ...prev, addHead: false }));
      }
    }, DELAY);

    // setValueInput('');
  };

  return (
    <SolutionLayout title="Связный список">
    <div className={`${styles['flex-wrapper']} ${styles['wrapper']}`}>
        <Input
          value={inputValue}
          extraClass={`${styles['input-width']}`}
          placeholder='Введите значение'
          isLimitText
          maxLength={4}
          onChange={inputValueOnChange}
        />
        <Button
          text='Добавить в head'
          linkedList='small'
          onClick={() => addToHead(inputValue)}
          // disabled={
          //   !inputValue ||
          //   isLoading.addTail ||
          //   isLoading.addByIdx ||
          //   isLoading.delHead ||
          //   isLoading.delTail ||
          //   isLoading.delByIdx ||
          //   list.length >= linkedList.current.getSizeLimit()
          // }
          // isLoader={isLoading.addHead}
        />
        <Button
          text='Добавить в tail'
          linkedList='small'
          // onClick={() => addToTail(inputValue)}
          // disabled={
          //   !inputValue ||
          //   isLoading.addHead ||
          //   isLoading.addByIdx ||
          //   isLoading.delHead ||
          //   isLoading.delTail ||
          //   isLoading.delByIdx ||
          //   list.length >= linkedList.current.getSizeLimit()
          // }
          // isLoader={isLoading.addTail}
        />
        <Button
          text='Удалить из head'
          linkedList='small'
          // onClick={deleteFromHead}
          // disabled={
          //   !list.length ||
          //   isLoading.addHead ||
          //   isLoading.addTail ||
          //   isLoading.delTail ||
          //   isLoading.addByIdx ||
          //   isLoading.delByIdx
          // }
          // isLoader={isLoading.delHead}
        />
        <Button
          text='Удалить из tail'
          linkedList='small'
          // onClick={deleteFromTail}
          // disabled={
          //   !list.length ||
          //   isLoading.addHead ||
          //   isLoading.addTail ||
          //   isLoading.delHead ||
          //   isLoading.addByIdx ||
          //   isLoading.delByIdx
          // }
          // isLoader={isLoading.delTail}
        />
        <Input
          value={inputIndex}
          extraClass={`${styles['input-width']}`}
          placeholder='Введите индекс'
          type='number'
          // onChange={inputIndexOnChangeHandler}
        />
        <Button
          text='Добавить по индексу'
          linkedList='big'
          // onClick={() => addByIndex(inputValue, +inputIndex)}
          // disabled={
          //   !inputValue ||
          //   !inputIndex ||
          //   isLoading.addHead ||
          //   isLoading.addTail ||
          //   isLoading.delHead ||
          //   isLoading.addTail ||
          //   isLoading.delByIdx ||
          //   list.length >= linkedList.current.getSizeLimit()
          // }
          // isLoader={isLoading.addByIdx}
        />
        <Button
          text='Удалить по индексу'
          linkedList='big'
          // onClick={() => deleteByIndex(+inputIndex)}
          // disabled={
          //   !inputIndex ||
          //   !list.length ||
          //   isLoading.addHead ||
          //   isLoading.addTail ||
          //   isLoading.addByIdx ||
          //   isLoading.delHead ||
          //   isLoading.delTail
          // }
          // isLoader={isLoading.delByIdx}
        />
      </div>
      <ul className={`${styles['flex-wrapper']} ${styles['list-items-container']} ${styles['list']}`}>
        {list &&
          list.map((el, idx) => (
            <li key={idx} className={styles['items']}>
              <Circle
                head={
                  el.head.type === CIRCLE ? (
                    <Circle
                      letter={el.head.value}
                      isSmall
                      state={el.head.state}
                    />
                  ) : (
                    el.head.value
                  )
                }
                tail={
                  el.tail?.type === CIRCLE ? (
                    <Circle
                      letter={el.tail?.value}
                      isSmall
                      state={el.tail?.state}
                    />
                  ) : (
                    el.tail?.value
                  )
                }
                letter={el.value}
                index={idx}
                state={el.state}
              />
              {idx !== list.length - 1 && <ArrowIcon />}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
