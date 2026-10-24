# Template upgrade — verification record

Upgrade verified locally on 23 October 2026 using Node 22.19.0, npm 11.11.0, Windows and the available Chromium-based in-app browser. `PLAN.md` / `QA.md` remain the original site's historical records; this file covers the template refactor.

## Preservation evidence

- Original source and SHA-256 inventory were saved in the ignored `qa/upgrade-baseline/` before application changes. Existing desktop/mobile screenshots were retained.
- The untouched baseline built successfully before the refactor.
- A contract test confirms that all **298 original color treatments** pass through the default theme exactly.
- At the theme milestone, resolving the new CSS variables reproduced the original stylesheet after whitespace normalization: geometry, media breakpoints, motion timing and color values matched.
- `useReveal.ts` has the same SHA-256 hash as the baseline. No animations or reduced-motion rules were removed.
- Default desktop browser view retained the original hero/dashboard composition, original background/accent, one H1, six feature presentations, three plans and six FAQs. Header top remains zero, so the permanent home anchor adds no layout shift.
- Existing task, pricing, disclosure, navigation, local demo and keyboard behavior were exercised again.
- Intentional UI additions are the small footer concept indicator, client-mode unavailable-link explanations, and compact-header/wrapping rules for longer custom brands/actions. Extra pricing rows reserve room for a recommendation banner; the default three-plan composition remains unchanged.

This is a visual-preservation review, not a claim of pixel-perfect cross-browser equivalence. Custom artwork and its original composition were retained rather than replaced.

## Command checks

| Check                                             | Result                   |
| ------------------------------------------------- | ------------------------ |
| Strict TypeScript (`src`, config, tests and Vite) | Passed                   |
| ESLint / React Hooks                              | Passed                   |
| Prettier source/test/config checks                | Passed                   |
| Built-in contract tests                           | 10 passed                |
| Default production build                          | Passed                   |
| FlowPilot production build                        | Passed                   |
| Client-mode / hidden-section build                | Passed                   |
| Minimal-section build                             | Passed                   |
| Explicit `/repository/` base build                | Passed                   |
| Markdown/YAML formatting and source whitespace    | Checked at final handoff |

No dependency installation was needed: installed package versions were unchanged. Only the Node engine metadata was aligned with the built-in TypeScript test runner. No additional runtime or development package was introduced.

The contract tests cover brand propagation, exact default palette preservation, alternate theme generation and unsafe CSS rejection, dynamic pricing/annual totals, action mode switching, unsafe external/email destinations, optional-section navigation, preset validation, static SEO escaping and optional social images.

## Browser matrix

| Built configuration                               | What was checked                                                                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nexora demo                                       | Original identity/structure, every CTA, task state, both billing periods, annual plan selection, workflow run/reset, all six FAQ disclosures, keyboard close, modal Tab/Shift+Tab/Escape/focus return, mobile menu and anchors |
| FlowPilot demo                                    | Alternate title/brand/logo/theme, six adapted features, two benefit examples and two plans, yearly prices `$9/$23` and annual totals, selected Team demo                                                                       |
| FlowPilot client mode, dashboard and FAQ disabled | No demo indicator/dialog, visible unavailable explanations, filtered links, external sample URL/label/new-tab rel attributes, Solo plan's internal live destination, and no broken anchors                                     |
| Minimal configuration                             | Hero/content sections omitted, dashboard dependency respected, empty section navigation, permanent top/main anchors, preserved accessible H1 and no overflow                                                                   |
| Explicit `/repository/` base                      | Real browser application render, local demo interaction, metadata and clean console                                                                                                                                            |

Configured external `.example` destinations were inspected as links, **not visited as real services**. Contact URI behavior and injection rejection were tested as pure functions; no email application was used and no message was sent.

### Responsive layouts

Nexora, FlowPilot and the client-mode variation were each measured at all six widths. At every width `scrollWidth === clientWidth`; the narrower client width below reflects the vertical scrollbar.

| Viewport | Document width on these full pages | Horizontal overflow |
| -------- | ---------------------------------- | ------------------- |
| 320      | 305                                | None                |
| 375      | 360                                | None                |
| 768      | 753                                | None                |
| 1024     | 1009                               | None                |
| 1440     | 1425                               | None                |
| 1920     | 1905                               | None                |

The minimal page does not need a vertical scrollbar and has the full viewport width. Browser measurements were taken after resize/render state checks. Screenshot captures during entrance animation were treated as intermediate states; settled desktop/mobile views were reviewed separately.

Screenshots are saved under ignored `qa/screenshots/upgrade/`. Machine-readable browser assertions and responsive evidence are in `qa/upgrade-browser-evidence.json`.

The saved browser record contains **63 passing assertions**, including the eighteen viewport/preset combinations. Settled client/mobile views were captured with full hero opacity after entrance animations, confirming the long-CTA/header fixes visually.

### Observed issues fixed

1. The first FlowPilot example compile exposed an overly narrow inferred plan-action type. A typed plan initializer now accepts all supported action variants while checking each plan.
2. Longer custom brand/CTA labels crowded the mobile header. The conditional compact-header rule preserves default Nexora and retains the CTA inside the menu.
3. A long client-mode CTA overflowed the 320px hero and a hidden header button left its explanation behind. Actions now wrap appropriately; compact-header unavailable wrappers are hidden together. All three full-page configurations pass the six-width overflow check after the fix.
4. TypeScript configuration formatting was normalized after adding tests to the checked files.

## Production metadata and asset paths

All five built HTML variants contain exactly one configured title, meta description, Open Graph fields, favicon and inline theme values. They contain no unresolved head marker. The metadata helper's optional-image tests use sample URLs only; no missing social image is claimed as present.

HTML, scripts, styles and favicons returned HTTP 200 under:

- `/template-qa/nexora/`
- `/template-qa/flowpilot/`
- `/template-qa/client/`
- `/template-qa/minimal/`
- `/repository/` for the explicit-base build

The explicit-base HTML/JS/CSS/favicon responses had the correct MIME types. Local FlowPilot logo images loaded. No default remote image/font dependency was added. Evidence: `qa/upgrade-http-evidence.json`, `qa/upgrade-explicit-base-evidence.json`, and the final build's `qa/upgrade-final-build-evidence.json`.

Final default output is Nexora in demo mode with relative asset paths. At the final build: HTML approximately **8.50 kB / 2.96 kB gzip**, JavaScript **281.04 kB / 87.17 kB gzip**, CSS **54.09 kB / 12.44 kB gzip**. The added configuration/metadata does not introduce external services, a router, an animation runtime, or a backend.

## Manual regression for a client adaptation

1. Run typecheck, lint, tests, format check and build.
2. Review all six requested widths with the client's actual brand name, copy, images and content counts.
3. Test menu open, link close, Escape and keyboard focus.
4. Switch pricing both ways; compare full annual totals and the configured recommended plan.
5. Verify every CTA's classification, actual destination and demo/client behavior. Confirm missing destinations remain explained rather than simulated.
6. Open/reset/close the local workflow in demo mode; test Tab, Shift+Tab, Escape and focus restoration.
7. Open each FAQ with mouse/keyboard; test custom section flags, empty arrays and anchor fallbacks.
8. Inspect `dist/index.html` without relying on application JavaScript; check deployed canonical/social image URLs and actual image availability.
9. Serve a repository-prefix build and verify asset MIME types, logo/favicon loading and anchors.
10. Emulate `prefers-reduced-motion: reduce` in a browser that supports it and verify the preserved behavior; inspect contrast after theme changes.

## Limits and deployment status

No known critical issue remains in the tested configurations. Different custom copy, arbitrary content counts, typography and palettes still need visual/contrast review. More-than-three-tier row spacing is provided, but the browser-tested plan counts are two and three. Light-theme conversion is not promised by palette derivation.

System reduced-motion emulation, assistive screen readers, Firefox/Safari, Lighthouse, remote GitHub Actions, deployed social crawler behavior and real external client services were not tested. Reduced-motion CSS/JS was preserved and reviewed in source; browser consoles for the tested production variants were clean. No email, authentication, payment, purchase, account creation or deployment was performed. The workflow remains an inactive, manual-only template.
