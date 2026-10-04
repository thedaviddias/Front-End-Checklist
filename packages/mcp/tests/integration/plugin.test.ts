import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { MCP_SERVER_INFO } from '../../src/server'

/**
 * The Claude Code / Codex plugin in plugins/front-end-checklist ships a copy of
 * the global skill and pins the server version, so it can silently drift from
 * the source of truth. These checks keep it in lockstep.
 */
const REPO_ROOT = path.resolve(__dirname, '../../../..')
const PLUGIN_DIR = path.join(REPO_ROOT, 'plugins/front-end-checklist')
const GLOBAL_SKILL = 'skills/frontend-checklist-global'

function readJson(file: string): Record<string, unknown> {
  return JSON.parse(readFileSync(file, 'utf8'))
}

function listFiles(dir: string, prefix = ''): string[] {
  return readdirSync(dir).flatMap(entry => {
    const relative = path.join(prefix, entry)
    return statSync(path.join(dir, entry)).isDirectory()
      ? listFiles(path.join(dir, entry), relative)
      : [relative]
  })
}

describe('front-end-checklist plugin', () => {
  it('ships an identical copy of the global skill', () => {
    const source = path.join(REPO_ROOT, GLOBAL_SKILL)
    const copy = path.join(PLUGIN_DIR, GLOBAL_SKILL)

    expect(listFiles(copy).sort()).toEqual(listFiles(source).sort())
    for (const file of listFiles(source)) {
      // Regenerate with `pnpm generate:skills` when this fails.
      expect(readFileSync(path.join(copy, file), 'utf8')).toBe(
        readFileSync(path.join(source, file), 'utf8')
      )
    }
  })

  it('keeps plugin, registry, and server versions in sync', () => {
    const serverJson = readJson(path.join(REPO_ROOT, 'packages/mcp/server.json'))
    const claudePlugin = readJson(path.join(PLUGIN_DIR, '.claude-plugin/plugin.json'))
    const codexPlugin = readJson(path.join(PLUGIN_DIR, '.codex-plugin/plugin.json'))

    expect(serverJson.version).toBe(MCP_SERVER_INFO.version)
    expect(claudePlugin.version).toBe(MCP_SERVER_INFO.version)
    expect(codexPlugin.version).toBe(MCP_SERVER_INFO.version)
  })

  it('points the bundled MCP config at the registry remote', () => {
    const serverJson = readJson(path.join(REPO_ROOT, 'packages/mcp/server.json')) as {
      remotes: { url: string }[]
    }
    const mcpConfig = readJson(path.join(PLUGIN_DIR, '.mcp.json')) as {
      mcpServers: Record<string, { type: string; url: string }>
    }

    expect(mcpConfig.mcpServers['front-end-checklist']).toEqual({
      type: 'http',
      url: serverJson.remotes[0]?.url
    })
  })
})
