import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Button } from './button';

describe('Тестирование_компонента_Button', () => {
  it('Snapshot_отрисовка_кнопки_с_текстом', () => {
    const tree = renderer.create(<Button text='Button' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_кнопки_без_текста', () => {
    const tree = renderer.create(<Button />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_заблокированной_кнопки', () => {
    const tree = renderer.create(<Button disabled />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_кнопки_с_индикацией_загрузки', () => {
    const tree = renderer.create(<Button isLoader />);
    expect(tree).toMatchSnapshot();
  });

  it('Корректность_вызова_колбека_при_клике_на_кнопку', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}/>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});