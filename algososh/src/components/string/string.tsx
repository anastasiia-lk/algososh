import React, { ChangeEvent, useCallback, useState } from 'react';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';

import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <SolutionLayout title="Строка">
      <div className={styles['flex-wrapper']}>
      <Input
        isLimitText
        maxLength={11}
        value={inputValue}
        // onChange={onChange}
        />
      <Button
        text='Развернуть'
        linkedList='small'
        // isLoader={isLoader}
        // onClick={onClick}
        // disabled={disabled}
      />
    </div>
    </SolutionLayout>
  );
};
