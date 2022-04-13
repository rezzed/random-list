import { arrayDifference } from '../array-difference';

describe('arrayDifference', () => {
  const testCases: [string, [string[], string[]], string[]][] = [
    ['empty arrays', [[], []], []],
    ['a filled, and an empty array', [[], ['a', 'b', 'c', 'd']], []],
    ['two simple arrays', [['a'], ['b', 'c']], ['a']],
    [
      'two arrays',
      [
        ['a', 'b', 'c', 'd'],
        ['b', 'd', 'e'],
      ],
      ['a', 'c'],
    ],
  ];

  it.each(testCases)('should return the difference of  %s', (_name, input, expected) => {
    expect(arrayDifference(input[0], input[1])).toStrictEqual(expected);
  });
});
