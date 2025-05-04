import { redirect } from 'react-router'
import { destroySession } from '~/services/auth.server'

export async function loader({ request }: { request: Request }) {
  return redirect('/auth/login', {
    headers: {
      'Set-Cookie': await destroySession(request),
    },
  })
}
