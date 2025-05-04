import { sessionStorage } from '~/utils/session.server'

export const loader = async ({ request }: { request: Request }) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
      Location: '/',
    },
  })
}
