# Nexora AI: deployment execution plan

Created 2026-10-24 before deployment configuration changes. Authorized scope: deploy this existing template to GitHub Pages and Cloudflare Pages with automatic production builds from main; no redesign, force-push or unrelated repository change.

## 1. Repository audit

- [x] Inspect source, package scripts, Vite configuration, documentation and existing manual workflow.
- [x] Verify clean independent Git root, correct origin, public GitHub repository/main and administrator permissions.
- [x] Check Cloudflare tools/environment/browser access and record any required owner action.
- [x] Preserve starting commit and source/public asset hashes before implementation.

Verified: repository monExcalibur/nexora-ai-template; origin matches, admin/maintain/push allowed, Pages not yet configured. CLI identity monExcalibur is authenticated. No local Cloudflare credential/tool was found; Chrome reaches the sign-in page. Owner login requested while independent GitHub work continues. Existing official action pins checked against stable tags; setup-node v7 has a newer commit to pin.

## 2. Deployment architecture

- [x] Add build:github and build:cloudflare commands with isolated public bases and validated metadata.
- [x] Derive GitHub owner/repository from Actions or origin, preserving local dev/build and typed customization.
- [x] Keep root Cloudflare build free of guessed canonical URLs and temporary CF_PAGES_URL values.
- [x] Add meaningful contracts; preserve source, UI, demo mode and all third-party notices.

## 3. GitHub Pages configuration

- [x] Update official-action workflow for main pushes plus manual runs, locked install, checks, correct build/dist, scoped permissions and safe concurrency.
- [x] Configure Pages through the API to use GitHub Actions; confirm the actual base/URL.
- [x] Verify maintained pinned action versions and branch protection/environment requirements.

## 4. Cloudflare Pages configuration

- [ ] After owner login, inspect the intended account and existing projects; avoid overwriting unrelated projects.
- [ ] Connect GitHub repository nexora-ai-template using native Git integration, production branch main.
- [ ] Configure build:cloudflare, dist, Node 22 and root base; enable automatic production deployment.
- [ ] Resolve the actual project hostname and stable production metadata. Ask only for genuinely required login/installation authorization.

## 5. Build verification

- [x] Clean locked install, TypeScript, lint, formatting, all tests and publication audit.
- [x] Build each named target separately; inspect HTML/JS/CSS, public assets/favicon, notices and host-specific URLs.
- [x] Confirm no localhost, secrets, development client or unresolved metadata in production output.

## 6. Deployment execution

- [ ] Commit/push verified configuration normally, trigger/observe GitHub Actions and fix any failures.
- [ ] Observe native Cloudflare Git build/deploy logs and confirm a successful production deployment.
- [ ] Verify main-push automation on both platforms against source commit IDs.

## 7. Public URL verification

- [ ] Verify HTTPS and all required resource requests at both actual public URLs.
- [ ] Open each hosted website in a browser; check desktop/mobile, navigation, menus, demo and project-specific interactions.
- [ ] Refresh base/hash deep links and check console; do not claim unexecuted checks.
- [ ] Record screenshots/results and distinguish pending targets from live verified deployments.

## 8. Final documentation

- [ ] Update README and deployment guide with actual URLs/status, commands, automation, monitoring and safe rollback instructions.
- [ ] Record results and remaining limits, update this checklist and commit/push final documentation.
- [ ] Verify the last source commit and hosted deployments, clean Git state, retained notices and unchanged UI/assets.

No URL is considered live until deployment and public testing succeed. Cloudflare Git integration will not be silently replaced by direct upload or a different hosting service.

Architecture/build phases verified: both named targets and all contracts pass; GitHub base derives from actual origin, Cloudflare uses root, and only the GitHub target emits its derived canonical. The new URL test was corrected for standard lowercase hostname normalization and reformatted. Clean npm ci reported zero vulnerabilities; UI/public asset hashes are unchanged. Owner completed Cloudflare login; native Pages source configuration continues in Chrome.

GitHub configuration verified: Pages API build_type=workflow, actual destination https://monexcalibur.github.io/nexora-ai-template/; workflow supports push main and manual dispatch, pinned stable official actions (setup-node v7 refreshed), scoped permissions and dist-only artifact. URL is configured, not yet verified as deployed.
