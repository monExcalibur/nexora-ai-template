import { createSiteConfig } from './presets.ts'

export const site = createSiteConfig({
  preset: import.meta.env.VITE_SITE_PRESET,
  demoMode: import.meta.env.VITE_DEMO_MODE,
  disabledSections: import.meta.env.VITE_DISABLED_SECTIONS,
  base: import.meta.env.VITE_BASE_PATH,
  siteUrl: import.meta.env.VITE_SITE_URL,
})
export const content = site.content
