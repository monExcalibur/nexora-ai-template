import { siteConfig } from './siteConfig.ts'
import { flowpilotConfig } from './examples/flowpilot.ts'
import type { SectionKey, SiteConfig } from './types.ts'

export interface ConfigOptions {
  preset?: string
  demoMode?: string
  disabledSections?: string
  base?: string
  siteUrl?: string
}
export function createSiteConfig(options: ConfigOptions = {}): SiteConfig {
  const preset = options.preset || 'nexora'
  if (preset !== 'nexora' && preset !== 'flowpilot')
    throw new Error(`Unknown site preset: ${preset}`)
  const config = structuredClone(preset === 'flowpilot' ? flowpilotConfig : siteConfig)
  if (options.demoMode) {
    if (options.demoMode !== 'true' && options.demoMode !== 'false')
      throw new Error('VITE_DEMO_MODE must be true or false')
    config.demoMode = options.demoMode === 'true'
  }
  for (const section of (options.disabledSections || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)) {
    if (!Object.hasOwn(config.sections, section)) throw new Error(`Unknown section: ${section}`)
    config.sections[section as SectionKey] = false
  }
  if (options.base) config.deployment.base = options.base
  if (options.siteUrl?.trim()) {
    const value = options.siteUrl.trim()
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      /\s/.test(value)
    )
      throw new Error(
        'VITE_SITE_URL must be an absolute HTTPS URL without credentials, query or fragment.',
      )
    config.seo.siteUrl = url.href.endsWith('/') ? url.href : `${url.href}/`
  }
  if (config.deployment.base !== './' && !/^\/(?:[a-z\d._~-]+\/)*$/i.test(config.deployment.base))
    throw new Error(
      'Vite base must be ./ or an absolute slash-terminated path such as /repository/',
    )
  for (const items of [
    config.content.features.items,
    config.content.workflow.steps,
    config.content.pricing.plans,
    config.content.dashboard.tasks,
  ]) {
    if (new Set(items.map((item) => item.id)).size !== items.length)
      throw new Error('Configuration item IDs must be unique within each section')
  }
  for (const plan of config.content.pricing.plans)
    if (![plan.monthly, plan.yearly].every((value) => Number.isFinite(value) && value >= 0))
      throw new Error('Prices must be finite nonnegative numbers')
  return config
}
