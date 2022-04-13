import { inputToArray } from '../input-to-array';

describe('inputToArray', () => {
  // UTF-8 test texts from: https://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
  const testCases: [string, string[]][] = [
    ['The\nquick\nbrown\nfox', ['The', 'quick', 'brown', 'fox']],
    [
      '     \r\n     Heizöl\r\n  rückstoß \r\n  abdämpfung \r\n   ',
      ['Heizöl', 'rückstoß', 'abdämpfung'],
    ],
    ['\rΞεσκεπάζω τὴν\rψυχοφθόρα βδελυγμία    \r ', ['Ξεσκεπάζω τὴν', 'ψυχοφθόρα βδελυγμία']],
  ];

  it.each(testCases)('should split and trim the input "%s" to an array', (input, expected) => {
    expect(inputToArray(input)).toStrictEqual(expected);
  });

  it.each([
    ['empty string', ''],
    ['null', null as unknown as string],
    ['undefined', undefined as unknown as string],
  ])('should return an empty array for invalid input like "%s"', (_name, input) => {
    expect(inputToArray(input)).toStrictEqual([]);
  });

  it('should remove duplicates', () => {
    const input = ' \na \n b  \na \nb \nc\n   \na  \nc';
    const expected = ['a', 'b', 'c'];

    expect(inputToArray(input)).toStrictEqual(expected);
  });
});
