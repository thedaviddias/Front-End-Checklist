---
name: error-monitoring
description: "Use when setting up a new project's production observability stack, reviewing incident response readiness, or investigating why errors are going undetected."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/error-monitoring
---

# Integrate real-time error monitoring in production

Production errors are invisible without monitoring. Users rarely file detailed bug reports — they simply leave. Error monitoring gives you actionable stack traces, breadcrumbs, and user context within seconds of an issue occurring, cutting mean time to detect (MTTD) from days to minutes and dramatically reducing the cost of incidents.

## Quick Reference

- Install an error monitoring SDK (Sentry, Datadog, Bugsnag, etc.) early in the app entry point
- Capture unhandled exceptions, unhandled promise rejections, and React error boundaries
- Attach user context, release version, and environment to every event
- Configure alert thresholds and on-call routing so critical errors page the right team
- Capture failed network requests and production RUM signals such as Core Web Vitals

## Check

Check whether an error monitoring service is configured and capturing unhandled errors, promise rejections, React/framework-level errors, failed network requests, and production Core Web Vitals signals.

## Fix

Integrate an error monitoring SDK, configure environment and release tagging, capture failed network requests and RUM metrics, and set up alerts for critical error thresholds and regressions.

## Explain

Explain how error monitoring services work, what signals they capture, and how error grouping reduces alert noise.

## Code Review

Review the monitoring initialisation code. Flag missing user context, absent release tagging, overly broad event filters, missing network instrumentation, and any patterns that would swallow errors before they reach the monitoring service.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/error-monitoring
