# Nexora AI production release plan

Created 2026-10-23 before application edits. Preserve the completed Nexora AI design, typed customization, FlowPilot preset, pricing, task state, FAQ, mobile navigation and honest local demo. Prepare Cloudflare Pages connected to GitHub as the primary target; retain manual GitHub Pages support. No account connection, push, publication or history rewrite is authorized.

## 1. Repository audit

- [x] Read existing documentation, source/configuration, dependencies, assets and deployment template.
- [x] Verify Git/instructions and scope; preserve Atelier and unrelated workspace projects.
- [x] Record source/history hashes, identify actual cleanup candidates and distinguish product AI copy from development boilerplate.

Acceptance: complete application inventory and reproducible baseline before changes; earlier plans and meaningful technical records retained.

## 2. Source cleanup

- [x] Review imports, components, shared logic, CSS, TypeScript safety, comments and debug output.
- [x] Fix confirmed issues and remove obsolete duplicate configuration without rewriting working visual components.
- [x] Preserve default palette, markup, animations, action contracts, pricing and section/preset behavior.
- [x] Run TypeScript, lint and existing tests after meaningful cleanup.

Acceptance: changes address observed maintenance issues, with no speculative redesign or hidden loss of functionality.

## 3. Documentation cleanup

- [x] Write a concise README with features, stack, install/check/build commands, customization, demo limits and notices.
- [x] Add DEPLOYMENT_GUIDE.md with exact scoped GitHub copy/push instructions, Cloudflare settings, environments, redeployment, hosted verification and custom domains.
- [x] Keep field-level customization useful; preserve PLAN.md, QA.md and upgrade records unchanged.
- [x] Describe Nexora/FlowPilot as fictional concepts and retain legitimate AI marketing references.

Acceptance: clear product presentation and one primary deployment guide; no invented client relationships or claims of publication.

## 4. Assets and dependencies

- [x] Review local SVG/artwork/font usage and runtime dependencies; retain necessary libraries.
- [x] Preserve/copy complete required third-party notices into the static artifact.
- [x] Perform a clean locked install and inspect reported vulnerabilities.
- [x] Remove only obsolete/reproducible artifacts with documented reasons; retain useful baselines/evidence.

Acceptance: no missing assets, new tracking or unnecessary dependency removal; required notices remain available without node_modules.

## 5. Security and privacy

- [x] Audit public copy, metadata, actions, external resources and demo/client behavior.
- [x] Strengthen ignores for environment secrets, keys, caches, builds and temporary previews.
- [x] Scan publication candidates for known credential patterns without printing values and check local assets.
- [x] Verify production output excludes machine paths, localhost, prompts and test destinations.

Acceptance: no observed sensitive data exposure, truthful sample claims and explicit limits of pattern-based scanning.

## 6. Deployment configuration

- [x] Verify official Cloudflare Pages Git/build/Node/routing/domain guidance.
- [x] Add root-base CF_PAGES handling and stable public URL inputs; preserve portable local and explicit GitHub subpaths.
- [x] Keep `npm run build` / `dist`, no backend or account identifiers, and validate environment/CLI path mismatches.
- [x] Replace the inactive template with a tested manual project workflow and separate shared-root Nexora workflow; leave Atelier's workflow untouched.
- [x] Add meaningful deployment/metadata contracts and verify actual root/subpath builds.

Acceptance: local deployment artifacts and workflow syntax/contracts pass; remote execution/public accessibility are not claimed.

## 7. Testing and visual regression

- [x] Run formatting, TypeScript, ESLint, tests and production builds; fix critical failures.
- [x] Serve builds over HTTP and verify all assets and direct refresh.
- [x] Inspect 320, 375, 768, 1024, 1440 and 1920px; capture and review desktop/mobile sections and overflow.
- [x] Test every default CTA, local workflow run/reset, pricing/annual totals, task checkboxes, FAQs, menu and anchors.
- [x] Test keyboard/focus, basic accessibility, console, reduced-motion support where available, FlowPilot/client/hidden-section configurations.
- [x] Compare protected visual/content hashes and retain fresh evidence separate from historical QA.

Acceptance: actual executed checks pass with no critical regression; untested browsers/platforms and remote services are identified honestly.

## 8. Final verification and handoff

- [x] Rebuild the default Nexora demo for Cloudflare root with no invented canonical URL.
- [x] Validate retained workflows, document links, publication inventory and source/history preservation.
- [x] Complete PRODUCTION_RELEASE_REPORT.md with modified/removed files and reasons, results, limits and exact publication steps.
- [x] Update this plan, close owned previews, remove verified temporary builds and leave Git unstaged/unpublished.

Acceptance: reviewable local release source/artifact, accurate evidence and instructions, unchanged unrelated projects and no publication.

## Initial observations

- Git root is the shared websites workspace, with no commits/tracked files/remotes. Nexora is nested in nexora-ai; Atelier's root workflow is outside this task's edit scope.
- React 19 / TypeScript 6 / Vite 8 / Tailwind 4 / Lucide; Node >=22.19, lockfile and ten existing configuration contracts.
- Portable base ./, no router/backend, local CSS/SVG artwork and system font stack; optional FlowPilot logo is local.
- Existing deployment/github-pages.yml is inactive. Source/public scan found no assistant-brand boilerplate, TODO/debug statements or TS suppressions. Legitimate AI product content stays.

## Verification log

Plan created before implementation. Checklist updated only after executed verification.

Phase 1 verified: six existing Markdown documents, strict TS/ESLint/Vite/package configuration, runtime composition, typed actions/presets, local SVGs and inactive deployment template inspected. No applicable AGENTS.md exists in this workspace/ancestor chain. Baseline qa/release-before.json records 49 Nexora candidates and 145 protected Atelier/shared-workflow files. Git remains unborn/untracked without a remote. No assistant boilerplate/debug/TODO statements were found in application source/public assets. Preserve all AI product copy, original palette, FlowPilot and historical plans/QA. Cleanup is limited to actual maintenance issues, an obsolete workflow location and one-off migration artifacts after inspection; existing source snapshots remain local.

Phase 2 verified: reviewed runtime composition and all shared exports; no unused visual component, runtime dependency or confirmed dead CSS required removal. Replaced an unnecessary non-null anchor assertion with an explicit home fallback and extended lint coverage to tooling plus runtime no-console. Removed only the two ignored one-off extraction scripts that rewrite already-migrated source; retained their baseline hashes, audit utilities and historical source snapshot. TypeScript/ESLint and all ten existing configuration contracts passed, including all 298 default palette values. Expanded check scripts for upcoming tooling/tests and added YAML 2.9.1 as a development-only workflow parser; npm audited 176 packages with zero reported vulnerabilities. No component, style or marketing-copy edit was made.

Phase 3 verified: README shortened to the product, useful commands, configuration, hosting and honest limitations. DEPLOYMENT_GUIDE.md consolidates exact scoped GitHub/Cloudflare commands and settings; PUBLISHING.md retains the optional manual path. Updated the full customization guide for stable public URL and primary hosting inputs without deleting field-level guidance. Asset/source licensing and a release report are now explicit. Existing planning/QA documents remain intact. Legitimate AI copy stays, while both brands/sample metrics/plans are presented as concepts. Final file/link checks follow after screenshots and workflow creation.

Phase 4 verified: clean npm ci installed 175 packages and audited 176 with zero reported vulnerabilities. React, ReactDOM and Lucide remain necessary; tooling dependencies have active build/check roles. Two local SVGs are intact and have no active external content; the design downloads no fonts or raster photos. Full React MIT (also covering identical ReactDOM/Scheduler notices) and Lucide ISC/Feather MIT notices were copied exactly into public/licenses and checked against package originals. Retained useful QA baselines and removed only the two obsolete source migration scripts described above.

Phase 5 source verification: publication audit scanned 58 text candidates, found zero known secret patterns and no missing configured assets/notices. Ignore checks exclude environment files, npm credentials, keys and temporary builds while retaining .env.example. No development machine URL, debug output or assistant boilerplate was found in src/public. Empty contact/social/social-image settings are intentional, and both concept brands remain explicit. Final production-output scan remains pending until the final build.

Phase 6 configuration: verified official Cloudflare build/root/environment/Node, SPA and custom-domain references on 2026-10-23. Added CF_PAGES-aware root assets, public VITE_SITE_URL, actual CLI-base validation, Node 22 selection and a manual-only GitHub Pages workflow reading real Pages metadata. Retained preset/demo inputs and pinned actions with separate build/deploy permissions. Root deploy-nexora.yml matches the standalone workflow; Atelier deploy.yml remains untouched. Removed the superseded inactive deployment/github-pages.yml after both replacements were created and tested. All 22 configuration/deployment tests passed; actual multi-target builds follow before closing this phase.

Phase 6 actual builds verified: npm run build passed under CF_PAGES=1 with a reserved QA canonical; root favicon/canonical were correct. GitHub /nexora-ai/, FlowPilot, client, all-hidden and portable builds passed. CLI --base=/wrong/ with CF_PAGES=1 failed with the intended error before output. The FlowPilot favicon is its own flowpilot.svg (the initial QA expectation of favicon.svg was corrected; no product code change was needed). Build matrix is recorded in qa/release-builds.json.

Phase 7 verified: formatting, TypeScript, ESLint and all 22 tests passed; six positive build targets and the conflicting CLI rejection behaved correctly. HTTP served all 42 root/variant files with status 200 and exact bytes. Fresh browser QA passed 80 assertions covering six widths, layout/overflow, all conversion buttons, four task controls, six exclusive FAQs, menu, skip link, focus wrapping/return, deterministic workflow run/reset, billing, client destinations, hidden sections and repository refresh. Browser warning/error logs were empty. Raw QA required two retries after smooth-scroll/resize timing; settled pointer/keyboard states passed, with no product change. Screenshot evidence is retained separately from historical QA. All 24 protected design/content/history files and all 145 protected sibling/workflow files match the initial hashes. The historical pre-upgrade CSS utility reports an old flex-wrap difference already present in the completed template; it is not the current release baseline (qa/release-historical-audit.json). Reduced-motion CSS/hook support was inspected, but OS preference emulation is unavailable.

Phase 8 verified 2026-10-24: rebuilt the default Nexora Cloudflare artifact with no canonical/social-image invention; seven files passed final scans and HTTP byte checks. Final browser root used only local assets and the full browser record contains 82 passing assertions. Both workflow copies and all seven deployment contracts passed again. All 29 Markdown file links resolve locally; the exact release inventory is retained in qa/release-files.json. Final report records modified/removed files, real results, limits and exact owner publication steps. Kept the original Nexora archive and historical source records; removed only this run's resolved/verified temporary preview folder after stopping the owned server and closing/resetting its browser tab. Git remains unstaged, uncommitted, without a remote or publication. All protected sibling/workflow hashes still match.
