# Publish Front-End Checklist to Claude and Codex

Preparation checked on October 4, 2026. Tracking: [DAV-597](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-597), under [DAV-324](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-324).

## Distribution routes

| Route | Submission input | Result |
| --- | --- | --- |
| Claude Code repository marketplace | GitHub repo with `.claude-plugin/marketplace.json` | Users add our marketplace and install the plugin |
| Codex repository marketplace | GitHub repo with `.agents/plugins/marketplace.json` | Users add our marketplace and install the plugin |
| Claude directory | Remote MCP connector first, then paired plugin bundle | Reviewed listing on Claude; bundle also includes the global skill |
| OpenAI universal plugin directory | ZIP containing MCP connection and global skill | Reviewed listing shared by ChatGPT and Codex |

Repository distribution and directory approval are separate. The MCP Registry listing does not publish the plugin in either vendor directory. Anthropic's directory portal does not submit to `claude-plugins-official`; that route requires an Anthropic partner contact. See [Claude publishing](https://code.claude.com/docs/en/plugins/publish) and [OpenAI packaging](https://developers.openai.com/plugins/build/plugins).

## Current readiness

| Check | Result |
| --- | --- |
| Plugin manifests and both marketplace catalogs | Present locally, with pre-existing staged work; public availability must be checked after push |
| Shared global skill | Bundled; only this skill is included, not the entire generated skill collection |
| MIT license and PNG icon | Included |
| Claude local validation | Strict plugin and marketplace validation passed; portal validation remains separate |
| Codex local install | Isolated marketplace add and plugin add passed for version `2.0.1`; client model walkthrough remains |
| Package integration tests | Three passed: bundled skill equality, versions, hosted URL configuration |
| MCP initialization at `https://mcp.frontendchecklist.io` | HTTP 200, protocol `2025-11-25`, server version `2.0.0` |
| Local package version | `2.0.1`; hosted version and docs URL still need deployment |
| Product documentation `https://frontendchecklist.io/mcp` | HTTP 200 |
| Public privacy policy and terms | Both HTTP 404; block directory submission |
| OpenAI support listing URL | Added: GitHub issue tracker |
| OpenAI review cases | Five positive and three negative cases included in the manifest; client walkthrough remains to be run |
| Walkthrough recording | Not recorded or published |
| OpenAI developer identity and domain challenge | Owner must complete in the portal |
| Vendor submissions and publication | Not performed |

These observations are a dated snapshot. Recheck the live endpoint and listing URLs before submission.

Direct live protocol smoke checks also passed: 11 tools with `readOnlyHint`, form-label detection via `review_code`, `get_rule` for `alt-text`, LCP `search_rules`, the `launch-checklist` workflow, and a successful `audit_url` fetch of `https://example.com`. Auditing `https://127.0.0.1/admin` returned an explicit private-IP error. These are direct tool checks; the eight model-driven reviewer scenarios and video remain separate requirements. Archive integrity, exact eight-file contents, review-case counts, listing text limits, and icon paths were checked locally.

## Package and verify

Run from this repository root:

```bash
claude plugin validate --strict plugins/front-end-checklist
claude plugin validate --strict .claude-plugin/marketplace.json
pnpm --filter @repo/mcp test --runInBand tests/integration/plugin.test.ts
pnpm exec node scripts/generate/package-mcp-plugin.mjs
unzip -l .artifacts/mcp-publication/front-end-checklist-2.0.1.zip
```

The generator packages an explicit allowlist: both plugin manifests, `.mcp.json`, license, README, logo, and global skill files. Hidden manifests remain in the ZIP. The archive root is the plugin root. Source code, credentials, `.env`, repository tracking files, and other generated skills are excluded. The script prints a SHA-256 checksum. ZIP entries preserve source timestamps, so rebuilding changed files can change the checksum.

The ZIP is a **temporary local staging artifact** in ignored `.artifacts/mcp-publication/`. Publish general artifact copies to authorized Nextcloud storage and verify the upload before deleting the staging copy. Do not treat a local ZIP as a submitted or durable published release.

Before releasing, keep both plugin versions and `packages/mcp/server.json` aligned with `MCP_SERVER_INFO.version`, and copy any global skill updates through `pnpm generate:skills`. The integration test verifies version, remote URL, and skill equality.

## Installation copy

Once the package and catalogs are pushed to the public repository:

```bash
claude plugin marketplace add thedaviddias/Front-End-Checklist
claude plugin install front-end-checklist@front-end-checklist

codex plugin marketplace add thedaviddias/Front-End-Checklist
codex plugin add front-end-checklist@front-end-checklist
```

For local validation use the repository's absolute path as the marketplace source. Test with isolated client configuration so publication checks do not change personal plugin settings. Restart the client after installing and verify that the global skill and all MCP tools load. A successful install alone does not verify tool execution. This unauthenticated endpoint needs no OAuth login; an auth status label alone is not evidence of a failed connection.

## Directory listing copy

- Name: **Front-End Checklist**
- Subtitle: **Audit frontend code and pages**
- Developer: **David Dias** (OpenAI displays the selected verified identity)
- Category: **Developer Tools**; confirm the available category in each portal
- Website: `https://frontendchecklist.io/mcp`
- Support: `https://github.com/thedaviddias/Front-End-Checklist/issues`
- MCP endpoint: `https://mcp.frontendchecklist.io`
- Authentication: none; no account or API key required
- Privacy: `https://frontendchecklist.io/privacy` — must be published first
- Terms: `https://frontendchecklist.io/terms` — must be published first

Description:

> Review frontend source and public HTTPS pages using quality-gated Front-End Checklist guidance for accessibility, performance, SEO, security, and modern web development. Static checks return supported findings and rule references; they do not execute JavaScript, measure Web Vitals, or certify WCAG compliance. MCP tools are read-only; your agent can apply suggested changes with your permission.

Starter prompts are in `.codex-plugin/plugin.json`. The light-theme brand color is `#047857`; the dark-theme color is `#34D399`. One PNG serves as the logo and composer icon; confirm the portal's asset checks before submitting.

## Reviewer test cases

The canonical cases are under `extensions.com.openai.review.test_cases` in `plugins/front-end-checklist/.codex-plugin/plugin.json`. Use the same scenarios for Claude review. Expected results describe required behavior, not claimed executions.

| Positive case | Expected tool | Evidence to capture |
| --- | --- | --- |
| Review an unlabeled email form | `review_code` | Supported missing-label finding and remediation |
| Explain the alt-text rule | `get_rule` | Rule guidance, verification and decorative-image caveat |
| Search LCP guidance | `search_rules` | Relevant rules and valid slugs |
| Load a launch workflow | `get_workflow` | Available ordered launch workflow |
| Audit `https://example.com` | `audit_url` | Static review or explicit network failure; no fabricated browser results |

| Negative case | Expected result |
| --- | --- |
| Audit `https://127.0.0.1/admin` | No private-network fetch; refusal/safety error and sanitized-source fallback |
| Retrieve another user's private checklist progress | Explain that account data is unavailable; no fabricated results |
| Certify WCAG compliance from a snippet | Explain static limits and propose manual verification; no certification |

Run all eight in fresh Claude and Codex sessions and record actual tool calls and results. For the public-page case, obtain a successful fetch before claiming the audit path works. Record a walkthrough with sample code only, publish it to an accessible authorized location, and enter its URL in the review portal or `review.demo_recording_url`. No reviewer login is needed for this MCP.

## OpenAI submission

Follow the [current submission guide](https://developers.openai.com/plugins/deploy/submission):

1. Select the owning organization/project and verified developer identity. Confirm owner or Apps Management Write access.
2. Open https://platform.openai.com/plugins and upload the ZIP as a new plugin containing the MCP and skills together. Do not start with a skills-only draft: adding MCP afterward is not supported.
3. Review Metadata & Skills findings. Connect the declared MCP with authentication set to none.
4. Complete the portal's domain verification: serve the exact challenge as plain text at the supplied HTTPS origin's `/.well-known/openai-apps-challenge`. The route is implemented at apps/web/app/.well-known/openai-apps-challenge/route.ts. Configure OPENAI_APPS_CHALLENGE_TOKEN with the portal token and verify the exact hostname; the MCP host rewrite excludes this route. Never overwrite another plugin's challenge token.
5. Complete tool and skill scans, resolve required failures, and verify all four public listing URLs.
6. Confirm the imported five positive/three negative cases, provide the recording, run the cases, and review the policy attestations before submitting.
7. After approval, choose Publish plugin. Approval and publication are separate steps.

Metadata/skill updates need a new complete ZIP. Hosted MCP changes are scanned separately. Do not assume local validation guarantees vendor acceptance.

## Claude submission

Follow [Claude publishing](https://code.claude.com/docs/en/plugins/publish) and the [directory portal announcement](https://claude.com/blog/build-plugins-for-claude):

1. Push the validated bundle and marketplaces to the public GitHub repo, preserving unrelated shared-checkout work.
2. Open [the developer portal](https://claude.ai/directory/manage) using an eligible paid account and submission role.
3. Submit the owned remote server as a Single MCP connector first, then submit a paired Plugin bundle using the same endpoint and organization. Provide `https://github.com/thedaviddias/Front-End-Checklist` and select `plugins/front-end-checklist` when the portal asks for the plugin path. Use https://mcp.frontendchecklist.io for the connector.
4. Fill listing/support/privacy fields, inspect safety scan findings, and exercise the reviewer cases.
5. Submit, track the review, resolve feedback, then publish the approved version when ready.

## Remaining release gates

Publish accurate privacy and terms pages before directory submission. The existing README's absolute non-retention claim was removed because deployed infrastructure retention is not verified. Local code shows IP-based rate limiting, optional tool-name telemetry and exception reporting; inspect deployed settings and infrastructure logs before documenting retention. Confirm the operator/contact method and existing website account/newsletter practices before finalizing shared legal pages.

Deploy the intended MCP changes only after verifying Git remote, branch, commit and production project provenance. Then confirm live version `2.0.1`, corrected website URL, listing URL availability, tool loading and actual calls. Commit/push, production deployment, recording publication, domain verification and portal actions remain release work; this preparation does not claim them complete.

## Release continuation — October 4, 2026

David Dias is the confirmed operator. Automatic newsletter enrollment was removed from account creation; Settings now offers a separate signup action. Privacy and terms drafts are implemented and require an owner-approved PUBLIC_SUPPORT_EMAIL before becoming public (404 while unset). Legal copy discloses stored audit reports after account deletion; the mismatch in existing deletion UX is separately tracked as DAV-617.

The challenge route has two passing unit tests; the account hook regression test passes. The current GitHub deployment fails due to an invalid VERCEL_TOKEN (DAV-312), although local Vercel login works. Production release still requires clean-source deployment and verification.

ChatGPT personal archive upload succeeded: https://chatgpt.com/plugins/Plugin_f880f65efaf8819196cba494eaa350fc shows version 2.0.1, one MCP, and one global skill. This is a personal cloud installation, not a public directory submission. Public publication uses the developer dashboard at https://platform.openai.com/plugins; it currently requires owner sign-in.
