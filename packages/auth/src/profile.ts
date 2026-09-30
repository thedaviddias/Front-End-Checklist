const GITHUB_USERNAME_MAX = 39
const GITHUB_USERNAME_REGEX = /^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/
const X_USERNAME_REGEX = /^[a-zA-Z0-9_]{1,15}$/
const GITHUB_BIO_MAX = 160

/** Public GitHub profile fields normalized for the app user record. */
export interface GithubProfileImport {
  githubUsername?: string
  githubUrl?: string
  bio?: string
  xUrl?: string
  githubCompany?: string
  githubBlog?: string
  githubLocation?: string
  githubPublicRepos?: number
  githubPublicGists?: number
  githubFollowers?: number
  githubFollowing?: number
  githubCreatedAt?: Date
  githubUpdatedAt?: Date
  githubProfileImportedAt?: Date
}

/**
 * Detect a GitHub App client ID (`Iv1.` legacy or `Iv23` current format).
 * GitHub Apps use fine-grained permissions instead of OAuth scopes.
 *
 * @param clientId - Configured GitHub client ID.
 * @returns True when the ID belongs to a GitHub App rather than an OAuth App.
 */
export function isGithubAppClientId(clientId: string): boolean {
  return /^Iv(?:1\.|23)/.test(clientId)
}

/**
 * Normalize a GitHub login into the public profile username format.
 *
 * @param value - Raw GitHub login value.
 * @returns Lowercase public username or undefined when the value is invalid.
 */
export function normalizeGithubUsername(value: string | null | undefined): string | undefined {
  const username = value?.trim().toLowerCase()
  if (!username || username.length > GITHUB_USERNAME_MAX) {
    return undefined
  }

  return GITHUB_USERNAME_REGEX.test(username) ? username : undefined
}

/**
 * Read a string property from an unknown object shape.
 *
 * @param source - Unknown provider or database-hook payload.
 * @param key - Property name to read.
 * @returns String value when present.
 */
export function getStringProperty(source: unknown, key: string): string | undefined {
  if (!source || typeof source !== 'object') {
    return undefined
  }

  const value = Object.getOwnPropertyDescriptor(source, key)?.value
  return typeof value === 'string' ? value : undefined
}

/**
 * Read the GitHub login field from an OAuth profile object.
 *
 * @param profile - Provider profile returned by Better Auth.
 * @returns GitHub login when present.
 */
export function getGithubLogin(profile: unknown): string | undefined {
  return getStringProperty(profile, 'login')
}

/**
 * Map GitHub's public user profile shape into the fields Front-End Checklist stores.
 *
 * @param profile - Public GitHub profile object from OAuth or the REST API.
 * @param importedAt - Timestamp to store for this one-time import.
 * @returns Normalized user fields safe to persist.
 */
export function buildGithubProfileImport(
  profile: unknown,
  importedAt: Date = new Date()
): GithubProfileImport {
  const login = getGithubLogin(profile)?.trim()
  const username = normalizeGithubUsername(login)
  if (!login || !username) {
    return {}
  }

  const result: GithubProfileImport = {
    githubUsername: login,
    githubUrl: `https://github.com/${login}`,
    githubProfileImportedAt: importedAt
  }

  const bio = trimString(getStringProperty(profile, 'bio'), GITHUB_BIO_MAX)
  if (bio) result.bio = bio

  const xUrl = normalizeGithubXUrl(getStringProperty(profile, 'twitter_username'))
  if (xUrl) result.xUrl = xUrl

  const company = trimString(getStringProperty(profile, 'company'))
  if (company) result.githubCompany = company

  const blog = trimString(getStringProperty(profile, 'blog'))
  if (blog) result.githubBlog = blog

  const location = trimString(getStringProperty(profile, 'location'))
  if (location) result.githubLocation = location

  const publicRepos = getNonNegativeIntegerProperty(profile, 'public_repos')
  if (typeof publicRepos === 'number') result.githubPublicRepos = publicRepos

  const publicGists = getNonNegativeIntegerProperty(profile, 'public_gists')
  if (typeof publicGists === 'number') result.githubPublicGists = publicGists

  const followers = getNonNegativeIntegerProperty(profile, 'followers')
  if (typeof followers === 'number') result.githubFollowers = followers

  const following = getNonNegativeIntegerProperty(profile, 'following')
  if (typeof following === 'number') result.githubFollowing = following

  const githubCreatedAt = getDateProperty(profile, 'created_at')
  if (githubCreatedAt) result.githubCreatedAt = githubCreatedAt

  const githubUpdatedAt = getDateProperty(profile, 'updated_at')
  if (githubUpdatedAt) result.githubUpdatedAt = githubUpdatedAt

  return result
}

/**
 * Return a trimmed string when the value has visible content.
 *
 * @param value - Raw string value.
 * @param maxLength - Optional maximum length.
 * @returns Trimmed non-empty string.
 */
function trimString(value: string | undefined, maxLength?: number): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) {
    return undefined
  }

  return typeof maxLength === 'number' ? trimmed.slice(0, maxLength) : trimmed
}

/**
 * Normalize GitHub's legacy twitter_username profile field into this app's X URL.
 *
 * @param value - Raw GitHub twitter_username value.
 * @returns Canonical X profile URL.
 */
function normalizeGithubXUrl(value: string | undefined): string | undefined {
  const username = value?.trim().replace(/^@/, '')
  if (!username || !X_USERNAME_REGEX.test(username)) {
    return undefined
  }

  return `https://x.com/${username}`
}

/**
 * Read a non-negative integer from a public GitHub profile object.
 *
 * @param source - Unknown provider or API payload.
 * @param key - Property name to read.
 * @returns Parsed integer when valid.
 */
function getNonNegativeIntegerProperty(source: unknown, key: string): number | undefined {
  if (!source || typeof source !== 'object') {
    return undefined
  }

  const value = Object.getOwnPropertyDescriptor(source, key)?.value
  const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN

  return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined
}

/**
 * Read a valid Date from a public GitHub profile object.
 *
 * @param source - Unknown provider or API payload.
 * @param key - Property name to read.
 * @returns Date when the source value is valid.
 */
function getDateProperty(source: unknown, key: string): Date | undefined {
  const value = getStringProperty(source, key)
  if (!value) {
    return undefined
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}
