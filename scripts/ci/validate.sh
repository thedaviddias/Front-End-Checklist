#!/usr/bin/env bash
set -euo pipefail

corepack enable
if [[ -n "${PNPM_STORE_DIR:-}" ]]; then
  pnpm config set --global store-dir "${PNPM_STORE_DIR}"
fi
pnpm install --frozen-lockfile
pnpm run lint
pnpm validate:rule-structure
pnpm validate:guide-structure
pnpm --filter web build:content
pnpm run typecheck --filter=web
pnpm run test:ci --filter=web
