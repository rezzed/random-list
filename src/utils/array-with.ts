import { arrayUnion } from '@/utils/array-union';

/**
 * Return a new array without value -- or any entry in value.
 */
export function arrayWith<T>(arr: T[] | undefined | null, value: T | T[]): T[] {
  if (!arr) {
    return Array.isArray(value) ? [...value] : [value];
  }
  if (Array.isArray(value)) {
    return arrayUnion(arr, value);
  }
  return arr.includes(value) ? [...arr] : [...arr, value];
}
