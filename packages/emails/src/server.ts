import { Resend } from 'resend'

let resendClient: Resend | null | undefined

const DEFAULT_RESEND_TOPIC_ID = 'cdb0d440-4825-412a-8152-29681e8155b7'
const DEFAULT_CONTACT_LANGUAGE = 'en'
const DEFAULT_CONTACT_SOURCE_DOMAIN = 'frontendchecklist.io'
const DEFAULT_CONTACT_BRAND = 'frontendchecklist'

type ResendContactSegment = {
  id: string
}

type ResendContactTopic = {
  id: string
  subscription: 'opt_in'
}

type ResendContactProperties = {
  product: 'newsletter' | 'waitlist'
  user_type: 'subscriber' | 'waitlist'
  language: string
  source_domain: string
  brand: string
}

type ResendContactKind = 'subscriber' | 'waitlist'

export type ResendContactAddResult =
  | {
      id?: string
      status: 'created' | 'already_exists'
      success: true
    }
  | {
      error: string
      status: 'error' | 'not_configured'
      statusCode: number
      success: false
    }

export type ResendContactCreatePayload = {
  email: string
  properties: ResendContactProperties
  segments?: ResendContactSegment[]
  topics?: ResendContactTopic[]
}

/**
 * Return a memoized Resend client when the API key is configured.
 */
export function getResendClient(): Resend | null {
  if (resendClient !== undefined) {
    return resendClient
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  resendClient = apiKey ? new Resend(apiKey) : null
  return resendClient
}

/**
 * Report whether the Resend SDK can be used in the current environment.
 */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

/**
 * Resolve the shared Resend topic id for newsletter and waitlist contacts.
 */
export function getResendTopicId(): string {
  return process.env.RESEND_TOPIC_ID?.trim() || DEFAULT_RESEND_TOPIC_ID
}

/**
 * Build Resend contact properties for each subscription source.
 */
export function createResendContactProperties(kind: ResendContactKind): ResendContactProperties {
  return {
    product: kind === 'waitlist' ? 'waitlist' : 'newsletter',
    user_type: kind,
    language: DEFAULT_CONTACT_LANGUAGE,
    source_domain: DEFAULT_CONTACT_SOURCE_DOMAIN,
    brand: DEFAULT_CONTACT_BRAND
  }
}

/**
 * Build the shared Resend contact payload for waitlist and subscribe flows.
 */
export function createResendContactPayload(
  email: string,
  kind: ResendContactKind,
  segmentId?: string,
  topicId = getResendTopicId()
): ResendContactCreatePayload {
  const payload: ResendContactCreatePayload = {
    email,
    properties: createResendContactProperties(kind)
  }

  const trimmedSegmentId = segmentId?.trim()
  if (trimmedSegmentId) {
    payload.segments = [{ id: trimmedSegmentId }]
  }

  const trimmedTopicId = topicId?.trim()
  if (trimmedTopicId) {
    payload.topics = [{ id: trimmedTopicId, subscription: 'opt_in' }]
  }

  return payload
}

/**
 * Detect Resend duplicate-contact errors that need an explicit preference update.
 */
function isAlreadyExistsError(error: { message?: string; name?: string }): boolean {
  const message = error.message?.toLowerCase() ?? ''
  return (
    message.includes('already') || (error.name === 'validation_error' && message.includes('exists'))
  )
}

/**
 * Add a newsletter subscriber contact to Resend.
 */
export async function addSubscriberContact(
  email: string,
  segmentId = process.env.RESEND_AUDIENCE_ID
): Promise<ResendContactAddResult> {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) {
    return {
      error: 'Missing email',
      status: 'error',
      statusCode: 400,
      success: false
    }
  }

  const resend = getResendClient()
  if (!resend) {
    return {
      error: 'Resend not configured',
      status: 'not_configured',
      statusCode: 503,
      success: false
    }
  }

  const { data, error } = await resend.contacts.create(
    createResendContactPayload(trimmedEmail, 'subscriber', segmentId)
  )

  if (error) {
    if (isAlreadyExistsError(error)) {
      const updated = await resend.contacts.update({ email: trimmedEmail, unsubscribed: false })
      if (updated.error) {
        return { success: false, status: 'error', statusCode: 500, error: updated.error.message }
      }
      const topic = await resend.contacts.topics.update({
        email: trimmedEmail,
        topics: [{ id: getResendTopicId(), subscription: 'opt_in' }]
      })
      if (topic.error) {
        return { success: false, status: 'error', statusCode: 500, error: topic.error.message }
      }
      return {
        status: 'already_exists',
        success: true
      }
    }

    return {
      error: error.message ?? 'Failed to add contact',
      status: 'error',
      statusCode: error.name === 'validation_error' ? 400 : 500,
      success: false
    }
  }

  return {
    id: data?.id,
    status: 'created',
    success: true
  }
}
