import { assetUrl } from './assets.ts'
import { safeHttpUrl } from './actions.ts'
import type { SiteConfig } from './types.ts'

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  )
}
function safeAsset(path: string, base: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path) && !safeHttpUrl(path))
    throw new Error('Metadata asset URL must use HTTP(S) or a public asset path')
  if (path.startsWith('//') || path.includes('..') || /[<>\\]/.test(path))
    throw new Error('Metadata asset must be a safe public path or HTTP(S) URL')
  return assetUrl(path, base)
}

/** Emits real static head markup; social crawlers do not need JavaScript. */
export function metadataHtml(config: SiteConfig, base = config.deployment.base): string {
  const { seo, brand, theme } = config
  const meta = (name: string, value: string, property = false) =>
    `<meta ${property ? 'property' : 'name'}="${escapeHtml(name)}" content="${escapeHtml(value)}" />`
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta('description', seo.description),
    meta('theme-color', theme.background),
    meta('og:type', 'website', true),
    meta('og:site_name', brand.name, true),
    meta('og:title', seo.openGraphTitle, true),
    meta('og:description', seo.openGraphDescription, true),
  ]
  if (seo.favicon)
    tags.push(`<link rel="icon" href="${escapeHtml(safeAsset(seo.favicon, base))}" />`)
  if (seo.siteUrl) {
    if (!safeHttpUrl(seo.siteUrl)) throw new Error('SEO siteUrl must be an absolute HTTP(S) URL')
    tags.push(
      meta('og:url', seo.siteUrl, true),
      `<link rel="canonical" href="${escapeHtml(seo.siteUrl)}" />`,
    )
  }
  if (seo.socialImage) {
    let image = safeAsset(seo.socialImage, base)
    if (seo.siteUrl && !safeHttpUrl(image)) image = new URL(image, seo.siteUrl).href
    tags.push(meta('og:image', image, true))
  }
  tags.push(meta('twitter:card', seo.socialImage ? 'summary_large_image' : 'summary'))
  return tags.join('\n    ')
}
