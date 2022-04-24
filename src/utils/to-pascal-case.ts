/**
 * Turn a string to PascalCase e.g. "FOO bar" -> "FooBar"
 */
import { capitalize } from '@/utils/capitalize';

export function toPascalCase(value: string) {
  if (!value) {
    return '';
  }
  const matches = value.match(/[a-z]+/gi);
  return matches ? matches.map(capitalize).join('') : '';
}
