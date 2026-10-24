import { createDefaultContent } from '../content.ts'
import { defaultTheme } from '../theme.ts'
import type { BrandSettings, SiteConfig } from '../types.ts'

const brand: BrandSettings = {
  name: 'FlowPilot',
  shortName: 'FlowPilot',
  suffix: '',
  tagline: 'Good plans. Great momentum.',
  logo: { src: 'flowpilot.svg', alt: 'FlowPilot' },
  contactEmail: '',
  socials: [],
  fictional: true,
}
const defaults = createDefaultContent(brand)

/** Optional example only. All external .example destinations are reserved illustrative URLs. */
export const flowpilotConfig: SiteConfig = {
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
  theme: {
    ...defaultTheme,
    primaryAccent: '#86dfc1',
    secondaryAccent: '#83cfc3',
    background: '#09110f',
    surface: '#111c18',
    mutedText: '#a0b7ad',
    border: '#baded1',
  },
  content: {
    ...defaults,
    headerAction: {
      kind: 'demo',
      label: 'Explore FlowPilot',
      live: {
        kind: 'contact',
        label: 'Discuss your workspace',
        subject: 'FlowPilot project enquiry',
      },
    },
    hero: {
      ...defaults.hero,
      headline: ['Good plans.', 'Better flow.'],
      description: [
        'Give every project a clear direction and every teammate a shared view.',
        'Plan thoughtful releases, keep decisions close, and move forward together.',
      ],
      badge: { kind: 'internal', label: 'Clarity for the next great thing.', section: 'features' },
      primaryAction: {
        kind: 'demo',
        label: 'Explore FlowPilot',
        live: {
          kind: 'external',
          label: 'Visit sample destination',
          href: 'https://flowpilot.example/product',
          newTab: true,
        },
      },
    },
    features: {
      ...defaults.features,
      label: 'A shared sense of direction',
      title: ['Plan with purpose.', 'Move as one.'],
      description: [
        'A considered home for ambitious projects.',
        'From the first idea to the next release.',
      ],
      items: defaults.features.items.map((feature, index) => ({
        ...feature,
        title: [
          ['A clear view of what comes next.'],
          ['Keep every handoff moving.'],
          ['Keep decisions in context.'],
          ['Protect the time to create.'],
          ['A healthier project rhythm.'],
          ['One shared source of context.'],
        ][index],
        description: [
          'Turn a crowded backlog into a focused release plan, with clear priorities and owners.',
          'Bring repeatable project routines into one understandable flow, without losing human oversight.',
          'Give conversations a lasting home beside the work, so decisions stay easy to find.',
          'Plan realistic milestones while leaving space for deep work and thoughtful collaboration.',
          'Spot bottlenecks and learn from your project rhythm using clear, illustrative insights.',
          'Keep briefs, task lists and team conversations close, so the next step is always clear.',
        ][index],
        caption: [
          'RELEASE PLANNING',
          'THOUGHTFUL HANDOFFS',
          'SHARED DECISIONS',
          'REALISTIC SCHEDULING',
          'PROJECT INSIGHTS',
          'CONNECTED CONTEXT',
        ][index],
      })),
    },
    benefits: {
      ...defaults.benefits,
      title: ['More direction.', 'Less drift.'],
      items: [
        { value: '3', suffix: '', description: 'clear project milestones' },
        { value: '1', suffix: '', description: 'shared release plan' },
      ],
    },
    pricing: {
      ...defaults.pricing,
      title: ['A thoughtful plan.', 'Room for your next idea.'],
      plans: [
        {
          id: 'solo',
          name: 'Solo',
          description: 'A clear start for independent makers.',
          monthly: 12,
          yearly: 9,
          recommended: false,
          features: [
            '3 active projects',
            'Personal release planning',
            '100 sample workflow runs',
            'Essential project insights',
          ],
          action: {
            kind: 'demo',
            label: 'Explore Solo',
            live: { kind: 'internal', label: 'Review the approach', section: 'how-it-works' },
          },
        },
        {
          id: 'team',
          name: 'Team',
          description: 'Shared direction for focused teams.',
          monthly: 29,
          yearly: 23,
          recommended: true,
          features: [
            'Unlimited concept projects',
            'Up to 15 teammates',
            '1,000 sample workflow runs',
            'Shared milestones and context',
          ],
          action: {
            kind: 'demo',
            label: 'Explore Team',
            live: { kind: 'contact', label: 'Discuss Team', subject: 'FlowPilot Team plan' },
          },
        },
      ],
    },
    dashboard: {
      ...defaults.dashboard,
      workspaceName: 'Product team',
      headline: 'Your next release starts with clarity.',
      tasks: [
        {
          id: 'scope',
          name: 'Define the release scope',
          project: 'Autumn release',
          priority: 'high',
          avatar: 'JL',
          completed: false,
        },
        {
          id: 'review',
          name: 'Review the project brief',
          project: 'Autumn release',
          priority: 'high',
          avatar: 'AM',
          completed: false,
        },
        {
          id: 'update',
          name: 'Prepare the release update',
          project: 'Team operations',
          priority: 'auto',
          avatar: 'FP',
          completed: true,
        },
        {
          id: 'milestones',
          name: 'Map the next milestones',
          project: 'Product planning',
          priority: 'medium',
          avatar: 'SK',
          completed: false,
        },
      ],
    },
    demo: {
      ...defaults.demo,
      title: 'A clearer release update.',
      steps: [
        {
          title: 'Collect release progress',
          description: 'Scope, project brief, and upcoming milestones',
        },
        ...defaults.demo.steps.slice(1),
      ],
      result:
        '“The team aligned on the release scope, reviewed the project brief, and mapped the next milestones. Next up: turn the plan into a focused release.”',
    },
    footer: { ...defaults.footer, tagline: 'Shared direction. Thoughtful progress.' },
  },
  seo: {
    title: 'FlowPilot — Good plans. Great momentum.',
    description:
      'FlowPilot is a fictional project-planning SaaS example built with the configurable Nexora template.',
    openGraphTitle: 'FlowPilot — A clearer way forward',
    openGraphDescription:
      'A project-planning SaaS template variation. Fictional demonstration content.',
    favicon: 'flowpilot.svg',
    socialImage: '',
    siteUrl: '',
  },
  deployment: { base: './' },
}
