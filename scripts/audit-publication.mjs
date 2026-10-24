import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { siteConfig } from '../src/config/siteConfig.ts'
import { flowpilotConfig } from '../src/config/examples/flowpilot.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  cwd: root,
  encoding: 'utf8',
}).trim()
const relative = path.relative(gitRoot, root).replaceAll('\\', '/')
const paths = execFileSync(
  'git',
  [
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
    '-z',
    '--',
    relative || '.',
    ...(relative ? ['.github/workflows/deploy-nexora.yml'] : []),
  ],
  { cwd: gitRoot, encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean)
const findings = []
const rules = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['github-token', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})\b/],
  ['aws-access-key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['service-secret', /\b(?:sk_live_[A-Za-z0-9]{16,}|sk-proj-[A-Za-z0-9_-]{20,})\b/],
  [
    'credential-assignment',
    /(?:api[_-]?(?:key|token)|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][A-Za-z0-9/+=_.-]{12,}["']/i,
  ],
]
let textFilesScanned = 0
for (const name of paths) {
  if (
    (/(?:^|\/)(?:\.env(?:\..+)?|\.dev\.vars(?:\..+)?|\.npmrc)$/.test(name) &&
      !/(?:^|\/)\.env\.example$/.test(name)) ||
    /\.(?:pem|key|p12|pfx)$/i.test(name)
  )
    findings.push({ file: name, line: 0, rule: 'sensitive-file' })
  if (/\.(?:webp|png|jpg|jpeg|woff2|zip|ico)$/i.test(name)) continue
  const data = await readFile(path.join(gitRoot, name))
  if (data.includes(0)) continue
  textFilesScanned += 1
  for (const [index, line] of data.toString('utf8').split(/\r?\n/).entries())
    for (const [rule, pattern] of rules)
      if (pattern.test(line)) findings.push({ file: name, line: index + 1, rule })
}
const required = new Set(['licenses/react-MIT.txt', 'licenses/lucide-LICENSE.txt'])
for (const config of [siteConfig, flowpilotConfig])
  for (const name of [config.brand.logo.src, config.seo.favicon, config.seo.socialImage])
    if (name && !/^https?:\/\//.test(name)) required.add(name)
const missingAssets = []
for (const name of required) {
  try {
    await readFile(path.join(root, 'public', name))
  } catch {
    missingAssets.push(name)
  }
}
const report = {
  scope: relative || '.',
  candidateFiles: paths.length,
  textFilesScanned,
  findings,
  missingAssets,
  assetsChecked: required.size,
  demo: {
    enabled: siteConfig.demoMode,
    fictional: siteConfig.brand.fictional,
    hasContactEmail: Boolean(siteConfig.brand.contactEmail),
    socialLinks: siteConfig.brand.socials.length,
  },
  limitations:
    'Pattern-based local candidate audit, not a complete security guarantee. Findings omit secret values. Review staged files before publication.',
}
const output = process.argv[2] || 'qa/publication-audit.json'
if (!/^qa\/[a-z0-9-]+\.json$/.test(output))
  throw new Error('Audit output must be a named JSON file inside qa/.')
await mkdir(path.join(root, 'qa'), { recursive: true })
await writeFile(path.join(root, output), JSON.stringify(report, null, 2) + '\n')
process.stdout.write(
  JSON.stringify({
    candidateFiles: paths.length,
    textFilesScanned,
    secretFindings: findings.length,
    missingAssets,
    demo: report.demo,
    report: output,
  }) + '\n',
)
if (findings.length || missingAssets.length) process.exitCode = 1
