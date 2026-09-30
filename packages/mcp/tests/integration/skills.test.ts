import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client'
import { handleMcpHttpRequest, MCP_MODERN_PROTOCOL_VERSION } from '../../src/server'
import { loadSkills, SKILLS_EXTENSION } from '../../src/server-skills'

const SKILL_MD = `---
name: code-review
description: Review code using the team's checklist.
metadata:
  category: html
  source: frontendchecklist.io
---

# Code review

Read \`references/checklist.md\`, then review the diff.
`
const CHECKLIST_MD = '# Review checklist\n\nCheck correctness, tests, and compatibility.\n'
const META_SKILL_MD = `---
name: improve-rule
description: Repository maintenance skill.
metadata:
  category: meta
  source: frontendchecklist.io
---

Internal.
`

let skillsDir: string

function sha256(text: string): string {
  return `sha256:${createHash('sha256').update(Buffer.from(text, 'utf-8')).digest('hex')}`
}

async function callMcp(body: Record<string, unknown>) {
  const response = await handleMcpHttpRequest(
    new Request('https://example.com/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }),
    () => [],
    () => [],
    { skillsDir },
    body
  )

  return (await response.json()) as Record<string, unknown>
}

beforeAll(() => {
  skillsDir = mkdtempSync(path.join(tmpdir(), 'fec-skills-'))
  mkdirSync(path.join(skillsDir, 'code-review', 'references'), { recursive: true })
  writeFileSync(path.join(skillsDir, 'code-review', 'SKILL.md'), SKILL_MD)
  writeFileSync(path.join(skillsDir, 'code-review', 'references', 'checklist.md'), CHECKLIST_MD)
  mkdirSync(path.join(skillsDir, 'improve-rule'))
  writeFileSync(path.join(skillsDir, 'improve-rule', 'SKILL.md'), META_SKILL_MD)
})

afterAll(() => {
  rmSync(skillsDir, { recursive: true, force: true })
})

describe('Skills over MCP extension', () => {
  it('declares the extension during initialize', async () => {
    const json = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-11-25',
        capabilities: {},
        clientInfo: { name: 'jest-client', version: '1.0.0' }
      }
    })

    expect(json).toMatchObject({
      result: { capabilities: { resources: {}, extensions: { [SKILLS_EXTENSION]: {} } } }
    })
  })

  it('lists public skills with a complete, verifiable manifest', async () => {
    const json = await callMcp({ jsonrpc: '2.0', id: 1, method: 'skills/list', params: {} })

    expect(json).toMatchObject({
      result: {
        ttlMs: expect.any(Number),
        cacheScope: 'public',
        skills: [
          {
            uri: 'skill://code-review/SKILL.md',
            frontmatter: {
              name: 'code-review',
              description: "Review code using the team's checklist.",
              metadata: { category: 'html', source: 'frontendchecklist.io' }
            },
            resources: [
              {
                uri: 'skill://code-review/SKILL.md',
                digest: sha256(SKILL_MD),
                size: Buffer.byteLength(SKILL_MD)
              },
              {
                uri: 'skill://code-review/references/checklist.md',
                digest: sha256(CHECKLIST_MD),
                size: Buffer.byteLength(CHECKLIST_MD)
              }
            ]
          }
        ]
      }
    })
    expect((json.result as { skills: unknown[] }).skills).toHaveLength(1)
  })

  it('gets a skill by URI and rejects unknown skills with -32602', async () => {
    const found = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'skills/get',
      params: { uri: 'skill://code-review/SKILL.md' }
    })
    expect(found).toMatchObject({ result: { skill: { uri: 'skill://code-review/SKILL.md' } } })

    const missing = await callMcp({
      jsonrpc: '2.0',
      id: 2,
      method: 'skills/get',
      params: { uri: 'skill://improve-rule/SKILL.md' }
    })
    expect(missing).toMatchObject({ error: { code: -32602 } })
  })

  it('serves supporting files whose bytes match the manifest digest', async () => {
    const json = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/read',
      params: { uri: 'skill://code-review/references/checklist.md' }
    })
    const [content] = (json.result as { contents: Array<{ text: string }> }).contents

    expect(content.text).toBe(CHECKLIST_MD)
    expect(sha256(content.text)).toBe(sha256(CHECKLIST_MD))
  })

  it('advertises the extension through server/discover on 2026-07-28', async () => {
    const client = new Client(
      { name: 'jest-client', version: '1.0.0' },
      { versionNegotiation: { mode: { pin: MCP_MODERN_PROTOCOL_VERSION } } }
    )
    await client.connect(
      new StreamableHTTPClientTransport(new URL('https://example.com/mcp'), {
        fetch: async (url, init) => {
          const request = new Request(url, init)
          const parsedBody = request.method === 'POST' ? await request.clone().json() : undefined
          return handleMcpHttpRequest(
            request,
            () => [],
            () => [],
            { skillsDir },
            parsedBody
          )
        }
      })
    )

    expect(client.getServerCapabilities()?.extensions).toHaveProperty([SKILLS_EXTENSION])
    await client.close()
  })
})

describe('repository skills corpus', () => {
  it('loads every published rule skill with matching names', () => {
    const skills = loadSkills(path.resolve(__dirname, '../../../../skills'))

    expect(skills.length).toBeGreaterThan(300)
    expect(skills.map(skill => skill.name)).toContain('frontend-checklist-global')
    expect(skills.map(skill => skill.name)).not.toContain('improve-rule')
    for (const skill of skills) {
      expect(skill.frontmatter.name).toBe(skill.name)
      expect(skill.files[0].relativePath).toBe('SKILL.md')
    }
  })
})
