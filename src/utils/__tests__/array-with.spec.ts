import { arrayWith } from '../array-with';

describe('arrayWith', () => {
  describe('simple value', () => {
    const testCases: [string, string[] | null, string[]][] = [
      ['', null, ['']],
      ['a', [], ['a']],
      ['b', ['a'], ['a', 'b']],
      ['c', ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']],
    ];

    it.each(testCases)('should return the array with "%s"', (value, input, expected) => {
      expect(arrayWith(input, value)).toStrictEqual(expected);
    });
  });

  describe('value array', () => {
    const testCases: [string[], string[] | null, string[]][] = [
      [[''], null, ['']],
      [['a'], [], ['a']],
      [['b'], ['a'], ['a', 'b']],
      [
        ['c', 'd', 'e'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd', 'e'],
      ],
    ];

    it.each(testCases)('should return the array with "%s"', (value, input, expected) => {
      expect(arrayWith(input, value)).toStrictEqual(expected);
    });
  });
});
