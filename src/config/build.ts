export function resolveBuildSettings(env: Record<string, string | undefined>, fallbackBase = './') {
  const cloudflare = env.CF_PAGES === '1'
  const base = env.VITE_BASE_PATH?.trim() || (cloudflare ? '/' : fallbackBase)
  const siteUrl = env.VITE_SITE_URL?.trim() || undefined
  if (cloudflare && base !== '/')
    throw new Error('Cloudflare Pages uses a root domain. Set VITE_BASE_PATH=/ or leave it unset.')
  if (cloudflare && siteUrl && new URL(siteUrl).pathname !== '/')
    throw new Error('Cloudflare VITE_SITE_URL must be the root homepage URL, without a subpath.')
  return { base, siteUrl }
}
