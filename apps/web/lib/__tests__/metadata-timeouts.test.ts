/** @jest-environment node */

import { enrichNpmPackages } from '@/content-collections-helpers'
import { fetchUrlMetadata } from '@/lib/url-metadata'

const mockScrape = jest.fn()

jest.mock('open-graph-scraper', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockScrape(...args)
}))

afterEach(() => {
  jest.restoreAllMocks()
  mockScrape.mockReset()
})

it('bounds scraper requests using seconds rather than milliseconds', async () => {
  mockScrape.mockResolvedValue({ error: false, result: { success: true, ogTitle: 'Example' } })

  await expect(fetchUrlMetadata('https://example.com')).resolves.toMatchObject({ title: 'Example' })
  expect(mockScrape).toHaveBeenCalledWith(expect.objectContaining({ timeout: 10 }))
})

it('bounds both registry requests and falls back when enrichment times out', async () => {
  const deadlines = jest.spyOn(AbortSignal, 'timeout')
  const requests = jest.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Request timed out'))

  await expect(enrichNpmPackages(['eslint'])).resolves.toEqual([])
  expect(requests).toHaveBeenCalledTimes(2)
  expect(deadlines).toHaveBeenNthCalledWith(1, 10_000)
  expect(deadlines).toHaveBeenNthCalledWith(2, 10_000)
  for (const [, options] of requests.mock.calls) {
    expect(options?.signal).toBeInstanceOf(AbortSignal)
  }
})
