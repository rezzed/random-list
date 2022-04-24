import { toPascalCase } from '../to-pascal-case';

describe('toPascalCase', () => {
  // expected, input
  const testCases: [string, string][] = [
    ['', ''],
    ['', null as unknown as string],
    ['', undefined as unknown as string],
    ['', '123456'],
    ['Foo', 'Foo'],
    ['Foo', 'foo'],
    ['Foo', 'FOO'],
    ['FooBar', 'Foo Bar'],
    ['FooBar', 'foo bar'],
    ['FooBar', 'FOO BAR'],
    ['FooBar', 'FOO bar'],
    ['FooBar', 'Foo-Bar'],
    ['FooBar', 'foo-bar'],
    ['FooBar', 'FOO-BAR'],
    ['FooBar', 'FOO-bar'],
    // Note: PascalCase will be Capitalized!
    ['Foobar', 'FooBar'],
  ];

  it.each(testCases)('should return "%s" for "%s"', (expected, input) => {
    expect(toPascalCase(input)).toStrictEqual(expected);
  });
});
