import type { CuratedChecklist, Rule } from '@repo/types'
import {
  executeGetChecklistRules,
  MAX_CHECKLIST_RESPONSE_BYTES
} from '../../src/tools/get-checklist-rules'
import { encodeCursor } from '../../src/utils/pagination'

function fixture(
  count: number,
  content = 'Guidance.'
): { rules: Rule[]; checklists: CuratedChecklist[] } {
  const rules: Rule[] = Array.from({ length: count }, (_, index) => ({
    slug: `rule-${index}`,
    title: `Rule ${index}`,
    categories: ['html'],
    primaryCategory: 'html',
    priority: 'high',
    content,
    url: `/rules/html/rule-${index}`,
    prompts: {
      check: 'Check this requirement.',
      fix: 'Fix this requirement.',
      explain: 'Explain its impact.'
    }
  }))
  return {
    rules,
    checklists: [
      {
        id: 'test',
        slug: 'test',
        title: 'Test',
        description: 'Test checklist',
        icon: 'check',
        rules: rules.map(rule => `html/${rule.slug}`),
        language: 'en',
        url: '/checklists/test'
      }
    ]
  }
}

it('returns every rule exactly once across bounded full-content pages', () => {
  const { rules, checklists } = fixture(9, '京都 '.repeat(700))
  const seen: string[] = []
  let cursor: string | undefined
  let pages = 0
  do {
    const page = executeGetChecklistRules(
      { checklist: 'test', includeContent: true, cursor },
      rules,
      checklists
    )
    expect(page.success).toBe(true)
    if (!page.success) throw new Error(page.error.message)
    expect(Buffer.byteLength(JSON.stringify(page, null, 2))).toBeLessThanOrEqual(
      MAX_CHECKLIST_RESPONSE_BYTES
    )
    expect(page.rules.length).toBeGreaterThan(0)
    expect(page.checklist.totalRules).toBe(9)
    expect(page.checklist.highCount).toBe(9)
    expect(page.hasMore).toBe(Boolean(page.nextCursor))
    for (const rule of page.rules) expect(rule.content).toBe(rules[0]?.content)
    seen.push(...page.rules.map(rule => rule.slug))
    cursor = page.nextCursor ?? undefined
    if (++pages > 9) throw new Error('Pagination did not progress')
  } while (cursor)
  expect(pages).toBeGreaterThan(1)
  expect(seen).toEqual(rules.map(rule => rule.slug))
})
it('honors a rule limit and rejects invalid or stale cursors', () => {
  const { rules, checklists } = fixture(3)
  const first = executeGetChecklistRules({ checklist: 'test', limit: 1 }, rules, checklists)
  if (!first.success || !first.nextCursor) throw new Error('Expected continuation')
  expect(first.rules).toHaveLength(1)
  for (const cursor of [
    'invalid',
    encodeCursor({ offset: -1 }),
    encodeCursor({ offset: 0.5 }),
    ''
  ]) {
    expect(executeGetChecklistRules({ checklist: 'test', cursor }, rules, checklists).success).toBe(
      false
    )
  }
  expect(
    executeGetChecklistRules(
      { checklist: 'test', cursor: first.nextCursor, includeContent: true },
      rules,
      checklists
    ).success
  ).toBe(false)
  rules[1]!.title = 'Changed'
  expect(
    executeGetChecklistRules({ checklist: 'test', cursor: first.nextCursor }, rules, checklists)
      .success
  ).toBe(false)
  for (const limit of [0, 51, NaN, 1.5])
    expect(executeGetChecklistRules({ checklist: 'test', limit }, rules, checklists).success).toBe(
      false
    )
})
it('explicitly omits a single oversized body and still offers continuation', () => {
  const { rules, checklists } = fixture(2, 'x'.repeat(50000))
  const page = executeGetChecklistRules(
    { checklist: 'test', includeContent: true, limit: 1 },
    rules,
    checklists
  )
  if (!page.success) throw new Error(page.error.message)
  expect(page.rules[0]?.content).toBeUndefined()
  expect(page.rules[0]?.contentOmitted).toBe(true)
  expect(page.guidance).toContain('get_rule')
  expect(page.nextCursor).toBeTruthy()
  expect(Buffer.byteLength(JSON.stringify(page, null, 2))).toBeLessThanOrEqual(
    MAX_CHECKLIST_RESPONSE_BYTES
  )
})
it('bounds oversized metadata and never silently loses a rule', () => {
  const { rules, checklists } = fixture(1)
  rules[0]!.prompts = { check: 'x'.repeat(30000), fix: 'Fix', explain: 'Explain' }
  const page = executeGetChecklistRules({ checklist: 'test' }, rules, checklists)
  if (!page.success) throw new Error(page.error.message)
  expect(page.rules[0]?.detailsOmitted).toBe(true)
  expect(page.rules[0]?.slug).toBe('rule-0')
  expect(page.nextCursor).toBeNull()
  rules[0]!.title = 'x'.repeat(30000)
  expect(executeGetChecklistRules({ checklist: 'test' }, rules, checklists).success).toBe(false)
})
it('supports empty and missing checklists explicitly', () => {
  const { rules, checklists } = fixture(0)
  expect(executeGetChecklistRules({ checklist: 'test' }, rules, checklists)).toMatchObject({
    success: true,
    rules: [],
    nextCursor: null,
    hasMore: false
  })
  expect(executeGetChecklistRules({ checklist: 'missing' }, rules, checklists).success).toBe(false)
})
