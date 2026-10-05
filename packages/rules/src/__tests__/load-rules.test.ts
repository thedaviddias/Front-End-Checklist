import assert from 'node:assert/strict'
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { loadRules } from '../load-rules'

const fixtureRulesDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'fixtures/rules/en'
)

test('loadRules parses normalized rule records from MDX files', () => {
  const rules = loadRules(fixtureRulesDir)

  assert.deepEqual(rules, [
    {
      title: 'Use the language attribute',
      slug: 'language-attribute',
      categories: ['html'],
      subcategory: 'meta',
      priority: 'high',
      prompts: {
        check: 'Check for a lang attribute on the html element.',
        fix: 'Add the correct lang attribute to the html element.',
        explain: 'Explain why the lang attribute matters.'
      },
      content: '# Rule body',
      primaryCategory: 'html',
      url: '/rules/html/language-attribute'
    },
    {
      title: 'Use block categories',
      slug: 'multi-category-rule',
      categories: ['html', 'accessibility'],
      priority: 'medium',
      content: '# Multi category body',
      primaryCategory: 'html',
      url: '/rules/html/multi-category-rule'
    }
  ])
})

test('loadRules decodes folded, literal, chomped, and quoted YAML prompt scalars', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fec-yaml-'))
  try {
    fs.mkdirSync(path.join(root, 'html'))
    fs.writeFileSync(
      path.join(root, 'html', 'scalars.mdx'),
      `---
title: "Author's rule: quoted text"
categories: [html]
priority: high
prompts:
  check: >-
    Check the image.
    Preserve its meaning.
  fix: |-
    First line.
    Second line.
  explain: >
    Explain the impact.
    Include an example.
  codeReview: 'Review the author''s rule: carefully.'
---
# Body
`
    )
    const [rule] = loadRules(root)
    assert.equal(rule?.title, "Author's rule: quoted text")
    assert.deepEqual(rule?.prompts, {
      check: 'Check the image. Preserve its meaning.',
      fix: 'First line.\nSecond line.',
      explain: 'Explain the impact. Include an example.\n',
      codeReview: "Review the author's rule: carefully."
    })
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test('canonical corpus contains real prompt text rather than YAML block markers', () => {
  const rules = loadRules()
  assert.ok(rules.length > 300)
  for (const rule of rules) {
    for (const key of ['check', 'fix', 'explain'] as const) {
      const value = rule.prompts?.[key]
      assert.equal(typeof value, 'string', `${rule.slug}.${key}`)
      assert.ok(
        value && value.trim().length > 5 && !/^[>|][+-]?$/.test(value),
        `${rule.slug}.${key}`
      )
    }
  }
})
