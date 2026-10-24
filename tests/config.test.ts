import assert from 'node:assert/strict'
import { test } from 'node:test'
import { siteConfig } from '../src/config/siteConfig.ts'
import { createDefaultContent } from '../src/config/content.ts'
import { paletteSeeds } from '../src/config/palette.ts'
import { defaultTheme, themeVariables } from '../src/config/theme.ts'
import { billingText, savingsPercent } from '../src/config/pricing.ts'
import {
  anchorVisible,
  contactHref,
  resolveAction,
  safeHttpUrl,
  visibleNavigation,
} from '../src/config/actions.ts'
import { createSiteConfig } from '../src/config/presets.ts'
import { metadataHtml } from '../src/config/metadata.ts'

test('SEO is static, escaped, base-aware and omits absent social images', () => {
  const html = metadataHtml(siteConfig, '/repository/')
  assert.ok(html.includes('<title>Nexora AI — Make room for what matters</title>'))
  assert.ok(html.includes('property="og:title"'))
  assert.ok(html.includes('href="/repository/favicon.svg"'))
  assert.ok(!html.includes('property="og:image"'))
  const custom = structuredClone(siteConfig)
  custom.seo.title = '<script>bad()</script> & "title"'
  custom.seo.description = '" onload="bad()'
  const escaped = metadataHtml(custom)
  assert.ok(!escaped.includes('<script>'))
  assert.ok(escaped.includes('&lt;script&gt;'))
  assert.ok(escaped.includes('&quot; onload=&quot;bad()'))
})
test('SEO resolves local social images with a site URL and rejects unsafe asset URLs', () => {
  const custom = structuredClone(siteConfig)
  custom.seo.siteUrl = 'https://studio.example/portfolio/'
  custom.seo.socialImage = 'social.jpg'
  assert.ok(metadataHtml(custom).includes('https://studio.example/portfolio/social.jpg'))
  custom.seo.favicon = 'javascript:alert(1)'
  assert.throws(() => metadataHtml(custom))
})

test('hidden sections remove navigation and dependent CTA anchors safely', () => {
  const config = createSiteConfig({ disabledSections: 'hero,pricing,faq,features,workflow' })
  assert.equal(anchorVisible('product', config), false)
  assert.equal(visibleNavigation(config.content.navigation, config).length, 0)
  assert.deepEqual(resolveAction(config.content.hero.secondaryAction, config), {
    kind: 'link',
    category: 'internal',
    href: '#home',
    newTab: false,
  })
  assert.throws(() => createSiteConfig({ disabledSections: 'not-a-section' }))
})
test('FlowPilot is a complete independent typed variation while Nexora stays default', () => {
  const example = createSiteConfig({ preset: 'flowpilot', demoMode: 'false', base: '/portfolio/' })
  assert.equal(example.brand.name, 'FlowPilot')
  assert.equal(example.content.pricing.plans.length, 2)
  assert.equal(example.content.benefits.items.length, 2)
  assert.equal(example.demoMode, false)
  assert.notEqual(example.theme.primaryAccent, siteConfig.theme.primaryAccent)
  assert.equal(createSiteConfig().brand.name, 'Nexora AI')
  assert.equal(createSiteConfig().demoMode, true)
  assert.throws(() => createSiteConfig({ preset: 'typo' }))
  assert.throws(() => createSiteConfig({ demoMode: 'yes' }))
  assert.throws(() => createSiteConfig({ base: '/missing-trailing-slash' }))
})

test('demo actions are local by default and use client destinations only with demo mode off', () => {
  const action = {
    kind: 'demo',
    label: 'Explore',
    live: { kind: 'external', label: 'Visit product', href: 'https://product.example/start' },
  } as const
  assert.equal(resolveAction(action, siteConfig).kind, 'demo')
  assert.deepEqual(resolveAction(action, { ...siteConfig, demoMode: false }), {
    kind: 'link',
    category: 'external',
    href: 'https://product.example/start',
    newTab: false,
  })
  assert.equal(
    resolveAction({ kind: 'demo', label: 'Explore' }, { ...siteConfig, demoMode: false }).kind,
    'unavailable',
  )
})
test('external/contact actions reject unsafe protocols, credentials and email injection', () => {
  for (const href of [
    'javascript:alert(1)',
    'data:text/html,test',
    '//example.com',
    'https://user:pass@example.com',
  ])
    assert.equal(safeHttpUrl(href), false)
  assert.equal(
    resolveAction({ kind: 'external', label: 'Bad', href: 'javascript:alert(1)' }, siteConfig).kind,
    'unavailable',
  )
  assert.equal(
    contactHref('hello@example.com', 'A & B'),
    'mailto:hello@example.com?subject=A%20%26%20B',
  )
  assert.equal(contactHref('hello@example.com?bcc=other@example.com'), null)
  assert.equal(contactHref(''), null)
  assert.equal(resolveAction({ kind: 'contact', label: 'Contact' }, siteConfig).kind, 'unavailable')
})

test('default theme preserves every original color treatment exactly', () => {
  const variables = themeVariables(defaultTheme)
  for (const seed of paletteSeeds) assert.equal(variables[seed.name], seed.value)
})
test('theme customization changes artwork and rejects unsafe CSS values', () => {
  const variables = themeVariables({
    ...defaultTheme,
    primaryAccent: '#70d9bd',
    secondaryAccent: '#68cdbd',
  })
  assert.notEqual(variables['--paint-ad96ff'], defaultTheme.primaryAccent)
  assert.throws(() => themeVariables({ ...defaultTheme, primaryAccent: 'red;}</style>' }))
  assert.throws(() => themeVariables({ ...defaultTheme, fontFamily: '</style><script>' }))
})
test('changing the brand updates default FAQ, footer and illustration references', () => {
  const copy = createDefaultContent({
    ...siteConfig.brand,
    name: 'Example Cloud',
    shortName: 'example',
  })
  assert.ok(copy.faq.items[0].question.includes('Example Cloud'))
  assert.ok(copy.footer.copyright.includes('Example Cloud'))
  assert.equal(copy.features.artwork.priorities.byline, 'By Example')
})
test('billing uses configured prices, recommendation-independent data and truthful annual totals', () => {
  const pricing = siteConfig.content.pricing
  assert.equal(savingsPercent(pricing.plans), 21)
  assert.equal(billingText(pricing.plans[1], true, pricing), '$180 per workspace, billed yearly')
  assert.equal(billingText(pricing.plans[2], true, pricing, true), '$468 / year per workspace')
  const custom = { ...pricing.plans[1], name: 'Custom', monthly: 12.5, yearly: 10 }
  assert.equal(billingText(custom, true, pricing), '$120 per workspace, billed yearly')
  assert.equal(savingsPercent([]), 0)
})
