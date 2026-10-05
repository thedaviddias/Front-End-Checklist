import { IMPACT_TASKS } from '../../scripts/impact/cases'
import { createPilotConfig } from '../../scripts/impact/promptfoo-pilot-config'

it('builds 16 matched attempts with bounded tool rounds and no model grader', () => {
  const config = createPilotConfig('claude-test-snapshot', 'http://127.0.0.1:3100/mcp')
  expect(config.tests).toHaveLength(8)
  expect(config.providers).toHaveLength(2)
  expect(config.providers.map(provider => provider.id)).toEqual([
    'anthropic:messages:claude-test-snapshot',
    'anthropic:messages:claude-test-snapshot'
  ])
  expect(config.providers[0]?.config.max_tokens).toBe(1024)
  expect(config.providers[1]?.config.max_tool_calls).toBe(3)
  expect(config.evaluateOptions.cache).toBe(false)
  for (const test of config.tests) {
    const task = IMPACT_TASKS.find(task => task.id === test.description)!
    expect(test.assert[0]?.value(task.reference)).toBe(true)
    expect(test.assert[0]?.value('')).toBe(false)
    expect(
      test.assert[0]?.value(`Here is the answer:\n\`\`\`html\n${task.reference}\n\`\`\``)
    ).toBe(false)
  }
})
it('requires explicit model selection and keeps the MCP endpoint local', () => {
  expect(() => createPilotConfig('', 'http://localhost:3100/mcp')).toThrow()
  expect(() => createPilotConfig('claude-test', 'https://mcp.frontendchecklist.io')).toThrow()
})
