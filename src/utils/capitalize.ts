/**
 * Capitalize a string e.g. "FOO" -> "Foo"
 */
export function capitalize(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
}
