import { createCookieSessionStorage } from 'react-router'
import { Authenticator } from 'remix-auth'
import { CodeChallengeMethod, OAuth2Strategy } from 'remix-auth-oauth2'

export type User = {
  id: string
  email: string
  name: string
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET ?? ''],
    secure: process.env.NODE_ENV === 'production',
  },
})

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'))
}

export async function getUser(request: Request) {
  const session = await getSession(request)
  const user = session.get('user')
  return user ?? null
}

export async function destroySession(request: Request) {
  const session = await getSession(request)
  return sessionStorage.destroySession(session)
}

export const authenticator = new Authenticator<User>()

// Google OAuth2 Strategy
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

      const userinfo: User = await res.json()
      return userinfo
    }
  ),
  'google'
)
