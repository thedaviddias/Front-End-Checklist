#!/usr/bin/env node

/**
 * Standalone stdio-based MCP server for local development and editor integrations.
 */

import * as path from 'node:path'
import { serveStdio } from '@modelcontextprotocol/server/stdio'
import { loadLocalChecklists, loadLocalRules } from './content-loader'
import { createMcpServer } from './server'

/**
 * Boot the stdio MCP server for local development and editor integrations.
 */
async function main() {
  const rules = loadLocalRules()
  const checklists = loadLocalChecklists(process.cwd())

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
