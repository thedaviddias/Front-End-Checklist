import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { prisma } from './prisma'
import { buildGithubProfileImport, getStringProperty, normalizeGithubUsername } from './profile'

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
const baseUrl = process.env.BETTER_AUTH_URL ?? publicSiteUrl ?? 'http://localhost:3000'
const subscribeSecret = process.env.SUBSCRIBE_SECRET
const isProductionBuild = process.env.NEXT_PHASE === 'phase-production-build'
const productionBuildAuthSecret = isProductionBuild
  ? 'fec-build-only-better-auth-secret-d2f9a4c8b1e6-7a3d-4b9f-9e2c-8f1a6d5c3b0a'
  : undefined
const githubClientId = process.env.GITHUB_CLIENT_ID ?? (isProductionBuild ? 'build-only' : '')
const githubClientSecret =
  process.env.GITHUB_CLIENT_SECRET ?? (isProductionBuild ? 'build-only' : '')

const allowedHosts = Array.from(
  new Set(
    [
      'frontendchecklist.io',
      'localhost:3000',
      'next.localhost:1355',
      process.env.VERCEL_URL
    ].filter((host): host is string => Boolean(host))
  )
)

const crossSubdomainCookieDomain =
  process.env.NODE_ENV === 'production' ? 'frontendchecklist.io' : undefined

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET ?? productionBuildAuthSecret,
  baseURL: {
    allowedHosts,
    fallback: baseUrl,
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https'
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  databaseHooks: {
    user: {
      create: {
        before: async user => {
          const username = normalizeGithubUsername(getStringProperty(user, 'githubUsername'))
          if (!username) {
            return { data: { ...user, isProfilePublic: true } }
          }

          const taken = await prisma.user.findUnique({
            where: { username },
            select: { id: true }
          })

          return {
            data: {
              ...user,
              ...(taken ? {} : { username }),
              isProfilePublic: true
            }
          }
        },
        after: async user => {
          if (!subscribeSecret || !user.email) return
          const url = `${baseUrl}/api/subscribe`
          try {
            await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-subscribe-secret': subscribeSecret
              },
              body: JSON.stringify({ email: user.email })
            })
          } catch {
            // Fire-and-forget: do not block sign-up if mailing list add fails
          }
        }
      }
    }
  },
  user: {
    additionalFields: {
      githubUsername: {
        type: 'string',
        required: false,
        input: false
      },
      username: {
        type: 'string',
        required: false,
        input: false
      },
      isProfilePublic: {
        type: 'boolean',
        required: false,
        input: false
      },
      bio: {
        type: 'string',
        required: false,
        input: false
      },
      githubUrl: {
        type: 'string',
        required: false,
        input: false
      },
      xUrl: {
        type: 'string',
        required: false,
        input: false
      },
      githubCompany: {
        type: 'string',
        required: false,
        input: false
      },
      githubBlog: {
        type: 'string',
        required: false,
        input: false
      },
      githubLocation: {
        type: 'string',
        required: false,
        input: false
      },
      githubPublicRepos: {
        type: 'number',
        required: false,
        input: false
      },
      githubPublicGists: {
        type: 'number',
        required: false,
        input: false
      },
      githubFollowers: {
        type: 'number',
        required: false,
        input: false
      },
      githubFollowing: {
        type: 'number',
        required: false,
        input: false
      },
      githubCreatedAt: {
        type: 'date',
        required: false,
        input: false
      },
      githubUpdatedAt: {
        type: 'date',
        required: false,
        input: false
      },
      githubProfileImportedAt: {
        type: 'date',
        required: false,
        input: false
      }
    }
  },
  advanced: {
    ...(crossSubdomainCookieDomain
      ? {
          crossSubDomainCookies: {
            enabled: true,
            domain: crossSubdomainCookieDomain
          }
        }
      : {
          crossSubDomainCookies: {
            enabled: true
          }
        })
  },
  plugins: [nextCookies()],
  socialProviders: {
    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      // GitHub Apps (Iv1.*) do not support the scope parameter and will 404 if it is sent.
      ...(githubClientId.startsWith('Iv1.') ? { disableDefaultScope: true } : {}),
      mapProfileToUser: profile => {
        return {
          ...buildGithubProfileImport(profile),
          isProfilePublic: true
        }
      }
    }
  },
  trustedOrigins: Array.from(
    new Set(
      [baseUrl, publicSiteUrl, 'http://localhost:3000', 'http://next.localhost:1355']
        .filter(Boolean)
        .map(value => value!)
    )
  )
})
