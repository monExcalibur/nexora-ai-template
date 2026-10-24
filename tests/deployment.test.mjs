import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { parseDocument } from 'yaml'
import { resolvePagesSettings } from '../scripts/pages-settings.mjs'

const workflowFile = new URL('../.github/workflows/deploy.yml', import.meta.url)
const source = readFileSync(workflowFile, 'utf8')
const document = parseDocument(source, { uniqueKeys: true })
const workflow = document.toJS()

test('workflow is valid YAML with main pushes and manual dispatch', () => {
  assert.deepEqual(document.errors, [])
  assert.deepEqual(Object.keys(workflow.on).sort(), ['push', 'workflow_dispatch'])
  assert.deepEqual(workflow.on.push.branches, ['main'])
  assert.equal(workflow.on.workflow_dispatch.inputs.base_path.default, '')
})
test('build verifies locked source, defaults to honest demo and uploads dist only', () => {
  const steps = workflow.jobs.build.steps
  assert.ok(steps.some((step) => step.run === 'npm ci'))
  const verify = steps.find((step) => step.name === 'Verify source and deployment contracts').run
  for (const command of [
    'npm run typecheck',
    'npm run lint',
    'npm test',
    'npm run audit:publication',
  ])
    assert.ok(verify.includes(command))
  assert.equal(workflow.on.workflow_dispatch.inputs.demo_mode.default, true)
  assert.equal(workflow.on.workflow_dispatch.inputs.site_preset.default, 'nexora')
  assert.equal(
    steps.find((step) => step.run === 'npm run build:github').env.VITE_DEMO_MODE,
    "${{ github.event_name == 'workflow_dispatch' && inputs.demo_mode == false && 'false' || 'true' }}",
  )
  assert.equal(
    steps.find((step) => step.uses?.startsWith('actions/upload-pages-artifact@')).with.path,
    '${{ steps.project.outputs.directory }}/dist',
  )
})
test('deployment waits for a successful build and has scoped Pages permissions', () => {
  assert.equal(workflow.jobs.deploy.needs, 'build')
  assert.equal(workflow.jobs.deploy.environment.name, 'github-pages')
  assert.equal(workflow.jobs.deploy.permissions.pages, 'write')
  assert.equal(workflow.jobs.deploy.permissions['id-token'], 'write')
  assert.equal(workflow.jobs.build.permissions.pages, 'read')
  for (const job of Object.values(workflow.jobs))
    for (const step of job.steps) {
      if (step.uses) assert.match(step.uses, /^actions\/[a-z-]+@[a-f0-9]{40}$/)
    }
})
test('legacy shared workflow comparison applies only inside a shared Git root', () => {
  const projectRoot = fileURLToPath(new URL('../', import.meta.url))
  const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: projectRoot,
    encoding: 'utf8',
  }).trim()
  if (path.resolve(gitRoot) === path.resolve(projectRoot)) return
  const workspace = new URL('../../.github/workflows/deploy-nexora.yml', import.meta.url)
  if (existsSync(workspace) && readFileSync(workspace, 'utf8').includes('name: Deploy Nexora AI'))
    assert.equal(readFileSync(workspace, 'utf8'), source)
})
test('repository, user site and custom-domain paths resolve from real Pages metadata', () => {
  assert.deepEqual(
    resolvePagesSettings({
      repository: 'maker/nexora-ai',
      pagesBasePath: '/nexora-ai',
      pagesUrl: 'https://maker.github.io/nexora-ai',
    }),
    { base: '/nexora-ai/', canonical: 'https://maker.github.io/nexora-ai/' },
  )
  assert.deepEqual(resolvePagesSettings({ repository: 'Maker/maker.github.io' }), {
    base: '/',
    canonical: undefined,
  })
  assert.deepEqual(
    resolvePagesSettings({
      repository: 'maker/nexora-ai',
      pagesBasePath: '',
      pagesUrl: 'https://studio.example',
      requestedBasePath: '/',
    }),
    { base: '/', canonical: 'https://studio.example/' },
  )
  assert.equal(
    resolvePagesSettings({ repository: 'maker/Another-Portfolio' }).base,
    '/Another-Portfolio/',
  )
})
test('incorrect subpaths and unsafe canonical values fail before deployment', () => {
  assert.throws(
    () =>
      resolvePagesSettings({
        repository: 'maker/repo',
        pagesBasePath: '/repo',
        requestedBasePath: '/',
      }),
    /differs/,
  )
  for (const base of ['repo/', '/repo', '//repo/', '/../', '/./', '/repo/\nEVIL=x/'])
    assert.throws(() => resolvePagesSettings({ repository: 'maker/repo', requestedBasePath: base }))
  for (const url of [
    'http://studio.example/repo',
    'https://user:password@studio.example/repo',
    'https://studio.example/repo?x=y',
    'https://studio.example/wrong',
  ])
    assert.throws(() =>
      resolvePagesSettings({ repository: 'maker/repo', pagesBasePath: '/repo', pagesUrl: url }),
    )
})
test('the actual CLI writes only matching public build variables to GITHUB_ENV', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'nexora-pages-'))
  const envFile = path.join(directory, 'github-env')
  writeFileSync(envFile, '')
  try {
    execFileSync(
      process.execPath,
      [fileURLToPath(new URL('../scripts/pages-settings.mjs', import.meta.url))],
      {
        env: {
          ...process.env,
          GITHUB_REPOSITORY: 'maker/nexora-ai',
          PAGES_BASE_PATH: '/nexora-ai',
          PAGES_URL: 'https://maker.github.io/nexora-ai',
          REQUESTED_BASE_PATH: '',
          GITHUB_ENV: envFile,
        },
      },
    )
    assert.equal(
      readFileSync(envFile, 'utf8'),
      'VITE_BASE_PATH=/nexora-ai/\nVITE_SITE_URL=https://maker.github.io/nexora-ai/\n',
    )
  } finally {
    rmSync(envFile)
    rmdirSync(directory)
  }
})
