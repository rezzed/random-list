import { arrayToHash, hashToArray } from '../array-to-hash';

describe('arrayToHash/hashToArray', () => {
  // UTF-8 test texts from: https://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
  const testCases: [string, string[]][] = [
    ['english', ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']],
    [
      'danish',
      [
        'Quizdeltagerne',
        'spiste',
        'jordbær',
        'med',
        'fløde,',
        'mens',
        'cirkusklovnen',
        'Wolther',
        'spillede',
        'på',
        'xylofon.',
      ],
    ],
    ['german', ['Heizöl', 'rückstoß', 'abdämpfung']],
    ['greek', ['Ξεσκεπάζω', 'τὴν', 'ψυχοφθόρα', 'βδελυγμία']],
    ['hungarian', ['Árvíztűrő', 'tükörfúrógép']],
    ['special', ['°^!"§$%', '&/()=?`', '²³{[]]}', '\\¸´*', "+~'", '#<>|;:-,._']],
  ];

  it.each(testCases)(
    'should be able to create and read a hash for %s characters.',
    (_name, expected) => {
      expect(hashToArray(arrayToHash(expected))).toStrictEqual(expected);
    },
  );
});

describe('arrayToHash', () => {
  it('should add a "#" as prefix', () => {
    expect(arrayToHash(['foo'])).toMatch(/^#/);
  });

  it.each([
    ['empty string', '' as unknown as string[]],
    ['empty array', []],
    ['null', null as unknown as string[]],
    ['undefined', undefined as unknown as string[]],
  ])('should return an empty string for invalid input like "%s"', (_name, input) => {
    expect(arrayToHash(input)).toBe('');
  });
});

describe('hashToArray', () => {
  it.each([
    ['empty string', ''],
    ['empty array', [] as unknown as string],
    ['null', null as unknown as string],
    ['undefined', undefined as unknown as string],
  ])('should return an empty array for invalid input like "%s"', (_name, input) => {
    expect(hashToArray(input)).toStrictEqual([]);
  });
});
