import type { CuratedChecklist } from '@repo/types'
import { TOOL_CHOICE_CASES, unknownExpectedTools } from '../../scripts/tool-choice/cases'
import { type CaseResult, isCorrect, scoreToolChoice } from '../../scripts/tool-choice/score'
import { getToolDefinitions } from '../../src/server-tools'

const CHECKLIST: CuratedChecklist = {
  id: 'launch-checklist',
  slug: 'launch-checklist',
  title: 'Launch Checklist',
  description: 'Fixture checklist used to build checklist-backed tools.',
  icon: 'check',
  rules: ['html/doctype'],
  language: 'en',
  url: '/checklists/launch-checklist'
}

describe('tool-choice eval cases', () => {
  it('only expect tools the server exposes', () => {
    const names = getToolDefinitions([CHECKLIST]).map(definition => definition.name)
    expect(unknownExpectedTools(TOOL_CHOICE_CASES, names)).toEqual([])
  })

  it('have unique ids and cover every tool plus no-tool prompts', () => {
    const ids = TOOL_CHOICE_CASES.map(testCase => testCase.id)
    expect(new Set(ids).size).toBe(ids.length)

    const expected = new Set(TOOL_CHOICE_CASES.flatMap(testCase => testCase.expect))
    for (const definition of getToolDefinitions([CHECKLIST])) {
      expect({ tool: definition.name, covered: expected.has(definition.name) }).toEqual({
        tool: definition.name,
        covered: true
      })
    }
    expect(
      TOOL_CHOICE_CASES.filter(testCase => testCase.group === 'no-tool').length
    ).toBeGreaterThan(3)
  })
})

describe('tool-choice scoring', () => {
  const results: CaseResult[] = [
    // Always right.
    { id: 'a', group: 'clear', expect: ['review_code'], outcomes: ['review_code', 'review_code'] },
    // Right once: counts for pass@k, not pass^k.
    { id: 'b', group: 'confusable', expect: ['fix_rule'], outcomes: ['get_rule', 'fix_rule'] },
    // No tool expected; one over-trigger.
    { id: 'c', group: 'no-tool', expect: [], outcomes: ['none', 'search_rules'] },
    // Tool expected; model answered directly both times.
    { id: 'd', group: 'clear', expect: ['audit_url'], outcomes: ['none', 'none'] }
  ]

  it('treats an empty expectation as "answer directly"', () => {
    expect(isCorrect({ expect: [] }, 'none')).toBe(true)
    expect(isCorrect({ expect: [] }, 'search_rules')).toBe(false)
    expect(
      isCorrect({ expect: ['get_workflow', 'get_checklist_rules'] }, 'get_checklist_rules')
    ).toBe(true)
  })

  it('computes accuracy, pass@k and pass^k', () => {
    const score = scoreToolChoice(results)
    expect(score.trialsPerCase).toBe(2)
    expect(score.overall.accuracy).toBeCloseTo(4 / 8)
    expect(score.overall.passAtK).toBeCloseTo(3 / 4)
    expect(score.overall.passHatK).toBeCloseTo(1 / 4)
    expect(score.byGroup.clear).toEqual({ cases: 2, accuracy: 0.5, passAtK: 0.5, passHatK: 0.5 })
  })

  it('reports confusions and trigger rates', () => {
    const score = scoreToolChoice(results)
    expect(score.confusions).toEqual({
      'fix_rule -> get_rule': 1,
      'none -> search_rules': 1,
      'audit_url -> none': 2
    })
    expect(score.overTriggerRate).toBeCloseTo(1 / 2)
    expect(score.underTriggerRate).toBeCloseTo(2 / 6)
  })
})
