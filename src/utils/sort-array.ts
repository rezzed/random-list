/**
 * Returns a new sorted array.
 */
export function sortArray(arr: string[]): string[] {
  return Array.isArray(arr)
    ? arr.concat().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    : [];
}
