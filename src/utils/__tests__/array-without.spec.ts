import { arrayWithout } from '../array-without';

describe('arrayWithout', () => {
  describe('simple value', () => {
    const testCases: [string, string[] | null, string[]][] = [
      ['', null, []],
      ['a', [], []],
      ['b', ['a'], ['a']],
      ['c', ['a', 'b', 'c', 'd'], ['a', 'b', 'd']],
    ];

    it.each(testCases)('should return the array without "%s"', (value, input, expected) => {
      expect(arrayWithout(input, value)).toStrictEqual(expected);
    });
  });

  describe('value array', () => {
    const testCases: [string[], string[] | null, string[]][] = [
      [[''], null, []],
      [['a'], [], []],
      [['b'], ['a'], ['a']],
      [['c'], ['a', 'b', 'c'], ['a', 'b']],
      [
        ['d', 'e'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c'],
      ],
    ];

    it.each(testCases)('should return the array without "%s"', (value, input, expected) => {
      expect(arrayWithout(input, value)).toStrictEqual(expected);
    });
  });
});
