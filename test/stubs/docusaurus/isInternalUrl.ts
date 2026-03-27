export default function isInternalUrl(url: string): boolean {
  return url.startsWith('/');
}
