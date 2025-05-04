import { Authenticator } from 'remix-auth'
import { CodeChallengeMethod, OAuth2Strategy } from 'remix-auth-oauth2'

export type SessionUser = {
  id: string
  email: string
  name: string
}

export const authenticator = new Authenticator<SessionUser>()

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: 'oauth2:google',

      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      redirectURI: 'http://localhost:5173/auth/google/callback',

      tokenRevocationEndpoint: 'https://oauth2.googleapis.com/revoke',

      scopes: ['email', 'profile'],
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async ({ tokens }) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken()}`,
        },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch Google profile')
      }

      const userinfo: SessionUser = await res.json()
      return userinfo
    }
  ),
  'google'
)
