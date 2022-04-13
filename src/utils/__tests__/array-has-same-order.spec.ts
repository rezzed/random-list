import { arrayHasSameOrder } from '../array-has-same-order';

type TestCase = [string, (string | number)[], (string | number)[]];

describe('arrayHasSameOrder', () => {
  describe('true', () => {
    const testCases: TestCase[] = [
      ['empty', [], []],
      ['short', ['aaa'], ['aaa']],
      ['long', ['aaa', 'bbb', 'ccc', 'ddd', 'eee'], ['aaa', 'bbb', 'ccc', 'ddd', 'eee']],
      ['number', [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
      ['mixed', ['aaa', 2, 'ccc', 4, 'eee'], ['aaa', 2, 'ccc', 4, 'eee']],
    ];

    it.each(testCases)('should be true for %s arrays', (_name, arrA, arrB) => {
      expect(arrayHasSameOrder(arrA, arrB)).toBe(true);
    });
  });

  describe('false', () => {
    // prettier-ignore
    const testCases: TestCase[] = [
      ['invalid values', null as unknown as string[], null as unknown as string[]],
      ['arrays with different length #1', ['aaa', 'bbb', 'ccc'], ['aaa', 'bbb', 'ccc', 'ddd', 'eee']],
      ['arrays with different length #2', ['aaa', 'bbb', 'ccc', 'ddd', 'eee'], ['aaa', 'bbb', 'ccc']],
      ['arrays with different order', ['aaa', 'bbb', 'ccc', 'ddd', 'eee'], ['aaa', 'eee', 'ccc', 'ddd', 'bbb']],
      ['mixed arrays with different order', ['aaa', 2, 'ccc', 4, 'eee'], ['aaa', 4, 'ccc', 2, 'eee']],
    ];

    it.each(testCases)('should be false for %s', (_name, arrA, arrB) => {
      expect(arrayHasSameOrder(arrA, arrB)).toBe(false);
    });
  });
});
