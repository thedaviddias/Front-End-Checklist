#!/usr/bin/env bash
set -euo pipefail
readonly vercel_cli_version="58.11.0"
for name in VERCEL_TOKEN VERCEL_ORG_ID VERCEL_PROJECT_ID; do
  [[ -n "${!name:-}" ]] || { echo "${name} is required." >&2; exit 1; }
done
pnpm dlx "vercel@${vercel_cli_version}" pull --yes --environment=production --token="${VERCEL_TOKEN}"
readonly vercel_env_file=".vercel/.env.production.local"
[[ -f "${vercel_env_file}" ]] || { echo "${vercel_env_file} was not created." >&2; exit 1; }
set -a
# Vercel generates this shell-compatible file from the project's protected environment.
# shellcheck disable=SC1090
source "${vercel_env_file}"
set +a
[[ -n "${DATABASE_URL:-}" ]] || { echo "DATABASE_URL is missing from the Vercel production environment." >&2; exit 1; }
pnpm --filter @repo/auth exec prisma migrate deploy
pnpm dlx "vercel@${vercel_cli_version}" build --prod --token="${VERCEL_TOKEN}"
pnpm dlx "vercel@${vercel_cli_version}" deploy --prebuilt --prod --yes --archive=tgz --token="${VERCEL_TOKEN}"
