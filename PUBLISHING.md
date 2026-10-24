# Optional deployment: GitHub Pages

The primary target is Cloudflare Pages. [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) contains source setup, checks and hosting settings. Uploading source to GitHub does not enable Pages; follow this alternative only when deliberately choosing GitHub Pages hosting.

## Manual activation

1. Commit the canonical `.github/workflows/deploy.yml` on the default branch. The project copy supports a standalone repository; the matching shared-root copy supports `nexora-ai/` nested source.
2. In repository **Settings → Pages**, select **GitHub Actions** as the source.
3. In **Actions**, select **Deploy Nexora AI to GitHub Pages → Run workflow**, branch `main`. Leave `base_path` empty.
4. Wait for both build and deploy to succeed; satisfy any separately configured environment protection rule.
5. Open the actual URL returned by the deployment, refresh and perform the hosted checks in DEPLOYMENT_GUIDE.md. A normal project URL has the shape `https://YOUR_USERNAME.github.io/REPOSITORY/`; this is not a live-site claim.

The workflow is manual-only, uses locked dependencies and pinned action revisions, runs source checks and publishes only `dist`. It defaults to the Nexora demo; optional site_preset and demo_mode inputs retain the existing template choices. Keep demo_mode enabled for the portfolio edition. No committed token is required; GitHub's built-in token receives scoped Pages/OIDC deployment permissions.

## Base and metadata

`actions/configure-pages` supplies the actual site's base/path URL. `scripts/pages-settings.mjs` validates it and exports `VITE_BASE_PATH` and `VITE_SITE_URL`. Repository-name fallback is `/REPOSITORY/`; an account site named `ACCOUNT.github.io` or a configured root custom domain uses `/`. An explicit `base_path` override must match the actual Pages metadata. Configure a custom domain in Pages settings before trying a root override.

For a local subpath preview in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/nexora-ai-template/'
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    npm run preview -- --base=/nexora-ai-template/
    # Open http://127.0.0.1:4188/nexora-ai-template/; stop with Ctrl+C.
} finally {
    Remove-Item Env:VITE_BASE_PATH -ErrorAction SilentlyContinue
}
```

For manual canonical metadata, also set the real intended HTTPS homepage through `VITE_SITE_URL`, with its matching subpath. Local defaults remain portable `./` and a blank canonical. Vite's CLI `--base` takes precedence; keep manually supplied base/URL paths consistent. Cloudflare uses root `/` and a separate dashboard environment; do not inject `CF_PAGES=1` into this workflow.

The site uses anchors and a native demo dialog, so refresh at its configured base needs no router fallback. The workflow dialog has no independent URL. GitHub Pages has no server rewrite configuration; adding a history router requires a separately tested static routing strategy.

If metadata lookup fails, enable Pages before starting the workflow. For permission failures, inspect repository/organization Actions policy and the `github-pages` environment. For asset 404s, check the actual repository/domain configuration and rebuild after changes.

References: [Vite static deployment](https://vite.dev/guide/static-deploy.html), [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The shared workspace Nexora workflow is `.github/workflows/deploy-nexora.yml`; leave Atelier's existing `deploy.yml` unchanged. The new Nexora workflow retains preset and demo-mode inputs.

Both shared-root workflows target the same repository's `github-pages` environment and public address. Running the Nexora workflow there replaces that repository's deployed Pages site. Use the dedicated Nexora repository described in DEPLOYMENT_GUIDE.md for independent live demonstrations.
