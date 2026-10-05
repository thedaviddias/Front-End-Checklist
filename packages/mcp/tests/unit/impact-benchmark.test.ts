import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'
import { IMPACT_TASKS } from '../../scripts/impact/cases'
import {
  comparisonProblems,
  hash,
  metadataSchema,
  type RunMetadata,
  scoreTask,
  selectTasks,
  summarize
} from '../../scripts/impact/score'
import { initBenchmark, promptHash, scoreBenchmark } from '../../scripts/impact/workspace'

const first = IMPACT_TASKS[0]!
function metadata(mcpEnabled = false): RunMetadata {
  return {
    model: 'test-snapshot',
    settings: 'test-settings',
    timeBudgetSeconds: 600,
    promptHash: promptHash(IMPACT_TASKS),
    mcpEnabled,
    mcpRevision: mcpEnabled ? 'commit123' : null,
    corpusRevision: mcpEnabled ? 'corpus123' : null,
    toolCalls: mcpEnabled ? 32 : 0,
    inputTokens: 1000,
    outputTokens: 200,
    costUsd: 0.5,
    elapsedSeconds: 60,
    completedTaskIds: IMPACT_TASKS.map(task => task.id),
    reviews: {}
  }
}

describe('independent MCP impact scoring', () => {
  it('keeps 32 unique tasks and a stable 24/8 development/held-out split', () => {
    expect(new Set(IMPACT_TASKS.map(task => task.id)).size).toBe(32)
    expect(selectTasks('development')).toHaveLength(24)
    expect(selectTasks('held-out')).toHaveLength(8)
    expect(IMPACT_TASKS.filter(task => task.control)).toHaveLength(8)
  })
  it.each(IMPACT_TASKS)(
    '$id has a valid reference, expected baseline, and fails deletion',
    task => {
      expect(scoreTask(task, task.reference, null).automatedPass).toBe(true)
      expect(scoreTask(task, task.initial, null).automatedPass).toBe(task.control)
      for (const candidate of [null, '', '<!-- removed -->', '<div>replacement</div>']) {
        expect(scoreTask(task, candidate, null).automatedPass).toBe(false)
      }
    }
  )
  it('rejects broken markup, duplicated target elements, and preserved-content regressions', () => {
    for (const candidate of [
      `${first.reference}<article>`,
      `${first.reference}${first.reference}`,
      first.reference.replace('/shoe.jpg', '/different.jpg'),
      first.reference.replace('<h2>Trail shoe</h2>', ''),
      first.reference.replace('alt="Trail shoe"', 'alt=""')
    ])
      expect(scoreTask(first, candidate, null).automatedPass).toBe(false)
  })
  it('never interprets a static pass as verified success without current human evidence', () => {
    const run = metadata()
    expect(scoreTask(first, first.reference, run).verifiedPass).toBe(false)
    run.reviews[first.id] = {
      verdict: 'pass',
      reviewer: 'independent reviewer',
      evidence: 'Inspected alt meaning and preserved behavior',
      candidateHash: hash(first.reference)
    }
    expect(scoreTask(first, first.reference, run).verifiedPass).toBe(true)
    expect(scoreTask(first, `${first.reference}\n`, run).verifiedPass).toBe(false)
    run.completedTaskIds = []
    expect(scoreTask(first, first.reference, run).verifiedPass).toBe(false)
  })
  it('keeps unavailable cost null and computes cost per verified success only', () => {
    const scores = [scoreTask(first, first.reference, null)]
    expect(summarize(scores, null).costUsd).toBeNull()
    expect(summarize(scores, metadata()).costPerVerifiedTaskUsd).toBeNull()
    const run = metadata()
    run.reviews[first.id] = {
      verdict: 'pass',
      reviewer: 'reviewer',
      evidence: 'checked',
      candidateHash: hash(first.reference)
    }
    expect(summarize([scoreTask(first, first.reference, run)], run).costPerVerifiedTaskUsd).toBe(
      0.5
    )
  })
  it('rejects invalid, duplicate and fabricated metadata fields', () => {
    expect(metadataSchema.safeParse({ ...metadata(), costUsd: -1 }).success).toBe(false)
    expect(metadataSchema.safeParse({ ...metadata(), completedTaskIds: ['x', 'x'] }).success).toBe(
      false
    )
    expect(metadataSchema.safeParse({ ...metadata(), inventedScore: 1 }).success).toBe(false)
  })
  it('requires comparable models, settings, prompts, MCP assignment and complete runs', () => {
    const without = metadata()
    const withMcp = metadata(true)
    const expected = promptHash(IMPACT_TASKS)
    expect(comparisonProblems(without, withMcp, IMPACT_TASKS, expected)).toEqual([])
    for (const change of [
      { model: 'different' },
      { settings: 'different' },
      { timeBudgetSeconds: 1 },
      { promptHash: hash('different') },
      { mcpEnabled: false },
      { completedTaskIds: [] },
      { mcpRevision: null }
    ])
      expect(
        comparisonProblems(without, { ...withMcp, ...change }, IMPACT_TASKS, expected).length
      ).toBeGreaterThan(0)
    expect(
      comparisonProblems({ ...without, toolCalls: 1 }, withMcp, IMPACT_TASKS, expected).length
    ).toBeGreaterThan(0)
  })
})

describe('benchmark workspace lifecycle', () => {
  let parent: string
  let root: string
  beforeEach(() => {
    parent = fs.mkdtempSync(path.join(os.tmpdir(), 'impact-test-'))
    root = path.join(parent, 'run')
  })
  afterEach(() => fs.rmSync(parent, { recursive: true, force: true }))
  it('initializes identical development inputs without exposing reference answers', () => {
    initBenchmark(root)
    for (const task of selectTasks('development')) {
      const candidate = path.join(task.id, 'candidate.html')
      expect(fs.readFileSync(path.join(root, 'with-mcp', candidate), 'utf8')).toBe(task.initial)
      expect(fs.readFileSync(path.join(root, 'without-mcp', candidate), 'utf8')).toBe(task.initial)
      expect(fs.readdirSync(path.join(root, 'with-mcp', task.id)).sort()).toEqual([
        'README.md',
        'candidate.html'
      ])
    }
    expect(fs.existsSync(path.join(root, 'with-mcp', 'held-compound-image'))).toBe(false)
    expect(() => initBenchmark(root)).toThrow()
  })
  it('rejects altered manifests and malformed metadata', () => {
    initBenchmark(root)
    fs.writeFileSync(path.join(root, 'with-mcp.run.json'), '{}')
    expect(() => scoreBenchmark(root)).toThrow()
    fs.unlinkSync(path.join(root, 'with-mcp.run.json'))
    const manifestFile = path.join(root, 'manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'))
    fs.writeFileSync(manifestFile, JSON.stringify({ ...manifest, taskIds: [] }))
    expect(() => scoreBenchmark(root)).toThrow('manifest differs')
  })
  it('scores missing files as failures and keeps unverified delta null', () => {
    initBenchmark(root)
    fs.unlinkSync(path.join(root, 'with-mcp', first.id, 'candidate.html'))
    const report = scoreBenchmark(root)
    expect(report.withMcp.tasks[0]?.automatedPass).toBe(false)
    expect(report.comparisonValid).toBe(false)
    expect(report.verifiedSuccessDelta).toBeNull()
    expect(report.withMcp.summary.costUsd).toBeNull()
  })
  it('produces a verified delta only with complete matching metadata and hash-bound reviews', () => {
    initBenchmark(root, 'all')
    for (const condition of ['without-mcp', 'with-mcp']) {
      const run = metadata(condition === 'with-mcp')
      for (const task of IMPACT_TASKS) {
        const code = condition === 'with-mcp' ? task.reference : task.initial
        fs.writeFileSync(path.join(root, condition, task.id, 'candidate.html'), code)
        run.reviews[task.id] = {
          verdict: condition === 'with-mcp' || task.control ? 'pass' : 'fail',
          reviewer: 'test fixture',
          evidence: 'Synthetic test evidence, not a model result',
          candidateHash: hash(code)
        }
      }
      fs.writeFileSync(path.join(root, `${condition}.run.json`), JSON.stringify(run))
    }
    const report = scoreBenchmark(root)
    expect(report.comparisonValid).toBe(true)
    expect(report.verifiedSuccessDelta).toBe(0.75)
    expect(report.withMcp.summary.costPerVerifiedTaskUsd).toBe(0.5 / 32)
  })
})
