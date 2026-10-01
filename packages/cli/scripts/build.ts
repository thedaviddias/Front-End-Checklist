/**
 * Build the publishable CLI:
 * - dist/index.js: single-file ESM bundle (workspace packages inlined, so the
 *   published package has no private dependencies),
 * - dist/content.json: rules + checklists snapshot, so the CLI works offline
 *   and matches the installed version.
 */
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(packageRoot, '../..')
const distDir = path.join(packageRoot, 'dist')
const pkg: unknown = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf-8'))
const version = String(Reflect.get(Object(pkg), 'version'))

// The content loaders are TypeScript CommonJS modules; tsx makes them requireable.
const require = createRequire(import.meta.url)
const { loadLocalChecklists, loadLocalRules } = require('@repo/mcp/content-loader')

mkdirSync(distDir, { recursive: true })

const content = { rules: loadLocalRules(), checklists: loadLocalChecklists(repoRoot) }
writeFileSync(path.join(distDir, 'content.json'), JSON.stringify(content))

await build({
  entryPoints: [path.join(packageRoot, 'src/index.ts')],
  outfile: path.join(distDir, 'index.js'),
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  external: ['undici'],
  define: { __CLI_VERSION__: JSON.stringify(version) },
  banner: {
    js: [
      '#!/usr/bin/env node',
      "import { createRequire as __fecCreateRequire } from 'node:module';",
      'const require = __fecCreateRequire(import.meta.url);'
    ].join('\n')
  },
  legalComments: 'none',
  logLevel: 'warning'
})
chmodSync(path.join(distDir, 'index.js'), 0o755)

process.stdout.write(
  `Built @frontendchecklist/cli ${version}: ${content.rules.length} rules, ${content.checklists.length} checklists\n`
)
