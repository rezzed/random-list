import { sortArray } from '../sort-array';

describe('sortArray', () => {
  const testCases: [string, string[], string[]][] = [
    ['an empty array', [''], ['']],
    [
      'an array with only latin characters',
      ['ccc', 'aaa', 'bbb', 'AAA'],
      ['aaa', 'AAA', 'bbb', 'ccc'],
    ],
    [
      'an array with umlauts',
      ['aaa', 'sss', 'bbb', 'äää', 'ßßß', 'AAA'],
      ['aaa', 'äää', 'AAA', 'bbb', 'sss', 'ßßß'],
    ],
  ];

  it.each(testCases)('should return a sorted array for %s', (_name, input, expected) => {
    expect(sortArray(input)).toStrictEqual(expected);
  });

  it('should copy the array', () => {
    const arr = [] as string[];
    expect(sortArray(arr)).not.toBe(arr);
  });

  it.each([
    ['empty string', '' as unknown as string[]],
    ['null', null as unknown as string[]],
    ['undefined', undefined as unknown as string[]],
  ])('should return an empty array for invalid input like "%s"', (_name, input) => {
    expect(sortArray(input)).toStrictEqual([]);
  });
});
