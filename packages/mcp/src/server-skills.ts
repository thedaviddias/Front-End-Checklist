import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import {
  type McpServer,
  ProtocolError,
  ProtocolErrorCode,
  ResourceTemplate
} from '@modelcontextprotocol/server'
import { parse as parseYaml } from 'yaml'
import * as z from 'zod'

/** Skills over MCP extension identifier (SEP-2640). */
export const SKILLS_EXTENSION = 'io.modelcontextprotocol/skills'

const SKILL_URI_TEMPLATE = 'skill://{name}/{+path}'
const SKILLS_PAGE_SIZE = 50
/** Skills are regenerated from rules on deploy, so entries can be cached publicly. */
const SKILLS_CACHE = { ttlMs: 60 * 60 * 1000, cacheScope: 'public' } as const

/** Request param schemas, built once rather than per stateless request. */
const SKILLS_LIST_PARAMS = z.object({ cursor: z.string().optional() }).loose()
const SKILLS_GET_PARAMS = z.object({ uri: z.string() }).loose()

interface SkillFile {
  uri: string
  relativePath: string
  text: string
  digest: string
  size: number
}

export interface SkillEntry {
  name: string
  uri: string
  frontmatter: Record<string, unknown>
  files: SkillFile[]
}

const skillsCache = new Map<string, SkillEntry[]>()

/**
 * Check whether a parsed YAML value is a plain object.
 *
 * @param value - Parsed value.
 * @returns True when the value is a non-null, non-array object.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Build the `skill://` URI for a file inside a skill directory.
 *
 * @param name - Skill name (its directory name).
 * @param relativePath - File path relative to the skill root, using `/`.
 * @returns Skill resource URI.
 */
function buildSkillUri(name: string, relativePath: string): string {
  return `skill://${name}/${relativePath}`
}

/**
 * Parse the YAML frontmatter block at the top of a `SKILL.md` file.
 *
 * @param text - Raw `SKILL.md` contents.
 * @returns Frontmatter fields, or null when the block is missing or invalid.
 */
function parseFrontmatter(text: string): Record<string, unknown> | null {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!match) {
    return null
  }

  const data = parseYaml(match[1])
  return isRecord(data) ? data : null
}

/**
 * Collect every file under a skill directory, sorted for a stable manifest.
 *
 * @param root - Absolute skill directory.
 * @param dir - Directory currently being walked.
 * @returns Paths relative to the skill root, using `/`.
 */
function listSkillFiles(root: string, dir = root): string[] {
  return readdirSync(dir)
    .sort()
    .flatMap(entry => {
      const absolute = path.join(dir, entry)
      return statSync(absolute).isDirectory()
        ? listSkillFiles(root, absolute)
        : [path.relative(root, absolute).split(path.sep).join('/')]
    })
}

/**
 * Check whether a skill is public Front-End Checklist guidance rather than a
 * repository-maintenance skill (for example `improve-rule`).
 *
 * @param frontmatter - Parsed `SKILL.md` frontmatter.
 * @returns True when the skill should be served to MCP clients.
 */
function isPublicSkill(frontmatter: Record<string, unknown>): boolean {
  const { metadata } = frontmatter
  return (
    isRecord(metadata) && metadata.source === 'frontendchecklist.io' && metadata.category !== 'meta'
  )
}

/**
 * Load the published skills from a directory of `<name>/SKILL.md` folders.
 *
 * Digests and sizes are computed from the exact bytes that `resources/read`
 * serves, as the extension requires. Results are cached per directory.
 *
 * @param skillsDir - Directory containing one folder per skill.
 * @returns Skill entries sorted by name; empty when the directory is missing.
 */
export function loadSkills(skillsDir: string): SkillEntry[] {
  const cached = skillsCache.get(skillsDir)
  if (cached) {
    return cached
  }

  if (!existsSync(skillsDir)) {
    return []
  }

  const skills = readdirSync(skillsDir)
    .sort()
    .flatMap((name): SkillEntry[] => {
      const root = path.join(skillsDir, name)
      const skillMdPath = path.join(root, 'SKILL.md')
      if (!existsSync(skillMdPath)) {
        return []
      }

      const frontmatter = parseFrontmatter(readFileSync(skillMdPath, 'utf-8'))
      if (!frontmatter || frontmatter.name !== name || !isPublicSkill(frontmatter)) {
        return []
      }

      const files = listSkillFiles(root).map(relativePath => {
        const bytes = readFileSync(path.join(root, relativePath))
        return {
          uri: buildSkillUri(name, relativePath),
          relativePath,
          text: bytes.toString('utf-8'),
          digest: `sha256:${createHash('sha256').update(bytes).digest('hex')}`,
          size: bytes.byteLength
        }
      })

      return [{ name, uri: buildSkillUri(name, 'SKILL.md'), frontmatter, files }]
    })

  skillsCache.set(skillsDir, skills)
  return skills
}

/**
 * Convert a loaded skill into its `skills/list` / `skills/get` wire entry.
 *
 * @param skill - Loaded skill.
 * @returns Entry with frontmatter and the complete file manifest.
 */
function toSkillEntry(skill: SkillEntry) {
  return {
    uri: skill.uri,
    frontmatter: skill.frontmatter,
    resources: skill.files.map(file => ({
      uri: file.uri,
      digest: file.digest,
      size: file.size
    }))
  }
}

/**
 * Register the Skills over MCP extension: `skills/list`, `skills/get`, and a
 * `skill://` resource template that serves `SKILL.md` and supporting files.
 *
 * The caller must also declare `SKILLS_EXTENSION` under `capabilities.extensions`.
 *
 * @param server - MCP server instance.
 * @param getSkills - Skill loader callback.
 */
export function registerSkills(server: McpServer, getSkills: () => SkillEntry[]): void {
  /**
   * Look up a served skill by its `SKILL.md` URI.
   *
   * @param uri - Skill URI from the request.
   * @returns The skill, or undefined when it is not served.
   */
  const findSkill = (uri: string) => getSkills().find(skill => skill.uri === uri)

  server.server.setRequestHandler('skills/list', { params: SKILLS_LIST_PARAMS }, ({ cursor }) => {
    const skills = getSkills()
    const offset = cursor ? Number.parseInt(cursor, 10) : 0
    if (!Number.isSafeInteger(offset) || offset < 0 || offset > skills.length) {
      throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid cursor: ${cursor}`)
    }

    const page = skills.slice(offset, offset + SKILLS_PAGE_SIZE)
    const next = offset + SKILLS_PAGE_SIZE

    return {
      skills: page.map(toSkillEntry),
      ...(next < skills.length ? { nextCursor: String(next) } : {}),
      ...SKILLS_CACHE
    }
  })

  server.server.setRequestHandler('skills/get', { params: SKILLS_GET_PARAMS }, ({ uri }) => {
    const skill = findSkill(uri)
    if (!skill) {
      throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Unknown skill: ${uri}`)
    }

    return { skill: toSkillEntry(skill), ...SKILLS_CACHE }
  })

  server.registerResource(
    'skill_file',
    new ResourceTemplate(SKILL_URI_TEMPLATE, { list: undefined }),
    {
      title: 'Front-End Checklist Skill File',
      description: 'A SKILL.md or supporting file from a Front-End Checklist agent skill.',
      mimeType: 'text/markdown'
    },
    async (uri, variables) => {
      const name = String(variables.name || '')
      const file = getSkills()
        .find(skill => skill.name === name)
        ?.files.find(entry => entry.uri === uri.href)

      if (!file) {
        throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Unknown skill file: ${uri.href}`)
      }

      return {
        contents: [{ uri: file.uri, mimeType: 'text/markdown', text: file.text }]
      }
    }
  )
}
