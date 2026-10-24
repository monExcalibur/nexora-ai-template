import { execFileSync, spawnSync } from 'node:child_process'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { resolvePagesSettings } from './pages-settings.mjs'

export function repositoryFromOrigin(remote) {
  const match = remote
    .trim()
    .replace(/\.git$/, '')
    .match(/^(?:https:\/\/github\.com\/|git@github\.com:)([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/)
  if (!match)
    throw new Error('Set GITHUB_REPOSITORY=owner/repository or use a GitHub HTTPS/SSH origin.')
  return match[1]
}

export function targetVariables(target, env, originRepository) {
  if (target === 'github') {
    const repository = env.GITHUB_REPOSITORY || originRepository
    const defaults = resolvePagesSettings({ repository })
    const owner = repository.split('/')[0]
    const settings = resolvePagesSettings({
      repository,
      pagesBasePath: env.PAGES_BASE_PATH,
      requestedBasePath: env.VITE_BASE_PATH || '',
      pagesUrl: env.PAGES_URL || env.VITE_SITE_URL || `https://${owner}.github.io${defaults.base}`,
    })
    return { CF_PAGES: '0', VITE_BASE_PATH: settings.base, VITE_SITE_URL: settings.canonical }
  }
  if (target === 'cloudflare') {
    let siteUrl = env.VITE_SITE_URL?.trim() || ''
    if (siteUrl) {
      const url = new URL(siteUrl)
      if (
        url.protocol !== 'https:' ||
        url.username ||
        url.password ||
        url.search ||
        url.hash ||
        url.pathname !== '/' ||
        /\s/.test(siteUrl)
      )
        throw new Error(
          'Cloudflare VITE_SITE_URL must be a stable HTTPS root URL without credentials, query or fragment.',
        )
      siteUrl = url.href
    }
    return { CF_PAGES: '1', VITE_BASE_PATH: '/', VITE_SITE_URL: siteUrl }
  }
  throw new Error('Build target must be github or cloudflare.')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = fileURLToPath(new URL('../', import.meta.url))
  const target = process.argv[2]
  let repository
  if (target === 'github' && !process.env.GITHUB_REPOSITORY) {
    const origin = execFileSync('git', ['remote', 'get-url', 'origin'], {
      cwd: root,
      encoding: 'utf8',
    })
    repository = repositoryFromOrigin(origin)
  }
  const variables = targetVariables(target, process.env, repository)
  const env = { ...process.env, ...variables }
  process.stdout.write(`Building ${target} with asset base ${variables.VITE_BASE_PATH}\n`)
  for (const args of [
    [path.join(root, 'node_modules/typescript/bin/tsc'), '--noEmit'],
    [path.join(root, 'node_modules/vite/bin/vite.js'), 'build', ...process.argv.slice(3)],
  ]) {
    const result = spawnSync(process.execPath, args, { cwd: root, env, stdio: 'inherit' })
    if (result.error) throw result.error
    if (result.status !== 0) process.exit(result.status || 1)
  }
}
