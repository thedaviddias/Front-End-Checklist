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
| `review_code` | Audit pasted HTML, CSS, or JavaScript against every relevant rule |
| `audit_url` | Fetch a public `https://` page and audit its HTML |
| `get_workflow` | Ordered checklist for a launch, accessibility, SEO, security, or performance pass |
| `get_checklist_rules` | Full rule details for every rule in a checklist |
| `get_quick_reference` | Compact checklist filtered by priority |
| `search_rules` | Find rules by keyword, category, or priority |
| `get_rule` | Complete guidance for one rule |
| `check_rule` / `fix_rule` / `explain_rule` | Verify, remediate, or explain a single rule |
| `list_categories` | Rule categories with counts |

Every tool is read-only: nothing is written to your project or to any account.

## Example prompts

- "Review this component with the Front-End Checklist."
- "Audit https://example.com for accessibility and SEO issues."
- "Run the launch checklist before we ship."

## Privacy Policy

Code you send to `review_code` is processed in memory to produce the review and
is not stored. The server records only which tool was called and when, for usage
statistics. Full details: [frontendchecklist.io/privacy](https://frontendchecklist.io/privacy).

## Support

Open an issue at [github.com/thedaviddias/Front-End-Checklist/issues](https://github.com/thedaviddias/Front-End-Checklist/issues).

## License

[MIT](./LICENSE)
