# Nexora AI — commercial template upgrade

## Scope and preservation contract

Refactor the completed site in place into a developer-configurable static SaaS template. Preserve the original hero, custom dashboard, six varied feature illustrations, page rhythm, CSS geometry, responsive breakpoints, animations and working interactions. Nexora AI stays the default; FlowPilot is an optional build preset, not a second website. No backend, publishing, theme editor, page builder, or new runtime dependency.

Existing `PLAN.md` and `QA.md` describe the original delivery and remain historical records. This plan and `TEMPLATE_UPGRADE_QA.md` will record the upgrade. All new tasks are initially pending.

## Architecture decisions

- Add typed `src/config` modules for brand, content, actions, sections, theme and metadata. Keep configuration free of React and icon component imports so Vite can also use it at build time.
- Existing components render configuration while retaining their DOM structure and CSS classes. Keep original illustration compositions; configure their labels/data alongside marketing copy.
- One small CTA resolver classifies internal, external, contact and demo actions. Demo actions retain the existing meaningful local workflow; in client mode use configured destinations or an explained unavailable state. Validate URL protocols.
- Section visibility filters navigation and resolves dependent anchors safely, including a hidden dashboard or hero.
- Theme CSS properties preserve exact default colors and existing geometry; derived palette tokens allow accent/background changes to affect existing artwork rather than adding a new design.
- A small Vite HTML transform emits escaped title, description, Open Graph, favicon, theme color and theme variables in built HTML. Optional social images require an explicit usable URL. Relative base remains the safe default, with environment/CLI overrides.
- Use existing packages and Node's built-in test runner for configuration/action/metadata contracts. Keep GitHub Pages workflow inactive and manually triggered.

## Phase 0 — repository audit and preservation plan

- [x] Read original plan, README, configuration, components, stylesheet and deployment template; inventory existing work and instructions.
- [x] Record current hardcoded brand/content/pricing/CTA/metadata locations and preserve source and screenshot baselines before edits.
- [x] Write this plan before application changes; confirm boundaries and regression criteria.

Acceptance: preservation baseline exists; original projects remain untouched; architecture and all phases are recorded.

Verification: file/hash inventory, existing screenshot inventory, source review and a baseline production build.

Risks: entire project is currently untracked in parent Git; preserve a local source snapshot instead of relying on Git restoration. Windows native CSS modules lock while Vite runs; stop previews before dependency installation. No dependency upgrade is planned.

## Phase 1 — centralized brand and content configuration

- [x] Define typed brand, navigation, actions, section visibility, content and SEO contracts with safe defaults.
- [x] Extract default English hero, features and illustrations, workflow, benefits, plans, FAQ, dashboard labels/data, demo copy and footer into readable configuration.
- [x] Render the existing components from configuration, including brand text/logo and configurable pricing recommendation/currency; type contact/social settings for the Phase 3 resolver.
- [x] Keep local state behavior and current default content intact; replace duplicated brand references with the configured brand.

Acceptance: editing content/config changes the rendered site; no scattered business copy or duplicate plan data remains; existing layouts and interactions remain recognizable.

Verification: strict TypeScript/build; source audit for remaining visible hardcoded business strings; compare default text and component structure with baseline.

Risks: extracting illustrative text can disturb whitespace and SVG/chart layout. Preserve markup and class names, and configure illustration data separately from presentation.

## Phase 2 — theme customization

- [x] Expose accent/secondary accent, backgrounds, surfaces, text/muted text, borders, font family and appropriate radius settings.
- [x] Wire existing artwork, gradient/border treatments and controls to CSS variables, preserving exact default colors through a derived palette.
- [x] Keep all existing spacing, responsive breakpoints, animation timing and reduced-motion rules.

Acceptance: default appearance closely matches the original; one alternate theme changes the whole accent family without editing components.

Verification: compare original/default palette values, screenshot default desktop/mobile, inspect configured CSS variables and alternative accents.

Risks: broad color replacement can shift contrast or cause undefined variables; test complete palette coverage and retain safe defaults.

## Phase 3 — demo mode and honest interaction behavior

- [x] Add a tasteful demo indicator without moving a banner into the hero.
- [x] Route all CTAs through the typed resolver; preserve local demo interactions when demo mode is on.
- [x] Support client internal/external/contact destinations when demo mode is off, including safe unavailable states for missing/unsafe destinations.
- [x] Retain illustrative labels, data privacy accuracy, keyboard focus behavior and all no-payment/no-account guarantees.

Acceptance: every action is classified and meaningful; client mode does not fall back to pretending a service exists; fictional claims remain clearly identified.

Verification: test each action category, unsafe URL rejection, missing destinations, demo on/off, plan selection and workflow run/reset.

Risks: new link semantics must preserve button styling and mobile menu close behavior; external links need appropriate rel handling and contact must not transmit automatically.

## Phase 4 — template customization features

- [x] Support adding/removing feature, pricing, FAQ, benefit and workflow entries using typed arrays and existing presentation variants.
- [x] Implement section enable/disable flags and remove links to hidden sections; preserve top/main fallbacks.
- [x] Provide a typed FlowPilot example with different brand, content, features, pricing and accent colors, selectable for development/build without replacing defaults.

Acceptance: alternate configuration renders as a coherent variation of the same template; hidden sections leave no broken anchors; configurable content cardinality does not depend on three fixed plans or six fixed FAQs.

Verification: configuration contract tests and alternate/section-hidden browser smoke tests at desktop/mobile widths.

Risks: unusual counts and long content can expose existing fixed grids. Preserve default composition; add only the minimal responsive rules required for configurable counts.

## Phase 5 — SEO, metadata and deployment

- [x] Inject configurable title/description/Open Graph/favicon/theme styles into static HTML at build time with correct escaping.
- [x] Support a configured social image and safe base-aware local asset references; omit absent optional metadata.
- [x] Make Vite base configurable without losing relative defaults; validate nested-path build/asset/navigation behavior.
- [x] Update the existing inactive workflow template to document/configure preset/base choices without enabling publication.

Acceptance: viewing built HTML alone shows configured metadata; static hosting needs no runtime backend and repository subpaths work.

Verification: inspect default and FlowPilot built HTML, test escaped metadata and optional-image output, HTTP/browser checks under a repository prefix.

Risks: social crawlers do not consistently run JavaScript; use build-time output. Relative social image URLs are crawler-dependent, so guide clients to an absolute deployed image URL.

## Phase 6 — documentation and examples

- [x] Write `CUSTOMIZATION_GUIDE.md` covering all fifteen requested customization topics with exact implemented paths and examples.
- [x] Update README for template audience, configuration, demo/client modes, build presets, deployment, fictional content, and limitations.
- [x] Record CTA classification and executed upgrade checks in `TEMPLATE_UPGRADE_QA.md`; explain example assets and advanced palette behavior.

Acceptance: documentation options exist in code, commands match package scripts and deployment instructions remain opt-in.

Verification: exercise documented default/example commands, type-check examples and validate Markdown/YAML formatting.

Risks: examples must not imply live services or claim a real paying client. Use reserved `.example` addresses for sample destinations.

## Phase 7 — testing, regression checks and final polish

- [x] Run strict TypeScript, ESLint, formatting, built-in contract tests and production builds; fix failures.
- [x] Browser-test navigation, mobile menu, both pricing periods, all FAQs, task state, demo selection/run/reset and keyboard focus.
- [x] Test client destinations/missing configuration, optional sections and the alternative preset; verify SEO output and asset references.
- [x] Measure 320/375/768/1024/1440/1920 layouts and inspect desktop/mobile screenshots against originals; check console, images and motion handling.
- [x] Restore Nexora defaults, build final output, update this plan honestly and review the final changed-file inventory.

Acceptance: no critical regression; default design preserved; tested customization works; final build is Nexora demo and all verification limits are explicit.

Verification: machine-readable test/browser evidence, screenshots, source inventory and final production output. Runtime reduced-motion emulation, other browsers, screen readers and remote CI remain unverified unless the current tools allow them.

## Milestone log

Phase 0 verified: all existing components, original plan/README, stylesheet, build configuration and inactive deployment workflow inspected. Current business content is hardcoded in App/UI/Header/Dashboard/Features/Pricing/FAQ/DemoDialog; metadata is in index.html, with colors spread through styles.css. Source snapshot and hashes preserved in `qa/upgrade-baseline`; existing screenshots retained. Baseline TypeScript/production build passes, with the original CSS/JS hashes unchanged. No unrelated project changes.

Phase 1 verified: strict TypeScript, ESLint and production build pass after extraction. Brand/content/action/section/SEO types and the default content factory are in `src/config`; existing components keep their presentation classes and now read centralized copy, arrays, charts, state defaults and pricing. Brand references in FAQ/footer/illustrations derive from the brand settings. Source AST audit found no remaining visible business text in components. Social/contact destinations and section behavior are typed now and will be connected through the action resolver in Phases 3–4.

Phase 2 verified: four built-in contract tests pass, including all 298 exact original palette treatments, alternate accent derivation, unsafe CSS rejection, brand propagation and billing totals. A source comparison after resolving CSS variables matches the original stylesheet's geometry/breakpoints/animation/color values exactly. Vite injects theme variables before rendering; default browser view at 1440px retains the original hero/dashboard composition and has no overflow. Production build passes without new dependencies or Vite warnings. Alternate-theme browser verification follows with FlowPilot.

Phase 3 verified: CTA resolver covers internal, external, contact and demo actions; unit tests confirm demo mode never uses client destinations, client mode never falls back to a demo, invalid protocols/credential-bearing URLs/email injection are rejected, and missing destinations are unavailable. All page CTA locations use ActionControl, with local workflow/focus logic retained. Footer demo indicator is subtle; client FAQ/assurances avoid demo-only claims. TypeScript, ESLint and build passed before the example work; browser regression follows in Phase 7.

Phase 4 verified: eight contract tests pass, covering hidden-section dependencies/navigation, preserved defaults, FlowPilot, invalid preset/base/section/mode inputs and billing. FlowPilot renders in the actual browser with its custom logo, green palette, six adapted features, two plans and two benefit examples. Logo images load and 320px has no horizontal overflow. A long-brand mobile header collision was observed and fixed with a conditional compact CTA rule that does not affect default Nexora. The first example compile exposed an overly narrow inferred plan action type; typed plan initialization fixed it and the production build now passes. Full hidden-section/client/browser verification is scheduled in Phase 7.

Phase 5 verified: ten contract tests pass, including HTML escaping, optional social images, base-aware favicon/social URLs and unsafe metadata rejection. Static built HTML inspected for Nexora, FlowPilot, client, minimal and explicit-base builds: title/description/Open Graph exist without JavaScript and no template marker remains. HTTP checks confirm all HTML/JS/CSS/favicon assets under nested prefixes, including `/repository/` with appropriate MIME types; explicit-base application/demo works in the browser. The inactive manual workflow now accepts preset/demo/base options and runs contract tests. No publishing performed. Node engine raised to 22.19+ to match the existing runtime and built-in TypeScript test runner; no dependency versions changed.

Phase 6 verified: README and all fifteen customization-guide topics map to real typed fields and tested commands; FlowPilot example compiles. Documentation covers brand/logo/content/theme/dashboard/FAQ/sections/actions/contact/demo/SEO/build/deployment, optional-image behavior and actual limits. Upgrade QA record and machine-readable HTTP/browser evidence exist. Markdown, YAML and source/test/config formatting checks pass. Existing original PLAN/QA records were preserved.

Phase 7 verified: 10 contract tests and 63 saved browser assertions pass. Nexora, FlowPilot and client-mode variations have no horizontal overflow at all six widths. Every default CTA, all FAQ disclosures, pricing periods/totals, task state, local workflow/reset, modal focus/keyboard and mobile navigation were exercised. Client links, unavailable states, hidden-section fallbacks, minimal navigation, image loading and static metadata were verified. Corrected the long-client-CTA/header-wrapper mobile issue and reviewed settled mobile views. Default Nexora/relative-base/demo output restored in dist; final TypeScript, lint, formatting and production build pass. No new dependencies or unrelated project edits. Final output is approximately 8.50 kB HTML, 281.04 kB JS (87.17 kB gzip) and 54.09 kB CSS (12.44 kB gzip).

## Blockers / deviations

No remaining implementation blocker or known critical regression in tested configurations. Runtime system reduced-motion emulation, other browsers, assistive screen readers, Lighthouse, real external sample services/contact delivery, deployed social-image crawlers and remote CI/publication were not performed. The original motion implementation is preserved and source-verified. Two/three-plan counts were browser-tested; larger/custom content and themes require their own visual review. All generated preview builds, baseline and screenshots stay in ignored QA directories; publication remains opt-in.
