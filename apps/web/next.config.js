import { withContentCollections } from '@content-collections/next'
import { withSentryConfig } from '@sentry/nextjs'
import { withBotId } from 'botid/next/config'

function buildContentSecurityPolicy() {
  const scriptSources = ["'self'", "'unsafe-inline'"]

  if (process.env.NODE_ENV !== 'production') {
    scriptSources.push("'unsafe-eval'")
  }

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src ${scriptSources.join(' ')}`,
    "connect-src 'self'",
    "frame-src 'self'"
  ]

  if (process.env.NODE_ENV === 'production') {
    directives.push('upgrade-insecure-requests')
  }

  return directives.join('; ')
}

const securityHeaders = [
  { key: 'Content-Security-Policy', value: buildContentSecurityPolicy() },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()'
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' }
]

const MCP_HOST = 'mcp.frontendchecklist.io'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@thedaviddias/analytics',
    '@frontendchecklist/rules',
    '@repo/auth',
    '@repo/design-system',
    '@repo/utils',
    '@repo/data-layer',
    '@repo/virtualization',
    'better-auth'
  ],

  // Next.js 16 top-level features (moved from experimental)
  cacheComponents: true,
  // reactCompiler requires babel-plugin-react-compiler - enable when ready
  // reactCompiler: true,

  // Server components external packages - prevent bundling of native modules
  serverExternalPackages: ['esbuild', '@esbuild/darwin-arm64'],

  experimental: {
    // Enhanced routing and prefetching
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@icons-pack/react-simple-icons'
    ]
  },

  // Performance optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [32, 64, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.opencollective.com',
        pathname: '/**'
      }
    ]
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production'
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: MCP_HOST
            }
          ],
          destination: '/api/mcp'
        }
      ]
    }
  },

  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true
      },
      {
        source: '/index.rsc',
        destination: '/',
        permanent: true
      },
      {
        source: '/index.segments/:path*',
        destination: '/',
        permanent: true
      },
      {
        source: '/rules/seo/charset',
        destination: '/rules/html/charset',
        permanent: true
      },
      {
        source: '/rules/seo/doctype',
        destination: '/rules/html/doctype',
        permanent: true
      },
      {
        source: '/rules/seo/heading-hierarchy',
        destination: '/rules/accessibility/heading-hierarchy',
        permanent: true
      },
      {
        source: '/rules/html/hreflang',
        destination: '/rules/i18n/hreflang',
        permanent: true
      },
      {
        source: '/rules/seo/hreflang',
        destination: '/rules/i18n/hreflang',
        permanent: true
      },
      {
        source: '/rules/security/cookie-consent',
        destination: '/rules/privacy/cookie-consent',
        permanent: true
      },
      {
        source: '/rules/security/privacy-policy',
        destination: '/rules/privacy/privacy-policy',
        permanent: true
      },
      {
        source: '/rules/security/third-party-cookies',
        destination: '/rules/privacy/third-party-cookies',
        permanent: true
      },
      {
        source: '/rules/images/lazy-loading',
        destination: '/rules/performance/lazy-loading',
        permanent: true
      },
      {
        source: '/rules/css/viewport',
        destination: '/rules/html/viewport',
        permanent: true
      },
      {
        source: '/rules/seo/privacy-policy',
        destination: '/rules/privacy/privacy-policy',
        permanent: true
      },
      {
        source: '/rules/seo/terms-of-service',
        destination: '/rules/security/terms-of-service',
        permanent: true
      },
      {
        source: '/rules/accessibility/descriptive-links',
        destination: '/rules/accessibility/link-text',
        permanent: true
      },
      {
        source: '/rules/html/video-schema',
        destination: '/rules/seo/video',
        permanent: true
      },
      {
        source: '/rules/html/accessible-notifications',
        destination: '/rules/accessibility/accessible-notifications',
        permanent: true
      },
      {
        source: '/rules/html/accessible-tooltips',
        destination: '/rules/accessibility/accessible-tooltips',
        permanent: true
      },
      {
        source: '/rules/html/accordion-accessibility',
        destination: '/rules/accessibility/accordion-accessibility',
        permanent: true
      },
      {
        source: '/rules/html/carousel-accessibility',
        destination: '/rules/accessibility/carousel-accessibility',
        permanent: true
      },
      {
        source: '/rules/html/draggable-accessibility',
        destination: '/rules/accessibility/draggable-accessibility',
        permanent: true
      },
      {
        source: '/rules/html/navigation-landmark',
        destination: '/rules/accessibility/navigation-landmark',
        permanent: true
      },
      {
        source: '/rules/html/tabs-accessibility',
        destination: '/rules/accessibility/tabs-accessibility',
        permanent: true
      },
      {
        source: '/rules/html/link-checker',
        destination: '/rules/seo/link-checker',
        permanent: true
      },
      {
        source: '/rules/html/webpagetest',
        destination: '/rules/performance/webpagetest',
        permanent: true
      }
    ]
  }
}

const botProtectedConfig = withBotId(nextConfig)

const sentryWrappedConfig =
  process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
    ? withSentryConfig(botProtectedConfig, {
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        silent: !process.env.CI,
        tunnelRoute: '/monitoring',
        webpack: {
          treeshake: {
            removeDebugLogging: true
          }
        },
        widenClientFileUpload: true
      })
    : botProtectedConfig

export default withContentCollections(sentryWrappedConfig)
