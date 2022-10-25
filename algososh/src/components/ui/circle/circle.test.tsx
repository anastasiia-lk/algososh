import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

import { Circle } from './circle';

describe('Тестирование_компонента_Circle', () => {
  it('Snapshot_отрисовка_компонента_без_буквы', () => {
    const tree = renderer.create(<Circle />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_с_буквой', () => {
    const tree = renderer.create(<Circle letter='test' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_с_head', () => {
    const tree = renderer.create(<Circle head='head' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_c_react-элементом_в_head', () => {
    const head = <Circle isSmall />;
    const tree = renderer.create(<Circle head={head} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_с_tail', () => {
    const tree = renderer.create(<Circle tail='tail' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_c_react-элементом_в_tail', () => {
    const tail = <Circle isSmall />;
    const tree = renderer.create(<Circle tail={tail} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_с_index', () => {
    const tree = renderer.create(<Circle index={0} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_с_пропом_isSmall===true', () => {
    const tree = renderer.create(<Circle isSmall />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_в_состоянии_default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_в_состоянии_changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot_отрисовка_компонента_в_состоянии_modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});