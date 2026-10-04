import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NewsletterSettings } from '@/components/account/newsletter-settings'

describe('newsletter opt-in', () => {
  const originalFetch = global.fetch
  const mockFetch = jest.fn()

  beforeEach(() => {
    mockFetch.mockReset()
    global.fetch = mockFetch
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  it('only submits after an explicit signup action', async () => {
    mockFetch.mockResolvedValue({ ok: true })
    render(<NewsletterSettings />)
    expect(mockFetch).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe', exact: true }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('subscribed'))
    expect(mockFetch).toHaveBeenCalledWith('/api/subscribe/me', { method: 'POST' })
  })

  it('allows retry when signup fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network failure'))
    render(<NewsletterSettings />)
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe', exact: true }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Please try again'))
    expect(screen.getByRole('button', { name: 'Subscribe', exact: true })).toBeEnabled()
  })
})
