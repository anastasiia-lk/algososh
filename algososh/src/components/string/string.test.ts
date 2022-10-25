import { getArrayOfStringsToPrint, getCircleState } from '../../helpers/helpers';

describe('Тестирование_алгоритма_разворота_строки', () => {
  it('с_чётным_количеством_символов', () => {
    const arrayOfStrings = getArrayOfStringsToPrint('node');
    expect(arrayOfStrings).toEqual([
      ['n', 'o', 'd', 'e'],
      ['e', 'o', 'd', 'n'],
      ['e', 'd', 'o', 'n'],
    ]);
  });

  it('с_нечетным_количеством_символов', () => {
    const arrayOfStrings = getArrayOfStringsToPrint('react');
    expect(arrayOfStrings).toEqual([
      ['r', 'e', 'a', 'c', 't'],
      ['t', 'e', 'a', 'c', 'r'],
      ['t', 'c', 'a', 'e', 'r'],
      ['t', 'c', 'a', 'e', 'r'],
    ]);
  });

  it('с_одним_символом', () => {
    const arrayOfStrings = getArrayOfStringsToPrint('7');
    expect(arrayOfStrings).toEqual([
      ['7'],
      ['7'],
    ]);
  });

  it('пустая_строка', () => {
    const arrayOfStrings = getArrayOfStringsToPrint('');
    expect(arrayOfStrings).toBe(null);
  });
});