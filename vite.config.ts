import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createSiteConfig } from './src/config/presets.ts'
import { themeCss } from './src/config/theme.ts'
import { metadataHtml } from './src/config/metadata.ts'
import { resolveBuildSettings } from './src/config/build.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteConfig = createSiteConfig({
    preset: env.VITE_SITE_PRESET,
    demoMode: env.VITE_DEMO_MODE,
    disabledSections: env.VITE_DISABLED_SECTIONS,
    base: env.VITE_BASE_PATH,
    siteUrl: env.VITE_SITE_URL,
  })
  const buildEnv = { ...process.env, ...env, VITE_SITE_URL: siteConfig.seo.siteUrl }
  const deployment = resolveBuildSettings(buildEnv, siteConfig.deployment.base)
  let resolvedBase = deployment.base
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'template-html',
        configResolved(config) {
          resolveBuildSettings(
            { ...buildEnv, VITE_BASE_PATH: config.base },
            siteConfig.deployment.base,
          )
          resolvedBase = config.base
        },
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html.replace(
              '<!-- template:head -->',
              `${metadataHtml(siteConfig, resolvedBase)}\n<style id="template-theme">${themeCss(siteConfig.theme)}</style>`,
            )
          },
        },
      },
    ],
    base: deployment.base,
    server: { port: 4188, strictPort: true },
    preview: { port: 4188, strictPort: true },
  }
})
