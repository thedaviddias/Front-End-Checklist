---
name: styles-lint
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Lint CSS and SCSS files. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/styles-lint
---

# Lint CSS and SCSS files

CSS linting catches syntax errors, enforces consistent coding standards, and prevents maintainability issues before they reach production.

## Quick Reference

- Install Stylelint with stylelint-config-standard
- Add SCSS support with stylelint-config-standard-scss
- Enable auto-fix in your IDE and pre-commit hooks
- Include in CI/CD pipeline to catch issues early

## Check

Set up CSS/SCSS linting tools like Stylelint to automatically detect syntax errors, enforce coding standards, and maintain consistent code quality.

## Fix

Configure Stylelint with appropriate rules and integrate it into your build process and code editor for real-time error detection and fixing.

## Explain

Explain how CSS linting prevents errors, enforces consistent coding standards, and improves maintainability of stylesheets across the team.

## Code Review

Review stylesheets, component styles, and responsive states related to Lint CSS and SCSS files. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/styles-lint
