import { expect, test } from '@playwright/test'

test.describe('rule hydration @smoke', () => {
  test('hydrates rule navigation and framework context without replacing the server tree', async ({
    page
  }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (
        message.type() === 'error' &&
        /hydrat|server rendered|minified react error #418/i.test(message.text())
      ) {
        errors.push(message.text())
      }
    })

    await page.goto('/rules/images/alt-text?framework=nextjs&fromChecklist=Launch#nextjs')
    await expect(page.getByRole('navigation', { name: 'Table of contents' })).toBeVisible()
    const nextTab = page.getByRole('tab', { name: 'Next.js', exact: true })
    await expect(nextTab).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByText('Showing Next.js examples from Launch.')).toBeVisible()

    const reactTab = page.getByRole('tab', { name: 'React', exact: true })
    await reactTab.click()
    await expect(reactTab).toHaveAttribute('aria-selected', 'true')

    const relatedRule = page
      .locator('section[aria-labelledby="related-rules-section-heading"] a')
      .first()
    const nextTitle = await relatedRule.innerText()
    await relatedRule.click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(nextTitle)
    const toc = page.getByRole('navigation', { name: 'Table of contents' })
    await expect(toc).toBeVisible()
    await expect
      .poll(async () => {
        const expected = await page
          .locator('article h2[id], article h3[id]')
          .evaluateAll(headings => headings.map(heading => `#${heading.id}`))
        const actual = await toc
          .locator('a')
          .evaluateAll(links => links.map(link => link.getAttribute('href')))
        return JSON.stringify(actual) === JSON.stringify(expected)
      })
      .toBe(true)
    expect(errors).toEqual([])
  })
})
