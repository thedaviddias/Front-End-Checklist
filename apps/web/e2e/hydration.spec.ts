import { expect, type Page, test } from '@playwright/test'

/** Compare the active page's full heading sequence, excluding Next.js retained hidden routes. */
async function expectCurrentTableOfContents(page: Page): Promise<void> {
  const article = page.locator('article:visible')
  await expect(article).toHaveCount(1)
  const toc = page.getByRole('navigation', { name: 'Table of contents' })
  await expect(toc).toBeVisible()
  await expect(async () => {
    const expected = await article
      .locator('h2[id], h3[id]')
      .evaluateAll(headings => headings.map(heading => `#${heading.id}`))
    const actual = await toc
      .locator('a')
      .evaluateAll(links => links.map(link => link.getAttribute('href')))
    expect(expected.length).toBeGreaterThan(0)
    expect(actual).toEqual(expected)
  }).toPass({ timeout: 5000 })
}

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
    const initialTitle = await page.getByRole('heading', { level: 1 }).innerText()
    await expectCurrentTableOfContents(page)
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
    await expectCurrentTableOfContents(page)

    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(initialTitle)
    await expectCurrentTableOfContents(page)
    expect(errors).toEqual([])
  })
})
