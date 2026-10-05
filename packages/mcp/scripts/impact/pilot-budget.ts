import { z } from 'zod'

export const PILOT_MODEL = 'claude-haiku-4-5-20251001'
// USD microdollars at the verified standard rates: $1 input / $5 output per MTok.
const RESERVATION = 200_000 + 1024 * 5
const usageSchema = z.object({
  input_tokens: z.number().int().nonnegative().max(200_000),
  output_tokens: z.number().int().nonnegative().max(1024),
  cache_creation_input_tokens: z.number().int().nonnegative().optional(),
  cache_read_input_tokens: z.number().int().nonnegative().optional()
})
const requestSchema = z
  .object({
    model: z.literal(PILOT_MODEL),
    max_tokens: z.number().int().positive().max(1024),
    messages: z.array(z.unknown()),
    system: z.unknown().optional(),
    tools: z.array(z.object({ type: z.literal('custom').optional() }).passthrough()).optional(),
    tool_choice: z.unknown().optional(),
    temperature: z.number().optional(),
    top_p: z.number().optional(),
    top_k: z.number().optional(),
    stop_sequences: z.array(z.string()).optional(),
    stream: z.literal(false).optional(),
    metadata: z.unknown().optional(),
    service_tier: z.literal('standard_only').optional()
  })
  .strict()

/** Reject features whose fees are outside this pilot's standard token-only price contract. */
export function validatePilotRequest(body: unknown) {
  const request = requestSchema.parse(body)
  if (JSON.stringify(request).includes('"cache_control"'))
    throw new Error('Prompt caching is disabled for this budgeted pilot')
  return { ...request, service_tier: 'standard_only' }
}

/** Reserve the entire model context cost before dispatch, retaining reservations on uncertainty. */
export class PilotBudget {
  private committed = 0
  private requests = 0
  private readonly pending = new Set<number>()

  /** Reserve in integer microdollars; concurrent calls and retries share the same ceiling. */
  reserve(): number {
    if (this.committed + RESERVATION > 1_000_000)
      throw new Error('Pilot $1 budget exhausted; no request dispatched')
    this.committed += RESERVATION
    const id = ++this.requests
    this.pending.add(id)
    return id
  }

  /** Refund unused reservation only when a valid provider usage record proves the actual charge. */
  settle(id: number, usage: unknown): void {
    if (!this.pending.has(id)) throw new Error('Unknown or already settled reservation')
    const parsed = usageSchema.parse(usage)
    if (parsed.cache_creation_input_tokens || parsed.cache_read_input_tokens)
      throw new Error('Unexpected caching usage; reservation retained')
    const actual = parsed.input_tokens + parsed.output_tokens * 5
    this.committed -= RESERVATION - actual
    this.pending.delete(id)
  }

  /** Return billable usage plus retained worst-case reservations, never a fabricated invoice. */
  snapshot() {
    return {
      ceilingUsd: 1,
      committedUsd: this.committed / 1_000_000,
      pendingReservations: this.pending.size,
      requests: this.requests
    }
  }
}
