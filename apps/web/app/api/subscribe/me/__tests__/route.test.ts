/**
 * @jest-environment node
 */

const mockGetSession = jest.fn()
const mockCreate = jest.fn()
const mockUpdate = jest.fn()
const mockTopicUpdate = jest.fn()
const originalApiKey = process.env.RESEND_API_KEY

process.env.RESEND_API_KEY = 're_test_key'

jest.mock('@repo/auth/auth', () => ({
  auth: {
    api: {
      getSession: mockGetSession
    }
  }
}))

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    contacts: {
      create: mockCreate,
      update: mockUpdate,
      topics: { update: mockTopicUpdate }
    }
  }))
}))

jest.mock('next/headers', () => ({
  headers: jest.fn()
}))

jest.mock('@/lib/telemetry-server', () => ({
  captureServerException: jest.fn()
}))

const { headers } = require('next/headers')
const { POST } = require('../route')

describe('subscribe me route', () => {
  afterAll(() => {
    if (originalApiKey === undefined) {
      delete process.env.RESEND_API_KEY
    } else {
      process.env.RESEND_API_KEY = originalApiKey
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockUpdate.mockResolvedValue({ data: { id: 'contact-1' }, error: null })
    mockTopicUpdate.mockResolvedValue({ data: { id: 'contact-1' }, error: null })
    headers.mockResolvedValue(new Headers())
  })

  it('requires an authenticated user', async () => {
    mockGetSession.mockResolvedValue(null)

    const response = await POST()

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
  })

  it('syncs the current signed-in user email to Resend', async () => {
    mockGetSession.mockResolvedValue({
      user: {
        email: ' test@example.com ',
        id: 'user-1'
      }
    })
    mockCreate.mockResolvedValue({ data: { id: 'contact-1' }, error: null })

    const response = await POST()

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        properties: expect.objectContaining({
          product: 'newsletter',
          user_type: 'subscriber'
        })
      })
    )
    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({
      id: 'contact-1',
      status: 'created',
      success: true
    })
  })

  it('returns success when the current user already exists in Resend', async () => {
    mockGetSession.mockResolvedValue({
      user: {
        email: 'test@example.com',
        id: 'user-1'
      }
    })
    mockCreate.mockResolvedValue({
      data: null,
      error: {
        message: 'Contact already exists',
        name: 'validation_error'
      }
    })

    const response = await POST()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      status: 'already_exists',
      success: true
    })
  })
})
