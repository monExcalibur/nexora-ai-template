import { appendFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

export function resolvePagesSettings({
  repository,
  pagesBasePath,
  requestedBasePath = '',
  pagesUrl,
}) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || '')) {
    throw new Error('A valid owner/repository is required.')
  }
  const [owner, name] = repository.split('/')
  const repositoryBase =
    name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${name}/`
  const configuredBase =
    pagesBasePath === undefined ? repositoryBase : `${pagesBasePath.replace(/\/$/, '')}/`
  const base = requestedBasePath.trim() || configuredBase
  if (
    !/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(base) ||
    base.split('/').some((segment) => segment === '.' || segment === '..')
  ) {
    throw new Error('The base must be / or a repository subpath with leading and trailing slashes.')
  }
  if (pagesBasePath !== undefined && base !== configuredBase) {
    throw new Error(
      'The requested base differs from GitHub Pages. Leave it empty or configure the custom domain in Pages first.',
    )
  }
  let canonical
  if (pagesUrl) {
    const url = new URL(pagesUrl)
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      /\s/.test(pagesUrl)
    ) {
      throw new Error(
        'The public Pages URL must be an absolute HTTPS URL without credentials, query or fragment.',
      )
    }
    if (`${url.pathname.replace(/\/$/, '')}/` !== base)
      throw new Error('The Pages URL path and asset base do not agree.')
    canonical = url.href.endsWith('/') ? url.href : `${url.href}/`
  }
  return { base, canonical }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const settings = resolvePagesSettings({
    repository: process.env.GITHUB_REPOSITORY,
    pagesBasePath: process.env.PAGES_BASE_PATH,
    requestedBasePath: process.env.REQUESTED_BASE_PATH,
    pagesUrl: process.env.PAGES_URL,
  })
  if (!process.env.GITHUB_ENV || !settings.canonical)
    throw new Error('Run this helper in GitHub Actions with Pages metadata and GITHUB_ENV.')
  await appendFile(
    process.env.GITHUB_ENV,
    `VITE_BASE_PATH=${settings.base}\nVITE_SITE_URL=${settings.canonical}\n`,
  )
  process.stdout.write(`Static base: ${settings.base}\nCanonical: ${settings.canonical}\n`)
}
