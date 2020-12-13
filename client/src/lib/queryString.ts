import queryString from 'querystring';

export function parseQueryString<T extends Record<string, string | string[]>>(
  path: string,
): Partial<T> {
  const questionMarkIndex = path.indexOf('?');
  if (questionMarkIndex === -1) {
    return {};
  }
  return queryString.parse(path.substring(questionMarkIndex + 1)) as T;
}
