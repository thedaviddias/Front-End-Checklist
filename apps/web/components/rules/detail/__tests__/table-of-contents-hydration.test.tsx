import { act } from 'react'
import { hydrateRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { TableOfContents } from '@/components/rules/detail/table-of-contents'

describe('table of contents hydration', () => {
  let root: Root | undefined
  const observer = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn() }))
  const originalObserver = globalThis.IntersectionObserver

  beforeAll(() => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      value: observer
    })
  })

  afterAll(() => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      value: originalObserver
    })
  })

  afterEach(async () => {
    await act(async () => root?.unmount())
    root = undefined
    document.body.innerHTML = ''
    window.history.replaceState({}, '', '/')
    jest.restoreAllMocks()
  })

  it('hydrates empty server markup before discovering headings and the URL anchor', async () => {
    window.history.replaceState({}, '', '/rules/images/alt-text#verification')
    // Server rendering has no page DOM to scan.
    const serverQuery = jest.spyOn(document, 'querySelector').mockReturnValue(null)
    const html = renderToString(<TableOfContents />)
    serverQuery.mockRestore()
    expect(html).toBe('')

    document.body.innerHTML = `<article><h2 id="examples">Code Examples</h2><h3 id="verification">Verification</h3></article><div id="toc">${html}</div>`
    const container = document.getElementById('toc')!
    const onRecoverableError = jest.fn()
    await act(async () => {
      root = hydrateRoot(container, <TableOfContents />, { onRecoverableError })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Table of contents')
    expect(container.querySelector('a[href="#verification"]')).toHaveAttribute(
      'aria-current',
      'location'
    )
    expect(container.querySelectorAll('a')).toHaveLength(2)
    expect(observer).toHaveBeenCalled()
  })
})
