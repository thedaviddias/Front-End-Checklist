import { PILOT_MODEL } from './impact/pilot-budget'
import { createPilotConfig } from './impact/promptfoo-pilot-config'

const apiBaseUrl = process.env.FEC_PILOT_API_URL ?? ''
const apiKey = process.env.FEC_PILOT_LOCAL_TOKEN ?? ''
const url = new URL(apiBaseUrl)
if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1' || apiKey.length < 24)
  throw new Error('Start the local budget proxy and set FEC_PILOT_API_URL/FEC_PILOT_LOCAL_TOKEN')
const config = createPilotConfig(
  PILOT_MODEL,
  process.env.FEC_EVAL_MCP_URL ?? 'http://127.0.0.1:3100/mcp'
)

// Only the loopback proxy receives a real provider key. This runner uses an ephemeral local token.
export default {
  ...config,
  providers: config.providers.map(provider => ({
    ...provider,
    config: { ...provider.config, apiBaseUrl, apiKey, service_tier: 'standard_only' }
  }))
}
