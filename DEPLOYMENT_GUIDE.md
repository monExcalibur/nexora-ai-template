# Deploy and maintain Nexora AI

Both hosts were deployed and publicly tested on 2026-10-24. These are fictional portfolio demonstrations, not real client commissions or operating services.

| Target | Address |
| --- | --- |
| GitHub repository | [nexora-ai-template](https://github.com/monExcalibur/nexora-ai-template) |
| GitHub Pages | [https://monexcalibur.github.io/nexora-ai-template/](https://monexcalibur.github.io/nexora-ai-template/) |
| Cloudflare Pages | [https://nexora-ai-template.pages.dev/](https://nexora-ai-template.pages.dev/) |

## Architecture and production settings

The independent repository contains the application at its root. A normal push to `main` starts GitHub Actions and native Cloudflare Pages Git integration. They build the same commit separately, with different Vite bases. Only `dist` is published. Dependencies, source documentation, tests and raw QA are excluded from hosted assets.

| Setting | GitHub Pages | Cloudflare Pages |
| --- | --- | --- |
| Production branch | `main` | `main` |
| Trigger | Push to main; manual workflow dispatch | Native GitHub integration; automatic production deployments enabled |
| Build command | `npm run build:github` | `npm run build:cloudflare` |
| Output | `dist` | `dist` |
| Repository root | `.` | Optional root field empty |
| Asset base | `/nexora-ai-template/` | `/` |
| Node line | `22` via setup-node | `NODE_VERSION=22` (first build used 22.23.4) |
| Preset | `nexora` | `VITE_SITE_PRESET=nexora` |
| Demo mode | `true` | `VITE_DEMO_MODE=true` |
| Stable production canonical | Actual configure-pages URL | `VITE_SITE_URL=https://nexora-ai-template.pages.dev/` |

The Cloudflare framework preset is None with the explicit build/output fields above. Cloudflare performed a locked `npm clean-install`. `.node-version` and package engines require Node 22.19 or newer. Cloudflare supplies `CF_PAGES=1`; the named build also enforces `/`. The local portable `npm run build` and dev commands remain available.

`scripts/build-target.mjs` validates target settings, runs TypeScript and Vite, and rejects mismatched bases or unsafe canonical URLs. For a local GitHub build, it derives owner/repository from `origin`; Actions supplies `GITHUB_REPOSITORY` and authoritative Pages metadata. A fork therefore does not need a hardcoded owner edit. Cloudflare never uses temporary `CF_PAGES_URL` as canonical metadata. The current stable canonical is also shared with preview builds; change preview `VITE_SITE_URL` separately if a different indexing policy is wanted.

All `VITE_*` values are public build inputs. Keep credentials out of them. `.env.local` is ignored and does not configure hosted builds. The Cloudflare GitHub App was granted access only to `nexora-ai-template` and `atelier-no8-template`. No Cloudflare API token, Wrangler dependency or deploy branch is required. GitHub uses its built-in scoped token and pinned official Pages actions.

## Edit, validate and publish an update

In PowerShell, clone into a new directory, or open the existing clone:

```powershell
git clone https://github.com/monExcalibur/nexora-ai-template.git
if ($LASTEXITCODE -ne 0) { throw 'Clone failed.' }
Set-Location -LiteralPath nexora-ai-template
npm ci
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
npm run dev
```

Open [local development](http://127.0.0.1:4188/). Stop the dev server with Ctrl+C before reinstalling dependencies on Windows. Edit typed settings/content in `src/config/`; follow [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for real branding, licensed assets and destinations.

After editing, run:

```powershell
foreach ($checkName in @('format:check', 'typecheck', 'lint', 'test', 'audit:publication', 'build:github', 'build:cloudflare')) {
    npm run $checkName
    if ($LASTEXITCODE -ne 0) { throw "Check failed: $checkName" }
}
git status --short
git diff --check
git diff
```

Each named build replaces local `dist`; the last command above leaves a Cloudflare-root build. Build the target you intend to preview. A local GitHub preview needs `npm run preview -- --base=/nexora-ai-template/`; a Cloudflare preview uses `npm run preview -- --base=/`. Stop preview with Ctrl+C. Use HTTP, not a file URL.

Review the exact source changes and new files before staging. Stage only the intended files, for example `git add -- src/config/content.ts` when that is the file you changed. Then inspect `git diff --cached`, commit and push normally:

```powershell
git commit -m "Update portfolio content"
if ($LASTEXITCODE -ne 0) { throw 'Commit failed.' }
git push origin main
if ($LASTEXITCODE -ne 0) { throw 'Push failed.' }
```

Do not force-push or put a token in the remote URL. `.gitignore` excludes dependencies, `dist`, local environment files, credentials and temporary builds. Preserve third-party notices and review staged contents; pattern scanning cannot identify every sensitive value. The application source reuse license is a separate owner decision from included third-party licenses.

## Monitor both deployments

1. Open [GitHub Actions](https://github.com/monExcalibur/nexora-ai-template/actions), select the deployment run for the pushed commit and wait for both build and deploy jobs to succeed. Repository Settings → Pages uses GitHub Actions. A manual Run workflow is available for retry; leave the base override empty. Keep the portfolio demo settings enabled.
2. Open [Cloudflare dashboard](https://dash.cloudflare.com/), choose Workers & Pages → `nexora-ai-template` → Deployments. Confirm Production, `main`, the same source commit and a successful build. Automatic deployments must remain enabled. Details exposes installation/build/output logs.
3. Compare the commit shown on each platform with `git rev-parse HEAD`. One platform may finish earlier; a successful GitHub deployment does not prove Cloudflare succeeded.
4. On a failure, inspect the failing stage before retrying. Check repository access, root, Node version, lockfile, target build command, output directory and environment scope. GitHub failures retain the previous published release; inspect Cloudflare's current production deployment separately.

[Cloudflare Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) and [build settings](https://developers.cloudflare.com/pages/configuration/build-configuration/) describe the native connection. The integration is already active; do not create duplicate projects or switch to a Worker/direct upload to apply an ordinary update.

## Verify the public result

Open both public URLs after every material change and refresh once. Check browser Network/Console, successful JS/CSS/favicon requests and correct canonical URL. Task checkboxes, monthly/yearly pricing, FAQ disclosures and workflow run/reset. Check the mobile menu, keyboard close/focus behavior, desktop layout and narrow screens. Refresh `#features` at each base. Verify no horizontal page overflow or missing media.

Live QA for this deployment is recorded in `qa/live-github-http.json`, `qa/live-cloudflare-http.json`, `qa/live-deployment-checks.json` and `qa/live-*-desktop.jpg` / `qa/live-*-mobile.jpg`. HTTP checks include every local public asset and compare asset bytes with the source. Cloudflare normally redirects `.html` documents such as image credits to extensionless URLs; that is expected when the final response is correct. Tests are a dated snapshot, not a continuous uptime guarantee.

## Roll back a problematic release

Prefer restoring the source with a new commit so both platforms stay consistent:

```powershell
git log --oneline -5
# Replace BAD_COMMIT with the single problematic commit after reviewing it.
git revert BAD_COMMIT
if ($LASTEXITCODE -ne 0) { throw 'Resolve any revert conflicts before continuing.' }
# Run the checks above, then:
git push origin main
```

This preserves history and automatically builds the corrected source on both hosts. For several dependent commits, review the rollback scope before reverting; do not reset/force-push shared history. Monitor both deployments and verify both public URLs again.

For an immediate Cloudflare-only recovery, choose an earlier successful Production deployment's menu → **Rollback to this deployment**. Preview deployments cannot be used for production rollback. Follow with the source revert so a later push does not redeploy the faulty version. See [Cloudflare rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/). The two hosts have separate deployment histories; a rollback on one does not roll back the other.

## Domains and limitations

To add a custom domain later, associate it in the hosting platform first and follow its DNS/HTTPS steps. For Cloudflare, update production `VITE_SITE_URL` to the verified stable HTTPS root and rebuild; root base remains `/`. GitHub derives configured domain/base metadata through configure-pages. Verify both hosts after changing metadata. No domain purchase or DNS change was performed for this deployment.

The website uses one-page anchors and native dialogs, with no history router. Root and hash refreshes work; arbitrary nested application routes are not supported on GitHub Pages without a separately designed static-routing strategy. The workflow dialog has no independent URL and runs a fixed local example.

Demo form/workflow actions do not send messages, create accounts, charge payments, call live AI or save visitor data remotely. A real client edition needs valid destinations/backend services and renewed accessibility, security and visual checks. Brands, projects, metrics and pricing remain explicitly fictional. JavaScript is required for the page body; no CMS, analytics or backend was added.
