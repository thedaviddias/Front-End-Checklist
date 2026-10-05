# MCP usage analytics

OpenPanel project: `frontend-checklist`. Collection is enabled only with
`MCP_TELEMETRY_ENABLED=true` and production OpenPanel credentials. Delivery runs
inside Next.js `after()` so the Vercel function awaits it after responding.

## Event meanings

- `mcp_tool_called`: one completed registered tool execution, including semantic
  failures. Properties include `toolName`, `outcome`, `durationMs`, and
  `returnedRuleCount`. This duration excludes network delivery. Invalid protocol
  requests, input validation rejections and rate limits are outside this metric.
- `mcp_rule_requested`: a canonical rule requested through `get_rule`,
  `check_rule`, `fix_rule` or `explain_rule`.
- `mcp_rule_returned`: each distinct canonical rule returned by a search, review,
  audit, workflow, checklist or quick-reference call. This does not indicate that
  somebody applied a fix.

Use total event counts. Anonymous server events have no reliable user identity.
Existing events are not backfilled when new dimensions are introduced.

## Client source

All three events include these bounded dimensions:

| Property | Values |
| --- | --- |
| `clientPlatform` | `claude`, `openai`, `other`, `unknown` |
| `clientProduct` | `claude`, `claude_code`, `codex`, `chatgpt`, `other`, `unknown` |
| `clientSourceEvidence` | `mcp_client_info`, `openai_metadata`, `user_agent`, `conflicting`, `unknown` |

These are **self-reported analytics hints**, not authenticated identities or proof
of which model ran. Modern MCP client information takes precedence when its name
matches the explicit product allowlist. OpenAI's optional `openai/userAgent`
metadata yields an OpenAI vendor hint, without inferring ChatGPT versus Codex.
Explicit HTTP user-agent product tokens are a fallback. Conflicting vendor
signals yield `unknown`; generic browser/SDK user agents do not identify a vendor.
An unrecognized client name yields `other`, without retaining that name.

Legacy stateless calls cannot inherit client information from an earlier
`initialize` request. No session, IP, account or fingerprint matching is used to
guess that relationship. Clients that send neither supported metadata nor an
explicit product user agent remain `unknown`. The client SDK integration test
checks that classifications do not leak between callers.

The [MCP per-request metadata specification](https://modelcontextprotocol.io/specification/2026-07-28/basic)
defines optional client information and its self-reported nature.
[OpenAI's reference](https://developers.openai.com/plugins/reference#meta-fields-the-client-provides)
documents the optional analytics hint and warns against treating it as a stable
host-surface identifier.

No raw client name, version, user agent, prompt, code, query, audited URL, user
location, user/conversation/organization identifier or account data is forwarded
to OpenPanel. Its geography for these server events represents the Vercel
function, not the caller.

## Dashboards

- [MCP Usage & Reliability](https://stats.daviddias.digital/david-dias-digital/frontend-checklist/dashboards/mcp-usage-and-reliability)
- [Rule Demand](https://stats.daviddias.digital/david-dias-digital/frontend-checklist/dashboards/rule-demand)
- [Website Engagement](https://stats.daviddias.digital/david-dias-digital/frontend-checklist/dashboards/website-engagement)

The OpenPanel gateway MCP can verify saved report configurations and execute
reports. Dashboard/report creation currently uses the authenticated browser UI.
Verify production receipts separately from local classifier tests. Synthetic
source verification calls do not prove that a real directory client emits those
signals.
