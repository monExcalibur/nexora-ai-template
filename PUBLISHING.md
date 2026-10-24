# GitHub Pages publishing

This repository is already published at [https://monexcalibur.github.io/nexora-ai-template/](https://monexcalibur.github.io/nexora-ai-template/) and also at [https://nexora-ai-template.pages.dev/](https://nexora-ai-template.pages.dev/). [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) is the current guide for both platforms, updates, monitoring and rollback.

`.github/workflows/deploy.yml` automatically runs on pushes to `main` and supports manual workflow dispatch. Repository Settings → Pages uses GitHub Actions. The official pinned actions install locked dependencies, verify source/tests/publication safety, run `npm run build:github`, upload only `dist` and deploy after a successful build. No personal deploy token is required.

For a manual retry, open [Actions](https://github.com/monExcalibur/nexora-ai-template/actions), choose the Pages deployment workflow and Run workflow on `main`. Leave `base_path` empty; use the existing portfolio preset/demo defaults. Check both build and deploy jobs, then open the public URL. Cloudflare has a separate native Git build from the same source.

The GitHub-specific command derives owner/repository from Actions or `origin`. `actions/configure-pages` supplies the actual base/URL; validation rejects conflicting overrides. Locally, run `npm run build:github`, then `npm run preview -- --base=/nexora-ai-template/`. The default local build remains portable and Cloudflare uses its own root build.

The two templates use independent GitHub repositories and independent Pages projects. Parent shared-workspace workflows are legacy copies and are not used by these standalone production repositories.

Routing uses anchors and native dialogs. The workflow dialog has no independent URL and runs a fixed local example. A future history router would need its own static-hosting-compatible refresh strategy. See the deployment guide for the complete verification checklist and limitations.
