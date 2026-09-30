import { buildGithubProfileImport, isGithubAppClientId } from '../profile'

describe('buildGithubProfileImport', () => {
  it('normalizes public GitHub profile fields for a new user import', () => {
    const importedAt = new Date('2026-05-29T20:00:00.000Z')

    expect(
      buildGithubProfileImport(
        {
          login: 'TheDavidDias',
          bio: '  Frontend engineer  ',
          twitter_username: '@the_david_dias',
          company: '  Front-End Checklist  ',
          blog: '  https://frontendchecklist.io  ',
          location: '  Montreal  ',
          public_repos: 42,
          public_gists: '7',
          followers: 1000,
          following: '125',
          created_at: '2012-04-18T12:00:00Z',
          updated_at: '2026-05-28T10:30:00Z'
        },
        importedAt
      )
    ).toEqual({
      githubUsername: 'TheDavidDias',
      githubUrl: 'https://github.com/TheDavidDias',
      bio: 'Frontend engineer',
      xUrl: 'https://x.com/the_david_dias',
      githubCompany: 'Front-End Checklist',
      githubBlog: 'https://frontendchecklist.io',
      githubLocation: 'Montreal',
      githubPublicRepos: 42,
      githubPublicGists: 7,
      githubFollowers: 1000,
      githubFollowing: 125,
      githubCreatedAt: new Date('2012-04-18T12:00:00Z'),
      githubUpdatedAt: new Date('2026-05-28T10:30:00Z'),
      githubProfileImportedAt: importedAt
    })
  })

  it('ignores invalid and empty GitHub profile values', () => {
    const importedAt = new Date('2026-05-29T20:00:00.000Z')

    expect(
      buildGithubProfileImport(
        {
          login: 'octocat',
          bio: '   ',
          twitter_username: 'not-a-valid-x-handle-because-it-is-too-long',
          company: '',
          blog: '   ',
          location: ' ',
          public_repos: -1,
          public_gists: '3.14',
          followers: Number.NaN,
          following: 'many',
          created_at: 'not-a-date',
          updated_at: ''
        },
        importedAt
      )
    ).toEqual({
      githubUsername: 'octocat',
      githubUrl: 'https://github.com/octocat',
      githubProfileImportedAt: importedAt
    })
  })

  it('does not import when the GitHub login is missing or invalid', () => {
    expect(buildGithubProfileImport({ login: '-invalid' })).toEqual({})
    expect(buildGithubProfileImport({ bio: 'No login' })).toEqual({})
  })
})

describe('isGithubAppClientId', () => {
  it.each(['Iv1.6939d4d823c53021', 'Iv23liAbCdEf123456'])('detects GitHub App ID %s', clientId => {
    expect(isGithubAppClientId(clientId)).toBe(true)
  })

  it.each(['Ov23liAbCdEf123456', 'abcdef1234567890', ''])('rejects OAuth App ID %s', clientId => {
    expect(isGithubAppClientId(clientId)).toBe(false)
  })
})
