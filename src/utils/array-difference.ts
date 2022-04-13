/**
 * Return the difference from array a minus array b
 */
export function arrayDifference<T>(arrayA: T[], arrayB: T[]): T[] {
  return arrayA.filter((entry) => !arrayB.includes(entry));
}
