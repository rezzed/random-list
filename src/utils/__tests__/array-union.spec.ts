import { arrayUnion } from '../array-union';

describe('arrayUnion', () => {
  const testCases: [string, [string[], string[]], string[]][] = [
    ['empty arrays', [[], []], []],
    ['a filled, and an empty array', [[], ['a', 'b', 'c', 'd']], ['a', 'b', 'c', 'd']],
    ['two simple arrays', [['a'], ['b', 'c']], ['a', 'b', 'c']],
    [
      'two arrays',
      [
        ['a', 'b', 'c', 'd'],
        ['b', 'd', 'e'],
      ],
      ['a', 'b', 'c', 'd', 'e'],
    ],
  ];

  it.each(testCases)('should return the union of %s', (_name, input, expected) => {
    expect(arrayUnion(input[0], input[1])).toStrictEqual(expected);
  });
});
