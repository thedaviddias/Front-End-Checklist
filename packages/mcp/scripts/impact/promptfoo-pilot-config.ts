import { IMPACT_TASKS } from './cases'
import { scoreModelOutput } from './output-score'

const PILOT_IDS = [
  'product-photo',
  'decorative-divider',
  'hero-dimensions',
  'close-button',
  'email-label',
  'viewport-zoom',
  'valid-hero',
  'valid-same-tab'
]

/** Prepare paired pilot settings and deterministic grading without invoking any provider. */
export function createPilotConfig(model: string, mcpUrl: string) {
  if (!model.trim() || !model.startsWith('claude-'))
    throw new Error('Set FEC_EVAL_MODEL to an exact Claude model ID')
  const url = new URL(mcpUrl)
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) || url.protocol !== 'http:') {
    throw new Error('Pilot MCP URL must be local HTTP; use the local benchmark server')
  }
  const common = {
    max_tokens: 1024,
    max_tool_calls: 3
  }
  return {
    description:
      'Eight-case MCP efficiency pilot; static success only, not human-verified outcome.',
    prompts: [
      '[{"role":"system","content":"Complete the HTML task. Return only the complete HTML, without Markdown fences or explanation. Preserve valid markup exactly when asked. Use available tools when helpful."},{"role":"user","content":{{ input | dump }}}]'
    ],
    providers: [
      { id: `anthropic:messages:${model}`, label: 'without-mcp', config: common },
      {
        id: `anthropic:messages:${model}`,
        label: 'with-mcp',
        config: {
          ...common,
          mcp: { enabled: true, server: { url: mcpUrl } }
        }
      }
    ],
    evaluateOptions: {
      maxConcurrency: 1,
      repeat: 1,
      cache: false,
      timeoutMs: 120000,
      maxEvalTimeMs: 1200000
    },
    tests: PILOT_IDS.map(id => {
      const task = IMPACT_TASKS.find(candidate => candidate.id === id)
      if (!task) throw new Error(`Missing pilot task ${id}`)
      return {
        description: id,
        vars: {
          task: task.prompt,
          code: task.initial,
          input: `${task.prompt}\n\nHTML:\n${task.initial}`
        },
        assert: [
          {
            type: 'javascript',
            metric: 'outputFormat',
            value: (output: string) => scoreModelOutput(task, output).formatPass
          },
          {
            type: 'javascript',
            metric: 'staticCorrectness',
            value: (output: string) => scoreModelOutput(task, output).staticPass
          }
        ]
      }
    })
  }
}
