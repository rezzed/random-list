/**
 * Return the union of two arrays
 */
export function arrayUnion<T>(arrayA: T[], arrayB: T[]): T[] {
  return [...new Set([...arrayA, ...arrayB])];
}
