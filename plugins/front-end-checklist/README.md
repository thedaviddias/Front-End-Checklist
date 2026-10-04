# Front-End Checklist plugin

Review frontend code and live pages against 386 quality-gated
[Front-End Checklist](https://frontendchecklist.io) rules covering accessibility,
performance, SEO, security, and HTML/CSS/JavaScript best practices.

The plugin connects your agent to the hosted Front-End Checklist MCP server
(`https://mcp.frontendchecklist.io`) and bundles the `frontend-checklist-global`
skill, which teaches the agent when and how to use the tools. No account,
API key, or local install is required.

## Install

**Claude Code**

```bash
claude plugin marketplace add thedaviddias/Front-End-Checklist
claude plugin install front-end-checklist@front-end-checklist
```

**Codex**

```bash
codex plugin marketplace add thedaviddias/Front-End-Checklist
codex plugin add front-end-checklist@front-end-checklist
```

Prefer to add only the MCP server? See [frontendchecklist.io/mcp](https://frontendchecklist.io/mcp)
for Claude Desktop, Claude.ai, ChatGPT, Cursor, VS Code, and other clients.

## What's included

| Tool | What it does |
| --- | --- |
| `review_code` | Statically review pasted frontend source and retrieve relevant rule guidance |
| `audit_url` | Fetch a public `https://` page and statically audit its HTML |
| `get_workflow` | Ordered checklist for a launch, accessibility, SEO, security, or performance pass |
| `get_checklist_rules` | Full rule details for every rule in a checklist |
| `get_quick_reference` | Compact checklist filtered by priority |
| `search_rules` | Find rules by keyword, category, or priority |
| `get_rule` | Complete guidance for one rule |
| `check_rule` / `fix_rule` / `explain_rule` | Verify, remediate, or explain a single rule |
| `list_categories` | Rule categories with counts |

MCP tools are read-only. Your agent can use their guidance to edit your project.
Static review does not execute JavaScript, measure Web Vitals, or certify accessibility compliance.

## Example prompts

- "Review this component with the Front-End Checklist."
- "Audit https://example.com for accessibility and SEO issues."
- "Run the launch checklist before we ship."

## Privacy Policy

Code sent to `review_code` is sent to the hosted MCP service for static analysis.
`audit_url` makes a server-side request to the public URL you provide. Send only
code and URLs you are authorized to share, with secrets removed.

Publication preparation is in progress: the public privacy and terms pages are
not yet available. See the [publishing runbook](https://github.com/thedaviddias/Front-End-Checklist/blob/main/docs/publishing/mcp-platforms.md)
for the verified status and remaining directory requirements.

## Support

Open an issue at [github.com/thedaviddias/Front-End-Checklist/issues](https://github.com/thedaviddias/Front-End-Checklist/issues).

## License

[MIT](./LICENSE)
