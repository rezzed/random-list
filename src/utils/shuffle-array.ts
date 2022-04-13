/**
 * Shuffle an array using the Fisher Yates algorithm.
 * The returned array object is the same as the input, only shuffled.
 * {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle}
 */
export function shuffleArray(arr: string[]): string[] {
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr;
  }

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
}
