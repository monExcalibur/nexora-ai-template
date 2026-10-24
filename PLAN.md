# Nexora AI — implementation plan

## Scope and architecture

Build one independent, English-language React + strict TypeScript + Vite + Tailwind CSS portfolio site. The latest brief supersedes the earlier two-site brief. Preserve `../closer`, `../unt`, and all other existing files. No backend, authentication, payments, remote image dependencies, or publishing.

All tasks start pending. Mark a task complete only after the stated verification. Keep implementation in this directory; organize page sections as focused components, with shared buttons, brand, demo dialog, and reveal behavior. Original dashboard/feature illustrations use HTML, CSS, SVG, and Lucide icons. Prefer CSS animation and IntersectionObserver over an extra animation runtime.

## Phase 0 — repository inspection and architecture planning

- [x] Inspect existing directories, Git state, ancestor instructions, available runtime, and relevant skills.
- [x] Confirm revised scope, independent project location, component boundaries, asset strategy, and demo behavior.
- [x] Record this plan before creating any application code.

Acceptance: existing unrelated work identified and untouched; plan exists with all phases, checks, dependencies, and risks. Verify directory listing and file creation order.

## Phase 1 — project setup and design system

- [x] Verify current stable compatible dependencies and install React, TypeScript, Vite, Tailwind CSS, and Lucide.
- [x] Configure strict TypeScript, Vite relative base paths, production scripts, linting, and repository ignores.
- [x] Establish navy/violet tokens, typography, surfaces, spacing, buttons, focus styles, and semantic entrypoint metadata.

Acceptance: dependency installation succeeds, configurations parse, all required technologies are present, no changes outside this project. Verify dependency tree and preliminary TypeScript/build checks.

## Phase 2 — page structure and content

- [x] Build branding/navigation, headline and supporting copy, primary/secondary CTAs, and custom dashboard.
- [x] Dashboard includes sidebar, header, tasks, metrics/chart, activity, and automation suggestions, explicitly illustrative.
- [x] Build six distinct features with varied composition and three illustrated workflow steps.
- [x] Add benefits with illustrative labels, three pricing plans, five or more FAQs, final CTA, and footer.
- [x] Add meaningful local demo dialog for conversion buttons, with no fake login or checkout.

Acceptance: every requested section and dashboard element exists, copy is English and complete, claims are honest, components are organized. Verify source inventory and production build.

## Phase 3 — responsive design and visual polish

- [x] Design intentional dashboard, navigation, grids, typography, and touch targets for narrow screens.
- [x] Refine section rhythm, asymmetric feature layouts, restrained lighting, borders, charts, and hover treatments.
- [x] Inspect 320, 375, 768, 1024, 1440, and 1920 pixel layouts, checking horizontal overflow.

Acceptance: readable, cohesive composition at every required width; no page overflow. Verify browser screenshots/DOM measurements when supported; otherwise explicitly record limitations.

## Phase 4 — interactions and animations

- [x] Implement mobile menu, Escape handling, link close behavior, and expanded-state announcements.
- [x] Implement monthly/yearly prices, truthful yearly billing totals, plan selection feedback, and accessible FAQ accordion.
- [x] Implement accessible native demo dialog with focus return, smooth anchors, reveal animations, and reduced-motion behavior.

Acceptance: all interactive controls have meaningful outcomes, keyboard support, and visible focus; reduced motion removes movement. Verify actual browser interactions and accessibility state.

## Phase 5 — testing, optimization, and accessibility

- [x] Run production build, strict TypeScript, lint, and whitespace checks; fix failures.
- [x] Test all pricing/FAQ/menu/dialog states, internal anchors, keyboard focus/Escape, and browser console.
- [x] Check heading hierarchy, accessible names, image/asset references, responsive overflow, and reduced motion.
- [x] Review production asset sizes and local-only assets; capture desktop/mobile screenshots and fix observed issues.
- [x] Build and serve under a nested repository base path; verify JS/CSS and anchors load correctly.

Acceptance: executed checks pass; no critical failures; test evidence and any unverified checks are documented in `QA.md`.

## Phase 6 — documentation and deployment preparation

- [x] Write README with overview, stack, installation, dev/build/preview commands, structure, and demo limitations.
- [x] Provide GitHub Pages deployment instructions and an opt-in workflow template without publishing.
- [x] Update plan to match verified completion, record final QA evidence, and review changed/untracked files.

Acceptance: independent installation/build supported by lockfile; deployment instructions cover repository subpaths; no credentials or publishing required; honest handoff includes any limitations.

## Dependencies and risks

- Node is currently v22.19.0, npm v11.11.0; verify current package engine compatibility rather than assuming the newest Vite supports this Node version.
- Network/package registry access may be restricted. If install fails, diagnose and request only the required escalation; do not replace requested stack silently.
- Browser access and viewport emulation must be verified against available APIs. Do not label visual, console, or interaction QA complete if unavailable.
- Dashboard must stay legible at 320px: recompose into a compact overview instead of shrinking a desktop screenshot.
- Fictional metrics, prices, integrations, and workspace content require clear labels; CTAs show a local demo summary only.
- Native dialog focus and mobile menu keyboard behavior need browser verification.
- Relative Vite base and bundled assets must be exercised under a nested path for GitHub Pages.

## Milestone log

- Phase 0 verified: directory and Git inventory read; no applicable AGENTS.md found in ancestor directories; Node/npm available; plan created before application code. Existing projects remain untouched. Browser available for later QA.
- Phase 1 verified: installed 173 packages with zero npm audit vulnerabilities; preliminary production build, strict TypeScript, and ESLint passed. Vite 8.3.5 supports installed Node 22.19.0. React 19.3.1, Tailwind 4.3.3, Lucide 1.61.0, compatible TypeScript 6.0.3 installed. Original scripts/surfaces use no external assets.
- Phase 2 verified: all requested sections implemented in focused React components; production build and strict TypeScript pass. Interactive dashboard tasks, six features, three workflow steps, honest fictional benefits, three plans, six FAQs, and local demo are present. Visual styling and browser interaction verification remain pending.
- Phase 3 verified: real browser screenshots captured at all six requested widths, with desktop/tablet full-page visual review and mobile hero review. Initial 320px overflow was traced to body min-width plus the browser scrollbar, fixed, and all six document/client width comparisons now pass. Increased main content readability; recomposed mobile dashboard and feature rows. Local HTTP 200 confirmed at port 4189 after sandboxed server was inaccessible.
- Phase 4 verified: browser exercised menu open/Escape/anchor close, both billing periods and annual totals, all six FAQs with exclusive opening and keyboard closing, every conversion CTA, task counter changes, workflow run/reset, selected-plan feedback, Escape focus return, and forward/backward Tab wrapping in the dialog. Added explicit Tab looping after the native dialog let focus reach browser chrome. Scroll reveal observer and reduced-motion CSS/JS are implemented; system-level reduced-motion emulation remains a documented QA limitation.
- Phase 5 verified: strict TypeScript, ESLint, Prettier, production build and Git whitespace checks pass. No browser errors/warnings, broken anchors, unnamed buttons, or external scripts/styles found. HTML, JS, CSS, and favicon return HTTP 200 under `/portfolio-demo/`; real production plan selection and anchor navigation work there. JS 264.18 kB / 81.10 kB gzip, CSS 48.40 kB / 11.66 kB gzip. Fixed direct dependency versions, synchronized lockfile, and audited 175 packages with zero reported vulnerabilities. Browser evidence saved to `qa/browser-evidence.json`; screenshots are local ignored QA artifacts. Reduced-motion rules and observer preference handling reviewed in source; this browser API cannot emulate the system preference.
- Phase 6 verified: README and QA record complete, deployment YAML parsed/formatted by Prettier and remains an inactive manual-only template, and all 25 project source/config/documentation files reviewed in the untracked inventory. Clean `npm ci` succeeded after stopping Windows preview processes that locked a native module; typecheck, lint, formatting and build passed again. Final production HTTP assets and 38 browser assertions pass, including all six actual rendered viewport widths, local workflow execution and a clean console. Final desktop/mobile screenshots saved. Tailwind source discovery scoped to `src` for reproducible output independent of documentation. All changes are confined to this new project directory; no publication attempted.

## Blockers and deviations

No implementation blockers. Latest user request intentionally reduces delivery to Nexora AI only. Verification limits: reduced-motion preference changes were not emulated; Safari/Firefox, assistive screen readers, Lighthouse, remote CI and actual GitHub Pages publishing were not run. No publication was authorized or attempted. An initial offline lockfile refresh missed an optional cross-platform package in cache; online lockfile synchronization succeeded.
