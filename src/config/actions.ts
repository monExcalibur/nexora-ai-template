import type { SectionId, SectionKey, SiteAction, SiteConfig } from './types.ts'

const sectionKeys: Partial<Record<SectionId, SectionKey>> = {
  product: 'dashboard',
  features: 'features',
  'how-it-works': 'workflow',
  benefits: 'benefits',
  pricing: 'pricing',
  faq: 'faq',
  'final-cta': 'finalCta',
}
export function sectionVisible(key: SectionKey, config: SiteConfig): boolean {
  if (!config.sections[key]) return false
  if (key === 'dashboard') return config.sections.hero && config.content.dashboard.tasks.length > 0
  if (key === 'features') return config.content.features.items.length > 0
  if (key === 'workflow') return config.content.workflow.steps.length > 0
  if (key === 'benefits') return config.content.benefits.items.length > 0
  if (key === 'pricing') return config.content.pricing.plans.length > 0
  if (key === 'faq')
    return (config.demoMode ? config.content.faq.items : config.content.faq.clientItems).length > 0
  return true
}
export function anchorVisible(id: SectionId, config: SiteConfig): boolean {
  if (id === 'home' || id === 'main') return true
  const key = sectionKeys[id]
  return !!key && sectionVisible(key, config)
}
export function safeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password
  } catch {
    return false
  }
}
export function contactHref(email: string, subject?: string): string | null {
  if (!/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i.test(email)) return null
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}
export type ResolvedAction =
  | { kind: 'demo' }
  | { kind: 'link'; category: 'internal' | 'external' | 'contact'; href: string; newTab: boolean }
  | { kind: 'unavailable' }

export function resolveAction(action: SiteAction, config: SiteConfig): ResolvedAction {
  if (action.kind === 'demo') {
    if (config.demoMode) return { kind: 'demo' }
    return action.live ? resolveAction(action.live, config) : { kind: 'unavailable' }
  }
  if (action.kind === 'external')
    return safeHttpUrl(action.href)
      ? { kind: 'link', category: 'external', href: action.href, newTab: !!action.newTab }
      : { kind: 'unavailable' }
  if (action.kind === 'contact') {
    const href = contactHref(action.email || config.brand.contactEmail, action.subject)
    return href
      ? { kind: 'link', category: 'contact', href, newTab: false }
      : { kind: 'unavailable' }
  }
  const id = anchorVisible(action.section, config)
    ? action.section
    : ((['features', 'how-it-works', 'pricing', 'faq', 'home'] as const).find((section) =>
        anchorVisible(section, config),
      ) ?? 'home')
  return { kind: 'link', category: 'internal', href: `#${id}`, newTab: false }
}
export function visibleNavigation(actions: SiteAction[], config: SiteConfig): SiteAction[] {
  return actions.filter((action) =>
    action.kind === 'internal'
      ? anchorVisible(action.section, config)
      : resolveAction(action, config).kind !== 'unavailable',
  )
}
