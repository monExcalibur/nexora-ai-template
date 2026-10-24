# Nexora AI production release report

Prepared locally on 2026-10-23–24. The completed design, legitimate AI product copy, typed customization and FlowPilot example are preserved. Cloudflare Pages connected to GitHub is ready for owner-side setup; manual GitHub Pages remains available. No push, account connection, commit or public deployment was performed.

## Changes and reasons

| Modified file | Reason |
| --- | --- |
| `src/config/actions.ts` | Replace an unnecessary non-null anchor assertion with an explicit home fallback. |
| `src/config/presets.ts` | Validate/normalize an optional public HTTPS homepage override without changing preset defaults. |
| `src/config/index.ts` | Pass the public URL input into runtime configuration. |
| `vite.config.ts` | Use Cloudflare root assets, preserve portable/repository bases, validate actual CLI overrides and emit consistent static metadata. |
| `eslint.config.js` | Include JavaScript tooling and prohibit runtime console calls. |
| `package.json`, `package-lock.json` | Add reusable publication/deployment checks and development-only YAML 2.9.1 for real workflow parsing. Runtime versions remain unchanged. |
| `.env.example` | Explain public base/URL inputs for Cloudflare, local and GitHub builds. |
| `.gitignore` | Exclude environment secrets, keys, credentials, caches and temporary builds; keep the cross-workspace baseline local. |
| `README.md` | Concise presentation, screenshots, setup/checks, customization, hosting, concept limits and portfolio description. |
| `CUSTOMIZATION_GUIDE.md` | Retain field guidance and document public URLs and primary hosting. |
| `PRODUCTION_RELEASE_PLAN.md` | Created before application edits and updated after verified phases. |

Added files:

- `.node-version` selects Node 22; `src/config/build.ts` resolves host-specific settings.
- `.github/workflows/deploy.yml` is the standalone manual workflow; shared-root `.github/workflows/deploy-nexora.yml` is identical. Atelier's existing root workflow is unchanged.
- `scripts/pages-settings.mjs` validates actual Pages metadata; `scripts/audit-publication.mjs` checks scoped publication candidates and local assets.
- `tests/cloudflare.test.ts` and `tests/deployment.test.mjs` cover host/base/metadata behavior, actual helper execution, YAML, triggers, permissions, pinned revisions and artifact scope.
- `DEPLOYMENT_GUIDE.md`, `PUBLISHING.md`, `ASSET_LICENSES.md` and this report provide the owner handoff.
- `public/licenses/react-MIT.txt` and `public/licenses/lucide-LICENSE.txt` preserve full unmodified runtime notices in the static artifact.
- Fresh `qa/release-*.json`, selected `qa/release-*.jpg` and `qa/publication-audit.json` retain evidence. [The inventory](qa/release-files.json) lists every changed/added/deleted path. Initial cross-workspace hashes and generated previews remain ignored locally.

Removed files:

| File | Reason |
| --- | --- |
| `deployment/github-pages.yml` | Superseded inactive reference, replaced by the tested project/shared-root workflows. GitHub Pages support remains. |
| `qa/upgrade-tools/extract-components.mjs` | Ignored one-off migration could rewrite already extracted components; inspected and no longer needed. |
| `qa/upgrade-tools/extract-palette.mjs` | Ignored one-off palette extraction could rewrite the finished configuration; inspected and no longer needed. |

Historical source snapshots, useful audit utilities, screenshots and all four earlier PLAN/QA documents remain. Temporary release preview builds were removed after verification; final ignored `dist` is retained. The older `nexora-ai.zip` outside this project was not changed and does not contain this release.

## Executed verification

| Check | Result |
| --- | --- |
| Clean `npm ci` | Installed 175 packages; audited 176, zero reported vulnerabilities. |
| `npm run typecheck` | Passed strict TypeScript. |
| `npm run lint` | Passed, including new tooling. |
| `npm run format:check` | Passed. |
| `npm test` | 22/22 passed, including all 10 existing contracts and the original 298 palette values. |
| `npm run verify:deployment` | 7/7 workflow/helper checks passed again after the final build. |
| Production builds | Cloudflare root, `/nexora-ai/`, FlowPilot, client with hidden dashboard/FAQ, all sections hidden, and portable `./` passed. |
| Conflicting Cloudflare CLI base | `--base=/wrong/` failed with the intended diagnostic before output. |
| HTTP resources | 42 root/variant files returned HTTP 200 with exact bytes; final root assets checked again. |
| Browser QA | 82 assertions passed; 320, 375, 768, 1024, 1440 and 1920px inspected with no document overflow. |
| Console | No warning/error messages observed in tested flows. |
| Publication audit | No known credential-pattern findings or missing configured assets/notices. Review staged contents before publishing; pattern scanning is not a complete guarantee. |
| Preservation | All 24 protected design/content/history files and all 145 protected sibling/workflow files match starting hashes. |

Browser checks exercised all eight default conversion buttons, mobile menu CTA, deterministic workflow run/reset, selected plan terms, all four task controls/counter restoration, monthly/yearly prices and annual totals, all six exclusive FAQ disclosures, desktop/footer navigation, secondary anchors, menu/Escape/resize behavior, dialog focus wrapping/return and the skip link. FlowPilot's local logo, green theme, two plans and yearly totals passed. Client-mode missing destinations are disabled with explanations; its reserved external example was inspected without visiting it. All-hidden configuration retained a heading and working local demo. Direct refresh and asset paths under `/nexora-ai/` passed.

Two immediate browser assertions were retried after smooth scrolling/resize completed; settled states passed. An initial fixture check incorrectly expected Nexora's favicon in FlowPilot and was corrected to inspect that preset's actual logo. No product change was needed for those QA assumptions.

The retained historical pre-upgrade CSS utility reports a `flex-wrap` difference already present before this cleanup. It compares against the older snapshot, rather than this completed template's starting state. [Current hashes](qa/release-preservation-http.json) confirm no stylesheet, component, animation, layout or content change; [the diagnostic](qa/release-historical-audit.json) records the distinction.

Evidence: [browser checks](qa/release-browser-checks.json), [build matrix](qa/release-builds.json), [final artifact scan](qa/release-final-build.json), [desktop](qa/release-desktop.jpg), [mobile](qa/release-mobile.jpg), [demo](qa/release-demo-mobile.jpg), [FlowPilot](qa/release-flowpilot.jpg).

## Final production artifact

Final `CF_PAGES=1 npm run build` passed with default Nexora demo settings, root `/`, all sections enabled and no invented canonical URL. Seven files: HTML, hashed JS/CSS, two local SVGs and two license notices. HTML is 8,505 bytes, CSS 54,092 bytes and JS 281,361 bytes.

The output scan found no machine paths, localhost, Vite development client, unresolved head marker or QA-origin values. Rendered asset requests are local. The bundle intentionally retains the optional FlowPilot `.example` configuration; the default demo does not request it. No remote fonts, stock images, analytics, cookies, form service or live AI SDK was added. Canonical/social-image metadata stays absent until configured.

## Hosting readiness and owner publication steps

[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) provides exact PowerShell commands and dashboard instructions:

1. Create an empty GitHub repository named `nexora-ai`.
2. From this application directory, run the guide's scoped clean-checkout copy and checks. Review staged source/assets/notices/docs/tests/workflow before its commit/push commands. This avoids publishing neighboring websites.
3. Connect that repository through Cloudflare **Workers & Pages → Pages → Git import**, branch `main`.
4. Set root directory empty for the dedicated repository (`nexora-ai` only for the shared layout), build `npm run build`, output `dist`, `NODE_VERSION=22`, `VITE_BASE_PATH=/`, `VITE_SITE_PRESET=nexora`, `VITE_DEMO_MODE=true`, no disabled sections.
5. Leave `VITE_SITE_URL` unset until the real stable HTTPS address is known. Select **Save and Deploy**, wait for success and test the returned address. Then set that stable root URL for Production and rebuild; keep Preview unset unless deliberately choosing another indexing policy.
6. Future pushes to the configured production branch trigger Cloudflare builds. Add custom domains through Pages first, follow its DNS/HTTPS instructions, update the production URL and rebuild.

[Optional GitHub Pages](PUBLISHING.md): **Settings → Pages → GitHub Actions**, then manually run **Deploy Nexora AI to GitHub Pages** with default demo inputs and empty base override. Both shared-root workflows target the same repository Pages address; use separate repositories for independent Atelier/Nexora live sites. No remote workflow execution was verified here.

## Remaining limits

- Fictional frontend concept: no real client relationship, live AI, accounts, checkout, backend, persistence or automatic email sending. Local task/demo state resets on refresh.
- Testing used the available Chromium-based in-app browser. Safari, Firefox, real touch devices and a full accessibility audit were not run. Reduced-motion CSS/hook handling was inspected; OS preference changes could not be emulated.
- No social preview image is bundled; supply a licensed image and configure its URL. The body requires JavaScript, while static head metadata is available without it.
- Application reuse licensing remains the owner's choice; third-party notices do not license the application. New client copy/destinations require configuration and renewed QA.
- Anchor-based single page with a native demo dialog. GitHub Pages has no application history rewrite; future routes need a tested strategy. Cloudflare SPA fallback does not create application routes itself.
- GitHub/Cloudflare permissions, remote deployment, custom DNS and HTTPS remain owner-side checks. No public accessibility or deployment success is claimed.
