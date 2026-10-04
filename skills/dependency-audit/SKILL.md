---
name: dependency-audit
description: "Use when reviewing a project's security posture, setting up CI pipelines, or responding to a reported vulnerability in a dependency."
metadata:
  category: security
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/dependency-audit
---

# Audit dependencies for known vulnerabilities

Third-party packages are the most common attack surface in modern web applications. The 2021 Log4Shell incident, the 2022 node-ipc supply-chain attack, and countless npm package hijackings demonstrate that a single vulnerable transitive dependency can compromise every application that depends on it. Automated, continuous scanning drastically reduces the window between a CVE being published and your team being aware of it.

## Quick Reference

- Run pnpm audit (or npm audit) before every production deployment
- Integrate automated dependency scanning in CI (GitHub Dependabot or Snyk)
- Treat critical and high severity findings as release blockers
- Pin transitive dependencies with a lock file committed to version control

## Check

Check the project's dependencies for known security vulnerabilities using the package manager audit command.

## Fix

Upgrade, patch, or replace vulnerable dependencies and configure automated scanning in the CI pipeline.

## Explain

Explain how supply-chain attacks work and why dependency auditing is a critical part of modern application security.

## Code Review

Review the lock file and package.json for unpinned version ranges, abandoned packages, and any packages flagged in recent CVE databases.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/dependency-audit
