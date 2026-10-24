/** Public assets are relative to Vite's base, including repository subpaths. */
export function assetUrl(path: string, base = './'): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\/+/, '')}`
}
