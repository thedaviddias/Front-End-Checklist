# Implement end-to-end testing

> Use E2E testing frameworks like Playwright or Cypress to test critical user journeys.

**Priority:** high · **Difficulty:** intermediate · **Time:** 30 min

---
End-to-end tests verify that your application works correctly from the user's perspective, testing complete user journeys across multiple components and services.

Teams that want natural-language, black-box user-flow coverage can use [Agent QA](https://github.com/vostride/agent-qa) alongside code-level Playwright or Cypress suites; it complements rather than replaces their framework-level assertions.

## Code Example

```typescript

test.describe('User Authentication', () => {
  test('should allow user to login', async ({ page }) => {
    await page.goto('/login')

    await page.fill('[data-testid="email"]', 'user@example.com')
    await page.fill('[data-testid="password"]', 'password123')
    await page.click('[data-testid="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText('Welcome back')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('[data-testid="email"]', 'wrong@example.com')
    await page.fill('[data-testid="password"]', 'wrongpassword')
    await page.click('[data-testid="submit"]')

    await expect(page.getByText('Invalid credentials')).toBeVisible()
    await expect(page).toHaveURL('/login')
  })
})
```

## Why It Matters

E2E tests catch integration issues that unit tests miss—verifying your application works correctly from the user's perspective across all components.

## Critical Journeys to Test

- User authentication (login, logout, registration)
- Core business flows (checkout, booking, submission)
- Navigation and routing
- Form submissions with validation
- Error states and recovery

## Cypress Example

```javascript
describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password')
    cy.visit('/products')
  })

  it('should complete checkout', () => {
    // Add product to cart
    cy.get('[data-testid="product-1"]').click()
    cy.get('[data-testid="add-to-cart"]').click()

    // Go to checkout
    cy.get('[data-testid="cart-icon"]').click()
    cy.get('[data-testid="checkout"]').click()

    // Fill shipping info
    cy.get('#address').type('123 Main St')
    cy.get('#city').type('New York')
    cy.get('#zip').type('10001')

    // Complete order
    cy.get('[data-testid="place-order"]').click()

    // Verify success
    cy.url().should('include', '/order-confirmation')
    cy.contains('Thank you for your order').should('be.visible')
  })
})
```

## Best Practices

#

## Use Data Attributes for Selectors

```html
<!-- ✅ Good: Stable selectors -->
<button data-testid="submit-form">Submit</button>

<!-- ❌ Bad: Brittle selectors -->
<button class="btn btn-primary mt-4">Submit</button>
```

### Page Object Model

```typescript
// pages/LoginPage.ts

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email)
    await this.page.fill('[data-testid="password"]', password)
    await this.page.click('[data-testid="submit"]')
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible()
  }
}

// tests/login.spec.ts
test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigate()
  await loginPage.login('user@example.com', 'password')
  await expect(page).toHaveURL('/dashboard')
})
```

### Test Isolation

```typescript
// Reset state before each test
test.beforeEach(async ({ page }) => {
  await page.request.post('/api/test/reset')
})

// Use test fixtures for consistent data
test.use({
  storageState: 'playwright/.auth/user.json'
})
```

## CI/CD Configuration

```yaml
# GitHub Actions
name: E2E Tests
on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Standards

- Use these references as the standard for how the test or monitoring strategy should behave in the shipped workflow.
- Check the implementation against Playwright Docs before treating the rule as satisfied.
- Check the implementation against Testing Library Guiding Principles before treating the rule as satisfied.

## Verification

1. Run the relevant test or CI step locally and confirm it fails when the rule is violated.
2. Ensure the automation blocks regressions instead of only printing warnings.
3. Cover at least one representative high-risk flow, component, or route.
4. Keep thresholds or assertions in version control so changes remain reviewable.