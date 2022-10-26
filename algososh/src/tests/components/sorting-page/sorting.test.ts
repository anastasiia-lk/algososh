import { Direction } from '../../../types/direction';
import { ElementStates } from '../../../types/element-states';
import { bubbleSort, selectionSort } from '../../../helpers/helpers';

describe('Тестирование_алгоритма_сортировки_выбором', () => {
  it('пустой_массив', () => {
    expect(selectionSort([], Direction.Descending)).toBe(null);
  });

  it('массив_из_одного_элемента', () => {
    expect(
      selectionSort(
        [{ value: 7, state: ElementStates.Default }],
        Direction.Descending
      )
    ).toEqual([[{ value: 7, state: ElementStates.Modified }]]);
  });

  it('массив_из_нескольких_элементов', () => {
    const input = [
      {
        value: 97,
        state: ElementStates.Default,
      },
      {
        value: 17,
        state: ElementStates.Default,
      },
      {
        value: 50,
        state: ElementStates.Default,
      },
    ];

    const output = [
      [
        {
          value: 97,
          state: ElementStates.Changing,
        },
        {
          value: 17,
          state: ElementStates.Changing,
        },
        {
          value: 50,
          state: ElementStates.Default,
        },
      ],
      [
        {
          value: 97,
          state: ElementStates.Default,
        },
        {
          value: 17,
          state: ElementStates.Changing,
        },
        {
          value: 50,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 17,
          state: ElementStates.Modified,
        },
        {
          value: 97,
          state: ElementStates.Changing,
        },
        {
          value: 50,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 17,
          state: ElementStates.Modified,
        },
        {
          value: 50,
          state: ElementStates.Modified,
        },
        {
          value: 97,
          state: ElementStates.Modified,
        },
      ],
    ];
    expect(selectionSort(input, Direction.Ascending)).toEqual(output);
  });
});

describe('Тестирование_алгоритма_сортировки_пузырьком', () => {
  it('пустой_массив', () => {
    expect(bubbleSort([], Direction.Descending)).toBe(null);
  });

  it('массив_из_одного_элемента', () => {
    expect(
      bubbleSort(
        [{ value: 7, state: ElementStates.Default }],
        Direction.Descending
      )
    ).toEqual([[{ value: 7, state: ElementStates.Modified }]]);
  });

  it('массив_из_нескольких_элементов', () => {
    const input = [
      {
        value: 11,
        state: ElementStates.Default,
      },
      {
        value: 52,
        state: ElementStates.Default,
      },
      {
        value: 36,
        state: ElementStates.Default,
      },
    ];

    const output = [
      [
        {
          value: 11,
          state: ElementStates.Changing,
        },
        {
          value: 52,
          state: ElementStates.Changing,
        },
        {
          value: 36,
          state: ElementStates.Default,
        },
      ],
      [
        {
          value: 52,
          state: ElementStates.Default,
        },
        {
          value: 11,
          state: ElementStates.Changing,
        },
        {
          value: 36,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 52,
          state: ElementStates.Changing,
        },
        {
          value: 36,
          state: ElementStates.Changing,
        },
        {
          value: 11,
          state: ElementStates.Modified,
        },
      ],
      [
        {
          value: 52,
          state: ElementStates.Modified,
        },
        {
          value: 36,
          state: ElementStates.Modified,
        },
        {
          value: 11,
          state: ElementStates.Modified,
        },
      ],
    ];

    expect(bubbleSort(input, Direction.Descending)).toEqual(output);
  });
});