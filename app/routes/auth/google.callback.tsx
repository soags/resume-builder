import { redirect } from 'react-router'
import {
  authenticator,
  getSession,
  sessionStorage,
} from '~/services/auth.server'
import type { Route } from './+types/google.callback'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await authenticator.authenticate('google', request)

  const session = await getSession(request)
  session.set('user', user)

  return redirect('/editor/basics', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}
