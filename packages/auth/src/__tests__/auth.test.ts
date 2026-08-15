
jest.mock('better-auth', () => {
  return {
    betterAuth: jest.fn(config => config)
  }
})

jest.mock('better-auth/adapters/prisma', () => {
  return {
    prismaAdapter: jest.fn()
  }
})

jest.mock('better-auth/next-js', () => {
  return {
    nextCookies: jest.fn()
  }
})

jest.mock('../prisma', () => {
  return {
    prisma: {}
  }
})

describe('GitHub OAuth configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('disables default scopes for GitHub Apps (Iv1.*)', () => {
    process.env.GITHUB_CLIENT_ID = 'Iv1.abcdef1234567890'
    const authModule = require('../auth')
    const config = authModule.auth as any
    expect(config.socialProviders?.github?.disableDefaultScope).toBe(true)
  })

  it('keeps default scopes for traditional GitHub OAuth Apps', () => {
    process.env.GITHUB_CLIENT_ID = 'abcdef1234567890'
    const authModule = require('../auth')
    const config = authModule.auth as any
    expect(config.socialProviders?.github?.disableDefaultScope).toBeUndefined()
  })
})
