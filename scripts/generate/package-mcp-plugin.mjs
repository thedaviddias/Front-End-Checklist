import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const plugin = path.join(root, 'plugins/front-end-checklist')
const manifest = JSON.parse(readFileSync(path.join(plugin, '.codex-plugin/plugin.json'), 'utf8'))

/** Enumerate regular skill files without following links outside the package. */
function skillFiles(directory) {
  return readdirSync(path.join(plugin, directory))
    .sort()
    .flatMap(name => {
      const file = path.posix.join(directory, name)
      const stat = lstatSync(path.join(plugin, file))
      if (stat.isSymbolicLink()) throw new Error(`Symlink is not allowed: ${file}`)
      return stat.isDirectory() ? skillFiles(file) : [file]
    })
}

if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('Expected a release version')
const files = [
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.mcp.json',
  'LICENSE',
  'README.md',
  'assets/logo.png',
  ...skillFiles('skills/frontend-checklist-global')
].sort()
for (const file of files) {
  if (!lstatSync(path.join(plugin, file)).isFile()) throw new Error(`Not a regular file: ${file}`)
}
const outputDirectory = path.join(root, '.artifacts/mcp-publication')
mkdirSync(outputDirectory, { recursive: true })
const output = path.join(outputDirectory, `front-end-checklist-${manifest.version}.zip`)
// zip updates existing archives; unlink first so deleted files cannot survive a rebuild.
if (existsSync(output)) unlinkSync(output)
execFileSync('zip', ['-X', '-q', output, ...files], { cwd: plugin })
const digest = createHash('sha256').update(readFileSync(output)).digest('hex')
process.stdout.write(
  `${output}\nSHA256 ${digest}\n${files.length} allowlisted files; draft package, not submitted.\n`
)
