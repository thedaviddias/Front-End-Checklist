# MCP efficiency budgets

Tracked in [DAV-680](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-680). This complements the [quality pipeline](mcp-quality.md) and [live impact protocol](mcp-impact-benchmark.md).

## Reused projects and selection

Research checked 5 October 2026:

| Project | Fit and decision |
| --- | --- |
| [niieani/gpt-tokenizer](https://github.com/niieani/gpt-tokenizer) | Adopted as a pinned MIT-licensed development dependency. Provides offline `countTokens` with an explicit encoding. We use `o200k_base`, not a characters-divided-by-four estimate. No model API required. Its provider price catalogue is not used for billing claims. |
| [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | Recommended for live model trials. Its [MCP provider](https://www.promptfoo.dev/docs/providers/mcp/) supports direct MCP calls and model-driven MCP calls, including executed tool arguments/results in `metadata.toolCalls`. Its [evaluation result contract](https://github.com/promptfoo/promptfoo/blob/main/site/docs/configuration/reference.md) includes latency, token usage and cost. Reuse that runner when implementing paid trials; not installed or run here. |
| [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) | Useful official interactive/CLI protocol diagnostics; complements the existing conformance checks. Does not by itself establish total user cost per successful task. |
| [Accenture/mcp-bench](https://github.com/Accenture/mcp-bench) | Useful research benchmark for multi-step tool use. Its many external servers and model-judged tasks make it a poor fit for a fast, offline per-PR cost gate. |
| [pasihaka/mcp-sentinel](https://github.com/pasihaka/mcp-sentinel) | Interesting reference for remote handshake/schema monitoring. Not adopted: our immediate gate can run locally without adding a hosted monitoring service. Its context estimate is not a substitute for actual provider usage. |

## Run and enforcement

```bash
pnpm mcp:efficiency
pnpm mcp:efficiency -- --out /absolute/path/report.json
```

The command executes 13 fixed scenarios through the actual SDK-backed local HTTP handler using the real rule/checklist corpus, including maximum-page search and explicit full-checklist content. It makes no LLM calls and excludes the network-fetching `audit_url` tool. Three warmups precede 20 measured calls per scenario. Every response must succeed. Tokenization happens outside the timed handler call.

The checked-in [budgets](../packages/mcp/scripts/efficiency/budgets.json) fail the command on oversized definitions/instructions, oversized text or structured responses, excessive wire bytes, missing/unknown scenarios or p95 handler time above the ceiling. Ordinary size ceilings have approximately 20% rounded headroom from the initial baseline. Timing uses a generous absolute 100 ms ceiling because shared CI hardware varies; this is not a claim that a 10x slowdown below 100 ms is acceptable. Compare retained reports when reviewing performance-sensitive changes.

The GitHub `MCP efficiency` workflow checks pull requests and main pushes and retains JSON reports for 30 days. Production validation also runs the budget and existing quality checks before deployment. These changes become active only after commit/push; branch-protection requirements are not configured by this patch. Do not automatically refresh budgets to make a failure pass. Budget increases need an explained tradeoff and evidence that task quality is preserved.

## Measurements after the loader and pagination fixes

The corpus contains 386 rules and 12 checklists. [DAV-684](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-684) replaces the public loader's scalar regex with the maintained YAML parser. Folded/literal strings and chomping indicators now preserve actual prompts instead of returning `>-`. Missing or placeholder prompts fail the efficiency gate. Prompt-response budgets were recalibrated because useful guidance is necessarily larger than broken markers.

[DAV-682](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-682) bounds each successful `get_checklist_rules` page to **16,000 UTF-8 bytes of pretty JSON**. Both default and full-content requests paginate. Inputs accept `limit` (1–50, default 20) and `cursor`; output adds `nextCursor`, `hasMore`, and continuation guidance. Follow `nextCursor` until null with the same checklist and `includeContent`. Cursors reject changed content or modes. Oversized individual bodies/details are explicitly flagged with `contentOmitted`/`detailsOmitted`; retrieve those through `get_rule`. Existing MCP callers must adopt cursor traversal to obtain an entire checklist. The CLI already follows every page and retains its complete-list behavior.

| Measured surface | Before fixes | After fixes |
| --- | ---: | ---: |
| Tool input definitions + instructions | 2,151 tokens | 2,233 tokens |
| Full launch-checklist first response, structured | 24,236 tokens | 3,785 tokens |
| Full launch-checklist first response, text | 8,719 tokens (capped) | 3,895 tokens (complete JSON page) |
| Full launch-checklist first response, wire | 126,735 bytes | 30,437 bytes |

The first structured response is approximately 84% smaller. This is **per-response size, not demonstrated task savings**. The after-fix report also traverses all 7 pages: 16 unique rules, 21,271 structured tokens, 22,117 text tokens, and 178,903 wire bytes in total. One oversized rule body is explicitly omitted; its subsequent `get_rule` retrieval and model conversation costs are additional. Pagination repeats metadata and adds calls, so fetching everything can increase total transport cost. Request focused rules or prompt-only guidance where sufficient.

The old large-response budget exception has been replaced with normal first-page ceilings. Complete traversal verifies byte bounds, termination, and rule coverage and records aggregate usage plus omission count; aggregate usage is reported, not yet a separate pass/fail budget. Per-scenario p95 must remain below 100 ms. Warm local timing is not a service-level guarantee.

Compare the preserved [original baseline](audits/2026-10-05-mcp-efficiency/baseline.json) and [after-fix report](audits/2026-10-05-mcp-efficiency/after-fixes.json). These are local source-level measurements; production has not been deployed or measured. The original baseline's cheap prompt responses were invalid guidance and must not be treated as a quality-equivalent cost baseline.

## What these numbers do not establish

- Counts are exact for the serialized text and pinned reference encoding, not exact invoices for Claude, Gemini or every OpenAI client/model. Provider framing, reasoning, caching and retries can change costs.
- MCP results generally become model **input** on subsequent turns. They are not automatically billed at generated-output token rates, and may be re-sent over several turns.
- Warm local handler time excludes cold starts, initial corpus loading, network round trips, deployment middleware and model reasoning. Use the existing load profiler and controlled deployment checks for those layers.
- Smaller outputs are only useful if quality holds. Existing retrieval/review quality floors run alongside the budget gate. Live paired trials must still measure total tokens, repeated calls, completion rate and cost per successful task.
- No production telemetry, hosted monitoring, recurring paid evaluation or user-code collection was added.
