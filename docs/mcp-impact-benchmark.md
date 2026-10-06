# MCP impact benchmark protocol

Tracked in [DAV-671](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-671).

## What this measures

The primary outcome is the change in verified task success with MCP enabled, using the same model and budget. A task succeeds only when all explicit static requirements and preservation checks pass, it was actually completed, and an independent reviewer approves the exact candidate hash. Human review can fail a patch that passes static checks.

Version 2 has 32 hand-authored HTML cases covering images, accessible names and labels, language/direction, metadata, loading and form behavior. Twenty-four belong to the development split; eight are reserved as held-out. Eight cases are valid controls where no edit is appropriate. Report repair success and unnecessary control edits separately so controls do not inflate the repair score. Per-category and per-split summaries are included; costs are only attributed to the whole condition.

The old five-case scorer used the MCP's own detector to grade patches. The new scorer imports no production detection code and does not reward deleting the affected element or file. It checks DOM structure, explicit attribute/text requirements, preservation constraints and unchanged controls. Some tasks deliberately prescribe exact markup to make grading unambiguous. Nonempty alternative text still needs human semantic review.

This is a **narrow static benchmark**. It does not measure arbitrary React/JavaScript/CSS changes, browser behavior, every regression, accessibility conformance or real-project success. Authored fixtures and reference patches have not been independently validated by a human yet. Held-out means reserved from tuning in this protocol, not secret or guaranteed absent from model training. The source corpus is public. Add independently labeled repository tasks in a future benchmark version before making broad claims.

## Run procedure

1. Freeze the model snapshot, client version, settings, tool availability, MCP revision, rule-corpus revision and time/token budget. Use identical instructions in both conditions and fresh conversations per task.
2. Initialize `pnpm mcp:impact -- --init .mcp-impact/trial-01`. This makes identical `without-mcp/` and `with-mcp/` inputs. It refuses to overwrite any existing directory.
3. Copy only each candidate task and its README plus the shared root instruction into an isolated agent workspace. Do not expose the repository, sibling condition, manifest, grading code, metadata or reference patches. A path convention alone is not an isolation boundary. Disable only this MCP in the baseline and keep other tools identical.
4. Run each task with the exact same prompt and budget, alternating/randomizing condition order. Record failures and timeouts as completed attempts with failed review evidence; never silently drop unsuccessful attempts. The harness does not invoke agents or enforce their runtime budget.
5. Copy candidates back. Collect model/client execution records and token usage from the actual runner. In the benchmark root, copy `run-metadata.example.json` to `without-mcp.run.json` and `with-mcp.run.json`, then populate real evidence. These files are evaluator-owned and must not be writable by the candidate agent.
6. Score with `pnpm mcp:impact -- --score .mcp-impact/trial-01`. Review the patch independently and record reviews against the candidate hashes printed in the report. Re-score after recording reviews.
7. Freeze tuning before initializing `--split held-out`. Do not tune on held-out failures and still call that a held-out evaluation. Use new cases for the next evaluation if you incorporate those failures into development.
8. Repeat matched trials, initially three per task. Retain raw reports and compare paired task outcomes. A single run or tiny category does not establish significance; this harness deliberately does not manufacture a confidence interval.

`--split all` is useful for harness validation, not tuning. Version 1 runs have no matching manifest and cannot be silently scored as version 2. Any corpus or prompt changes require a new run directory at that revision.

## Metadata and independent review

The generated example records model, settings, time budget, prompt hash, MCP assignment and revisions, MCP tool-call count, completed task IDs, tokens, cost and elapsed time. `toolCalls` means calls to **this MCP**, not filesystem or other client tools. The no-MCP condition must have zero. Zero calls in the enabled condition are permitted: availability is the experimental treatment, and lack of adoption is itself informative. `settings` must include the same client version, temperature/effort, token limits and other tools; do not include the treatment assignment in this string.

A review entry under `reviews` looks like:

```json
{
  "product-photo": {
    "verdict": "pass",
    "reviewer": "Independent reviewer identity",
    "evidence": "Descriptive alt matches the image context; image source and heading preserved; no unrelated changes.",
    "candidateHash": "COPY_SHA256_FROM_TASK_REPORT"
  }
}
```

Use the exact 64-character hash from the task report. Any subsequent candidate edit invalidates the review. Check meaning, preserved behavior and content, unexpected changes, and every requested requirement. For behavior-dependent claims, test in a browser and reference that evidence. Review both conditions blind to treatment where practical. A model's self-assessment is not independent human review. A timeout or missing output should receive a failing verdict, not fabricated success; a genuinely missing file cannot receive a hash-bound review, so preserve the last candidate (initial code if no edit occurred) and record the timeout evidence.

The report exposes:

- `automatedSuccessRate`: all explicit static checks and preservation constraints pass.
- `automatedRepairSuccessRate`: the same measure excluding valid controls.
- `regressionTasks`: tasks failing a listed preservation constraint, not every possible regression.
- `unnecessaryControlEdits`: byte changes to controls whose prompt explicitly requires no change; not a general detector false-positive rate.
- `verifiedSuccessRate`: automated pass plus completed attempt plus current passing human review.
- `verifiedSuccessDelta`: with-MCP minus without-MCP verified success; `null` until both runs have matching settings, assignment, prompt, complete attempts and current reviews.
- `provisionalAutomatedDelta`: static score difference only, including when no actual agent has run. Never present it as model uplift.
- `costPerVerifiedTaskUsd`: total condition cost divided by verified successful tasks, including controls. `null` if cost is unavailable or there are no verified successes. Token/cost/time values are evaluator-supplied, not inferred.

Metadata is an attestation, not cryptographic proof of execution. Retain runner transcripts and billing evidence alongside evaluator records. JSON validation and hashes prevent accidental stale comparisons, not a malicious evaluator. Missing human review blocks verified comparison; missing cost blocks economic conclusions but does not invalidate an otherwise reviewed task comparison.

## Cost plan before model execution

All harness checks are local and free of model API charges. A proposed initial model evaluation is **32 tasks × 2 conditions × 3 trials = 192 task attempts**. Agents may use multiple model requests per attempt.

Set a total token budget per attempt, including every turn and repeated context. For an illustrative cap of 10,000 input and 2,000 output tokens per attempt, the maximum planned volume is 1.92 million input and 0.384 million output tokens. The estimate is:

`1.92 × input_price_per_million + 0.384 × output_price_per_million`

Use the selected provider's current rates, account for billed reasoning/cache/tool fees, and enforce a monetary cap in the actual runner. The numbers above are planning assumptions, not current provider prices or an implemented budget limiter. Select the model, verify its price, and approve the resulting dollar cap before a paid run. Do not treat harness self-tests as a live baseline.

## Local verification

```bash
pnpm mcp:impact -- --self-test
pnpm --filter @repo/mcp exec jest tests/unit/impact-benchmark.test.ts tests/unit/retrieval-metrics.test.ts tests/quality --runInBand
pnpm --filter @repo/mcp exec tsc --noEmit
```

The self-test validates all references, broken inputs, deleted/empty candidates and the unverified-result guard. Jest additionally challenges preservation regressions, duplicate elements, malformed HTML, stale reviews, mismatched metadata, unknown costs, changed manifests, overwrite protection and synthetic paired reporting. Those synthetic runs validate the harness, not model quality.

## Prepared eight-case Promptfoo pilot

Start with **8 development cases × 2 conditions = 16 attempts**, including two valid controls, before the full 192-attempt study. Configuration: [`promptfoo-pilot.ts`](../packages/mcp/scripts/promptfoo-pilot.ts), with shared settings and independent static scoring in [`promptfoo-pilot-config.ts`](../packages/mcp/scripts/impact/promptfoo-pilot-config.ts). Neither configuration import nor its tests calls a model. Live provider execution remains to be verified.

The executable configuration now pins **claude-haiku-4-5-20251001** for both conditions and requires the loopback budget proxy. Published standard rates checked 5 October 2026: $1 per million input tokens and $5 per million output tokens ([official model pricing](https://platform.claude.com/docs/en/models/haiku-4-5/overview)). It uses a local MCP server only for treatment, one concurrent attempt, no evaluation cache, up to three tool rounds, and 1,024 output tokens per request. No model grader is configured. Static HTML success remains provisional, not independent human verification.

[`pilot-budget.ts`](../packages/mcp/scripts/impact/pilot-budget.ts) enforces a **$1 standard API token-charge ceiling per proxy session**. Before forwarding, it reserves $0.20512: the model's entire 200,000-token input context plus 1,024 output tokens. Valid returned usage releases the unused reservation. Errors, timeouts, or missing usage retain it; retries must reserve again. Concurrent requests share one ledger. Unsupported models, caching, server-side tools, streaming, thinking, and nonstandard pricing options are rejected. Prices exclude taxes or account-specific charges. This conservative guard can stop below $1 when the remaining balance cannot cover another worst-case request.

The proxy ledger is created exclusively and cannot be overwritten. Restarting with a new ledger creates a new budget, so **do not automatically restart or retry the pilot as a new session**. The runner receives only a random local proxy token; the provider API key stays in the proxy process. Current credential preflight found no ANTHROPIC_API_KEY in the task shell; live execution remains blocked on an authorized environment/credential reference.

Intended commands after supplying credentials securely and a shared random FEC_PILOT_LOCAL_TOKEN (24+ characters):

```bash
# Terminal 1
pnpm --filter @repo/mcp serve --port 3100

# Terminal 2: real ANTHROPIC_API_KEY supplied through the authorized environment
# The ledger must not already exist. This prints the loopback FEC_PILOT_API_URL.
pnpm --filter @repo/mcp exec tsx scripts/serve-pilot-proxy.ts

# Terminal 3: set FEC_PILOT_API_URL to the printed loopback URL and share only
# FEC_PILOT_LOCAL_TOKEN with this process. This command spends provider credits.
PROMPTFOO_DISABLE_TELEMETRY=1 pnpm dlx promptfoo@0.123.1 eval \
  -c packages/mcp/scripts/promptfoo-pilot.ts \
  -o /tmp/fec-pilot-results.json --no-share --no-write
```

Promptfoo 0.123.1 has been downloaded through pnpm dlx. Budget logic and proxy dispatch/usage settlement are tested with a fake provider; those tests make no paid calls. Tests cover concurrent reservations, exhausted budget, malformed usage, double settlement, unsupported paid features, and rejected local credentials. MCP configuration validation is separate from an actual live model result.

Retain actual usage across every tool round, retries, latency, tool-call traces, raw outputs and current rate information. Verify that Promptfoo's reported cost includes the whole multi-turn attempt before using it. Compare success, control regressions, calls and cost per successful task. Complete independent reviews and convert results into the existing hash-bound run records before reporting verified uplift. Do not automatically schedule paid trials in CI.

Upstream references: [Promptfoo Anthropic MCP configuration](https://www.promptfoo.dev/docs/providers/anthropic/) and [evaluation configuration](https://www.promptfoo.dev/docs/configuration/reference/).

### Pilot integration verification, 5 October 2026

Promptfoo 0.123.1 executed one paired case against a fake Anthropic endpoint through the real budget proxy and local MCP server. Treatment performed a real `search_rules` call and a second mocked model request. The report retained the tool trace and summed mocked usage correctly (control 120 tokens; treatment 240). Both deliberately invalid mock answers failed the independent assertions, with zero provider errors. These synthetic numbers are plumbing evidence only, not model outcomes or real costs. Temporary reports live in `/tmp/fec-pilot-mock-plumbing.json` and `/tmp/fec-pilot-mock-tool-loop.json`.

Promptfoo's `numRequests` reported one for the two-request treatment; use the proxy ledger's dispatch count for actual model requests. The separate `validate config` command prints valid configuration but then fails during MCP client shutdown; the actual eval command completed the tool loop successfully. No live provider calls have been made. Six focused budget/config tests, MCP TypeScript and changed-file Biome checks pass.

### Live pilot completed

The 5 October 2026 [live pilot report](audits/2026-10-05-mcp-pilot/README.md) supersedes the earlier credential-blocked status above. An authorized existing 1Password environment supplied the credential. The entire session cost $0.194096, including an invalid initial configuration run. Corrected treatment cost 42.3x control on these tiny tasks; strict-format scores do not establish repair-quality uplift. Preserve the evidence and resolve evaluation/discovery findings before expanding paid trials.

### Separate output and artifact metrics

Future pilot assertions report `outputFormat` (raw complete HTML) and `staticCorrectness` (checks on one extracted artifact) independently. Extraction allows one explicit HTML fence with non-competing prose, or raw HTML; it rejects ambiguous before/after blocks and never fabricates unchanged code from a prose verdict. Static correctness is not semantic truth. Human review remains required for details such as whether image alternative text invents unseen attributes.

Re-score a sanitized corrected run offline, writing to a new report path:

```bash
pnpm --filter @repo/mcp exec tsx scripts/rescore-pilot.ts /absolute/path/corrected.json /absolute/path/new-report.json
```

Re-scoring is explicitly labelled post-hoc and binds source bytes by SHA-256. Original live evidence and source hashes remain unchanged. The [saved diagnostic](audits/2026-10-05-mcp-pilot/post-hoc-format-static.json) separates formatting, static artifacts, preservation and unknown semantic verification. Do not report Promptfoo's combined assertion pass rate as repair correctness.
