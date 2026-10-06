import { IMPACT_TASKS } from '../../scripts/impact/cases'
import { extractHtmlArtifact, scoreModelOutput } from '../../scripts/impact/output-score'

const repair = IMPACT_TASKS.find(task => task.id === 'decorative-divider')!
const control = IMPACT_TASKS.find(task => task.id === 'valid-hero')!

it('scores format and static correctness independently for raw and fenced answers', () => {
  expect(scoreModelOutput(repair, repair.reference)).toMatchObject({
    formatPass: true,
    staticPass: true
  })
  expect(
    scoreModelOutput(
      repair,
      `Here is the answer:\n\`\`\`html\n${repair.reference}\n\`\`\`\nExplanation.`
    )
  ).toMatchObject({
    formatPass: false,
    staticPass: true,
    semanticReview: 'pending',
    verifiedPass: null
  })
  expect(scoreModelOutput(repair, repair.initial)).toMatchObject({
    formatPass: true,
    staticPass: false
  })
})
it('refuses ambiguous, missing, malformed, inline-only or competing artifacts', () => {
  for (const output of [
    '',
    'No changes needed.',
    `<img src="x">\nHere is prose`,
    `Before:\n\`\`\`html\n${repair.initial}\n\`\`\`\nAfter:\n\`\`\`html\n${repair.reference}\n\`\`\``,
    `\`\`\`html\n${repair.reference}\n\`\`\`\n<img src="other">`,
    `The answer is \`${repair.reference}\`.`,
    '<div><span></div>'
  ]) {
    expect(extractHtmlArtifact(output)).toBeNull()
  }
})
it('extracts a control without changing its markup and still detects unnecessary changes', () => {
  expect(scoreModelOutput(control, `\`\`\`html\n${control.initial}\n\`\`\``).staticPass).toBe(true)
  expect(scoreModelOutput(control, control.initial.replace('eager', 'lazy')).staticPass).toBe(false)
})
it('does not promote plausible but unverified semantics to verified success', () => {
  const task = IMPACT_TASKS.find(task => task.id === 'product-photo')!
  const score = scoreModelOutput(
    task,
    task.initial.replace('<img ', '<img alt="Invented colors and shape" ')
  )
  expect(score.staticPass).toBe(true)
  expect(score.semanticReview).toBe('pending')
  expect(score.verifiedPass).toBeNull()
})
