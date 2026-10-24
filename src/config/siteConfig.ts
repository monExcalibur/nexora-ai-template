import { createDefaultContent } from './content.ts'
import { defaultTheme } from './theme.ts'
import type { BrandSettings, SiteConfig } from './types.ts'

export const brand: BrandSettings = {
  name: 'Nexora AI',
  shortName: 'nexora',
  suffix: 'AI',
  tagline: 'Make room for what matters.',
  logo: { src: '', alt: 'Nexora AI' },
  contactEmail: '',
  socials: [],
  fictional: true,
}

export const siteConfig: SiteConfig = {
  brand,
  demoMode: true,
  demoLabel: 'Concept Template',
  sections: {
    hero: true,
    dashboard: true,
    workStrip: true,
    features: true,
    workflow: true,
    benefits: true,
    pricing: true,
    faq: true,
    finalCta: true,
  },
  content: createDefaultContent(brand),
  theme: defaultTheme,
  seo: {
    title: `${brand.name} — ${brand.tagline.replace(/\.$/, '')}`,
    description:
      'Make room for what matters. Explore Nexora AI, a fictional productivity platform that brings tasks, teams, and thoughtful automation into one workspace. A frontend portfolio demonstration.',
    openGraphTitle: `${brand.name} — ${brand.tagline}`,
    openGraphDescription:
      'A thoughtful workspace concept for tasks, teams, and AI automation. A fictional SaaS portfolio demonstration.',
    socialImage: '',
    favicon: 'favicon.svg',
    siteUrl: '',
  },
  deployment: { base: './' },
}
