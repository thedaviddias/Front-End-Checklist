#!/usr/bin/env bash
set -euo pipefail
readonly vercel_cli_version="58.11.0"
for name in VERCEL_TOKEN VERCEL_ORG_ID VERCEL_PROJECT_ID; do
  [[ -n "${!name:-}" ]] || { echo "${name} is required." >&2; exit 1; }
done
# Build on Vercel instead of `vercel build --prebuilt`: this project's
# DATABASE_URL and NEXT_PUBLIC_* values are sensitive, and `vercel pull` only
# returns "[SENSITIVE]" placeholders for them, so a runner-side build would
# inline placeholders and could not migrate. The Vercel production build runs
# scripts/ci/migrate-on-vercel-production.sh before `next build`.
pnpm dlx "vercel@${vercel_cli_version}" deploy --prod --yes --archive=tgz --token="${VERCEL_TOKEN}"
