import type { SiteContent } from './content.ts'

export type SectionKey =
  | 'hero'
  | 'dashboard'
  | 'workStrip'
  | 'features'
  | 'workflow'
  | 'benefits'
  | 'pricing'
  | 'faq'
  | 'finalCta'
export type SectionId =
  | 'home'
  | 'main'
  | 'product'
  | 'features'
  | 'how-it-works'
  | 'benefits'
  | 'pricing'
  | 'faq'
  | 'final-cta'
export type ClientAction =
  | { kind: 'internal'; label: string; section: SectionId }
  | { kind: 'external'; label: string; href: string; newTab?: boolean }
  | { kind: 'contact'; label: string; email?: string; subject?: string }
export type SiteAction = ClientAction | { kind: 'demo'; label: string; live?: ClientAction }
export interface BrandSettings {
  name: string
  shortName: string
  suffix: string
  tagline: string
  logo: { src: string; alt: string }
  contactEmail: string
  socials: Extract<ClientAction, { kind: 'external' }>[]
  fictional: boolean
}
export type FeatureLayout =
  'priorities' | 'automation' | 'collaboration' | 'schedule' | 'insights' | 'connections'
export interface Feature {
  id: string
  layout: FeatureLayout
  title: string[]
  description: string
  caption: string
}
export interface WorkflowStep {
  id: string
  title: string
  subtitle: string
  text: string
  icon: 'link' | 'branch' | 'sparkles'
}
export interface PricingPlan {
  id: string
  name: string
  description: string
  monthly: number
  yearly: number
  recommended: boolean
  features: string[]
  action: SiteAction
}
export interface DashboardTask {
  id: string
  name: string
  project: string
  priority: 'high' | 'medium' | 'auto'
  avatar: string
  completed: boolean
}
export interface ThemeSettings {
  primaryAccent: string
  secondaryAccent: string
  background: string
  surface: string
  text: string
  mutedText: string
  border: string
  fontFamily: string
  radii: { control: number; card: number; large: number }
}
export interface SiteConfig {
  brand: BrandSettings
  demoMode: boolean
  demoLabel: string
  sections: Record<SectionKey, boolean>
  content: SiteContent
  theme: ThemeSettings
  seo: {
    title: string
    description: string
    openGraphTitle: string
    openGraphDescription: string
    socialImage: string
    favicon: string
    siteUrl: string
  }
  deployment: { base: string }
}
