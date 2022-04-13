import { arrayDifference } from '@/utils/array-difference';

/**
 * Return a new array without value -- or any entry in value.
 */
export function arrayWithout<T>(arr: T[] | undefined | null, value: T | T[]): T[] {
  if (!arr) {
    return [];
  }
  if (Array.isArray(value)) {
    return arrayDifference(arr, value);
  }
  return arr.filter((entry) => entry !== value);
}
