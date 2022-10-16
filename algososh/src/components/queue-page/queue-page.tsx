import React, { ChangeEvent, useRef, useState } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles['flex-wrapper']} ${styles['wrapper']}`}>
      <div className={`${styles['flex-wrapper']} ${styles['container']}`}>
        <Input
          value={inputValue}
          // onChange={onChange}
          maxLength={4}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          text='Добавить'
          // onClick={() => addItem(inputValue)}
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
    </SolutionLayout>
  );
};
