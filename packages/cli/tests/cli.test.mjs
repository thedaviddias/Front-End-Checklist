// Tests run against the built bundle (dist/index.js), i.e. exactly what ships to npm.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bin = path.join(packageRoot, 'dist/index.js')
const sample = path.join(mkdtempSync(path.join(tmpdir(), 'fec-cli-')), 'page.html')
writeFileSync(
  sample,
  '<html><body><img src="hero.png"><div onclick="go()">Buy</div><a href="#">click here</a></body></html>'
)

/**
 * Run the CLI with piped stdout (so JSON is the default output).
 *
 * @param {string[]} args - CLI arguments.
 * @param {string} [input] - Optional stdin.
 * @returns {{ status: number | null, stdout: string, stderr: string, json: () => any }}
 */
function run(args, input) {
  const result = spawnSync(process.execPath, [bin, ...args], { encoding: 'utf-8', input })
  return { ...result, json: () => JSON.parse(result.stdout) }
}

test('prints the package version', () => {
  const pkg = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf-8'))
  assert.equal(run(['--version']).stdout.trim(), pkg.version)
})

test('schema describes every command and the exit-code contract', () => {
  const schema = run(['schema']).json()
  assert.deepEqual(
    schema.commands.map(c => c.name),
    [
      'review',
      'audit',
      'search',
      'rule',
      'checklists',
      'checklist',
      'categories',
      'schema',
      'skill'
    ]
  )
  assert.deepEqual(Object.keys(schema.exitCodes), ['0', '1', '2'])
})

test('search returns JSON when piped', () => {
  const result = run(['search', 'contrast', '-n', '3'])
  assert.equal(result.status, 0)
  const body = result.json()
  assert.equal(body.command, 'search')
  assert.equal(body.rules.length, 3)
  assert.ok(body.rules.some(r => r.slug === 'color-contrast'))
})

test('rule returns full guidance with an absolute URL', () => {
  const { rule } = run(['rule', 'alt-text']).json()
  assert.equal(rule.slug, 'alt-text')
  assert.match(rule.url, /^https:\/\//)
  assert.ok(rule.prompts.fix.length > 0)
})

test('review exits 1 only when findings meet --fail-on', () => {
  const plain = run(['review', sample])
  assert.equal(plain.status, 0)
  assert.ok(plain.json().findings.length > 0)

  const gated = run(['review', sample, '--fail-on', 'low'])
  assert.equal(gated.status, 1)
  assert.ok(gated.json().failing > 0)
})

test('review reads stdin with -', () => {
  const body = run(['review', '-'], readFileSync(sample, 'utf-8')).json()
  assert.equal(body.files, 1)
  assert.equal(body.findings[0].target, 'stdin')
})

test('checklists and categories list content', () => {
  assert.ok(run(['checklists']).json().checklists.length > 0)
  assert.ok(
    run(['categories'])
      .json()
      .categories.some(c => c.name === 'accessibility')
  )
  const first = run(['checklists']).json().checklists[0].slug
  assert.ok(run(['checklist', first]).json().rules.length > 0)
})

test('errors exit 2 with a JSON error payload', () => {
  for (const args of [
    ['frobnicate'],
    ['rule', 'no-such-rule'],
    ['search', '--focus', 'nope'],
    ['review']
  ]) {
    const result = run(args, '')
    assert.equal(result.status, 2, `exit code for ${args.join(' ')}`)
    if (result.stdout) assert.ok(result.json().error)
  }
})

test('keeps the pre-1.0 --categories and --format console aliases', () => {
  const result = run(['search', '--categories', 'seo', '-n', '1'])
  assert.equal(result.status, 0)
  assert.equal(run(['categories', '--format', 'console']).status, 0)
})

test('skill prints the bundled SKILL.md', () => {
  assert.match(run(['skill']).stdout, /^---\nname: frontendchecklist/)
})

test('the npm tarball ships the bundle, content snapshot, and skill', () => {
  const pack = spawnSync('pnpm', ['pack', '--dry-run', '--json'], {
    cwd: packageRoot,
    encoding: 'utf-8'
  })
  assert.equal(pack.status, 0, pack.stderr)
  const files = JSON.parse(pack.stdout).files.map(f => f.path)
  for (const required of [
    'dist/index.js',
    'dist/content.json',
    'SKILL.md',
    'README.md',
    'package.json'
  ]) {
    assert.ok(files.includes(required), `tarball missing ${required}`)
  }
  assert.ok(!files.some(f => f.startsWith('src/')), 'tarball must not ship sources')
  const pkg = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf-8'))
  assert.deepEqual(Object.keys(pkg.dependencies), ['undici'], 'only public runtime dependencies')
})
