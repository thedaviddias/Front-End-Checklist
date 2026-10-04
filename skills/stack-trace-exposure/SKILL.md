---
name: stack-trace-exposure
description: "Use when reviewing error handling middleware, API route handlers, or server responses for security-sensitive information disclosure."
metadata:
  category: security
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/stack-trace-exposure
---

# Prevent stack trace exposure in production error responses

Stack traces reveal file paths, function names, library versions, and sometimes database schema or configuration details. An attacker uses this information to identify the exact version of a framework or ORM, look up known CVEs for that version, and craft a targeted exploit. OWASP lists "Security Logging and Monitoring Failures" (A09) as a top-10 risk partly because organisations often expose this information without realising it.

## Quick Reference

- Never return raw error objects or stack traces in API responses
- Log full error details server-side; send only a generic message to the client
- Use a central error handler to ensure consistent sanitisation across all routes
- Assign correlation IDs so support teams can match client-visible errors to server logs

## Check

Check whether production API error responses include stack traces, file paths, or internal implementation details.

## Fix

Implement a central error handler that logs full details server-side and returns only a sanitised, generic error message to the client.

## Explain

Explain what information stack traces reveal and how attackers use that information to identify and exploit vulnerabilities.

## Code Review

Review error handlers, catch blocks, and API response code. Flag any location where error.stack, error.message (raw), or internal paths are serialised directly into a response body.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/stack-trace-exposure
