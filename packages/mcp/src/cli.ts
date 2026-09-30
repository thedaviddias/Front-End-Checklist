#!/usr/bin/env node

/**
 * Standalone stdio-based MCP server for local development and editor integrations.
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { serveStdio } from '@modelcontextprotocol/server/stdio'
import type { CuratedChecklist, Rule } from '@repo/types'
import { loadRules } from './load-rules'
import { createMcpServer } from './server'

/**
 * Load rule documents from the MDX content tree.
 *
 * @returns Parsed rule records for the MCP server.
 */
function getRules(): Rule[] {
  const rules = loadRules()

  if (rules.length === 0) {
    console.error('Rules could not be loaded from the public rules package.')
    process.exit(1)
  }

  return rules
}

/**
 * Load curated checklists from the MDX content tree.
 *
 * @returns Parsed checklist records for the MCP server.
 */
function loadChecklists(): CuratedChecklist[] {
  const checklistsDir = path.join(process.cwd(), 'packages/content/checklists/en')

  if (!fs.existsSync(checklistsDir)) {
    console.error(`Checklists directory not found: ${checklistsDir}`)
    return []
  }

  const checklists: CuratedChecklist[] = []
  const files = fs.readdirSync(checklistsDir).filter(file => file.endsWith('.mdx'))

  for (const file of files) {
    const filePath = path.join(checklistsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

    if (!frontmatterMatch) {
      continue
    }

    const frontmatter = frontmatterMatch[1]
    const body = content.slice(frontmatterMatch[0].length).trim()
    const slug = file.replace('.mdx', '')
    const title = extractYamlField(frontmatter, 'title') || slug
    const description = extractYamlField(frontmatter, 'description') || ''
    const icon = extractYamlField(frontmatter, 'icon') || 'list'
    const estimatedTime = extractYamlField(frontmatter, 'estimatedTime') || undefined
    const difficulty = extractYamlField(frontmatter, 'difficulty') as
      | CuratedChecklist['difficulty']
      | undefined
    const order = parseInt(extractYamlField(frontmatter, 'order') || '99', 10)
    const featured = extractYamlField(frontmatter, 'featured') === 'true'

    const rulesMatch = frontmatter.match(/rules:\s*\n((?:\s+-\s+.+\n?)+)/)
    const rules: string[] = []
    if (rulesMatch) {
      const ruleLines = rulesMatch[1].match(/^\s+-\s+(.+)$/gm)
      if (ruleLines) {
        for (const line of ruleLines) {
          rules.push(line.replace(/^\s+-\s+/, '').trim())
        }
      }
    }

    checklists.push({
      id: slug,
      slug,
      title,
      description,
      icon,
      rules,
      estimatedTime,
      difficulty,
      order,
      featured,
      language: 'en',
      url: `/en/checklists/${slug}`,
      mdx: body
    })
  }

  checklists.sort((a, b) => (a.order || 99) - (b.order || 99))

  return checklists
}

/**
 * Extract a simple YAML frontmatter field without a full YAML parser.
 *
 * @param yaml - Raw YAML frontmatter block.
 * @param field - Field name to extract.
 * @returns String value when present, otherwise null.
 */
function extractYamlField(yaml: string, field: string): string | null {
  const singleLineMatch = yaml.match(new RegExp(`${field}:\\s*["']?([^"'\\n]+)["']?`))
  if (singleLineMatch) {
    return singleLineMatch[1].trim()
  }

  const multiLineMatch = yaml.match(new RegExp(`${field}:\\s*[|>]\\s*\\n((?:\\s{2,}.*\\n?)+)`))
  if (multiLineMatch) {
    return multiLineMatch[1]
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .join(' ')
      .trim()
  }

  return null
}

/**
 * Boot the stdio MCP server for local development and editor integrations.
 */
async function main() {
  const rules = getRules()
  const checklists = loadChecklists()

  console.error(
    `Loaded ${rules.length} rules and ${checklists.length} checklists from content directory`
  )

  // serveStdio answers both 2026-07-28 (`server/discover`) and 2025-era `initialize` clients.
  serveStdio(() =>
    createMcpServer(
      () => rules,
      () => checklists,
      { skillsDir: path.join(process.cwd(), 'skills') }
    )
  )
  console.error('Front-End Checklist MCP server started (stdio mode)')
}

main().catch(error => {
  console.error('Server error:', error)
  process.exit(1)
})
