# Customization guide

All paths below are relative to this project's root, `nexora-ai/`. The default is the original Nexora AI demonstration. Edit configuration rather than rebuilding components. No runtime editor, CMS, backend or paid service is required.

## Configuration map

| File                               | Edit here for                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/config/siteConfig.ts`         | Default brand, demo mode, section flags, SEO, deployment base                            |
| `src/config/content.ts`            | Marketing copy, navigation, artwork labels, dashboard data, plans, FAQ and demo scenario |
| `src/config/theme.ts`              | Theme accents, surfaces, typography, borders and radii                                   |
| `src/config/types.ts`              | Public TypeScript contracts and supported action/illustration variants                   |
| `src/config/examples/flowpilot.ts` | A complete optional example with its own overrides                                       |
| `src/config/presets.ts`            | Preset selection and configuration validation                                            |
| `.env.example`                     | Optional environment overrides; copy to `.env.local` if needed                           |

`createDefaultContent(brand)` keeps repeated company references consistent. It supplies the editable base content; the FlowPilot example overrides selected sections. Environment overrides take precedence over file settings and require a Vite restart.

## 1. Change the company name

Edit the existing `brand` object in `src/config/siteConfig.ts`:

```ts
name: 'Orbit Cloud',
shortName: 'orbit',
suffix: 'Cloud',
tagline: 'A clearer way to move forward.',
```

`name` is the full accessible/company name; `shortName` and `suffix` form the visible wordmark. Default FAQ, footer, dashboard accessible name and illustration byline derive from these fields. `tagline` feeds the default SEO title and the accessible heading used when the hero is disabled. Hero line breaks are edited separately below. Update any remaining business-specific marketing and SEO copy for your client.

## 2. Replace the logo

Put a licensed logo in `public/`, for example `public/orbit-logo.svg`, then set:

```ts
logo: { src: 'orbit-logo.svg', alt: 'Orbit Cloud' },
```

Use a path relative to `public/`, not a Windows path or `/public/...`. Vite's base is applied automatically. HTTP(S) logo URLs are also supported, but local files avoid hotlink dependencies. Leave `src: ''` to retain the original inline mark. The adjacent wordmark remains configurable. Longer brands/CTA labels use a compact mobile header with the CTA retained inside the mobile menu.

## 3. Change the hero headline

In `src/config/content.ts`, edit `hero.headline` and the two description lines:

```ts
headline: ['Bring ideas together.', 'Move work forward.'],
description: [
  'One considered place for projects, people, and progress.',
  'Keep your team aligned on the work that matters.',
],
```

Headline lines after the first retain the existing accent treatment. Keep lines concise and check 320px. The description's two entries preserve the original desktop line break and flow naturally on mobile. Edit `hero.badge`, `hero.assurances`, and `hero.clientAssurances` nearby. The latter is used with demo mode off.

## 4. Update descriptions and feature cards

Edit `features.label`, `features.title`, `features.description`, and `features.items` in `src/config/content.ts`. Each feature has a unique `id`, a presentation `layout`, heading lines, description, and caption:

```ts
{
  id: 'shared-context',
  layout: 'collaboration',
  title: ['Keep the whole story close.'],
  description: 'Bring decisions and project context into one shared view.',
  caption: 'SHARED CONTEXT',
}
```

Supported layouts are `priorities`, `automation`, `collaboration`, `schedule`, `insights`, and `connections`. The first two retain the large original compositions; the others use the compact illustrations. Add/remove entries or reuse a layout with a different unique ID. Illustration text and sample values live in `features.artwork`; existing layouts intentionally share that artwork configuration. Keep the priority preview and automation diagram concise, normally three rows/nodes.

Workflow copy is in `workflow.steps` (`id`, `title`, `subtitle`, `text`, `icon`). Icons accept `link`, `branch`, or `sparkles`. Benefits use `benefits.items` (`value`, `suffix`, `description`). These arrays are editable; pricing, workflow and benefit grids adapt to their counts while retaining the original three-column default. Keep illustrative disclaimers unless you supply substantiated business results.

## 5. Modify pricing tiers

Edit `pricing.plans` in `src/config/content.ts`:

```ts
{
  id: 'growth',
  name: 'Growth',
  description: 'Room for your next chapter.',
  monthly: 24,
  yearly: 19,
  recommended: true,
  features: ['10 teammates', 'Shared workflows', 'Team insights'],
  action: { kind: 'demo', label: 'Explore Growth' },
}
```

`yearly` is the **monthly equivalent when billed annually**, so this example shows `19/month` and a full annual amount of `228`. The annual total and savings badge are calculated, not repeated in copy. Free means both values are zero. Prices must be finite nonnegative numbers. Use one recommended plan for a clear hierarchy; recommendation is not tied to the name “Pro”. Arrays can contain one, two, three or more plans.

Edit `pricing.currencyCode` (for example `EUR`) and `pricing.locale` (for example `en-IE`) for number/currency formatting. Currency symbols derive from these settings. Billing notes, period labels, feature heading and disclaimer are configured in the same object. `clientDisclaimer` is used with demo mode off. Update free-plan copy if your client's plan is not a fictional concept plan.

## 6. Change theme colors and typography

Edit `defaultTheme` in `src/config/theme.ts`:

```ts
primaryAccent: '#86dfc1',
secondaryAccent: '#83cfc3',
background: '#09110f',
surface: '#111c18',
text: '#f2f0fa',
mutedText: '#a0b7ad',
border: '#baded1',
fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
radii: { control: 7, card: 11, large: 13 },
```

Colors accept six-digit hex values. Radii accept numbers from 0 to 64 pixels. Existing radii are grouped into controls, cards, and large frames/dialogs; circles and small diagram corners retain their original geometry. Font settings use a plain CSS font stack, not a stylesheet URL. The template does not fetch fonts. For a new local font, add a properly licensed file and a normal `@font-face` declaration to `src/styles.css`.

The original palette is retained in `src/config/palette.ts`; `themeVariables()` derives related artwork/gradient/text treatments when anchors change, and passes every original value through exactly for the default theme. Normally leave the palette file alone. Status greens, priority colors, and some neutral artwork colors intentionally keep their semantic roles. Custom themes, especially light backgrounds or dark accent buttons, need a contrast/readability review; automatic derivation is not a full light-theme design system.

## 7. Replace illustrative dashboard data

Edit `dashboard` in `src/config/content.ts`. Configure workspace/user labels, date, metrics, tasks, momentum bars, sample activity, automation prompt, and the caption.

Tasks use stable IDs, separately editable names, projects, priority keys (`high`, `medium`, `auto`), avatar initials and initial `completed` state. The completed metric is `completed.baseline + checked tasks`; update `baseline` and `total` to fit the new data. Chart hours sum into the displayed total; each bar also has a percentage `height` for the preserved visual composition, a short label, and a full accessible day name.

Keep sample/illustrative labels accurate. The sidebar/search/activity remain illustrations; only task checkboxes and the configured automation action are interactive. The local workflow's scenario and fixed result are in `demo`; update its steps/result together when changing the example's story.

## 8. Add or remove FAQ questions

Edit `faq.items` in `src/config/content.ts`:

```ts
{ question: 'How does our workspace stay in sync?', answer: 'Your truthful product answer.' },
```

No component changes are needed. Native disclosures keep keyboard access and exclusive opening. `faq.clientItems` is used with demo mode off, preventing the default “all buttons open a demo” answers from becoming inaccurate. Supply real client answers for that mode. An empty active list hides the section and removes its navigation link.

## 9. Enable or disable sections

Edit `sections` in `src/config/siteConfig.ts`:

```ts
sections: {
  hero: true, dashboard: true, workStrip: true,
  features: true, workflow: true, benefits: true,
  pricing: false, faq: true, finalCta: true,
},
```

The dashboard depends on the hero. Sections with empty content arrays are omitted. Main/footer navigation removes links to hidden sections; contextual internal CTAs fall back to a visible section or the top anchor. Home/main anchors always exist. Disabling the hero retains an accessible, visually hidden H1.

For temporary previews you can also set `VITE_DISABLED_SECTIONS=pricing,faq,dashboard` in `.env.local`. Supported names are exactly those in the object above. Remove the override when done.

## 10. Change CTA destinations

All actions use `SiteAction` in `src/config/types.ts` and resolve through `src/config/actions.ts`. Set actions in `headerAction`, `hero`, `workStrip`, `pricing.plans`, `faq`, `finalCta`, `footer`, or `dashboard.automation`.

```ts
// Internal section navigation
{ kind: 'internal', label: 'Compare plans', section: 'pricing' }

// External destination supplied by your client
{ kind: 'external', label: 'Visit product', href: 'https://product.example/start', newTab: true }

// Opens an email draft, never sends it automatically
{ kind: 'contact', label: 'Discuss a project', subject: 'Website enquiry' }

// Keeps a portfolio demo but supports a client destination later
{
  kind: 'demo', label: 'Explore the demo',
  live: { kind: 'external', label: 'Get started', href: 'https://product.example/start' },
}
```

The `.example` URLs above are reserved examples; replace them with actual client destinations before using client mode. External URLs must be absolute HTTP(S), without embedded credentials. Contact uses the brand email unless an action specifies `email`. Demo actions always open the existing local workflow when demo mode is on; `live` is used only when it is off. Missing or unsafe destinations display a disabled control with “Link not available yet.” They never create an account, purchase, or fake success state.

## 11. Replace contact information and footer links

Set `brand.contactEmail` and `brand.socials` in `src/config/siteConfig.ts`:

```ts
contactEmail: 'hello@studio.example',
socials: [
  { kind: 'external', label: 'Company journal', href: 'https://studio.example/journal', newTab: true },
],
```

Replace these example addresses with real client information. Empty values keep contact/social links absent. Footer marketing, copyright, details, navigation and back-to-top text are in `content.footer`. Its default link array shares the main navigation; assign a separate array to customize it independently. Navigation labels, menu accessibility labels, and unavailable-link wording are also configurable.

## 12. Configure demo mode

Default: `demoMode: true` in `src/config/siteConfig.ts`. The footer shows the small `demoLabel` (“Concept Template”). There is no hero banner or unsolicited popup. Local tasks/demo state reset on refresh; the sample update is fixed, not generated by a live AI service.

For a client adaptation set `demoMode: false`, configure `live` destinations for demo actions, and edit `hero.clientAssurances`, `faq.clientItems`, pricing notes and marketing claims. Unconfigured actions remain safely unavailable. `brand.fictional` and fictional copy are separate from interaction mode: turning demo mode off does not make Nexora/FlowPilot a real company or validate sample metrics. Replace fictional content deliberately rather than deleting honest labels blindly.

Optional `VITE_DEMO_MODE=true` or `false` in `.env.local` overrides the file setting. These are public build options, not secret storage.

## 13. Update SEO metadata

Edit `seo` in `src/config/siteConfig.ts` (or the selected example):

```ts
seo: {
  title: 'Orbit Cloud — A clearer way forward',
  description: 'Your accurate company description.',
  openGraphTitle: 'Orbit Cloud',
  openGraphDescription: 'Your social sharing description.',
  socialImage: 'social-preview.jpg',
  favicon: 'orbit-favicon.svg',
  siteUrl: 'https://USERNAME.github.io/REPOSITORY/',
},
```

Put the referenced files in `public/`. No social preview image is bundled by default, so `socialImage: ''` omits `og:image`; do not point to a missing file. Prefer an optimized JPEG/PNG accepted by your target social platforms. An absolute HTTP(S) social image URL is supported. For local images, a configured absolute `siteUrl` makes the generated Open Graph image URL absolute. Without it, local image URLs remain relative and may not work with every crawler.

`src/config/metadata.ts` and the Vite HTML hook emit the actual title, description, Open Graph, favicon, optional canonical URL, Twitter card and theme color into `dist/index.html`. Values are escaped; this does not rely on JavaScript-only head changes. Rebuild after edits and inspect the resulting HTML. Crawler support, caching and deployed image availability still require checks on your actual host.

The public `VITE_SITE_URL` build input can override `seo.siteUrl` with a stable HTTPS homepage (no credentials, query or fragment). In Cloudflare Production use the actual root homepage; leave Preview unset with the default blank site URL. Temporary CF_PAGES_URL addresses are not used as canonical metadata. See DEPLOYMENT_GUIDE.md for environment scopes.

## 14. Run and build

Use Node **22.19+**, then:

```powershell
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
npm run preview
```

Default port: `4188`. Use `-- --port 4189` if occupied. Stop Vite servers before another `npm ci` on Windows to avoid native-module locks. `npm test` uses Node's built-in runner; no browser or paid API is needed for configuration contracts.

To try the example, copy `.env.example` to `.env.local`, set `VITE_SITE_PRESET=flowpilot`, and restart Vite. Or in a temporary PowerShell session:

```powershell
$env:VITE_SITE_PRESET='flowpilot'
npm run dev
```

Build it with `npm run build` in the same session. For POSIX shells, use `VITE_SITE_PRESET=flowpilot npm run dev` / `npm run build`. Remove the environment override or set `nexora` to return to the default; no source files need replacing. The example demonstrates changed branding, original logo, marketing copy, features, two benefit scenarios, two pricing plans, dashboard tasks and green accents.

## 15. Deploy a customized site

Default `deployment.base: './'` in `src/config/siteConfig.ts` keeps assets portable under repository subpaths. An optional `VITE_BASE_PATH=/repository/` or Vite CLI `--base /repository/` sets an explicit path. The trailing slash is required for environment/file settings.

```powershell
npm run build -- --base /repository/
npm run preview -- --port 4190 --base /repository/
```

Visit `http://127.0.0.1:4190/repository/`. Cloudflare Pages is the primary release target: CF_PAGES=1 selects root base `/`, with build command `npm run build` and output `dist`. Set `VITE_BASE_PATH=/` in its Production/Preview environment. Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for exact scoped GitHub/Cloudflare instructions.

The retained manual GitHub Pages alternative uses the canonical project `.github/workflows/deploy.yml` (shared workspace: `.github/workflows/deploy-nexora.yml`). It reads actual Pages metadata and supports preset/demo inputs. [PUBLISHING.md](PUBLISHING.md) describes activation. No remote action has been performed during release preparation.

Before presenting a client adaptation, run the regression checklist in `TEMPLATE_UPGRADE_QA.md`, including 320/375/768/1024/1440/1920 widths, configured destinations, alternative counts, image references, keyboard use, reduced motion and the built metadata. Existing layout quality is preserved, but arbitrary long copy/new assets/custom themes need their own visual review.

The current cleanup/hosting results are in [PRODUCTION_RELEASE_REPORT.md](PRODUCTION_RELEASE_REPORT.md); earlier records remain historical snapshots.
