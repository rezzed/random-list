/**
 * Transform input from a textarea to an array by splitting at linebreaks,
 * trim each line and remove empty lines and duplicates.
 */
export function inputToArray(value: string): string[] {
  const arr = (value || '')
    // one entry for each line
    .split(/\r\n|\r|\n/)
    // remove leading/trailing whitespace
    .map((entry) => entry.trim())
    // remove empty lines
    .filter((entry) => entry);
  if (arr.length) {
    // remove duplicates
    return [...new Set(arr)];
  }
  return [];
}
