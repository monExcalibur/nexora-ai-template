import test from 'node:test'
import assert from 'node:assert/strict'
import { repositoryFromOrigin, targetVariables } from '../scripts/build-target.mjs'

test('GitHub named build derives owner/repository without a hardcoded account', () => {
  assert.equal(
    repositoryFromOrigin('https://github.com/Owner/custom-template.git'),
    'Owner/custom-template',
  )
  assert.equal(
    repositoryFromOrigin('git@github.com:Owner/custom-template.git'),
    'Owner/custom-template',
  )
  assert.throws(() => repositoryFromOrigin('https://other.example/Owner/repo.git'))
  assert.deepEqual(targetVariables('github', {}, 'Owner/custom-template'), {
    CF_PAGES: '0',
    VITE_BASE_PATH: '/custom-template/',
    VITE_SITE_URL: 'https://owner.github.io/custom-template/',
  })
})

test('GitHub uses authoritative Pages metadata for a configured custom domain', () => {
  assert.deepEqual(
    targetVariables('github', {
      GITHUB_REPOSITORY: 'maker/template',
      PAGES_BASE_PATH: '',
      PAGES_URL: 'https://studio.example',
      VITE_BASE_PATH: '/',
      CF_PAGES: '1',
    }),
    { CF_PAGES: '0', VITE_BASE_PATH: '/', VITE_SITE_URL: 'https://studio.example/' },
  )
  assert.equal(
    targetVariables('github', { GITHUB_REPOSITORY: 'Owner/owner.github.io' }).VITE_BASE_PATH,
    '/',
  )
})

test('GitHub rejects incorrect inherited bases and URL paths', () => {
  assert.throws(() =>
    targetVariables('github', { GITHUB_REPOSITORY: 'maker/template', VITE_BASE_PATH: '/' }),
  )
  assert.throws(() =>
    targetVariables('github', {
      GITHUB_REPOSITORY: 'maker/template',
      PAGES_BASE_PATH: '/template',
      VITE_SITE_URL: 'https://maker.github.io/other/',
    }),
  )
  assert.throws(() => targetVariables('github', {}))
})

test('Cloudflare named build isolates root assets and never guesses a preview canonical', () => {
  assert.deepEqual(
    targetVariables('cloudflare', {
      VITE_BASE_PATH: '/github-repo/',
      CF_PAGES_URL: 'https://temporary.example/',
    }),
    { CF_PAGES: '1', VITE_BASE_PATH: '/', VITE_SITE_URL: '' },
  )
  assert.equal(
    targetVariables('cloudflare', { VITE_SITE_URL: 'https://site.example' }).VITE_SITE_URL,
    'https://site.example/',
  )
})

test('Cloudflare rejects unsafe/non-root production origins and unknown targets', () => {
  for (const VITE_SITE_URL of [
    'http://site.example/',
    'https://user:password@site.example/',
    'https://site.example/repo/',
    'https://site.example/?x=1',
    'https://site.example/#x',
  ])
    assert.throws(() => targetVariables('cloudflare', { VITE_SITE_URL }))
  assert.throws(() => targetVariables('unknown', {}))
})
