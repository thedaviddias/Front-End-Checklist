# @frontendchecklist/cli

The [Front-End Checklist](https://frontendchecklist.io) from the command line: review local code,
audit public pages, and look up 380+ frontend rules (accessibility, performance, SEO, security,
HTML, CSS, JavaScript, images, i18n, privacy, testing). Works offline; the rules ship with the
package.

```bash
npx -y @frontendchecklist/cli review src/
```

## Commands

```bash
frontendchecklist review src/ index.html          # files and directories (node_modules, dist skipped)
git diff --cached | frontendchecklist review -    # stdin
frontendchecklist audit https://example.com       # public https pages only
frontendchecklist search "image formats" -n 5
frontendchecklist rule alt-text
frontendchecklist checklists
frontendchecklist checklist launch-checklist
frontendchecklist categories
frontendchecklist schema                          # command reference as JSON
frontendchecklist skill                           # agent skill (SKILL.md)
```

Flags: `--focus accessibility,seo`, `--min-priority high`, `--fail-on high`, `--limit 20`,
`--format json|text|md|html`, `--json`, `--save` (audit: publish the report on frontendchecklist.io).

## Built for agents and CI

- **JSON when piped**: output is JSON whenever stdout is not a terminal (or with `--json`); logs and
  errors go to stderr.
- **Exit codes**: `0` ok, `1` findings at or above `--fail-on`, `2` usage or runtime error (with
  `{"error": "..."}` on stdout in JSON mode).
- **No prompts**, stable flags, and `frontendchecklist schema` for discovery.
- **Agent skill**: `frontendchecklist skill > .claude/skills/frontendchecklist/SKILL.md` teaches
  coding agents when and how to use it.

### CI example

```yaml
- run: npx -y @frontendchecklist/cli review src/ --fail-on high
```

## MCP

Prefer MCP? The same rules and tools are available at `https://mcp.frontendchecklist.io`
(see [frontendchecklist.io/en/mcp](https://frontendchecklist.io/en/mcp)).

## Development (monorepo)

```bash
pnpm --filter @frontendchecklist/cli build    # dist/index.js + dist/content.json snapshot
node packages/cli/dist/index.js review src/
pnpm audit:url https://example.com            # build + audit shortcut
pnpm --filter @frontendchecklist/cli test
```

The build bundles the shared tools from `packages/mcp` (the same code behind the MCP server) and
snapshots the rules from `packages/content`, so the published package has no private dependencies.

## License

MIT
