import { authenticator } from '~/services/auth.server'
import type { Route } from './+types/auth.google'

export async function loader({ request }: Route.LoaderArgs) {
  await authenticator.authenticate('google', request)
}
