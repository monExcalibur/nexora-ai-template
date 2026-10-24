# Nexora AI

A premium SaaS landing page template built with React and TypeScript. It combines a custom productivity dashboard, varied feature illustrations and a typed customization system. Nexora AI and the optional FlowPilot example are fictional concept brands.

![Nexora AI desktop concept preview](qa/release-desktop.jpg)

[Mobile preview](qa/release-mobile.jpg) · [Customization](CUSTOMIZATION_GUIDE.md) · [Deployment](DEPLOYMENT_GUIDE.md) · [Release report](PRODUCTION_RELEASE_REPORT.md)

## Features

- Responsive dark layout with local CSS/SVG artwork and subtle motion.
- Interactive task checkboxes, monthly/yearly pricing and calculated annual totals.
- Native FAQ disclosures, mobile navigation and keyboard-accessible workflow demo.
- Typed branding, content, theme, pricing, actions, SEO and section visibility.
- Optional FlowPilot preset with green accents, custom logo and two plans.
- Static head metadata and portable, Cloudflare or GitHub Pages asset paths.

**Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4 and Lucide. ESLint, Prettier and Node's test runner provide checks. YAML is development-only workflow validation.

## Local setup

Use Node 22.19+ and npm. The configured build line is Node 22. In the directory containing `package.json`:

```sh
git clone https://github.com/monExcalibur/nexora-ai-template.git
cd nexora-ai-template
npm ci
npm run dev
```

Open [localhost:4188](http://127.0.0.1:4188/). If occupied, use `npm run dev -- --port 4189`. Use HTTP rather than opening `index.html` directly. Stop owned Vite processes before reinstalling on Windows to avoid native-module locks.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run typecheck` | Strict TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Configuration, palette, pricing, action, metadata and deployment contracts |
| `npm run format:check` | Formatting check (`npm run format` applies it) |
| `npm run audit:publication` | Credential-pattern and local-asset audit |
| `npm run build` | Portable local production build in `dist/` |
| `npm run build:github` | Repository-subpath production build |
| `npm run build:cloudflare` | Root-hosted Cloudflare production build |
| `npm run preview` | Inspect the production build locally |

## Customization

Edit `src/config/siteConfig.ts` for branding, sections, demo mode, SEO and the local deployment default; `content.ts` for copy, plans, dashboard data and FAQ; `theme.ts` for accents, surfaces, typography and radii. `actions.ts` classifies internal, external, contact and demo actions. The original palette is preserved; a complete light-theme conversion is not promised.

[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) covers all supported fields. Select `VITE_SITE_PRESET=flowpilot` for the example. Copy `.env.example` to ignored `.env.local` for local overrides and restart Vite. Never store secrets in `VITE_*`; those values are public build inputs.

## Deployment

Both production demonstrations are published and verified over HTTPS on 2026-10-24:

| Destination | Public address |
| --- | --- |
| Source repository | [nexora-ai-template](https://github.com/monExcalibur/nexora-ai-template) |
| GitHub Pages | [https://monexcalibur.github.io/nexora-ai-template/](https://monexcalibur.github.io/nexora-ai-template/) |
| Cloudflare Pages | [https://nexora-ai-template.pages.dev/](https://nexora-ai-template.pages.dev/) |

A push to `main` automatically triggers both platforms from the same source commit. GitHub Actions runs `npm run build:github` with repository base `/nexora-ai-template/`; native Cloudflare Pages Git integration runs `npm run build:cloudflare` with root base `/`. Each platform publishes its own `dist` build and stable canonical URL. The GitHub owner/repository are derived from Actions metadata or the Git remote, not hardcoded in the build script.

[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) covers updates, public build settings, monitoring, verification, custom domains and rollback. [DEPLOYMENT_EXECUTION_PLAN.md](DEPLOYMENT_EXECUTION_PLAN.md) and [qa/live-deployment-checks.json](qa/live-deployment-checks.json) record the deployment checks. Historical release reports describe their original local verification date; this section supersedes their pre-publication hosting status.

## Demo limitations

The footer identifies the concept template; dashboard data, benefits and pricing are illustrative. Task state and the fixed workflow result are local and reset on refresh. No live AI inference, account creation, checkout, form submission or tracking service is included.

Demo mode keeps meaningful local actions. Client mode uses configured live destinations; missing/unsafe destinations show an unavailable explanation. Contact actions open email drafts and never send automatically. Turning demo mode off does not make fictional brands or sample achievements real. Reserved `.example` addresses are examples, not operational services.

The body requires JavaScript. No social preview image is bundled: configure a real licensed image and public URL if needed. Custom copy, themes, logos, counts and destinations require renewed visual/accessibility checks.

## Screenshots and verification

Build and preview, wait for entrance animations to settle and capture 1440×1000 desktop / 375×900 mobile views with menus/dialogs closed. Keep selected captures in `qa/`; raw screenshots/builds remain ignored. Inspect all sections at 320, 375, 768, 1024, 1440 and 1920px after customization.

[PRODUCTION_RELEASE_REPORT.md](PRODUCTION_RELEASE_REPORT.md) records current checks and limitations. Earlier PLAN/QA and template-upgrade records remain unchanged as dated history. They may be curated out of a separate presentation while retaining local copies and valid documentation links.

## License and attribution

Included illustrations use local React/CSS/SVG and system fonts. No stock photography or remote fonts are required. [ASSET_LICENSES.md](ASSET_LICENSES.md) describes assets and complete bundled third-party notices. React uses MIT; Lucide includes ISC and Feather-derived MIT notices. Choose a source-code redistribution license separately before offering template reuse.

Portfolio description: “Nexora AI is a responsive SaaS concept landing page with a custom dashboard, interactive pricing, accessible local workflow demo and typed customization. All brands, metrics and plans are illustrative.”
