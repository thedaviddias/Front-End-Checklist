# MCP quality pipeline

This doc describes how we run the Front-End Checklist MCP server through third-party and in-repo tools to improve quality, security, and compatibility.

**Server**

- **URL**: `https://mcp.frontendchecklist.io`
- **Code**: `packages/mcp` (handler), `apps/web/app/api/mcp/route.ts` (HTTP wrapper)

## One-command audit (recommended)

From the repo root:

```bash
pnpm mcp:audit
```

This runs:

1. **Unit tests** for `@repo/mcp` (Jest).
2. **Security scan** of `packages/mcp/src` with `mcp-security-auditor` (fails only on **critical**; medium/high often false positives).

Exit code is non-zero if tests fail or the security scan reports critical issues. Safe to use in CI.

## Quality evaluation

Run the golden MCP quality evaluation from the repo root:

```bash
pnpm mcp:evaluate
```

This runs `packages/mcp/tests/quality/mcp-quality.test.ts` against the real rule corpus and prints a compact quality report. It currently measures:

1. **Retrieval quality** with golden discovery queries using `Recall@5` and mean reciprocal rank.
2. **`review_code` accuracy** with labeled true-positive and true-negative fixtures, reported as precision, recall, and false-positive rate.
3. **Improvement impact** with before/after code scenarios that check whether `review_code` identifies known defects, provides guidance, and verifies those defects are gone after a corrected version.
4. **Tool contract quality** across the full 11-tool surface, including naming, schemas, read-only annotations, and agent-facing descriptions.

The command fails when quality drops below the current thresholds:

- Retrieval `Recall@5 >= 80%`
- Retrieval `MRR >= 0.50`
- `review_code` precision `>= 90%`
- `review_code` recall `>= 85%`
- `review_code` false-positive rate `<= 10%`
- Improvement-impact defect detection rate `>= 90%`
- Improvement-impact verification-clear rate `>= 95%`
- Improvement-impact guidance rate `>= 90%`
- All 11 expected tools remain exposed when checklist data exists

Use this when changing search scoring, rule metadata, detector heuristics, tool definitions, or checklist-backed MCP behavior.

This is still a deterministic proxy, not a full agent A/B test. It answers whether the MCP can point an agent at the right fixes and verify those fixes locally. To prove an LLM writes better patches with the MCP, run the same benchmark tasks twice with the same model: once without MCP access and once with MCP access, then score the resulting diffs for expected fixes, regressions, tests, token cost, and time.

## Impact benchmark

Run the A/B benchmark harness when you want to measure whether MCP access improves actual agent patches:

```bash
pnpm mcp:impact -- --init .mcp-impact/run-001
```

This creates two identical workspaces:

- `.mcp-impact/run-001/without-mcp`
- `.mcp-impact/run-001/with-mcp`

Run the same model twice with the same prompt, time budget, and temperature. Disable the Front-End Checklist MCP in `without-mcp`; enable it in `with-mcp`. Then score the outputs:

```bash
pnpm mcp:impact -- --score .mcp-impact/run-001
```

The scorer checks fixed frontend defects across image accessibility/layout stability, icon-button accessible names, new-tab link hardening, unsafe dynamic code execution, and viewport zoom accessibility. It reports expected fixes completed in each condition plus the MCP delta.

Verify the harness itself with:

```bash
pnpm mcp:impact -- --self-test
```

## Ecosystem quality radar

Run the broader skills, rules, and MCP contract radar from the repo root:

```bash
pnpm skills:audit
```

This turns current ecosystem research into local, repeatable checks:

- **Skills as reusable workflows**: OpenAI and GitHub both describe skills as `SKILL.md` workflows with clear descriptions, optional resources/scripts, required outputs, and final checks. The audit measures grounding URLs, references, workflow language, output contracts, progressive disclosure, validation checklists, and assessment questions.
- **Skill registry safety**: skills.sh and GitHub's `gh skill` docs both emphasize reviewing third-party skill contents before installation. The audit now tracks safety-boundary language so generated skills do not only say what to do, but also when to avoid risky behavior.
- **MCP contract quality**: the official MCP docs and schema reference emphasize unique names, input/output schemas, tool annotations, and inspectable server behavior. The audit verifies all 11 public tools have valid names, input schemas, output schemas, read-only/non-destructive/idempotent annotations, and a narrow open-world boundary.
- **Modern frontend gap radar**: public web platform docs from MDN, web.dev, Chrome Developers, W3C/WICG, and Privacy Sandbox feed a candidate list for emerging or under-covered frontend rules.

Research references used for these criteria:

- [OpenAI: Using skills](https://openai.com/academy/skills/)
- [GitHub Docs: Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [skills.sh docs](https://www.skills.sh/docs)
- [google/skills](https://github.com/google/skills)
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Registry](https://modelcontextprotocol.io/registry/about)
- [MCP Tool Annotations](https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)
- [MCP Schema Reference](https://modelcontextprotocol.io/specification/2025-11-25/schema)

**Security-only (no tests):**

```bash
pnpm mcp:audit:security
```

## Tools we use

### 1. MCP Inspector (manual)

**What**: Official MCP testing/debugging UI. Good for ad‑hoc tool calls and protocol behavior.

**How**:

- Ensure the server is reachable (e.g. `pnpm dev` and use production URL, or deploy).
- Run: `pnpm dlx @modelcontextprotocol/inspector`
- Add server via **HTTP** with URL: `https://mcp.frontendchecklist.io` (or your local URL).

Use this to manually verify tools, try prompts, and debug responses.

### 2. MCP Doctor (optional, Python)

**What**: Health and security checks (auth, credentials, agent-friendliness). Rule-based, no LLM.

**How**: Python 3.10+. See [destilabs/mcp-doctor](https://github.com/destilabs/mcp-doctor).

- Install and run against the **running** server URL (HTTP). Useful for periodic audits against the live endpoint.

### 3. mcp-security-auditor (automated)

**What**: Scans MCP server **source code** for secrets, injection risks, unsafe patterns, and dependency issues.

**How**:

```bash
pnpm dlx mcp-security-auditor scan packages/mcp/src
```

Optional: fail CI on critical only: `--fail-on critical`. Medium/high findings (e.g. relative imports flagged as path traversal, or request handlers as SSRF) are often false positives; review and ignore as needed.

### 4. In-repo tests

**What**: Jest tests in `packages/mcp/tests/` that call the MCP handler directly (no HTTP).

**How**:

```bash
pnpm --filter @repo/mcp test
# or
pnpm test --filter=@repo/mcp
```

Coverage: tools/list, get_rule, search_rules, check_rule, fix_rule, explain_rule, list_categories, review_code, get_workflow, get_quick_reference, telemetry, error handling.

### 5. Golden quality evals

**What**: Labeled quality checks in `packages/mcp/tests/quality/` that answer “is the MCP useful to agents and likely to improve code?” rather than only “does it execute?”

**How**:

```bash
pnpm mcp:evaluate
```

Add a retrieval case whenever a real agent query should reliably find a rule. Add a review fixture whenever `review_code` gains a new heuristic or previously noisy behavior is fixed.

### 6. Tool performance benchmarks

**What**: In-process latency benchmarks for the main tools; asserts p95 stays within budget and that `review_code` scales sub-linearly as the rule set grows.

**How**:

```bash
pnpm --filter @repo/mcp test -- tool-performance.test --verbose
```

**Budgets** (p95, in ms): `review_code` 100, `search_rules` 50, `list_categories` 50, `get_rule` 5, `get_checklist_rules` 10. These run as part of the full MCP test suite and in `pnpm mcp:audit`. They do **not** cover the HTTP layer (Next.js route, JSON serialization) or `audit_url` (which does a live fetch).

## Suggested workflow

- **Before PRs**: Run `pnpm mcp:audit` (tests + security scan).
- **Periodically**: Run MCP Inspector against `https://mcp.frontendchecklist.io` and, if you use Python, MCP Doctor against the same URL.
- **CI**: Add `pnpm mcp:audit` to your pipeline (e.g. `ci:check` or a dedicated MCP job).

## Adding more tools

If you adopt MCPSpec, MCP Eval, or other CLIs, add them to `scripts/mcp-audit.ts` (or new scripts) and document the exact commands and exit-code behavior here.

## Token / response size

Tool responses are capped so the MCP doesn’t blow LLM token budgets:

- **Default**: Each tool response is limited to **~32k characters** (~8k tokens). If the JSON would exceed that, it’s truncated at a newline and a short `[... response truncated to stay within token budget ...]` note is appended.
- **Configure**: Set `MCP_MAX_RESPONSE_CHARS` (number) in the app env to override the limit. The handler also accepts `createMcpHandler(getRules, getChecklists, { maxResponseChars })`.
- **Pagination**: Use `search_rules` with `limit` and `cursor` to fetch in smaller chunks; `get_rule` returns one rule (still subject to the cap).

## Telemetry

**What exists**

- **In-memory usage counters** in `packages/mcp`: every `tools/call` increments a per-tool counter when telemetry is enabled. Exposed via `getTelemetryStats()` and in **GET /api/mcp** as the optional `usage` object (e.g. `usage: { get_rule: 42, search_rules: 10 }`). Anonymous only; no IPs or identifiers. Counts reset on each deploy/restart.
- **Database persistence**: Each `tools/call` is stored in the `McpToolCall` table (anonymous: `toolName`, `createdAt`). The API route writes after a successful request; DB errors are ignored so telemetry never breaks MCP responses. Apply migrations with `pnpm --filter @repo/auth db:migrate`.

**Enabling telemetry**

- Telemetry is disabled by default for the public hosted endpoint to avoid database writes and analytics work for routine agent traffic.
- Set **`MCP_TELEMETRY_ENABLED=true`** (or `MCP_TELEMETRY_ENABLED=1`) in the app environment to opt in. When enabled: in-memory counters are updated, **GET /api/mcp** includes `usage`, and successful `tools/call` requests write anonymous rows to `McpToolCall`. The handler also accepts `createMcpHandler(getRules, getChecklists, { telemetryEnabled: true })` when creating it programmatically (e.g. in tests).

**How to see it**

- **Live counts**: `GET https://mcp.frontendchecklist.io` (or local `/api/mcp`) returns `usage` with per-tool counts for the current process.
- **Historical data**: Query the database, e.g. `SELECT "toolName", COUNT(*), DATE("createdAt") FROM "McpToolCall" GROUP BY "toolName", DATE("createdAt");` or use Prisma Studio / your analytics stack.

**Extending**

- **External analytics**: In the API route, after `prisma.mcpToolCall.createMany`, send an event to your provider (Vercel Analytics, PostHog, etc.) with no PII.
- **Structured logs**: Log each tool call as JSON to stdout and rely on your host’s log aggregation.
