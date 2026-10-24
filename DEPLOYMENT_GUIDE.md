# Deploy Nexora AI

Cloudflare Pages connected to GitHub is the primary target. GitHub Pages remains an optional manual alternative. Source is provided through its standalone GitHub repository. Connecting a host and starting a public deployment are separate owner actions.

## 1. Open the standalone source repository

Use the public [Nexora AI repository](https://github.com/monExcalibur/nexora-ai-template). Its application files are at the repository root. Source upload does not activate hosting.

In PowerShell, clone into a new directory and run the source checks:

```powershell
git clone https://github.com/monExcalibur/nexora-ai-template.git
if ($LASTEXITCODE -ne 0) { throw 'Clone failed.' }
Set-Location -LiteralPath nexora-ai-template
npm ci
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
foreach ($checkName in @('format:check', 'typecheck', 'lint', 'test', 'audit:publication', 'build')) {
    npm run $checkName
    if ($LASTEXITCODE -ne 0) { throw "Check failed: $checkName" }
}
```

The default branch is `main`. For later changes, review `git status` and the diff, run checks, stage only the intended project files, commit and push normally. Never force-push or add tokens to remote URLs. `.gitignore` excludes dependencies, `dist`, credentials, local environments and temporary builds; `.env.example` contains public settings only. Source, public assets/notices, lockfile, checks, documentation and the manual workflow belong in Git.

Choose an application reuse license deliberately; third-party asset/library licenses remain separate. Earlier plans/QA are dated historical records, while this guide describes the standalone repository. Review staged contents before every public push; pattern scanning cannot detect every possible sensitive value.

## 2. Connect GitHub to Cloudflare Pages

In the Cloudflare dashboard, open **Workers & Pages**, create an application and select **Pages → Connect to Git** (the Git import option). Choose GitHub, authorize access to the intended repository and select it. Use the Pages flow, not a Workers deployment requiring a Worker entry point. Set the production branch to `main`.

Cloudflare's [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/) describes the connection and first deployment flow. No Cloudflare token or Wrangler dependency needs to be added to this static application.

## 3. Build and environment settings

| Setting | Value |
| --- | --- |
| Framework preset | React (Vite), or None with the explicit settings below |
| Production branch | `main` |
| Root directory, dedicated repository | Repository root (leave the optional field empty) |
| Root directory, current shared layout | `nexora-ai` |
| Build command | `npm run build` |
| Build output directory | `dist` (relative to the selected root) |
| `NODE_VERSION`, Production and Preview | `22` (current Node 22 release, minimum 22.19) |
| `VITE_BASE_PATH`, Production and Preview | `/` |
| `VITE_SITE_PRESET` | `nexora` |
| `VITE_DEMO_MODE` | `true` |
| `VITE_DISABLED_SECTIONS` | Empty |
| `VITE_SITE_URL`, Production | Initially unset, then the actual stable HTTPS homepage URL |
| `VITE_SITE_URL`, Preview | Leave unset for this default demo |

Cloudflare installs dependencies before the build. Commit `package-lock.json`; the local release procedure and GitHub workflow also verify a clean `npm ci`. `.node-version` selects Node 22, and setting `NODE_VERSION=22` explicitly makes the dashboard requirement clear. Use Node 22.19 or newer to satisfy the application engine. Build/output/root settings follow [Cloudflare's build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/); supported Node overrides are documented in the [build image reference](https://developers.cloudflare.com/pages/configuration/build-image/).

Cloudflare provides `CF_PAGES=1`. Vite uses `/` for this target and rejects a conflicting non-root `VITE_BASE_PATH`. Without Cloudflare, the existing portable default remains `./`; explicit GitHub Pages subpaths still work. No source-directory prefix belongs in a Cloudflare public URL, even when the repository root setting is `nexora-ai`.

`VITE_*` values are public build inputs, not secret storage. `.env.local` is ignored and will not configure a remote build; set values in the Pages dashboard for the appropriate Production/Preview environment. Do not add `.env.local` to Git.

Use the stable site URL returned after the first deployment for production `VITE_SITE_URL`, including the trailing `/`, then rebuild. It generates canonical metadata and resolves an optional configured social image to an absolute URL. No social image is bundled by default. A configured Cloudflare URL must be an HTTPS root URL with no credentials, query or fragment. The application deliberately does not use the temporary `CF_PAGES_URL` as its canonical address. On preview builds, leave `VITE_SITE_URL` unset and retain the blank `seo.siteUrl` default, or explicitly use your stable production URL if that matches your indexing policy.

## 4. Deploy and verify

Selecting **Save and Deploy** creates the first public deployment. Check the install/build logs and wait for a successful deployment status before using the returned URL. No URL is asserted to be live in this repository.

At the returned address, verify:

1. Homepage and direct refresh, then `/#features` and `/licenses/react-MIT.txt`.
2. Logo/favicon/CSS/JS requests with no 404s or localhost URLs.
3. Mobile menu, task checkboxes, pricing and workflow dialog, Escape/focus restoration, FAQ disclosures and workflow run/reset.
4. Responsive layouts at 320, 375, 768, 1024, 1440 and 1920px, plus keyboard focus and reduced-motion preference.
5. Page title/favicon, visible concept labels, canonical and social image URL after configuring the production address.

Only `dist` is hosted: source docs, tests, raw QA and dependencies are not deployment assets. The site uses anchors and a native demo dialog and has no separate application routes. Cloudflare Pages has [default SPA fallback behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/) when no top-level `404.html` exists; this application needs no extra router rewrite. Adding routes later requires testing their semantics and refresh behavior separately.

## 5. Automatic updates

After Git integration is enabled, pushes to the production branch trigger a build/deployment. Other enabled branches can receive preview deployments. Run checks and review changes before pushing. Branch controls can disable automatic builds if needed; [Cloudflare's Git integration reference](https://developers.cloudflare.com/pages/configuration/git-integration/) explains production/preview controls. The retained GitHub Pages workflow has no push trigger, so it does not also publish automatically.

Review failed builds under the deployment's build log. Confirm root directory, Node version, public base, environment scope and output directory. A successful local build does not prove that account permissions or the remote build environment are configured correctly.

## 6. Add a custom domain later

In the Pages project, select **Custom domains → Set up a custom domain** and add the domain there first. Follow the DNS instructions provided for that domain. An apex domain requires the domain to be a zone on the Cloudflare account with the appropriate nameservers; an externally managed subdomain can use a CNAME pointing to the assigned Pages hostname. Merely adding a DNS CNAME without associating the domain with Pages is insufficient. See [Cloudflare's custom domain guide](https://developers.cloudflare.com/pages/configuration/custom-domains/).

Wait for domain/HTTPS activation, set production `VITE_SITE_URL` to the new stable `https://your-domain/` address, retain `VITE_BASE_PATH=/` and rebuild. Verify the new domain, static assets, canonical and social preview before sharing it. DNS propagation and certificate activation are owner-side deployment checks, not locally verified results.

## GitHub Pages alternative

Keep `.github/workflows/deploy.yml` and follow [PUBLISHING.md](PUBLISHING.md). That manual workflow reads GitHub Pages metadata and sets its own base/canonical variables; Cloudflare's environment settings do not apply to it. The workflow is manual-only and source pushes do not run it. Choose which site URL to present as the primary portfolio address.

In the shared workspace, Nexora uses `.github/workflows/deploy-nexora.yml`; the existing Atelier `.github/workflows/deploy.yml` is preserved. A dedicated Nexora repository uses its own `.github/workflows/deploy.yml`.

The two shared-root workflows publish to the same repository Pages address. Use separate repositories for independent Atelier and Nexora GitHub Pages sites; selecting Nexora in a shared repository replaces its current Pages deployment.
