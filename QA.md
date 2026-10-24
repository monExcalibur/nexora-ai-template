# Nexora AI — QA record

Verified locally on 23 October 2026 using Node 22.19.0 / npm 11.11.0 on Windows and the Chromium-based in-app browser. This is an execution record, not a claim of automated cross-browser certification.

## Commands executed

| Check                                 | Result                                                 |
| ------------------------------------- | ------------------------------------------------------ |
| Dependency installation and npm audit | Pass; 175 packages audited, 0 reported vulnerabilities |
| `npm run typecheck`                   | Pass; strict TypeScript and unused-code checks         |
| `npm run lint`                        | Pass; ESLint and React Hooks rules                     |
| `npm run format:check`                | Pass                                                   |
| `npm run build`                       | Pass; static production output in `dist`               |
| `git diff --check`                    | Pass; new files reviewed separately because untracked  |

The first attempt to refresh the pinned lockfile offline missed an optional cross-platform package in the isolated npm cache. Re-running lockfile synchronization with registry access succeeded. This is resolved.

A clean `npm ci` initially encountered Windows EPERM because a running Vite preview held a native CSS module open. Stopping the owned preview processes resolved it. The repeated clean installation installed 174 packages, audited 175 with zero reported vulnerabilities, and passed typecheck, lint, formatting, and production build. Tailwind source discovery is scoped to `src`, so documentation and QA evidence do not influence generated utility CSS.

## Browser interaction evidence

- Mobile menu opened, Escape dismissed it, expanded state updated, and a Pricing link closed it and navigated to `#pricing`.
- Monthly pricing: `$0 / $19 / $49`. Yearly equivalents: `$0 / $15 / $39`, with `$180` and `$468` yearly totals. Switching back restored monthly prices.
- Every CTA opened a meaningful local demo: header, hero, dashboard suggestion, all three plans, final CTA, and footer.
- Selected Pro yearly billing appeared correctly in the dialog.
- Running the sample workflow revealed a fixed example and “Nothing was sent”; reset restored the starting state.
- Dialog Escape closed it and restored focus to the initiating button.
- Forward Tab from the final control wrapped to Close; Shift+Tab wrapped back. Explicit looping was added after observing native focus escape to browser chrome.
- Each of six FAQ disclosures opened, closing the previous answer; Enter closed the final answer.
- Toggling the first task changed completed tasks from 18 to 19 and back.
- All local anchor targets exist; one H1, six feature articles, and no unnamed buttons were found.
- Development and production browser console logs contained no captured errors or warnings.
- No external scripts, styles, remote images, or font requests are introduced by the production source. UI charts use accessible textual descriptions or decorative-hidden markup.
- Scroll-reveal observer activated in actual page navigation. Reduced-motion CSS disables animation, transitions, smooth scrolling and hover movement; the hook skips/removes hidden states for that preference. System preference changes were reviewed in source, not emulated.

Machine-readable assertions: `qa/browser-evidence.json` contains 38 passing browser checks, including a final production regression after the clean install. Viewport measurements were taken after screenshot rendering to ensure each resize had applied. The browser API exposes a restricted read-only evaluation scope; resource timing APIs were unavailable, so local resource verification used DOM asset references, production HTTP checks, and source inspection.

## Responsive review

| Requested viewport | Available document width | Document scroll width | Horizontal overflow |
| ------------------ | ------------------------ | --------------------- | ------------------- |
| 320                | 305                      | 305                   | None                |
| 375                | 360                      | 360                   | None                |
| 768                | 753                      | 753                   | None                |
| 1024               | 1009                     | 1009                  | None                |
| 1440               | 1425                     | 1425                  | None                |
| 1920               | 1905                     | 1905                  | None                |

The 15px difference is the browser scrollbar. Initial 320px overflow came from a `body` minimum width and was fixed without hiding overflow. Mobile hero wrapping and content readability were refined after screenshots. The dashboard sidebar is omitted on small screens, the momentum chart becomes a compact overview, feature content recomposes, pricing stacks, and mobile navigation becomes a disclosure menu.

Full-page screenshots were captured at all six widths in `qa/screenshots/layout-WIDTH.jpg`. Desktop/tablet compositions and mobile hero, menu, pricing, and dialog states were visually reviewed. Screenshots are local QA artifacts ignored by Git, so they do not inflate a source repository or deployment.

## Production and GitHub Pages subpath

The built output was served at `http://127.0.0.1:4190/portfolio-demo/` using Vite preview with a base override. HTML, the JavaScript bundle, CSS, and favicon each returned HTTP 200 with appropriate MIME types. The real browser rendered the page, followed `#features`, and opened the selected Pro demo under this prefix. Built asset references are relative.

Production assets at the verified build:

- JavaScript: 264.18 kB, 81.10 kB gzip.
- CSS: 48.40 kB, 11.66 kB gzip.
- HTML: approximately 0.77 kB; favicon: original small SVG.

No raster imagery, video, web-font downloads, live AI SDK, router, or animation runtime is required. A single static page keeps deployment simple; no Lighthouse score is claimed.

## Manual regression checklist

1. Run the command checks above and serve development or production output.
2. At 320/375px, open navigation, Tab to its links, press Escape, reopen it and follow a section.
3. Switch billing both ways; compare numeric prices and full annual totals.
4. Open each plan; confirm the selection, run/reset the example, and test Tab / Shift+Tab / Escape and focus restoration.
5. Expand every FAQ with mouse and keyboard; verify exclusive opening.
6. Toggle every dashboard task; check the count and visible focus ring.
7. Review all six widths, including pricing, feature illustrations and an open dialog; check document width against scroll width.
8. In browser developer tools, emulate `prefers-reduced-motion: reduce`, reload, then turn it on while viewing the page. Confirm visible content and no entrance/scroll/hover movement.
9. Build and preview with a repository base; verify relative assets, anchors, and interaction state.

## Remaining verification limits

No known critical implementation issue remains. System-level reduced-motion emulation, real assistive screen readers, Safari/Firefox, Lighthouse, remote GitHub Actions execution, and live GitHub Pages deployment were not performed. The deployment workflow is intentionally inactive and manual-only. No publishing or external messaging occurred. Existing sibling projects were preserved.
