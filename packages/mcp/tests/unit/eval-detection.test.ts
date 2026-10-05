import { hasEvalCall } from '../../src/tools/eval-detection'

describe('eval call syntax detection', () => {
  it.each([
    'const value = eval(userInput)',
    '(0, eval)(userInput)',
    'window.eval(userInput)',
    'globalThis["eval"](userInput)',
    'eval?.(userInput)',
    'window.eval?.(userInput)',
    'eval.call(null, userInput)',
    'eval.apply(null, [userInput])',
    'eval.bind(null)(userInput)',
    'const value: unknown = (eval as Function)(userInput)',
    'const result = <string>eval(userInput)',
    'const element = <span>{eval(userInput)}</span>',
    `const label = \`value: \${eval(userInput)}\``,
    'const value = \\u0065val(userInput)',
    '<script>eval(userInput)</script>',
    '<script type="module">(0, eval)(userInput)</script>',
    '<button onclick="return eval(userInput)">Run</button>'
  ])('detects executable eval in %s', code => {
    expect(hasEvalCall(code)).toBe(true)
  })

  it.each([
    '// eval(userInput) is unsafe\nconst value = Number(userInput)',
    '/* eval(userInput) */ const value = Number(userInput)',
    'const example = "eval(userInput)"',
    "const example = 'eval(userInput)'",
    'const example = `eval(userInput)`',
    'const pattern = /eval\\(userInput\\)/',
    'const data = { eval: "eval(userInput)" }',
    'customEvaluator.eval(userInput)',
    'const example = <span>eval(userInput)</span>',
    '<script type="application/ld+json">{"example":"eval(userInput)"}</script>',
    '<script type="text/plain">eval(userInput)</script>',
    '<script src="external.js">eval(userInput)</script>',
    '<p>eval(userInput)</p>',
    'const incomplete = "eval(userInput)'
  ])('does not mistake non-executable text for an eval call in %s', code => {
    expect(hasEvalCall(code)).toBe(false)
  })
})
