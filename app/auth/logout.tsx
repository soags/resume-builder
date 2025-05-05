import { redirect } from 'react-router'
import { destroySession } from '~/services/auth.server'
import type { Route } from './+types/logout'

export async function loader({ request }: Route.LoaderArgs) {
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(request),
    },
  })
}
