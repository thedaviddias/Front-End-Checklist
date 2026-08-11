# Launch Readiness Checklist

Repo-grounded checklist for launching `frontendchecklist.io` as both a public product and an open-source project.

This is not a generic startup checklist. It is based on the current repository shape, workflows, env wiring, and public-facing features present on March 26, 2026.

## Current repo-specific gaps to resolve first

- [ ] Verify that all contributors, deployment targets, and hosted environments can actually run the pinned baseline of Node `24.14.1` and pnpm `10.33.0`.
- [ ] Fix E2E path drift. Playwright currently lives under [`apps/e2e/`](../apps/e2e/), but several workflows still reference `apps/web/e2e`, `apps/web/playwright.config.ts`, and `apps/web/test-results`.
- [ ] Decide whether waitlist and "coming soon" surfaces stay public at launch. The site currently exposes a Pro waitlist and an MCP CLI notify form.
- [ ] Add production error monitoring. Analytics exists via OpenPanel, but there is no real production exception pipeline such as Sentry, Datadog, or Bugsnag wired into the app.
- [ ] Decide whether the current env documentation is sufficient for external contributors or whether it should move to a root-level setup guide with service-by-service notes.
- [ ] Add missing open-source governance docs. There is no tracked `LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, or `SECURITY` document in the repo root.

## Product and site launch

- [ ] Freeze the public IA for launch: home, rules, categories, guides, checklists, MCP docs, account flows, and any waitlist-only surfaces.
- [ ] Decide which features are launch scope versus explicitly post-launch. The current repo already hints at future work through waitlists and Pro teasing.
- [ ] Review all public CTAs to make sure they land on real, supported flows rather than placeholders or "notify me later" paths.
- [ ] Confirm every public page has production-quality metadata, canonical URLs, OG images, and schema where relevant.
- [ ] Run a full broken-link pass across README, rules, guides, checklists, nav, footer, and API docs.
- [ ] Verify robots and sitemap behavior against the final set of public routes, especially new guide pages.
- [ ] Confirm favicon, manifest, Apple touch icon, and social preview assets are complete and render correctly on real devices.
- [ ] Review the homepage and rule pages for any copy that still sounds provisional, internal, or pre-launch.
- [ ] Decide whether the MCP CLI notify form should remain a waitlist or be replaced with real install/docs guidance before launch.
- [ ] Confirm auth UX is ready for public traffic: sign-in, sign-out, error states, profile flows, and social login copy.
- [ ] Validate all list/checklist share flows from a cold browser session and on mobile.
- [ ] Review 404, not-found, and empty states so they help users recover instead of dead-ending.

## Content and corpus readiness

- [ ] Run the full content pipeline before launch: `pnpm validate:rule-structure`, `pnpm validate:guide-structure`, `pnpm validate:guides`, `pnpm validate:evidence`, `pnpm validate:sources`, `pnpm score:rules`, `pnpm generate:skills`, and `pnpm generate:readme`.
- [ ] Rebuild the README and confirm the published counts and category totals match the live corpus.
- [ ] Audit the newest or recently edited rules for consistency in frontmatter, examples, sources, and verification sections.
- [ ] Review the guide section for launch credibility. There are currently only a small number of guide documents, so decide whether that is enough for launch or whether more editorial depth is needed.
- [ ] Confirm every checklist page feels intentional and complete, not like a thin wrapper around rule lists.
- [ ] Validate that llms.txt and MCP-discoverable content reflect the current corpus and route structure.
- [ ] Spot-check generated skills against the most important rules and workflows so agents do not get stale guidance.
- [ ] Review all content for naming consistency, especially "X" branding, category labels, and route vocabulary.

## Ops, infra, and environment readiness

- [ ] Create a single source of truth for required production env vars across web, auth, analytics, email, and rate limiting.
- [ ] Add missing launch env vars to `.env.example` or split them into a more complete root-level env reference.
- [ ] Verify production values for:
  - [ ] `DATABASE_URL`
  - [ ] `BETTER_AUTH_SECRET`
  - [ ] `BETTER_AUTH_URL`
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `GITHUB_CLIENT_ID`
  - [ ] `GITHUB_CLIENT_SECRET`
  - [ ] `RESEND_API_KEY`
  - [ ] `RESEND_TOPIC_ID`
  - [ ] `RESEND_AUDIENCE_ID` if legacy segment assignment is still needed
  - [ ] `SUBSCRIBE_SECRET`
  - [ ] `NEXT_PUBLIC_OPENPANEL_CLIENT_ID`
  - [ ] `OPENPANEL_CLIENT_SECRET`
  - [ ] `OPENPANEL_API_URL` (self-hosted: `https://stats.daviddias.digital/api`)
  - [ ] `UPSTASH_REDIS_REST_URL`
  - [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] Confirm `allowedHosts`, `trustedOrigins`, auth callback URLs, and cookie domain behavior match the final production domains and subdomains.
- [ ] Verify Vercel project settings for both `frontendchecklist.io` and `mcp.frontendchecklist.io`.
- [ ] Make sure rate limiting is truly enabled in production. Right now the app degrades to "allow all" when Upstash credentials are missing.
- [ ] Confirm the MCP subdomain rewrite and CORS setup still matches the intended browser and agent access patterns.
- [ ] Decide whether deploys should remain push-to-main only or require a stricter promotion path through preview/staging first.

## Monitoring, analytics, and support

- [ ] Add production error monitoring for the Next.js app and API routes.
- [ ] Add alerting for failed auth, failed waitlist submissions, MCP abuse spikes, and unexpected 5xx rates.
- [ ] Define a minimum observability dashboard: traffic, conversion, waitlist submissions, MCP usage, API errors, and latency.
- [ ] Confirm OpenPanel events are reviewed for privacy and do not capture raw PII unintentionally.
- [ ] Decide how to monitor the MCP endpoint separately from the main site.
- [ ] Add uptime monitoring for the website and the MCP hostname.
- [ ] Decide where user support and bug reports should go on launch day: GitHub Issues, discussions, email, or all three.

## Security and abuse prevention

- [ ] Run a focused pre-launch security pass on auth, checklist mutation routes, shared/public list routes, waitlist submission, and MCP.
- [ ] Confirm BotID coverage matches the public mutation endpoints you actually want to protect.
- [ ] Review public API endpoints for input validation, rate limits, auth requirements, and abuse handling.
- [ ] Confirm secrets are not committed anywhere and that secret scanning runs locally and in CI.
- [ ] Review CSP, security headers, cookie settings, and OAuth callback configuration in the deployed environment.
- [ ] Decide whether the MCP endpoint needs stricter origin allowlists, quotas, or telemetry retention limits before launch traffic arrives.
- [ ] Verify privacy-policy and consent flows reflect the real analytics and email behavior in production.

## QA, release engineering, and automation

- [ ] Make CI, PR checks, and deploy workflows agree on the same runtime versions, paths, and validation commands.
- [ ] Fix the current E2E workflow assumptions so Playwright artifacts and test directories point to the real `apps/e2e` layout.
- [ ] Add guide validation to the default CI path, not just local scripts.
- [ ] Confirm `pnpm ci:check` and the actual GitHub workflows enforce the same launch gate.
- [ ] Decide which checks are required on pre-push versus CI-only to keep local workflows fast but reliable.
- [ ] Run a final end-to-end launch rehearsal from a clean clone on a fresh machine.
- [ ] Validate production deploy behavior after merge: build, rewrite rules, auth, analytics proxy, waitlist, and MCP endpoint.
- [ ] Verify deploy reporting and post-deploy notifications behave correctly on push-based production releases.
- [ ] Decide whether Lighthouse should block deploys or remain advisory.
- [ ] Add a rollback playbook for bad deploys, broken content pushes, and MCP outages.

## Open-source launch readiness

- [ ] Add a license file and make the license explicit in the README and package metadata where needed.
- [ ] Add a contributor guide covering setup, validation commands, content authoring, and review expectations.
- [ ] Add a code of conduct.
- [ ] Add a security policy with a disclosure path.
- [ ] Add issue templates for bug reports and feature requests.
- [ ] Add a PR template that points contributors at `pnpm` commands and repo conventions.
- [ ] Decide how releases are communicated: changelog, GitHub Releases, newsletter, social posts, or all of them.
- [ ] Document supported Node and pnpm versions clearly in contributor-facing docs.
- [ ] Decide whether GitHub Discussions should be enabled for questions and community support.
- [ ] Review README onboarding from the perspective of a first-time contributor and a first-time user of the MCP server.

## Nice-to-have before or right after launch

- [ ] Add a staging checklist that mirrors launch-day smoke tests.
- [ ] Add a simple launch dashboard or internal scorecard for traffic, signups, errors, and MCP usage.
- [ ] Add automated secret scanning in CI if you want a second line of defense after local hooks.
- [ ] Add dependency and dead-code audits such as `pnpm audit` and `knip` when the repo is stable enough to enforce them.
- [ ] Add issue labels, milestones, and a short public roadmap so incoming feedback is easier to triage.
