# MCP pilot: 5 October 2026

**Conclusion:** this pilot does not establish quality uplift. On tiny HTML repairs, MCP adds substantial cost and latency, and guessed rule slugs waste calls. Use these findings to improve tool discovery and the evaluation contract before expanding paid trials.

Eight development tasks, two conditions, one trial each, same pinned `claude-haiku-4-5-20251001` model through Promptfoo 0.123.1. This is an HTML-output benchmark, not a repository-editing or human-reviewed outcome study.

| Corrected run | Without MCP | With MCP |
| --- | ---: | ---: |
| Attempts | 8 | 8 |
| Strict automated passes | 0 | 5 |
| Input tokens, all model turns | 656 | 75,405 |
| Output tokens, all model turns | 257 | 1,321 |
| Standard token cost | $0.001941 | $0.082010 |
| Mean task latency | 0.733 s | 2.297 s |
| MCP calls | 0 | 12 |
| MCP tool errors | 0 | 5 |

MCP used about 84x as many total tokens and cost 42.3x as much in this small sample. Absolute treatment cost averaged about one cent per task. Neither relative cost nor latency generalizes to longer real-world tasks or other models/clients.

## Why the pass-rate difference is not quality uplift

The control mostly returned correct-looking edits inside Markdown fences. The strict output contract rejected those wrappers. Treatment more often returned raw HTML, but both treatment controls added prose or failed to return the original markup. This conflates formatting compliance and repair quality. Preserve this result; do not silently strip wrappers and relabel it as a pre-registered success measure.

Both conditions invented visual details for the product-photo alt text without seeing the image. The deterministic scorer accepted treatment's output, illustrating why semantic review is mandatory. The five treatment passes are static passes only. No independent human review was completed, and cost per verified successful task remains unknown.

The five tool errors used guessed slugs: `image-dimensions`, `aria-label`, `label-for`, `lazy-load-images`, and `opener-isolation`. Four recovered through another call; the close-button task produced a static passing answer after its only MCP call failed. Merely observing a passing answer with MCP enabled does not show the tool improved it.

## Execution integrity and spend

An initial run used an unsupported provider `config.system` field. It cost $0.110145 and is retained as **invalid initial evidence**. The corrected run moves system/user messages into a JSON chat prompt and rejects fences anywhere in the output. Corrected rendered prompts were JSON-parsed to verify their roles and content. No additional paid reruns were made after that run.

Corrected-run cost: **$0.083951**. Combined session cost: **$0.194096** across 59 dispatched model requests, with zero unsettled reservations. These are provider-reported usage multiplied by verified standard rates, not an invoice; taxes/account adjustments are excluded. The same $1 reservation guard covered both runs. Local proxy and MCP server were stopped, and the temporary proxy token was removed. The real API key was read only into the proxy process from the existing authorized 1Password mount; it is absent from these artifacts.

The Promptfoo `numRequests` counter undercounts multi-turn attempts. Use the usage ledger for real dispatch counts, and the condition usage totals for model-token comparisons. A preliminary fake-provider integration had already confirmed multi-turn usage summation and real MCP tool execution.

## Evidence

- [Corrected outputs and tool traces](corrected.json)
- [Invalid initial outputs and tool traces](invalid-initial.json)
- [Entire session usage ledger](usage.jsonl)
- [Relevant source SHA-256 hashes](source-hashes.json)
- [Protocol and budget guard](../../mcp-impact-benchmark.md)

## Next experiment

Before spending more, define two separate metrics: strict machine-consumable output and semantic repair correctness, with an explicit extraction contract applied equally to both conditions. Add cases where the corpus could supply knowledge the model would not already know, retain valid controls, and independently review invented claims. Improve slug discovery (search first or structured suggestions) and compare selective tool exposure against exposing the whole catalogue. Do not claim general uplift from these eight development cases.

## Offline post-hoc diagnostic and discovery follow-up

The [separate format/static report](post-hoc-format-static.json) re-scores the preserved corrected outputs without model calls. Its source hash binds the unchanged original evidence. Extraction accepts raw HTML or one explicit HTML fence, optionally surrounded by prose without competing markup. Multiple code blocks, before/after alternatives, inline-only HTML, prose-only answers and malformed artifacts are rejected. It never interprets “no changes needed” as a returned artifact.

| Post-hoc metric | Without MCP | With MCP |
| --- | ---: | ---: |
| Raw HTML format passes | 0/8 | 5/8 |
| Extracted artifact static passes | 8/8 | 6/8 |
| Valid controls with preserved artifact | 2/2 | 0/2 |
| No unambiguous artifact returned | 0 | 2 |
| Semantically verified outcomes | Unknown | Unknown |

These are **post-hoc development-sample diagnostics**, not a pre-registered quality comparison. All eight control-condition repairs/artifacts pass the existing DOM checks once a single code fence can be extracted. The treatment's two valid-control outputs provide commentary rather than an unambiguous returned artifact. Invented alt-text details remain a semantic review failure risk in both conditions. This gives no basis for claiming the extra cost improved repairs.

Future Promptfoo runs expose named `outputFormat` and `staticCorrectness` metrics separately. Promptfoo's overall success still combines assertions; do not use that aggregate as the repair-success metric. Semantic review is explicitly pending and verified success remains null.

Rule discovery changes now tell all four single-rule tools to reuse exact returned slugs and search first when the ID is unknown. Shared errors return at most three real catalogue candidates and an explicit `search_rules` continuation with limit 3. Unknown IDs remain errors; there is no silent aliasing. Oversized invalid input is bounded before fuzzy matching. Existing suggestion ranking is preserved: the corpus already supplied useful alternatives for most pilot failures. No live reduction in retries or dollars has yet been measured for these changes.
