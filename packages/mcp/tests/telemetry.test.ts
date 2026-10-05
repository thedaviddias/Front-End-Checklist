import type { Rule } from '@repo/types'
import { buildToolUsage, notifyToolUsage } from '../src/telemetry'

const rules: Rule[] = [
  {
    title: 'Doctype',
    slug: 'doctype',
    categories: ['html'],
    primaryCategory: 'html',
    priority: 'high',
    content: 'Rule content',
    url: '/rules/html/doctype'
  }
]

describe('MCP usage records', () => {
  it('retains only canonical requested metadata and excludes user payloads', () => {
    const usage = buildToolUsage(
      'fix_rule',
      {
        slug: 'doctype',
        code: 'private code',
        context: 'private prompt'
      },
      { message: 'private output' },
      rules,
      'success',
      12.6
    )
    expect(usage).toEqual({
      toolName: 'fix_rule',
      outcome: 'success',
      durationMs: 13,
      requestedRule: { slug: 'doctype', category: 'html' },
      returnedRules: []
    })
  })

  it('never records unknown slugs or treats a workflow slug as a rule request', () => {
    expect(
      buildToolUsage('get_rule', { slug: 'private input' }, {}, rules, 'error', 1).requestedRule
    ).toBeUndefined()
    expect(
      buildToolUsage('get_workflow', { slug: 'doctype' }, {}, rules, 'success', 1).requestedRule
    ).toBeUndefined()
  })

  it.each([
    ['search_rules', 'rules', 'slug'],
    ['review_code', 'issues', 'rule'],
    ['audit_url', 'issues', 'rule'],
    ['get_workflow', 'steps', 'slug'],
    ['get_checklist_rules', 'rules', 'slug'],
    ['get_quick_reference', 'items', 'slug']
  ])('deduplicates canonical returned rules for %s', (tool, collection, key) => {
    const result = {
      [collection]: [
        { [key]: 'doctype', category: 'untrusted', code: 'private' },
        { [key]: 'doctype' },
        { [key]: 'unknown private input' }
      ]
    }
    expect(buildToolUsage(tool, {}, result, rules, 'success', 1).returnedRules).toEqual([
      { slug: 'doctype', category: 'html' }
    ])
    expect(buildToolUsage(tool, {}, result, rules, 'error', 1).returnedRules).toEqual([])
  })

  it('isolates observer failures from tool execution', () => {
    const usage = buildToolUsage('get_rule', {}, {}, rules, 'success', 1)
    expect(() =>
      notifyToolUsage(() => {
        throw new Error('analytics unavailable')
      }, usage)
    ).not.toThrow()
  })
})
