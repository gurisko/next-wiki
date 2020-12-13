export function getUrl(url: string) {
  return new URL(url, process.env.API_URL || 'http://localhost:9001').href;
}
