import { shuffleArray } from '../shuffle-array';

describe('shuffleArray', () => {
  // for correct types
  let mockedRandom = vi.spyOn(Math, 'random');

  beforeEach(() => {
    mockedRandom = vi.spyOn(Math, 'random');
  });

  it('should return the same array', () => {
    let arr = [] as string[];
    expect(shuffleArray(arr)).toBe(arr);

    arr = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
    expect(shuffleArray(arr)).toBe(arr);
  });

  it.each([
    [0, ['aaa', 'bbb'], ['bbb', 'aaa']],
    [0.25, ['aaa', 'bbb'], ['bbb', 'aaa']],
    [0.49, ['aaa', 'bbb'], ['bbb', 'aaa']],
    // --------------------------------
    [0.5, ['aaa', 'bbb'], ['aaa', 'bbb']],
    [0.75, ['aaa', 'bbb'], ['aaa', 'bbb']],
    [0.99, ['aaa', 'bbb'], ['aaa', 'bbb']],
  ])(
    'should be able to "shuffle" two values and create the expected result for "random" value "%s"',
    (randValue, arr, expected) => {
      mockedRandom.mockReturnValue(randValue);
      expect(shuffleArray(arr)).toStrictEqual(expected);
    },
  );

  it('should be able to "shuffle" long arrays', () => {
    mockedRandom.mockReturnValue(0);
    const arr = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
    const expected = ['bbb', 'ccc', 'ddd', 'eee', 'aaa'];

    expect(shuffleArray(arr)).toStrictEqual(expected);
  });

  it.each([
    ['empty string', '' as unknown as string[]],
    ['empty array', []],
    ['array with only one item', ['aaa']],
    ['null', null as unknown as string[]],
    ['undefined', undefined as unknown as string[]],
  ])('should return the input for invalid input like "%s"', (_name, input) => {
    expect(shuffleArray(input)).toStrictEqual(input);
  });
});
