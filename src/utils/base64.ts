// see https://base64.guru/developers/javascript/examples/unicode-strings

/**
 * Convert a unicode string to a base64 string
 */
export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data || '')));
}

/**
 * Convert a base64 string to a unicode string
 */
export function atou(base64: string): string {
  return decodeURIComponent(escape(atob(base64 || '')));
}
