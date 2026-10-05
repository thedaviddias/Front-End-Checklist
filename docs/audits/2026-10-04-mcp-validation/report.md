# MCP maintenance validation — 4 October 2026

Tracked in [DAV-614](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-614), following dependency maintenance [DAV-598](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-598). This report records local validation before publication. Commit/push verification is tracked in [DAV-645](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-645). Production smoke checks exercise the deployed service, not these fixes.

## Findings and fixes

1. **The POST request limit trusted Content-Length.** A chunked request or inaccurate header could bypass the 100 KiB limit. `apps/web/app/api/mcp/request-body.ts` now counts bytes while reading, cancels oversized streams, and parses only bounded input. The route returns 413 for oversized input and 400 for malformed JSON. Tests cover absent/inaccurate lengths, multibyte UTF-8, chunk cancellation, malformed input and the exact limit.
2. **Response caching could return the wrong envelope or skip transport validation.** The old 32-bit hash collides for otherwise identical `tools/list` requests with IDs `1r` and `30`. SHA-256 now hashes the complete cache input. That input includes transport headers, so a successful request cannot prime a response subsequently returned to a request with invalid Accept or different protocol context. A route regression primes the cache, then verifies that `Accept: text/plain` is still rejected with 406.
3. **The review detector had quality gaps, now fixed locally.** The independent four-case challenge detects executable `eval(userInput)`, incorrectly flags the same text in a comment and string, and misses `(0, eval)(userInput)`. This existed with both SDK versions. [DAV-619](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-619) records the parser-based remediation. Comments and strings no longer trigger this check, and common indirect, optional, global and bound eval calls are detected. This is a source fix beyond the dependency upgrade.
4. **Production rule pages emit React error 418.** Two browser contexts reproduced the hydration error on `/rules/images/alt-text`, including a fresh context before any progress interaction. Local SSR regression tests establish a DOM-dependent table of contents as a hydration mismatch: the server renders no navigation, while the first client render adds navigation. Code-tab selection also read browser storage/hash/context during the initial render. Both now use deterministic initial state and apply browser state in effects; the sidebar remounts on rule navigation. These local fixes have not been deployed. [DAV-621](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-621) holds this separate application investigation. See [browser error evidence](assets/rule-browser-errors.json) and [page capture](assets/rule-hydration-desktop.png).

## Quality and best practices

The existing deterministic quality suite passes: 8 retrieval queries all return at least one expected rule in the top five; reciprocal rank averages 0.92. Existing review fixtures report 100% precision and recall, and five improvement scenarios detect problems, verify fixes and return guidance. These are small curated fixtures, not an estimate of accuracy on arbitrary code. The retrieval test calls its metric Recall@5, but it measures whether any expected rule appears, rather than recall over every relevant rule.

The independent challenge above is deliberately reported alongside the passing fixtures. It demonstrates why fixture scores alone cannot support a general quality claim. No paid model-based tool-selection or argument-correctness evaluation was run.

All six changed MCP implementation/test files pass Biome. MCP and web TypeScript checks pass. New tests live beside the implementation and run through the existing Jest discovery conventions. No hook bypasses or package-manager substitutions were used. The earlier dependency-maintenance run passed the full workspace tests and typechecks; those results precede the two local hardening fixes, which received the focused checks below.

## Security evidence

- **20 route/cache/body tests pass** in three suites, including the actual MCP handler behind the route and both new regressions. [Result summary](boundaries-final.txt).
- **47 quality/body/SSRF tests pass** in three suites. The body tests overlap the preceding run; these counts must not be added as unique tests. SSRF tests cover private IPv4/IPv6, private DNS resolutions, HTTP and embedded credentials, redirect validation and response-size rejection. DNS/fetch are mocked; this is not a live DNS-rebinding exercise. [Result summary](security-final.txt).
- A fresh `pnpm audit --prod --json` reports zero advisories across 1,009 production dependencies. The previous maintenance audit also passed after removing the unused upgrade tool that introduced the braces advisory. An advisory scan does not prove the absence of exploitable defects.

Execution used an existing local Linux container image with Node 24.19.0: no external network, read-only source/dependency mounts and root filesystem, empty environment with a minimal allowlist, unprivileged UID, no capabilities, no privilege escalation, 2 GiB memory, two CPUs, bounded processes/files/CPU time, a 64 MiB scratch tmpfs and a 120-second execution timeout. No credentials or `.env` files were mounted. Public checks used ordinary read-only requests; adversarial cases stayed local.

The macOS dependency tree has a platform-specific Jest resolver. The isolated harness supplied a JavaScript resolver shim and prebundled the MCP handler/quality/SSRF modules with esbuild for Linux. Route TypeScript used ts-jest with a temporary mapping for mocked generated content; separate TypeScript checks validated source types. Harness adaptation failures were resolved before reporting passing runs. This is focused source validation, not an unchanged production Next.js build or a complete application penetration test. Authentication, account authorization, database policies, email and third-party service configuration were outside this validation.

## Performance comparison

Compared MCP client/server SDK **2.2.0 against 2.3.0**, using identical current server source and rule corpus. This isolates the SDK update; it does not compare all upgraded web dependencies or benchmark Next.js, Redis, database calls, production networking or cold starts.

Each run first connected an official client pinned to protocol `2026-07-28`, listed tools and searched rules. Then it warmed 20 calls and ran five-second stages at concurrency 1, 8 and 32. The fixed round-robin workload used `tools/list`, `search_rules`, `get_rule`, `review_code` and `resources/read`. A child HTTP server handled loopback requests inside the isolated network namespace. Both versions used the same runtime and container limits. Run order: before, after, after, before.

| Concurrency | SDK 2.2 throughput range | SDK 2.3 throughput range | SDK 2.2 p95 range | SDK 2.3 p95 range |
| --- | --- | --- | --- | --- |
| 1 | 68.8–97.4 req/s | 96.1–118.5 req/s | 27.06–39.44 ms | 22.48–27.68 ms |
| 8 | 89.1–187.8 req/s | 133.6–177.3 req/s | 93.67–209.79 ms | 111.82–133.11 ms |
| 32 | 158.3–179.0 req/s | 155.0–239.1 req/s | 381.71–427.25 ms | 275.41–376.29 ms |

All stages returned zero errors. Server RSS ranged from 203.4 to 256.6 MiB across both versions. Raw p50/p95/p99, CPU per request, RSS and request counts are in [performance.json](performance.json). The large inter-run variation and shared-host contention prevent a reliable speedup claim or capacity/SLO guarantee. The short runs did not show a consistent regression. A dedicated longer soak, cold-start measurement and an end-to-end deployed benchmark remain needed before setting operational budgets.

## Production and browser checks

Correction: the earlier hand-written `server/discover` request returned HTTP 200 containing JSON-RPC error -32601; HTTP status alone did not prove success. A subsequent official SDK client pinned to `2026-07-28` successfully negotiated that protocol, listed 11 tools and completed `search_rules`. See [official-client result](public-modern.json). Ordinary public metadata and legacy search/review reads were also available. Production advertises server version **2.0.0**, while local source advertises **2.0.1**. These responses demonstrate deployed read availability, not deployment of the local SDK update or fixes. Deployment remains blocked by the existing invalid Vercel token tracked in [DAV-600](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-600).

Anonymous browser checks covered homepage keyboard search (ArrowDown/Enter to an image rule), rule completion persistence across reload and restoration, mobile menu open/close, checklist search filtering, direct checklist detail navigation, the guides index, MCP setup page rendering and an unknown-route page with Go home/Browse rules continuations. At 390 × 844, the inspected checklist page had no horizontal overflow; its [mobile screenshot](assets/checklists-mobile.png) was visually inspected. Basic landmark/name observations are not a full accessibility audit.

Rule-page hydration errors prevent a clean browser verdict. The initially unverified checklist expansion and MCP tab interactions were subsequently exercised with real pointer events and keyboard selection. Checklist details expanded and MCP selection changed to Codex, then Windsurf with ArrowRight. See [checklist recording](assets/checklist-interaction.webm), [expanded state](assets/checklist-expanded.png), [MCP recording](assets/mcp-tab-interaction.webm) and [selected tab](assets/mcp-tabs-verified.png). These passing interactions do not establish a clean rule-page hydration verdict. Do not infer a complete browser journey from page rendering alone. No signup/email forms were submitted, no account data was changed, and no production load or adversarial probes were sent.

## Reproduction and remaining limits

Repository-native checks: `pnpm --filter @repo/mcp exec tsc --noEmit`, `pnpm --filter web exec tsc --noEmit`, Biome on the six changed files, and `pnpm audit --prod --json`. Focused Jest paths are `apps/web/app/api/mcp/__tests__/{route,request-body}.test.ts`, `apps/web/lib/__tests__/mcp-cache.test.ts`, `packages/mcp/tests/unit/audit-url-ssrf.test.ts`, and `packages/mcp/tests/quality/mcp-quality.test.ts`.

The temporary harness and logs remain under `/Users/thedaviddias/.codex/security-validation/fec-dav-614/scratch/`; they are temporary local staging, not published general files. Sanitized results and screenshots above are repository-native evidence. The report distinguishes passing checks from unresolved findings and from production proof; it makes no blanket claim that the application is secure, accessible, fast or universally accurate.

For protocol interpretation, use the current [MCP transport specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports). The request body defines the method; transport/header negotiation must still be validated. Future roadmap items should not be treated as requirements already supported by the deployed service.


## Follow-up fixes and regression proof

- [DAV-619](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-619): Babel parses JavaScript, TypeScript and JSX without executing it. HTML checks inspect executable inline scripts and event handlers. The new detector has 31 unit cases, including the original independent challenge; quality fixtures now include comments, literal strings and indirect eval. This detects syntax patterns, not alias data flow or lexical bindings. Malformed snippets may remain undetected. See [Babel parser documentation](https://babeljs.io/docs/babel-parser).
- [DAV-621](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-621): four new SSR/hydration regressions fail against the previous components and pass after the fixes, alongside four existing tab tests (8 passing tests in 3 suites). Tests cover the table of contents/hash/observer and stored, hash and checklist framework selection. See [React hydration error 418](https://react.dev/errors/418). The new `apps/web/e2e/hydration.spec.ts` covers related-rule navigation and tabs but is **not executed**: the isolated Linux toolchain lacks the platform-native Next.js dependencies needed for an application build. The SSR tests use real React `renderToString`/`hydrateRoot` in jsdom, not a complete Next.js browser build.
- [DAV-641](https://paperclip.lab.coolio.cloud/DAV/issues/DAV-641): the public source review exposed a false positive on `<ul>{headings.map(...)}</ul>`. List analysis now masks parsed JSX expressions/custom components as unknown output while preserving invalid literal text/elements and orphaned items. Ten regression cases cover mapped lists, components, literal JSX and HTML. Unparseable component source is skipped for list checks; dynamically generated children require rendered-DOM validation.

**296 tests pass in 16 MCP suites** ([summary](core-postfix.txt)); **8 browser-component tests pass** ([summary](hydration-postfix.txt)), with [four failures on old components](hydration-before.txt) establishing regression sensitivity. MCP and web TypeScript checks, changed-file Biome checks and new-helper complexity checks pass.

Follow-up full MCP tests use ts-jest on current source with a resolver shim and a bundled rules loader, in the same isolated container. The source-launch CLI test requiring Linux pnpm/tsx is excluded; a separately rebuilt stdio bundle returns two valid JSON-RPC results (initialize and indirect-eval review). The running stdio server is stopped by the bounded harness after receiving responses. Existing concurrent annotation-title changes are preserved. The final core run has a 240-second timeout; earlier focused runs used 120 seconds.

Targeted parser timing uses 5 warmups and 20 samples per case, with the same two-CPU container limits. Ordinary code without an eval marker takes p95 0.001–0.006 ms for roughly 1–100 KiB. Parsing a 100 KiB comment-containing fixture takes p95 **148.74 ms**, while a 100 KiB executable-call fixture takes **45.42 ms**. Final RSS was 189.9 MiB. These expose parsing cost and are not full-request latency or a capacity guarantee. [Raw parser measurements](eval-performance.json). The earlier SDK comparison predates these detector fixes.

The latest inspected [deployment run](https://github.com/thedaviddias/Front-End-Checklist/actions/runs/37244912233), created 4 October at 23:45 UTC, failed with an invalid `VERCEL_TOKEN`. Credential repair remains tracked in DAV-600. No credentials were retrieved. Deployment of these fixes remains unverified; commit/push progress belongs to DAV-645.

An out-of-scope documentation discrepancy is tracked in DAV-642: `validate:packages` checks rule metadata's npm package annotations; it does not validate workspace dependency consistency. The current zero-annotation result is not evidence of dependency health.
