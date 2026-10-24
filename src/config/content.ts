import type {
  BrandSettings,
  DashboardTask,
  Feature,
  PricingPlan,
  SiteAction,
  WorkflowStep,
} from './types.ts'

const definePlans = (plans: PricingPlan[]): PricingPlan[] => plans

/** Default content factory keeps brand references in sync without a CMS or text substitution. */
export function createDefaultContent(brand: BrandSettings) {
  const navigation: SiteAction[] = [
    { kind: 'internal', label: 'Features', section: 'features' },
    { kind: 'internal', label: 'How it works', section: 'how-it-works' },
    { kind: 'internal', label: 'Pricing', section: 'pricing' },
    { kind: 'internal', label: 'FAQ', section: 'faq' },
  ]
  return {
    common: {
      skipLink: 'Skip to content',
      homeLabel: `${brand.name} home`,
      mainNavigation: 'Main navigation',
      mobileNavigation: 'Mobile navigation',
      footerNavigation: 'Footer navigation',
      openNavigation: 'Open navigation',
      closeNavigation: 'Close navigation',
      unavailable: 'Link not available yet.',
      contactLabel: 'Get in touch',
    },
    navigation,
    headerAction: { kind: 'demo', label: 'Get started' } as SiteAction,
    hero: {
      badge: {
        kind: 'internal',
        label: 'A little less busy. A lot more possible.',
        section: 'features',
      } as SiteAction,
      headline: ['Make room for', 'what matters.'],
      description: [
        'Your work, in harmony. Bring tasks, teams, and AI automation',
        'together — so you can focus on the work only you can do.',
      ],
      primaryAction: { kind: 'demo', label: 'Explore the demo' } as SiteAction,
      secondaryAction: {
        kind: 'internal',
        label: 'See it in action',
        section: 'product',
      } as SiteAction,
      assurances: ['No sign-up needed', 'Explore at your own pace'],
      clientAssurances: ['Browse at your own pace', 'Contact the team to learn more'],
    },
    workStrip: {
      label: 'BUILT FOR THE WAY YOU WORK',
      audiences: ['Creative minds.', 'Focused teams.', 'Big-picture thinkers.'],
      action: { kind: 'internal', label: 'Explore features', section: 'features' } as SiteAction,
    },
    features: {
      label: 'A clearer way to work',
      title: ['Less busywork.', 'More good work.'],
      description: ['Everything your team needs to move forward.', 'Nothing to get in the way.'],
      items: [
        {
          id: 'priorities',
          layout: 'priorities',
          title: ['Know what deserves your attention.'],
          description:
            'AI Task Prioritization brings urgent work into focus, balancing deadlines, dependencies, and your team’s capacity.',
          caption: 'AI TASK PRIORITIZATION',
        },
        {
          id: 'automation',
          layout: 'automation',
          title: ['Build momentum.', 'On autopilot.'],
          description:
            'Smart Workflow Automation turns the work you repeat into a flow that runs itself. Your rules, thoughtfully connected.',
          caption: 'SMART WORKFLOW AUTOMATION',
        },
        {
          id: 'collaboration',
          layout: 'collaboration',
          title: ['One team. In sync.'],
          description:
            'Team Collaboration keeps conversations, context, and decisions right beside the work.',
          caption: 'TEAM COLLABORATION',
        },
        {
          id: 'schedule',
          layout: 'schedule',
          title: ['A calendar that makes space.'],
          description:
            'Intelligent Scheduling protects your focus time and finds room for the conversations that count.',
          caption: 'INTELLIGENT SCHEDULING',
        },
        {
          id: 'insights',
          layout: 'insights',
          title: ['Progress you can see.'],
          description:
            'Productivity Insights surface patterns in your work, so you can build a healthier rhythm.',
          caption: 'PRODUCTIVITY INSIGHTS',
        },
        {
          id: 'connections',
          layout: 'connections',
          title: ['Less switching. More doing.'],
          description:
            'A Connected Workspace brings tasks, documents, and conversations into a single clear view.',
          caption: 'CONNECTED WORKSPACE',
        },
      ] satisfies Feature[],
      disclaimer:
        'Concept features shown with original sample interfaces. No external services are connected.',
      artwork: {
        priorities: {
          label: 'YOUR DAY, REORDERED',
          byline: `By ${brand.shortName.charAt(0).toUpperCase() + brand.shortName.slice(1)}`,
          rows: [
            {
              title: 'Launch the new brand',
              description: 'High impact · Due today',
              badge: 'Focus first',
            },
            { title: 'Review the creative brief', description: 'Unblocks 2 teammates', badge: '' },
            { title: 'Tidy up the project board', description: 'Flexible deadline', badge: '' },
          ],
        },
        automation: [
          { title: 'When a task is completed', label: 'Trigger' },
          { title: 'Summarize the progress', label: 'AI action' },
          { title: 'Share with the team', label: '' },
        ],
        collaboration: {
          avatar: 'AM',
          comment: 'Looks good. Let’s make it happen.',
          attribution: 'Alex · Just now',
          avatars: ['JL', 'SK', 'AM'],
          caption: 'Better, together.',
        },
        schedule: {
          days: [
            { label: 'M', day: 19 },
            { label: 'T', day: 20 },
            { label: 'W', day: 21 },
            { label: 'T', day: 22 },
            { label: 'F', day: 23 },
          ],
          selectedDay: 21,
          event: 'Time to go deep',
          time: '10:00 — 11:30',
        },
        insights: {
          label: 'YOUR FOCUS, OVER TIME',
          bars: [30, 42, 38, 58, 52, 70, 65, 85, 78, 100, 92, 110],
        },
        connections: { caption: 'Your context, connected.' },
      },
    },
    workflow: {
      label: 'From scattered to in sync',
      title: ['Your next chapter.', 'Three simple steps.'],
      description: 'A thoughtful setup. A lighter working day.',
      steps: [
        {
          id: 'connect',
          title: 'Bring it all together.',
          subtitle: 'Connect your workspace',
          text: 'Start with your tasks, notes, and conversations. Give your work a home, and your team a shared starting point.',
          icon: 'link',
        },
        {
          id: 'configure',
          title: 'Make it your own.',
          subtitle: 'Configure your workflows',
          text: 'Choose a routine, set a trigger, and decide what happens next. Start small. Refine as you go.',
          icon: 'branch',
        },
        {
          id: 'flow',
          title: 'Find your flow.',
          subtitle: 'Let AI handle repetitive tasks',
          text: 'Let the routine work take care of itself. Keep the creative decisions, big ideas, and final say.',
          icon: 'sparkles',
        },
      ] satisfies WorkflowStep[],
    },
    benefits: {
      label: 'Reclaim your working day',
      title: ['Less friction.', 'More possibility.'],
      description: 'What a little breathing room could look like.',
      items: [
        { value: '6', suffix: 'hrs', description: 'back for focused work' },
        { value: '30', suffix: '%', description: 'less repetitive admin' },
        { value: '1', suffix: '', description: 'calmer, clearer workspace' },
      ],
      disclaimer:
        'Illustrative scenarios only. These are fictional examples, not measured results or performance guarantees.',
    },
    pricing: {
      label: 'Room to grow',
      title: ['Good work starts', 'with a little space.'],
      description: 'A simple plan for every stage of your journey.',
      currencyCode: 'USD',
      locale: 'en-US',
      period: '/ month',
      monthlyLabel: 'Monthly',
      yearlyLabel: 'Yearly',
      periodLabel: 'Billing period',
      savingsLabel: 'Save up to {percent}%',
      recommendedLabel: 'A LITTLE MORE POSSIBILITY',
      includedLabel: 'A LITTLE OF WHAT’S INCLUDED',
      freeNote: 'Free concept plan · no card needed',
      freeSelection: 'Free concept plan',
      monthlyNote: 'Per workspace, billed monthly',
      yearlyNote: '{amount} per workspace, billed yearly',
      monthlySelection: '{amount} / month per workspace',
      yearlySelection: '{amount} / year per workspace',
      monthlyAnnouncement: 'Monthly billing selected.',
      yearlyAnnouncement: 'Yearly billing selected.',
      plans: definePlans([
        {
          id: 'starter',
          name: 'Starter',
          description: 'A little structure. A fresh start.',
          monthly: 0,
          yearly: 0,
          recommended: false,
          features: [
            '1 shared workspace',
            'Up to 2 teammates',
            '100 sample automations / month',
            'Essential task management',
            'Weekly productivity overview',
          ],
          action: { kind: 'demo', label: 'Explore Starter' },
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For teams finding their flow.',
          monthly: 19,
          yearly: 15,
          recommended: true,
          features: [
            'Everything in Starter',
            'Up to 10 teammates',
            '1,000 sample automations / month',
            'AI prioritization & scheduling',
            'Advanced productivity insights',
          ],
          action: { kind: 'demo', label: 'Explore Pro' },
        },
        {
          id: 'business',
          name: 'Business',
          description: 'More ambition. More possibilities.',
          monthly: 49,
          yearly: 39,
          recommended: false,
          features: [
            'Everything in Pro',
            'Unlimited teammates',
            '10,000 sample automations / month',
            'Custom workflow templates',
            'Workspace roles & controls',
          ],
          action: { kind: 'demo', label: 'Explore Business' },
        },
      ]),
      disclaimer:
        'Fictional pricing for this portfolio concept. Every plan opens a local demo. No subscription or payment is created.',
      clientDisclaimer:
        'Pricing and plan details are provided for comparison. Follow the configured destination to discuss a plan; this website does not process payments.',
    },
    faq: {
      label: 'A little more clarity',
      title: ['Good questions.', 'Clear answers.'],
      description: 'A few things you might be wondering about.',
      action: { kind: 'internal', label: 'Take a closer look', section: 'product' } as SiteAction,
      clientItems: [
        {
          question: 'How can I discuss a plan?',
          answer:
            'Follow a configured plan destination or contact link to ask about the right next step. An unavailable link is labeled clearly. No subscription is created on this website.',
        },
        {
          question: 'Does this website process payments?',
          answer:
            'No. This is a static marketing website. Prices are informational; payment processing, accounts and product access must be provided separately by the business.',
        },
        {
          question: 'What happens when I follow a contact link?',
          answer:
            'Email links open your email application with a draft. You choose whether to send it. External links take you to the destination configured by the site owner.',
        },
      ],
      items: [
        {
          question: `What exactly is ${brand.name}?`,
          answer: `${brand.name} is a fictional productivity platform imagined for this frontend portfolio. It brings task prioritization, workflow automation, and team context into one considered workspace. This website demonstrates the experience; it is not an operating SaaS service.`,
        },
        {
          question: 'How does the automation demo work?',
          answer:
            'Open “Explore the demo” and run the sample weekly-update workflow. You will see how completed tasks become a concise team summary. Everything happens locally on this page, using sample data. Nothing is sent to a service or another person.',
        },
        {
          question: 'Can I connect the tools I already use?',
          answer:
            'Connected tools are part of the product concept. This portfolio does not connect to external accounts, calendars, documents, or messaging services. The interface uses original illustrative UI rather than live integrations.',
        },
        {
          question: 'Do I need a credit card to get started?',
          answer:
            'No. All buttons open a local product demonstration. Prices and plans are fictional, and there is no checkout, billing, trial subscription, or account creation.',
        },
        {
          question: 'What happens to my data?',
          answer:
            'This demo does not ask for personal information and uses no analytics, cookies, or local storage. Task selections and demo progress stay in browser memory and reset when you refresh. No data is transmitted by the demo.',
        },
        {
          question: 'Can I switch between monthly and yearly plans?',
          answer:
            'Yes. Use the billing toggle above to compare illustrative monthly prices with yearly equivalents. Yearly prices display the full annual amount below each price. Choosing a plan only previews that selection inside the local demo.',
        },
      ],
    },
    finalCta: {
      label: 'Your time is yours again',
      title: ['Less on your plate.', 'More on your horizon.'],
      description: 'Make space for the work you love doing.',
      action: { kind: 'demo', label: 'Find your flow' } as SiteAction,
      note: 'A fictional platform. A real frontend experience.',
    },
    footer: {
      tagline: 'A little clarity for a world of possibilities.',
      links: navigation,
      action: { kind: 'demo', label: 'Explore demo' } as SiteAction,
      copyright: `© 2026 ${brand.name}. ${brand.fictional ? 'A fictional company.' : ''}`.trim(),
      details: 'Designed for possibility. Built as a portfolio concept.',
      backToTop: 'Back to top ↑',
    },
    dashboard: {
      accessibleName: `Interactive sample ${brand.shortName.charAt(0).toUpperCase() + brand.shortName.slice(1)} workspace`,
      sidebarLabel: 'Illustrative workspace sidebar',
      workspaceInitial: 'S',
      workspaceName: 'Studio workspace',
      workspaceLabel: 'WORKSPACE',
      breadcrumb: 'Workspace',
      sidebar: {
        overview: 'Overview',
        tasks: 'My tasks',
        projects: 'Projects',
        calendar: 'Calendar',
        automations: 'Automations',
        team: 'Team',
      },
      user: { initials: 'JL', name: 'Jamie Lee', role: 'Demo workspace' },
      date: 'MONDAY, OCTOBER 19',
      headline: 'A little clarity. A lot of possibility.',
      description: 'Here’s where your team stands today.',
      dataLabel: 'Sample data',
      completed: {
        label: 'Tasks completed',
        baseline: 17,
        total: 24,
        note: 'On track',
        bars: [30, 50, 42, 70, 64, 85, 100],
      },
      focus: {
        label: 'Focus score',
        value: '92',
        total: '100',
        note: '↑ 12 pts this week',
        sparkline: 'M0 28 12 23 21 26 35 13 44 16 57 9 68 12 89 1',
      },
      reclaimed: {
        label: 'Time reclaimed',
        value: '6.2',
        unit: 'hrs',
        note: 'From 12 sample automations',
      },
      taskTitle: 'Your priorities',
      organizedLabel: 'AI organized',
      taskColumn: 'TASK NAME',
      priorityColumn: 'PRIORITY',
      priorities: { high: 'High', medium: 'Medium', auto: 'Auto' },
      taskFooter: 'Small steps. Meaningful progress.',
      tasks: [
        {
          id: 'brand',
          name: 'Finalize the brand direction',
          project: 'Website redesign',
          priority: 'high',
          avatar: 'JL',
          completed: false,
        },
        {
          id: 'wireframes',
          name: 'Review homepage wireframes',
          project: 'Website redesign',
          priority: 'high',
          avatar: 'AM',
          completed: false,
        },
        {
          id: 'update',
          name: 'Send the weekly team update',
          project: 'Team operations',
          priority: 'auto',
          avatar: 'NX',
          completed: true,
        },
        {
          id: 'workshop',
          name: 'Prepare discovery workshop',
          project: 'New horizons',
          priority: 'medium',
          avatar: 'SK',
          completed: false,
        },
      ] satisfies DashboardTask[],
      momentum: {
        title: 'Weekly momentum',
        period: 'This week',
        unit: 'hrs',
        fullUnit: 'hours',
        change: '+18.2%',
        key: 'Focused work',
        note: 'Illustrative overview',
        chartLabel: 'Illustrative focused work',
        bars: [
          { label: 'M', name: 'Monday', hours: 3, height: 42 },
          { label: 'T', name: 'Tuesday', hours: 5, height: 67 },
          { label: 'W', name: 'Wednesday', hours: 4, height: 54 },
          { label: 'T', name: 'Thursday', hours: 7, height: 94 },
          { label: 'F', name: 'Friday', hours: 6, height: 82 },
          { label: 'S', name: 'Saturday', hours: 4, height: 53 },
          { label: 'S', name: 'Sunday', hours: 3.5, height: 47 },
        ],
        highlightedIndex: 3,
      },
      automation: {
        title: 'A little less on your plate.',
        description: 'Turn your weekly update into a hands-free workflow.',
        action: { kind: 'demo', label: 'Try the weekly update workflow' } as SiteAction,
      },
      activity: {
        initials: 'AM',
        name: 'Alex',
        action: 'completed a review',
        time: '2 minutes ago · Sample activity',
      },
      caption: 'An illustrative workspace. Try checking off a task.',
    },
    demo: {
      tourName: 'Product tour',
      tourSelection: 'Exploring the platform',
      planSelection: '{plan} plan selected',
      workspace: 'Sample workspace',
      badge: 'LOCAL PRODUCT DEMO',
      closeLabel: 'Close demo',
      title: 'A little less busywork.',
      description:
        'Turn a week of scattered progress into one clear update. Try a sample workflow, right here.',
      steps: [
        {
          title: 'Collect completed tasks',
          description: 'Brand direction, wireframes, and creative brief',
        },
        {
          title: 'Create a weekly summary',
          description: 'Organize progress and identify next steps',
        },
        {
          title: 'Preview the team update',
          description: 'Keep the final say before anything is shared',
        },
      ],
      resultTitle: 'Sample update ready to review',
      result:
        '“This week, the team finalized the brand direction, reviewed homepage wireframes, and aligned on the creative brief. Next up: bring the new homepage to life.”',
      resultNote: 'Generated from a fixed example. Nothing was sent.',
      initialNote:
        'Run the workflow to reveal a sample update. No account or connected tools needed.',
      runLabel: 'Run sample workflow',
      resetLabel: 'Reset the demo',
      disclaimer:
        'Portfolio concept only. No live AI, data transmission, subscription, or payment.',
    },
  }
}

export type SiteContent = ReturnType<typeof createDefaultContent>
