import { atou, utoa } from '@/utils/base64';

/**
 * Convert a unicode string array to a base64 string to use as hash in the url.
 * Adds a leading '#'.
 * If the array is empty or invalid, an empty string will be returned.
 */
export function arrayToHash(arr: string[]): string {
  if (!arr || !Array.isArray(arr) || !arr.length) {
    return '';
  }
  return '#' + utoa(JSON.stringify(arr));
}

/**
 * Convert a base64 string used as hash in the url to a unicode string array.
 * Removes a leading '#'.
 * If the string is empty or invalid and cannot be parsed, an empty array will be returned.
 */
export function hashToArray(hash: string): string[] {
  if (!hash || hash === '#') {
    return [];
  }
  try {
    const base64 = hash.indexOf('#') === 0 ? hash.slice(1) : hash;
    const value = JSON.parse(atou(base64));
    if (Array.isArray(value)) {
      return value;
    }
  } catch {
    // ignore
  }
  return [];
}
