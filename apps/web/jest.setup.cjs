// Learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom')

const { TextDecoder, TextEncoder } = require('node:util')

global.TextDecoder ??= TextDecoder
global.TextEncoder ??= TextEncoder

jest.mock('next/cache', () => ({
  cacheLife: jest.fn(),
  cacheTag: jest.fn(),
  unstable_cache: jest.fn(fn => fn)
}))

// Mock environment variables if needed
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    })
  })
}

// Suppress console errors during tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning: ReactDOM.render')) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
