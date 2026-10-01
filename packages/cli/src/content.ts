import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadLocalChecklists, loadLocalRules } from '@repo/mcp/content-loader'
import type { CuratedChecklist, Rule } from '@repo/types'

export interface Content {
  rules: Rule[]
  checklists: CuratedChecklist[]
}

const HERE = path.dirname(fileURLToPath(import.meta.url))

/**
 * Check whether parsed JSON has the bundled content shape.
 *
 * @param value - Parsed JSON.
 * @returns True when it has rule and checklist arrays.
 */
function isContent(value: unknown): value is Content {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray(Reflect.get(value, 'rules')) &&
    Array.isArray(Reflect.get(value, 'checklists'))
  )
}

/**
 * Load the rule corpus and checklists.
 *
 * Published builds ship a `content.json` snapshot next to the bundle, so the
 * CLI works offline and matches the version you installed. Inside the
 * monorepo (no snapshot), it reads the canonical MDX content directly.
 *
 * @returns Rules and checklists.
 */
export function loadContent(): Content {
  const bundled = path.join(HERE, 'content.json')
  if (existsSync(bundled)) {
    const parsed: unknown = JSON.parse(readFileSync(bundled, 'utf-8'))
    if (isContent(parsed)) return parsed
    throw new Error(`Corrupt content snapshot: ${bundled}`)
  }

  const repoRoot = path.resolve(HERE, '../../..')
  return { rules: loadLocalRules(), checklists: loadLocalChecklists(repoRoot) }
}
