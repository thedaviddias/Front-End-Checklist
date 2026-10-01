#!/usr/bin/env bash
# Apply Prisma migrations during Vercel production builds only.
#
# DATABASE_URL is a sensitive Vercel variable: it resolves inside Vercel's own
# build, but `vercel pull` only returns a "[SENSITIVE]" placeholder, so CI
# runners cannot migrate. Preview and local builds skip this step.
set -euo pipefail

if [[ "${VERCEL:-}" != "1" || "${VERCEL_ENV:-}" != "production" ]]; then
  echo "Skipping Prisma migrations (not a Vercel production build)."
  exit 0
fi

if [[ ! "${DATABASE_URL:-}" =~ ^postgres(ql)?:// ]]; then
  echo "DATABASE_URL is missing or not a postgres URL in this Vercel production build." >&2
  exit 1
fi

pnpm --filter @repo/auth exec prisma migrate deploy
