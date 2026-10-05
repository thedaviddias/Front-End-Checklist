import { act } from '@testing-library/react'
import { hydrateRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { CodeTabs, Tab } from '@/components/content/code/code-tabs'

const tabs = (
  <CodeTabs defaultTab="react">
    <Tab value="react" label="React">
      <p>React example</p>
    </Tab>
    <Tab value="nextjs" label="Next.js">
      <p>Next.js example</p>
    </Tab>
  </CodeTabs>
)

describe('framework tab hydration', () => {
  let root: Root | undefined

  afterEach(async () => {
    await act(async () => root?.unmount())
    root = undefined
    document.body.innerHTML = ''
    window.localStorage.clear()
    window.history.replaceState({}, '', '/')
    jest.restoreAllMocks()
  })

  it.each([
    ['stored preference', '/rules/images/alt-text', 'nextjs'],
    ['URL anchor', '/rules/images/alt-text#nextjs', null],
    ['checklist context', '/rules/images/alt-text?framework=nextjs&fromChecklist=Launch', null]
  ])('hydrates the authored default before applying %s', async (_name, url, stored) => {
    window.history.replaceState({}, '', url)
    if (stored) window.localStorage.setItem('preferred-framework', stored)
    const html = renderToString(tabs)
    const serverMarkup = document.createElement('div')
    serverMarkup.innerHTML = html
    // Initial output uses the authored default even when browser state exists.
    expect(serverMarkup.querySelector('[role="tab"][aria-selected="true"]')).toHaveTextContent(
      'React'
    )
    document.body.innerHTML = `<div id="tabs">${html}</div>`
    const container = document.getElementById('tabs')!
    const onRecoverableError = jest.fn()
    const onConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    await act(async () => {
      root = hydrateRoot(container, tabs, { onRecoverableError })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(onConsoleError).not.toHaveBeenCalled()
    expect(container.querySelector('[role="tab"][aria-selected="true"]')).toHaveTextContent(
      'Next.js'
    )
    expect(container.querySelector('[role="tabpanel"][data-state="active"]')).toHaveTextContent(
      'Next.js example'
    )
  })
})
