import { atou, utoa } from '../base64';

describe('utoa/atou', () => {
  // UTF-8 test texts from: https://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
  const testCases = [
    ['The quick brown fox jumps over the lazy dog'],
    ['Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Wolther spillede på xylofon.'],
    ['Heizölrückstoßabdämpfung'],
    ['Ξεσκεπάζω τὴν ψυχοφθόρα βδελυγμία'],
    ['Árvíztűrő tükörfúrógép'],
    ['°^!"§$%&/()=?`'],
    ['²³{[]}\\¸´'],
    ["*+~'#"],
    ['<>|;:-,._'],
  ];

  it.each(testCases)('should be able to decode the encoded string of "%s"', (expected) => {
    expect(atou(utoa(expected))).toBe(expected);
  });

  it.each([
    ['empty string', ''],
    ['null', null as unknown as string],
    ['undefined', undefined as unknown as string],
  ])('should not fail encoding or decoding for invalid input like "%s"', (_name, input) => {
    expect(utoa(input)).toBe('');
    expect(atou(input)).toBe('');
  });
});
