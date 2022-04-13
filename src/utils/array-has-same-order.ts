/**
 * Test if two arrays contain the same entries in the same order.
 */
export function arrayHasSameOrder<T extends string | number>(arrA: T[], arrB: T[]): boolean {
  if (!Array.isArray(arrA) || !Array.isArray(arrB) || arrA.length !== arrB.length) {
    return false;
  }
  return arrA.every((value, index) => value === arrB[index]);
}
