import { redirect } from 'react-router'
import { authenticator } from '~/services/auth.server'

export const loader = async ({ request }: { request: Request }) => {
  await authenticator.authenticate('google', request)
  return redirect('/editor/basics')
}
