import { executeCheckRule } from '../../src/tools/check-rule'
import { executeExplainRule } from '../../src/tools/explain-rule'
import { executeFixRule } from '../../src/tools/fix-rule'
import { executeGetRule } from '../../src/tools/get-rule'
import { ruleNotFound } from '../../src/utils/rule-not-found'
import {
  ACCESSIBILITY,
  HTML,
  IMAGES,
  loadRulesFromMdx,
  PERFORMANCE,
  SECURITY
} from '../quality/rule-loader'

const rules = loadRulesFromMdx([ACCESSIBILITY, HTML, IMAGES, SECURITY, PERFORMANCE])

it.each(['image-dimensions', 'aria-label', 'label-for', 'lazy-load-images', 'opener-isolation'])(
  'keeps unknown slug %s explicit and offers only bounded real catalogue candidates',
  slug => {
    const error = ruleNotFound(slug, rules)
    expect(error.suggestions.length).toBeLessThanOrEqual(3)
    expect(error.suggestions.every(s => rules.some(r => r.slug === s.slug))).toBe(true)
    expect(error.message).toContain('search_rules')
    expect(error.message).toContain('limit 3')
    expect(error.message).toContain('do not guess')
  }
)
it('bounds hostile or accidentally pasted input before fuzzy matching and echoing', () => {
  const error = ruleNotFound('x'.repeat(100_000), rules)
  expect(error.message.length).toBeLessThan(400)
})
it('preserves errors across every single-rule tool and accepts a discovered slug', () => {
  const slug = 'not-a-real-catalogue-rule'
  for (const result of [
    executeGetRule({ slug }, rules),
    executeCheckRule({ slug }, rules),
    executeFixRule({ slug }, rules),
    executeExplainRule({ slug }, rules)
  ]) {
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.message).toContain('search_rules')
  }
  expect(executeGetRule({ slug: 'alt-text' }, rules).success).toBe(true)
})
