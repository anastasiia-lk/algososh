import React, { ChangeEvent, useRef, useState } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './queue-page.module.css';
import { Queue } from './Queue';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY } from '../../helpers/constants';
import { Circle } from '../ui/circle/circle';
import {getQueueCircleState} from '../../helpers/helpers'
import { HEAD, TAIL } from '../../constants/element-captions';

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue(7));
  const [queueItems, setQueueItems] = useState(queue.current.items);
  const [inputValue, setInputValue] = useState('');
  const [queueState, setQueueState] = useState({
    head: ElementStates.Default,
    tail: ElementStates.Default,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addItem = (item: string) => {
    // setIsLoading((prev) => ({ ...prev, enq: true }));
    setQueueState((prev) => ({ ...prev, tail: ElementStates.Changing }));

    queue.current.push(item);
    setQueueItems(queue.current.items);
    console.log(queue.current.items)
    setInputValue('');

    setTimeout(() => {
      // setIsLoading((prev) => ({ ...prev, enq: false }));
      setQueueState((prev) => ({ ...prev, tail: ElementStates.Default }));
    }, SHORT_DELAY);
  };
  
  return (
    <SolutionLayout title="Очередь">
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
          // onClick={deleteItem}
        />
        </div>
        <Button
          text='Очистить'
          // onClick={clearStack}
        />
      </div>
      <ul className={`${styles['flex-wrapper']} ${styles['queue-items-container']} ${styles['list']}`}>
        {queueItems &&
          queueItems.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item}
                index={index}
                head={
                  !queue.current.isEmpty && index === queue.current.headIdx
                    ? HEAD
                    : null
                }
                tail={
                  !queue.current.isEmpty && index === queue.current.tailIdx
                    ? TAIL
                    : null
                }
                state={getQueueCircleState(queue.current, index, queueState)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
