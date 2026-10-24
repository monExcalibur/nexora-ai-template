import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveBuildSettings } from '../src/config/build.ts'
import { createSiteConfig } from '../src/config/presets.ts'
import { metadataHtml } from '../src/config/metadata.ts'

test('Cloudflare defaults to root assets and never derives a canonical from temporary preview URLs', () => {
  const build = resolveBuildSettings({ CF_PAGES: '1', CF_PAGES_URL: 'https://temporary.example/' })
  assert.deepEqual(build, { base: '/', siteUrl: undefined })
  const html = metadataHtml(createSiteConfig({ siteUrl: build.siteUrl }), build.base)
  assert.ok(html.includes('href="/favicon.svg"'))
  assert.ok(!html.includes('rel="canonical"'))
  assert.ok(!html.includes('temporary.example'))
})

test('Cloudflare rejects repository paths in asset bases and production homepage URLs', () => {
  for (const base of ['./', '/nexora-ai/', 'https://cdn.example/'])
    assert.throws(
      () => resolveBuildSettings({ CF_PAGES: '1', VITE_BASE_PATH: base }),
      /root domain/,
    )
  assert.throws(
    () => resolveBuildSettings({ CF_PAGES: '1', VITE_SITE_URL: 'https://site.example/repo/' }),
    /without a subpath/,
  )
})

test('root production metadata, configured local bases and explicit GitHub subpaths stay independent', () => {
  const build = resolveBuildSettings({ CF_PAGES: '1', VITE_SITE_URL: 'https://site.example/' })
  const html = metadataHtml(createSiteConfig({ siteUrl: build.siteUrl }), build.base)
  assert.ok(html.includes('href="https://site.example/"'))
  assert.ok(!html.includes('og:image'))
  assert.deepEqual(resolveBuildSettings({}), { base: './', siteUrl: undefined })
  assert.equal(resolveBuildSettings({}, '/configured/').base, '/configured/')
  assert.deepEqual(
    resolveBuildSettings({
      VITE_BASE_PATH: '/nexora-ai/',
      VITE_SITE_URL: 'https://maker.github.io/nexora-ai/',
    }),
    { base: '/nexora-ai/', siteUrl: 'https://maker.github.io/nexora-ai/' },
  )
})

test('public URL override is normalized, validates unsafe inputs and leaves source presets unchanged', () => {
  assert.equal(
    createSiteConfig({ siteUrl: 'https://site.example' }).seo.siteUrl,
    'https://site.example/',
  )
  assert.equal(createSiteConfig().seo.siteUrl, '')
  for (const siteUrl of [
    'http://site.example',
    'https://user:secret@site.example',
    'https://site.example?q=1',
    'https://site.example/#x',
    'https://site.example/a b',
    'relative',
  ])
    assert.throws(() => createSiteConfig({ siteUrl }))
})

test('a configured social image resolves correctly with a root or repository URL', () => {
  for (const [base, siteUrl] of [
    ['/', 'https://site.example/'],
    ['/nexora-ai/', 'https://maker.github.io/nexora-ai/'],
  ]) {
    const config = createSiteConfig({ base, siteUrl })
    config.seo.socialImage = 'share.jpg'
    assert.ok(metadataHtml(config, base).includes(`content="${siteUrl}share.jpg"`))
  }
})
