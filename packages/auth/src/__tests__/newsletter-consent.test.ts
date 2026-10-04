import { auth } from '../auth'

jest.mock('better-auth', () => ({ betterAuth: jest.fn(options => options) }))
jest.mock('better-auth/adapters/prisma', () => ({ prismaAdapter: jest.fn() }))
jest.mock('better-auth/next-js', () => ({ nextCookies: jest.fn() }))
jest.mock('../prisma', () => ({ prisma: {} }))

describe('account creation newsletter consent', () => {
  it('does not subscribe an account after creation', () => {
    // An auth lifecycle hook would enroll every account without an opt-in.
    // Explicit newsletter endpoints remain separate from this lifecycle.
    const hooks = Reflect.get(auth, 'databaseHooks')
    expect(hooks.user.create.before).toEqual(expect.any(Function))
    expect(hooks.user.create.after).toBeUndefined()
  })
})
